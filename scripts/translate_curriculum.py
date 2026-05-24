#!/usr/bin/env python3
"""
AI Engineering from Scratch - Automatic Curriculum Translator (Việt Hóa)
This script recursively scans all lessons, calls LLM APIs (Gemini or OpenAI) 
to translate the English markdown (docs/en.md) and quizzes (quiz.json) to Vietnamese,
adhering to key ML translation rules (e.g. "Tác tử (Agent)" and "Cơ chế chú ý (Attention)").
"""

import os
import sys
import json
import time
import argparse
import urllib.request
import urllib.error
from pathlib import Path

# --- Constants & Key Translation Guidelines ---
SYSTEM_PROMPT = """
You are an expert AI researcher and technical translator specialized in Machine Learning, Deep Learning, and System Engineering.
Your task is to translate technical curriculum materials from English to Vietnamese.

Strict Guidelines:
1. Translate all explanations and body texts into natural, professional, and academically sound Vietnamese.
2. For specialized terminology, use standard Vietnamese technical terms. Specifically:
   - Always translate "Agent" or "agent" as "Tác tử (Agent)".
   - Always translate "Attention" or "attention" as "Cơ chế chú ý (Attention)".
   - For other core terms, you may keep them in English or use bilingual formats if appropriate (e.g., "Mạng nơ-ron (Neural Network)", "Tinh chỉnh (Fine-tuning)").
3. Normalization: Convert all stylized em-dashes (—) into standard hyphens (-).
4. Code & Math: Absolutely DO NOT modify code blocks, mathematical equations ($...$ or $$...$$), HTML tags, or file path references. Keep them exactly as in the source.
5. Tone: Maintain a highly professional, academic, yet encouraging tone.
"""

TRANSLATE_MD_PROMPT = """
Translate the following Markdown document into Vietnamese, following the strict translation guidelines. Return ONLY the translated Markdown. Do not wrap the output in code blocks unless they are part of the translation itself.

--- SOURCE DOCUMENT ---
{content}
"""

TRANSLATE_QUIZ_PROMPT = """
Translate the following quiz JSON file into Vietnamese. 
You must translate:
1. The quiz "title".
2. The "question" strings.
3. The "options" array values.
4. The "explanation" strings.

Do NOT translate:
- "lesson" or "stage" keys or values.
- "correct" or "answer" keys or numeric values.

Return ONLY a valid, parsable JSON string matching the exact structure of the input. Do not wrap your response in markdown code blocks like ```json ... ```.

--- SOURCE JSON ---
{content}
"""

def make_llm_request(prompt, provider, api_key, model=None):
    """Makes a request to Gemini or OpenAI API using standard urllib."""
    if provider == "gemini":
        model = model or "gemini-1.5-flash"
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": SYSTEM_PROMPT},
                        {"text": prompt}
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.1
            }
        }
        headers = {"Content-Type": "application/json"}
    elif provider == "openai":
        model = model or "gpt-4o-mini"
        url = "https://api.openai.com/v1/chat/completions"
        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.1
        }
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
    else:
        raise ValueError(f"Unsupported provider: {provider}")

    req = urllib.request.Request(
        url, 
        data=json.dumps(payload).encode("utf-8"), 
        headers=headers, 
        method="POST"
    )

    max_retries = 3
    backoff = 2
    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(req, timeout=90) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                if provider == "gemini":
                    text = res_data["candidates"][0]["content"]["parts"][0]["text"]
                else:
                    text = res_data["choices"][0]["message"]["content"]
                return text.strip()
        except urllib.error.HTTPError as e:
            err_msg = e.read().decode("utf-8")
            print(f"  [API Error] Attempt {attempt+1} failed: {e.code} - {e.reason}")
            print(f"  Details: {err_msg[:300]}")
            if e.code == 429: # Rate limit
                time.sleep(backoff)
                backoff *= 2
            else:
                raise e
        except Exception as e:
            print(f"  [Error] Attempt {attempt+1} failed: {str(e)}")
            time.sleep(backoff)
            backoff *= 2
            
    raise Exception("Max retries exceeded")

def clean_json_response(raw_text):
    """Cleans potential markdown JSON wrappers from the response."""
    text = raw_text.strip()
    if text.startswith("```json"):
        text = text[7:]
    if text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
    return text.strip()

def process_translation(phases_dir, provider, api_key, model, force, limit, delay):
    """Scans all lessons and performs translations."""
    phases_path = Path(phases_dir)
    if not phases_path.exists():
        print(f"Error: Phases directory '{phases_dir}' not found.")
        sys.exit(1)

    # Gather all lesson directories
    lessons = []
    for phase_dir in sorted(phases_path.glob("??-*")):
        if not phase_dir.is_dir():
            continue
        for lesson_dir in sorted(phase_dir.glob("??-*")):
            if lesson_dir.is_dir():
                lessons.append(lesson_dir)

    print(f"Found {len(lessons)} lessons in the curriculum.")
    
    count = 0
    for lesson in lessons:
        if limit and count >= limit:
            print(f"\nLimit of {limit} lessons reached. Stopping.")
            break

        lesson_relative = lesson.relative_to(phases_path.parent)
        print(f"\nChecking lesson: {lesson_relative}")

        # 1. Translate docs/en.md -> docs/vi.md
        en_md_path = lesson / "docs" / "en.md"
        vi_md_path = lesson / "docs" / "vi.md"
        
        md_translated = False
        if en_md_path.exists():
            if not vi_md_path.exists() or force:
                print(f"  -> Translating markdown: docs/en.md to docs/vi.md...")
                try:
                    with open(en_md_path, "r", encoding="utf-8") as f:
                        en_content = f.read()

                    prompt = TRANSLATE_MD_PROMPT.format(content=en_content)
                    vi_content = make_llm_request(prompt, provider, api_key, model)
                    
                    # Ensure docs folder exists
                    vi_md_path.parent.mkdir(parents=True, exist_ok=True)
                    with open(vi_md_path, "w", encoding="utf-8") as f:
                        f.write(vi_content)
                        
                    print(f"  [Success] Saved: {vi_md_path.relative_to(phases_path.parent)}")
                    md_translated = True
                    time.sleep(delay)
                except Exception as e:
                    print(f"  [Failed] Markdown translation failed: {str(e)}")
            else:
                print(f"  [Skipped] docs/vi.md already exists.")
        else:
            print(f"  [Info] docs/en.md not found.")

        # 2. Translate quiz.json -> quiz_vi.json
        quiz_path = lesson / "quiz.json"
        quiz_vi_path = lesson / "quiz_vi.json"
        
        quiz_translated = False
        if quiz_path.exists():
            if not quiz_vi_path.exists() or force:
                print(f"  -> Translating quiz: quiz.json to quiz_vi.json...")
                try:
                    with open(quiz_path, "r", encoding="utf-8") as f:
                        quiz_content = f.read()

                    prompt = TRANSLATE_QUIZ_PROMPT.format(content=quiz_content)
                    vi_quiz_raw = make_llm_request(prompt, provider, api_key, model)
                    vi_quiz_cleaned = clean_json_response(vi_quiz_raw)
                    
                    # Validate JSON structure
                    json.loads(vi_quiz_cleaned)
                    
                    with open(quiz_vi_path, "w", encoding="utf-8") as f:
                        f.write(vi_quiz_cleaned)
                        
                    print(f"  [Success] Saved: {quiz_vi_path.relative_to(phases_path.parent)}")
                    quiz_translated = True
                    time.sleep(delay)
                except json.JSONDecodeError:
                    print(f"  [Failed] Quiz translated output was not valid JSON.")
                except Exception as e:
                    print(f"  [Failed] Quiz translation failed: {str(e)}")
            else:
                print(f"  [Skipped] quiz_vi.json already exists.")
        else:
            print(f"  [Info] quiz.json not found.")

        if md_translated or quiz_translated:
            count += 1

    print(f"\nFinished! Localized {count} new lessons to Vietnamese.")

def main():
    parser = argparse.ArgumentParser(description="Auto-translate AI Engineering curriculum to Vietnamese.")
    parser.add_init = True
    parser.add_argument("--phases", default="phases", help="Path to the phases directory (default: phases)")
    parser.add_argument("--provider", choices=["gemini", "openai"], default="gemini", help="LLM API provider (default: gemini)")
    parser.add_argument("--model", help="Specific model name (default: gemini-1.5-flash or gpt-4o-mini)")
    parser.add_argument("--key", help="API Key (or set GEMINI_API_KEY / OPENAI_API_KEY env variables)")
    parser.add_argument("--force", action="store_true", help="Overwrite existing vi.md and quiz_vi.json files")
    parser.add_argument("--limit", type=int, default=0, help="Maximum number of lessons to translate in this run (0 = unlimited)")
    parser.add_argument("--delay", type=float, default=2.0, help="Delay in seconds between requests to avoid rate limits (default: 2.0)")

    args = parser.parse_args()

    # Determine API key
    api_key = args.key
    if not api_key:
        if args.provider == "gemini":
            api_key = os.environ.get("GEMINI_API_KEY")
        elif args.provider == "openai":
            api_key = os.environ.get("OPENAI_API_KEY")

    if not api_key:
        print(f"Error: API key for {args.provider} is missing.")
        print(f"Please provide it using --key or set GEMINI_API_KEY / OPENAI_API_KEY env variables.")
        sys.exit(1)

    print("=================================================================")
    print("      AI Engineering from Scratch - Curriculum Localizer         ")
    print("=================================================================")
    print(f" Provider:  {args.provider}")
    print(f" Model:     {args.model or '(default)'}")
    print(f" Limit:     {args.limit if args.limit > 0 else 'Unlimited'}")
    print(f" Force:     {args.force}")
    print(f" Guidelines:")
    print("   - 'Agent' -> 'Tác tử (Agent)'")
    print("   - 'Attention' -> 'Cơ chế chú ý (Attention)'")
    print("   - Em-dash '—' -> Hiphen '-'")
    print("=================================================================")

    process_translation(
        phases_dir=args.phases,
        provider=args.provider,
        api_key=api_key,
        model=args.model,
        force=args.force,
        limit=args.limit,
        delay=args.delay
    )

if __name__ == "__main__":
    main()
