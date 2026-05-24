(function () {
  'use strict';

  var STORAGE_KEY = 'aifs:lang';
  var currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

  // ─── UI Translations Dictionaries ──────────────────────────────────
  var UI = {
    en: {
      // Navbar
      logo: 'AI / FROM SCRATCH',
      nav_contents: 'Contents',
      nav_catalog: 'Catalog',
      nav_roadmap: 'Roadmap',
      nav_glossary: 'Glossary',
      nav_search: 'Search (⌘K)',

      // Index
      tagline: '435 lessons. 20 phases. Every algorithm built from raw math before a single framework gets imported.',
      attribution: 'Maintained by Duong Thanh Tai and contributors. Run on your own machine.',
      preface_eyebrow: 'How this works',
      preface_p1: 'Most AI material teaches in scattered pieces. A paper here, a fine-tuning post there, a flashy agent demo somewhere else. The pieces rarely line up. You ship a chatbot but can\'t explain its loss curve. You hook a function to an agent but can\'t say what attention does inside the model that\'s calling it.',
      preface_p2: 'This curriculum is the spine. 20 phases, 435 lessons, four languages: Python, TypeScript, Rust, Julia. Linear algebra at one end, autonomous swarms at the other. Every algorithm gets built from raw math first. Backprop. Tokenizer. Attention. Agent loop. By the time PyTorch shows up, you already know what it\'s doing under the hood.',
      preface_p3: 'Each lesson runs the same loop: read the problem, derive the math, write the code, run the test, keep the artifact. No five-minute videos, no copy-paste deploys, no hand-holding. Free, open source, and built to run on your own laptop.',
      progress_title: 'Current Progress',
      progress_lessons: 'Finished Lessons',
      progress_phases: 'Phases',
      progress_languages: 'Languages',
      progress_glossary: 'Glossary Terms',
      curriculum_title: 'Curriculum · 20 phases · 435 lessons',
      curriculum_subtitle: 'Tap a phase to expand its lessons. Each one ships when its math, code, and test are all written.',
      legend_complete: 'Complete',
      legend_in_progress: 'In progress',
      legend_planned: 'Planned',
      colophon_title: 'Colophon',
      colophon_text: 'The entire curriculum is on GitHub. Clone it, fork it, learn at your own pace. No paywall, no signup. Every lesson has runnable code in Python, TypeScript, Rust, or Julia, depending on what fits the concept best.',
      footer_text: 'AI Engineering from Scratch · open source · free forever.',
      footer_home: 'Home',
      footer_report: 'Report / Suggest',
      modal_reset: 'Reset progress',
      modal_note: 'Progress saved in browser only',
      modal_completed: 'completed',

      // Catalog
      catalog_title: 'Lesson Catalog',
      catalog_subtitle: 'Every lesson across all 20 phases. Search, filter, sort.',
      catalog_search_placeholder: 'Search lessons...',
      catalog_all_phases: 'All Phases',
      catalog_all_status: 'All Status',
      catalog_empty: 'No lessons match your filters.',
      catalog_lessons_unit: 'lessons',
      catalog_of: 'of',
      th_phase: 'Phase',
      th_lesson: 'Lesson',
      th_type: 'Type',
      th_lang: 'Language',
      th_status: 'Status',

      // Glossary
      glossary_title: 'AI Glossary',
      glossary_subtitle: 'What people say vs what things actually mean',
      glossary_search_placeholder: 'Search terms...',
      glossary_empty: 'No terms match your search.',
      glossary_terms_unit: 'terms',
      glossary_label_says: 'What people say',
      glossary_label_means: 'What it actually means',

      // Roadmap
      roadmap_title: 'Roadmap',
      roadmap_subtitle: 'Click any phase to see its prerequisites and what it unlocks downstream.',
      roadmap_legend_complete: 'Complete',
      roadmap_legend_in_progress: 'In Progress',
      roadmap_legend_planned: 'Planned',
      roadmap_clear_selection: 'Clear selection',
      roadmap_scroll_hint: '↔ Scroll to explore the full graph',
      detail_prerequisites: 'Prerequisites',
      detail_unlocks: 'Unlocks Downstream',
      detail_no_prereqs: 'No prerequisites',
      detail_no_unlocks: 'Nothing unlocked yet',
      detail_lessons_label: 'Lessons',
      detail_completed_label: 'completed',
      detail_action_read: 'Read phase overview',
      detail_action_catalog: 'View catalog',

      // Lesson
      lesson_on_this_page: 'On this page',
      lesson_previous: 'Previous',
      lesson_next: 'Next',
      lesson_loading: 'Loading lesson...',
      lesson_view_github: 'View lesson on GitHub',
      lesson_copy: 'Copy',
      lesson_copied: 'Copied!',
      lesson_review: 'Review',
      lesson_read: 'Read',

      panel_ships_title: 'What This Lesson Ships',
      panel_ships_subtitle: 'Prompts, skills, and artifacts you can use right now',
      panel_code_title: 'Run the Code',
      panel_code_subtitle: 'Executable files from this lesson',
      panel_quiz_title: 'Test Your Understanding',
      panel_quiz_subtitle: 'Did you get it?',
      panel_path_title: 'Learning Path',
      panel_continue_title: 'Continue Learning',
      panel_quiz_score_msg: 'Complete all questions to see your score',
      panel_quiz_explain_perfect: 'Perfect score!',
      panel_quiz_explain_good: 'Great work!',
      panel_quiz_explain_keep: 'Keep studying!',
      panel_quiz_deeper: 'Want a deeper quiz? Run <code>/check-understanding</code> in Claude, Cursor, or any agent with curriculum skills.',
      panel_continue_finished: '✅ You finished this phase!',
      panel_continue_browse: 'Browse all Phase {id} lessons',
      panel_continue_catalog: 'Full course catalog',
      panel_continue_deeper: 'Run <code>/find-your-level</code> in Claude or Cursor for a personalized learning path'
    },
    vi: {
      // Navbar
      logo: 'AI / KHỞI NGUỒN',
      nav_contents: 'Nội dung',
      nav_catalog: 'Danh mục',
      nav_roadmap: 'Lộ trình',
      nav_glossary: 'Thuật ngữ',
      nav_search: 'Tìm kiếm (⌘K)',

      // Index
      tagline: '435 bài học. 20 giai đoạn. Mọi thuật toán được xây dựng từ toán học thuần túy trước khi nhập bất kỳ thư viện nào.',
      attribution: 'Duy trì bởi Dương Thanh Tài và các cộng sự. Chạy trên máy tính của riêng bạn.',
      preface_eyebrow: 'Cách hoạt động',
      preface_p1: 'Hầu hết các tài liệu AI được giảng dạy thành các phần rời rạc. Một bài báo ở đây, một bài viết tinh chỉnh (fine-tuning) ở kia, một bản giới thiệu tác tử (agent) hào nhoáng ở nơi khác. Các phần hiếm khi ăn khớp với nhau. Bạn tạo ra một chatbot nhưng không thể giải thích đường cong độ mất mát (loss curve) của nó. Bạn gắn một hàm vào một tác tử nhưng không thể giải thích cơ chế tự chú ý (attention) làm gì bên trong mô hình đang gọi nó.',
      preface_p2: 'Chương trình học này là cột sống. Gồm 20 giai đoạn, 435 bài học, bốn ngôn ngữ: Python, TypeScript, Rust, Julia. Đại số tuyến tính ở một đầu, các hệ tác tử tự trị (autonomous swarms) ở đầu kia. Mọi thuật toán được xây dựng từ toán học thô trước tiên. Lan truyền ngược (Backpropagation). Bộ tách từ (Tokenizer). Cơ chế tự chú ý (Attention). Vòng lặp tác tử (Agent loop). Cho đến khi PyTorch xuất hiện, bạn đã biết nó đang hoạt động như thế nào bên dưới.',
      preface_p3: 'Mỗi bài học chạy cùng một vòng lặp: đọc vấn đề, suy luận toán học, viết mã, chạy kiểm thử, lưu giữ sản phẩm. Không có video năm phút, không có triển khai sao chép-dán, không có sự hỗ trợ sẵn. Miễn phí, mã nguồn mở và được xây dựng để chạy trên máy tính xách tay của chính bạn.',
      progress_title: 'Tiến độ hiện tại',
      progress_lessons: 'Bài học hoàn thành',
      progress_phases: 'Giai đoạn',
      progress_languages: 'Ngôn ngữ',
      progress_glossary: 'Thuật ngữ',
      curriculum_title: 'Chương trình học · 20 giai đoạn · 435 bài học',
      curriculum_subtitle: 'Nhấp vào một giai đoạn để mở rộng danh sách bài học. Mỗi bài học được xuất bản khi toán học, mã nguồn và kiểm thử của nó đều được hoàn thiện.',
      legend_complete: 'Hoàn thành',
      legend_in_progress: 'Đang thực hiện',
      legend_planned: 'Lên kế hoạch',
      colophon_title: 'Ghi chú sản xuất',
      colophon_text: 'Toàn bộ chương trình học được lưu trữ trên GitHub. Nhân bản, rẽ nhánh và học theo tốc độ của riêng bạn. Không có tường thu phí, không cần đăng ký. Mỗi bài học đều có mã nguồn có thể thực thi bằng Python, TypeScript, Rust hoặc Julia, tùy thuộc vào ngôn ngữ nào phù hợp nhất với khái niệm.',
      footer_text: 'AI Engineering từ cơ bản · mã nguồn mở · miễn phí mãi mãi.',
      footer_home: 'Trang chủ',
      footer_report: 'Báo lỗi / Góp ý',
      modal_reset: 'Đặt lại tiến trình',
      modal_note: 'Tiến trình chỉ được lưu trong trình duyệt',
      modal_completed: 'đã hoàn thành',

      // Catalog
      catalog_title: 'Danh mục bài học',
      catalog_subtitle: 'Mọi bài học trong tất cả 20 giai đoạn. Tìm kiếm, lọc, sắp xếp.',
      catalog_search_placeholder: 'Tìm kiếm bài học...',
      catalog_all_phases: 'Tất cả giai đoạn',
      catalog_all_status: 'Tất cả trạng thái',
      catalog_empty: 'Không có bài học nào khớp với bộ lọc.',
      catalog_lessons_unit: 'bài học',
      catalog_of: 'trên',
      th_phase: 'Giai đoạn',
      th_lesson: 'Bài học',
      th_type: 'Loại',
      th_lang: 'Ngôn ngữ',
      th_status: 'Trạng thái',

      // Glossary
      glossary_title: 'Thuật ngữ AI',
      glossary_subtitle: 'Mọi người thường nói vs Thực tế có nghĩa là',
      glossary_search_placeholder: 'Tìm kiếm thuật ngữ...',
      glossary_empty: 'Không tìm thấy thuật ngữ nào khớp.',
      glossary_terms_unit: 'thuật ngữ',
      glossary_label_says: 'Mọi người thường nói',
      glossary_label_means: 'Thực tế có nghĩa là',

      // Roadmap
      roadmap_title: 'Lộ trình học tập',
      roadmap_subtitle: 'Nhấp vào bất kỳ giai đoạn nào để xem các điều kiện tiên quyết và những giai đoạn được mở khóa tiếp theo.',
      roadmap_legend_complete: 'Hoàn thành',
      roadmap_legend_in_progress: 'Đang thực hiện',
      roadmap_legend_planned: 'Lên kế hoạch',
      roadmap_clear_selection: 'Xóa lựa chọn',
      roadmap_scroll_hint: '↔ Cuộn sang hai bên để khám phá toàn bộ lộ trình',
      detail_prerequisites: 'Điều kiện tiên quyết',
      detail_unlocks: 'Mở khóa tiếp theo',
      detail_no_prereqs: 'Không có điều kiện tiên quyết',
      detail_no_unlocks: 'Chưa mở khóa thêm',
      detail_lessons_label: 'Bài học',
      detail_completed_label: 'đã hoàn thành',
      detail_action_read: 'Đọc tổng quan giai đoạn',
      detail_action_catalog: 'Xem danh mục',

      // Lesson
      lesson_on_this_page: 'Mục lục bài học',
      lesson_previous: 'Bài trước',
      lesson_next: 'Bài tiếp theo',
      lesson_loading: 'Đang tải bài học...',
      lesson_view_github: 'Xem bài học trên GitHub',
      lesson_copy: 'Sao chép',
      lesson_copied: 'Đã sao chép!',
      lesson_review: 'Xem lại',
      lesson_read: 'Đọc bài',

      panel_ships_title: 'Kết quả đầu ra bài học',
      panel_ships_subtitle: 'Prompts, skills và các sản phẩm bạn có thể dùng ngay',
      panel_code_title: 'Thực thi mã nguồn',
      panel_code_subtitle: 'Các tệp tin có thể thực thi từ bài học này',
      panel_quiz_title: 'Kiểm tra mức độ thấu hiểu',
      panel_quiz_subtitle: 'Bạn đã hiểu bài chưa?',
      panel_path_title: 'Lộ trình học tập',
      panel_continue_title: 'Tiếp tục học tập',
      panel_quiz_score_msg: 'Hoàn thành tất cả câu hỏi để xem điểm của bạn',
      panel_quiz_explain_perfect: 'Điểm tuyệt đối!',
      panel_quiz_explain_good: 'Làm tốt lắm!',
      panel_quiz_explain_keep: 'Hãy tiếp tục cố gắng nhé!',
      panel_quiz_deeper: 'Muốn kiểm tra sâu hơn? Hãy chạy lệnh <code>/check-understanding</code> trong Claude, Cursor hoặc các tác tử được tích hợp kỹ năng.',
      panel_continue_finished: '✅ Bạn đã hoàn thành giai đoạn này!',
      panel_continue_browse: 'Xem tất cả bài học Giai đoạn {id}',
      panel_continue_catalog: 'Toàn bộ danh mục khóa học',
      panel_continue_deeper: 'Chạy lệnh <code>/find-your-level</code> trong Claude hoặc Cursor để nhận lộ trình học tập cá nhân hóa'
    }
  };

  // ─── Phase Translations ──────────────────────────────────────────
  var PHASES_VI = {
    0: { name: 'Cài đặt & Công cụ (Setup & Tooling)', desc: 'Chuẩn bị sẵn sàng môi trường làm việc cho tất cả các phần tiếp theo.' },
    1: { name: 'Nền tảng Toán học (Math Foundations)', desc: 'Bản chất trực giác đằng sau mỗi thuật toán AI, thông qua mã nguồn.' },
    2: { name: 'Cơ bản về Học máy (ML Fundamentals)', desc: 'Học máy cổ điển — vẫn là xương sống của hầu hết hệ thống AI trong thực tế.' },
    3: { name: 'Cốt lõi Học sâu (Deep Learning Core)', desc: 'Mạng nơ-ron từ các nguyên lý cơ bản. Không sử dụng thư viện cho đến khi bạn tự viết được một thư viện.' },
    4: { name: 'Thị giác Máy tính (Computer Vision)', desc: 'Từ bộ lọc tích chập đến Vision Transformers. Nhìn nhận thế giới thông qua các điểm ảnh (pixels).' },
    5: { name: 'Xử lý Ngôn ngữ Tự nhiên (NLP)', desc: 'Từ TF-IDF và biểu diễn từ (word embeddings) đến các mô hình chuỗi-kế-tiếp-chuỗi (seq2seq).' },
    6: { name: 'Tiếng nói & Âm thanh (Speech & Audio)', desc: 'Biểu đồ phổ (Spectrograms), chuyển đổi giọng nói thành văn bản và tạo âm thanh từ sóng âm thô.' },
    7: { name: 'Đi sâu vào Transformers (Transformers Deep Dive)', desc: 'Kiến trúc đã thay đổi mọi thứ. Xây dựng cơ chế chú ý (attention), bộ nhớ đệm KV và rotary embeddings.' },
    8: { name: 'AI Tạo sinh (Generative AI)', desc: 'GANs, VAEs và các mô hình khuếch tán (diffusion). Học cách tạo dữ liệu mới từ nhiễu.' },
    9: { name: 'Học tăng cường (Reinforcement Learning)', desc: 'Q-learning, gradient chính sách (policy gradients) và RLHF. Dạy các tác tử tối ưu hóa phần thưởng.' },
    10: { name: 'LLMs từ cơ bản (LLMs from Scratch)', desc: 'Tiền huấn luyện (Pre-training), bộ tách từ (tokenizers) và hậu huấn luyện. Xây dựng, huấn luyện và vận hành mô hình của riêng bạn.' },
    11: { name: 'Kỹ nghệ Mô hình Ngôn ngữ Lớn (LLM Engineering)', desc: 'RAG, cơ sở dữ liệu vector và tối ưu hóa gợi ý (prompt). Xây dựng hệ thống LLM hoàn chỉnh.' },
    12: { name: 'AI Đa phương tiện (Multimodal AI)', desc: 'CLIP, stable diffusion và các mô hình thị giác-ngôn ngữ. Thu hẹp khoảng cách giữa văn bản và hình ảnh.' },
    13: { name: 'Công cụ & Giao thức (Tools & Protocols)', desc: 'MCP, gọi công cụ (tool calling) và dữ liệu đầu ra có cấu trúc. Kết nối các mô hình với thế giới bên ngoài.' },
    14: { name: 'Kỹ nghệ Tác tử (Agent Engineering)', desc: 'ReAct, vòng lặp lập kế hoạch và bộ nhớ. Xây dựng các tác tử biết hành động và tự đánh giá.' },
    15: { name: 'Hệ thống Tự trị (Autonomous Systems)', desc: 'Máy trạng thái, mô hình thế giới và bộ giám sát thực thi. Xây dựng các vòng lặp tác tử tự trị đáng tin cậy.' },
    16: { name: 'Đa Tác tử & Hệ đàn (Multi-Agent & Swarms)', desc: 'Hợp tác, ủy quyền và đồng thuận. Phối hợp nhiều tác tử cùng lúc để giải quyết các tác vụ phức tạp.' },
    17: { name: 'Hạ tầng & Triển khai (Infrastructure & Production)', desc: 'Lượng tử hóa (Quantization), vLLM và cung cấp mô hình độ trễ thấp. Vận hành các mô hình ở quy mô lớn.' },
    18: { name: 'Đạo đức, An toàn & Căn chỉnh (Ethics & Alignment)', desc: 'Vượt rào (Jailbreaks), đánh giá (evaluations) và red-teaming. Căn chỉnh mô hình theo chủ ý của con người.' },
    19: { name: 'Dự án Tốt nghiệp (Capstone Projects)', desc: 'Thử thách tối hạn. Xây dựng một tác tử tự trị hoàn toàn có thể tự quản lý, viết mã và tự triển khai.' }
  };

  // ─── Glossary Translations Dictionaries ──────────────────────────
  var GLOSSARY_VI = {
    "Agent": {
      term: "Tác tử (Agent)",
      says: "Một AI tự trị có khả năng tự suy nghĩ và hành động độc lập",
      means: "Một vòng lặp while nơi Mô hình Ngôn ngữ Lớn (LLM) quyết định nên gọi công cụ nào tiếp theo, thực thi nó, quan sát kết quả và lặp lại"
    },
    "Attention": {
      term: "Cơ chế chú ý (Attention)",
      says: "Cách AI tập trung vào các phần quan trọng của dữ liệu",
      means: "Một cơ chế nơi mỗi từ tố (token) tính toán một tổng trọng số các giá trị của tất cả từ tố khác, với trọng số được quyết định bởi mức độ liên quan hình học (thông qua tích vô hướng của các vectơ query và key)"
    },
    "Alignment": {
      term: "Căn chỉnh (Alignment)",
      says: "Làm cho AI trở nên an toàn",
      means: "Thử thách kỹ thuật trong việc đảm bảo hành vi của hệ thống AI khớp chính xác với ý định, giá trị và sở thích của con người, bao gồm cả các tình huống biên mà nhà thiết kế chưa lường trước"
    },
    "Autoregressive": {
      term: "Tự hồi quy (Autoregressive)",
      says: "AI tạo ra từng từ một tại mỗi thời điểm",
      means: "Một mô hình dự đoán từ tố tiếp theo dựa trên tất cả từ tố đứng trước, sau đó đưa kết quả dự đoán đó ngược lại làm đầu vào cho bước tiếp theo. GPT, LLaMA và Claude đều hoạt động theo cơ chế tự hồi quy."
    },
    "Activation Function": {
      term: "Hàm kích hoạt (Activation Function)",
      says: "Thành phần phi tuyến tính nằm giữa các lớp",
      means: "Một hàm số được áp dụng sau mỗi lớp tuyến tính nhằm đưa tính chất phi tuyến vào mạng. Nếu không có nó, việc xếp chồng bao nhiêu lớp tuyến tính đi nữa cũng sẽ sụp đổ thành một phép biến đổi tuyến tính đơn lẻ duy nhất. ReLU, GELU và SiLU là phổ biến nhất."
    },
    "Adam (Optimizer)": {
      term: "Bộ tối ưu hóa Adam (Adam Optimizer)",
      says: "Bộ tối ưu hóa mặc định",
      means: "Viết tắt của Adaptive Moment Estimation. Kết hợp quán tính (mô-men số một) với tốc độ học thích ứng trên từng tham số (mô-men số hai). Hoạt động rất tốt trên hầu hết các tác vụ mà không cần tinh chỉnh nhiều."
    },
    "AdamW": {
      term: "Bộ tối ưu hóa AdamW (AdamW Optimizer)",
      says: "Adam nhưng tốt hơn",
      means: "Adam kết hợp với cơ chế suy giảm trọng số (weight decay) tách biệt. Trong Adam tiêu chuẩn, sự suy giảm trọng số L2 bị điều chỉnh bởi tốc độ học thích ứng, điều mà chúng ta không mong muốn. AdamW áp dụng suy giảm trọng số trực tiếp lên các trọng số một cách độc lập."
    },
    "Autograd": {
      term: "Tự động tính gradient (Autograd)",
      says: "Tính toán đạo hàm tự động",
      means: "Một hệ thống ghi lại các hoạt động trên các ten-xơ (tensors) và tự động tính toán gradient thông qua vi phân chế độ đảo ngược (reverse-mode differentiation). Đây là công cụ cốt lõi giúp quá trình lan truyền ngược (backpropagation) trở nên khả thi."
    },
    "Batch Size": {
      term: "Kích thước lô (Batch Size)",
      says: "Có bao nhiêu ví dụ được xử lý cùng một lúc",
      means: "Số lượng mẫu huấn luyện được xử lý trong một lượt truyền xuôi/ngược trước khi cập nhật trọng số. Kích thước lô lớn hơn cung cấp các ước lượng gradient ổn định hơn nhưng tiêu tốn nhiều bộ nhớ GPU hơn."
    },
    "Backpropagation": {
      term: "Lan truyền ngược (Backpropagation)",
      says: "Cách thức mạng nơ-ron học tập",
      means: "Một thuật toán tính toán mức độ đóng góp của từng trọng số vào lỗi tổng bằng cách áp dụng quy tắc chuỗi đạo hàm (chain rule) ngược từ đầu ra về đầu vào, sau đó điều chỉnh các trọng số tương ứng"
    },
    "Context Window": {
      term: "Cửa sổ ngữ cảnh (Context Window)",
      says: "Khả năng ghi nhớ của AI lớn đến mức nào",
      means: "Số lượng từ tố (token) tối đa (bao gồm cả đầu vào và đầu ra) có thể chứa vừa trong một cuộc gọi API duy nhất. Đây là một bộ đệm kích thước cố định và sẽ bị xóa sạch sau mỗi lượt gọi mới"
    },
    "Chain of Thought (CoT)": {
      term: "Chuỗi tư duy (Chain of Thought - CoT)",
      says: "Bắt AI phải suy nghĩ từng bước một",
      means: "Một kỹ thuật gợi ý (prompting) trong đó yêu cầu mô hình hiển thị các bước suy luận trung gian của nó, điều này cải thiện đáng kể độ chính xác của các bài toán nhiều bước"
    },
    "CNN (Convolutional Neural Network)": {
      term: "Mạng nơ-ron tích chập (CNN)",
      says: "AI dành cho xử lý hình ảnh",
      means: "Một mạng nơ-ron sử dụng các phép toán tích chập (trượt các bộ lọc qua dữ liệu đầu vào) để tự động phát hiện các mẫu không gian cục bộ như cạnh, họa tiết, hình dạng."
    },
    "CUDA": {
      term: "Nền tảng CUDA (NVIDIA CUDA)",
      says: "Lập trình card đồ họa GPU",
      means: "Nền tảng tính toán song song của NVIDIA. Nó cho phép chạy các phép toán ma trận trên hàng ngàn lõi GPU cùng lúc. PyTorch và TensorFlow sử dụng CUDA bên dưới."
    },
    "Chunking": {
      term: "Phân khúc văn bản (Chunking)",
      says: "Chia nhỏ tài liệu thành từng mảnh",
      means: "Việc cắt văn bản thành các đoạn nhỏ có độ dài tối ưu trước khi thực hiện nhúng (embedding) để phục vụ truy xuất thông tin (RAG). Giúp giữ ngữ cảnh mà không làm loãng thông tin."
    },
    "Contrastive Learning": {
      term: "Học tương phản (Contrastive Learning)",
      says: "Học bằng cách so sánh",
      means: "Phương pháp huấn luyện bằng cách kéo các cặp vectơ tương tự lại gần nhau và đẩy các cặp vectơ khác biệt ra xa nhau trong không gian nhúng. Mô hình CLIP sử dụng kỹ thuật này để khớp ảnh và văn bản."
    },
    "Cosine Similarity": {
      term: "Độ tương đồng Cosine (Cosine Similarity)",
      says: "Độ giống nhau giữa hai vectơ",
      means: "Cosine của góc tạo bởi hai vectơ: dot(a, b) / (||a|| * ||b||). Chỉ quan tâm đến hướng đi của vectơ trong không gian, bỏ qua độ lớn magnitude. Đây là tiêu chuẩn vàng để đo độ tương đồng ngữ nghĩa văn bản."
    },
    "Cross-Entropy": {
      term: "Hàm mất mát Cross-Entropy (Cross-Entropy Loss)",
      says: "Hàm đo lỗi phân loại",
      means: "Thước đo sự khác biệt giữa hai phân phối xác suất. Đối với các mô hình ngôn ngữ, nó tương đương với log xác suất âm của từ tố tiếp theo chính xác."
    },
    "Data Augmentation": {
      term: "Tăng cường dữ liệu (Data Augmentation)",
      says: "Tự tạo thêm nhiều dữ liệu huấn luyện",
      means: "Việc tạo ra các bản sao được sửa đổi nhẹ từ dữ liệu hiện có (như xoay ảnh, thêm nhiễu, viết lại câu) để làm phong phú tập huấn luyện mà không cần thu thập dữ liệu mới."
    },
    "Decoder": {
      term: "Bộ giải mã (Decoder)",
      says: "Phần sinh dữ liệu đầu ra",
      means: "Trong kiến trúc Transformer, bộ giải mã sử dụng cơ chế tự chú ý nhân quả (causal self-attention) được che phủ (masked) để mỗi từ tố chỉ có thể chú ý đến các từ tố đứng trước nó. GPT là mô hình chỉ chứa bộ giải mã (decoder-only)."
    },
    "Diffusion Model": {
      term: "Mô hình khuếch tán (Diffusion Model)",
      says: "AI vẽ tranh từ nhiễu hạt",
      means: "Mô hình được huấn luyện để đảo ngược một quy trình thêm nhiễu dần dần — nó học cách dự đoán và loại bỏ nhiễu khỏi ảnh, từ đó có thể tạo ra hình ảnh sắc nét từ một khung tranh toàn nhiễu ngẫu nhiên ban đầu"
    },
    "DPO (Direct Preference Optimization)": {
      term: "Tối ưu hóa tùy chọn trực tiếp (DPO)",
      says: "Phiên bản RLHF đơn giản hóa",
      means: "Phương pháp huấn luyện căn chỉnh mô hình bỏ qua hoàn toàn việc tạo mô hình phần thưởng (reward model) — nó trực tiếp tối ưu hóa mô hình ngôn ngữ để ưu tiên câu trả lời tốt hơn trong các cặp dữ liệu phản hồi của con người"
    },
    "Dropout": {
      term: "Tắt nơ-ron ngẫu nhiên (Dropout)",
      says: "Tắt bớt nơ-ron khi học để tránh học vẹt",
      means: "Trong quá trình huấn luyện, một tỷ lệ ngẫu nhiên các kích hoạt nơ-ron bị đặt về 0. Điều này buộc mạng nơ-ron không được phụ thuộc vào bất kỳ một nơ-ron cụ thể nào, giúp tăng cường khả năng tổng quát hóa dữ liệu."
    },
    "Eigenvalue": {
      term: "Trị riêng (Eigenvalue)",
      says: "Giá trị đặc trưng ma trận trong thuật toán PCA",
      means: "Đối với một ma trận A, một trị riêng lambda thỏa mãn Av = lambda*v với v là vectơ riêng. Nó cho biết mức độ co giãn không gian của ma trận theo hướng của vectơ riêng đó."
    },
    "Embedding": {
      term: "Vectơ nhúng (Embedding)",
      says: "Phép thuật biến từ ngữ thành dãy số",
      means: "Một phép ánh xạ học được giúp chuyển đổi các đối tượng rời rạc (từ ngữ, hình ảnh, người dùng) thành các vectơ đặc khít trong không gian liên tục, nơi các đối tượng tương tự ngữ nghĩa sẽ nằm gần nhau"
    },
    "Encoder": {
      term: "Bộ mã hóa (Encoder)",
      says: "Phần hiểu dữ liệu đầu vào",
      means: "Trong kiến trúc Transformer, bộ mã hóa sử dụng cơ chế tự chú ý hai chiều (bidirectional self-attention) để mỗi từ tố có thể nhìn thấy và liên kết với mọi từ tố khác. BERT là mô hình chỉ chứa bộ mã hóa (encoder-only)."
    },
    "Epoch": {
      term: "Kỷ nguyên huấn luyện (Epoch)",
      says: "Một lượt duyệt qua toàn bộ dữ liệu",
      means: "Đúng như vậy. Một lượt đi hoàn chỉnh qua mọi ví dụ trong tập dữ liệu huấn luyện. Huấn luyện nhiều kỷ nguyên giúp mô hình học sâu hơn nhưng quá nhiều sẽ dẫn đến quá khớp."
    },
    "Feature": {
      term: "Đặc trưng (Feature)",
      says: "Một cột thuộc tính trong dữ liệu",
      means: "Một thuộc tính đo lường được của thực thể dữ liệu. Trong học máy cổ điển, bạn phải tự trích xuất đặc trưng bằng tay. Trong học sâu, mạng nơ-ron tự động tìm và trích xuất các đặc trưng này từ dữ liệu thô."
    },
    "Few-Shot": {
      term: "Học ít mẫu (Few-Shot Prompting)",
      says: "Cho AI xem vài ví dụ mẫu trước",
      means: "Việc đưa một vài cặp ví dụ (đầu vào - đầu ra) vào trong gợi ý (prompt) trước khi yêu cầu mô hình thực hiện nhiệm vụ, giúp mô hình bắt chước định dạng và tư duy mong muốn một cách nhanh chóng"
    },
    "Fine-tuning": {
      term: "Tinh chỉnh mô hình (Fine-tuning)",
      says: "Dạy lại mô hình trên dữ liệu của riêng bạn",
      means: "Quá trình bắt đầu với các trọng số của một mô hình đã được huấn luyện trước (pre-trained) và tiếp tục huấn luyện nó trên một tập dữ liệu nhỏ hơn, chuyên biệt hơn cho một nhiệm vụ cụ thể"
    },
    "Function Calling": {
      term: "Gọi hàm (Function Calling)",
      says: "AI biết tự dùng các công cụ lập trình",
      means: "Một giao thức có cấu trúc cho phép LLM xuất ra một chuỗi JSON mô tả tên hàm và các tham số truyền vào phù hợp từ định nghĩa có sẵn của lập trình viên, sau đó mã nguồn của bạn sẽ thực thi hàm này và gửi kết quả lại cho mô hình"
    },
    "Guardrails": {
      term: "Rào chắn bảo mật (Guardrails)",
      says: "Bộ lọc an toàn cho AI",
      means: "Các lớp kiểm duyệt đầu vào và đầu ra xung quanh LLM nhằm phát hiện và chặn nội dung độc hại, tấn công chèn gợi ý (prompt injection), rò rỉ dữ liệu cá nhân (PII) hoặc các câu trả lời lạc đề"
    },
    "GPT": {
      term: "Mô hình GPT (Generative Pre-trained Transformer)",
      says: "Trí tuệ nhân tạo ChatGPT",
      means: "Generative Pre-trained Transformer — kiến trúc transformer chỉ chứa bộ giải mã chuyên biệt để dự đoán từ tố tiếp theo, được huấn luyện trước trên kho dữ liệu khổng lồ của internet"
    },
    "GAN (Generative Adversarial Network)": {
      term: "Mạng đối nghịch tạo sinh (GAN)",
      says: "Hai mạng AI đấu tranh với nhau để tiến bộ",
      means: "Một kiến trúc gồm mạng Tạo sinh (Generator) cố gắng tạo ra dữ liệu giả giống thật và mạng Phân biệt (Discriminator) cố gắng phân biệt thật - giả. Cả hai cùng học tập và nâng cấp lẫn nhau qua quá trình đối kháng."
    },
    "Gradient": {
      term: "Gradient / Độ dốc (Gradient)",
      says: "Độ dốc của hàm số",
      means: "Một vectơ chứa toàn bộ các đạo hàm riêng, luôn chỉ về hướng tăng nhanh nhất của hàm số tại điểm đó. Trong học máy, ta đi ngược hướng gradient để tối thiểu hóa sai số."
    },
    "Gradient Descent": {
      term: "Cực tiểu hóa bằng gradient (Gradient Descent)",
      says: "Cách thức AI tự tối ưu hóa",
      means: "Thuật toán tối ưu hóa điều chỉnh các tham số (trọng số) theo hướng giảm nhanh nhất của hàm mất mát, giống như việc đi xuống thung lũng trong một địa hình không gian nhiều chiều"
    },
    "Hyperparameter": {
      term: "Siêu tham số (Hyperparameter)",
      says: "Các nút cài đặt bạn phải điều chỉnh",
      means: "Các thông số được cấu hình trước khi quá trình huấn luyện bắt đầu nhằm kiểm soát toàn bộ cuộc huấn luyện: tốc độ học, kích thước lô, số lượng lớp ẩn. Các giá trị này không được học tự động từ dữ liệu."
    },
    "Hallucination": {
      term: "Ảo giác AI (Hallucination)",
      says: "AI đang nói dối hoặc tự bịa chuyện",
      means: "Mô hình ngôn ngữ tạo ra các văn bản nghe rất trôi chảy và hợp lý nhưng thực chất hoàn toàn sai lệch thực tế và không dựa trên bất kỳ dữ liệu huấn luyện hay ngữ cảnh đầu vào nào"
    },
    "Inference": {
      term: "Suy luận mô hình (Inference)",
      says: "Chạy mô hình AI trong thực tế",
      means: "Sử dụng một mô hình đã được huấn luyện hoàn tất để đưa ra dự đoán trên dữ liệu mới hoàn toàn. Trong giai đoạn này không có bất kỳ sự cập nhật trọng số nào xảy ra."
    },
    "Inductive Bias": {
      term: "Thiên kiến cảm nạp (Inductive Bias)",
      says: "Các giả định cốt lõi của thuật toán",
      means: "Các giả định toán học được tích hợp trực tiếp vào cấu trúc của mô hình. CNN giả định các mẫu không gian cục bộ là quan trọng. RNN giả định thứ tự thời gian là cốt lõi. Transformer giả định mọi thứ đều có thể liên kết với nhau."
    },
    "JAX": {
      term: "Thư viện JAX (Google JAX)",
      says: "Thư viện ML hiệu năng cao của Google",
      means: "Thư viện hỗ trợ tính toán ma trận tương thích NumPy, tích hợp sẵn tính năng tự động tính đạo hàm (grad), biên dịch JIT tăng tốc (jit) và song song hóa phần cứng cực tốt, được DeepMind sử dụng để huấn luyện AlphaFold và Gemini."
    },
    "KV Cache": {
      term: "Bộ nhớ đệm KV (KV Cache)",
      says: "Giúp AI phản hồi nhanh hơn từng chữ một",
      means: "Trong quá trình sinh từ tố tự hồi quy, việc lưu trữ lại ma trận Key và Value của các từ tố trước đó vào bộ nhớ đệm để tránh phải tính toán lại chúng ở mỗi bước sinh chữ tiếp theo. Giúp tăng tốc độ suy luận đáng kể."
    },
    "Latent Space": {
      term: "Không gian ẩn (Latent Space)",
      says: "Biểu diễn cô đọng của dữ liệu",
      means: "Một không gian vectơ có số chiều nén thấp hơn đầu vào thô nhưng giữ lại toàn bộ các cấu trúc và đặc trưng quan trọng nhất của dữ liệu, nơi các đối tượng tương đồng sẽ nằm gần nhau"
    },
    "Learning Rate": {
      term: "Tốc độ học (Learning Rate)",
      says: "AI học nhanh hay chậm",
      means: "Một hệ số tỉ lệ kiểm soát độ lớn của mỗi bước cập nhật trọng số ngược hướng gradient trong quá trình tối ưu hóa. Đây là siêu tham số quan trọng nhất của toàn bộ mạng nơ-ron."
    },
    "LLM (Large Language Model)": {
      term: "Mô hình ngôn ngữ lớn (LLM)",
      says: "Trí tuệ nhân tạo hoặc bộ não AI",
      means: "Một mạng nơ-ron dựa trên kiến trúc Transformer với hàng tỷ tham số, được huấn luyện trên quy mô toàn internet để chuyên biệt thực hiện nhiệm vụ dự đoán từ tố tiếp theo"
    },
    "LoRA (Low-Rank Adaptation)": {
      term: "LoRA (Thích ứng hạng thấp)",
      says: "Phương pháp tinh chỉnh LLM giá rẻ",
      means: "Thay vì cập nhật toàn bộ hàng tỷ trọng số của LLM, kỹ thuật này đóng băng mô hình gốc và chèn vào các ma trận hạng thấp nhỏ gọn song song bên cạnh để huấn luyện, giúp giảm 10-100 lần bộ nhớ GPU cần thiết"
    },
    "Loss Function": {
      term: "Hàm mất mát (Loss Function)",
      says: "Thước đo mức độ đoán sai của AI",
      means: "Một hàm toán học định lượng sự khác biệt giữa kết quả dự đoán của mô hình và nhãn thực tế. Mục tiêu cốt lõi của toàn bộ quá trình huấn luyện mạng nơ-ron là cực tiểu hóa hàm số này."
    },
    "Mixed Precision": {
      term: "Độ chính xác hỗn hợp (Mixed Precision)",
      says: "Mẹo tăng tốc huấn luyện GPU",
      means: "Sử dụng kiểu số thực float16 (nhanh hơn, tốn ít bộ nhớ) cho hầu hết các phép tính truyền xuôi nhưng giữ lại kiểu số thực float32 chính xác cao cho việc tích lũy gradient và cập nhật trọng số."
    },
    "MoE (Mixture of Experts)": {
      term: "Mô hình hỗn hợp chuyên gia (MoE)",
      says: "Chỉ kích hoạt một phần mô hình khi chạy",
      means: "Kiến trúc mô hình chứa nhiều mạng chuyên gia con (Experts) và một bộ định tuyến (Router) thông minh chỉ gửi mỗi từ tố đầu vào đến một vài chuyên gia phù hợp nhất, giúp mô hình cực lớn nhưng chạy rất nhanh"
    },
    "MCP (Model Context Protocol)": {
      term: "Giao thức ngữ cảnh mô hình (MCP)",
      says: "Cách kết nối AI với các phần mềm khác",
      means: "Một giao thức mở tiêu chuẩn hóa (dựa trên JSON-RPC) giúp các ứng dụng AI kết nối an toàn và đồng bộ với các công cụ, cơ sở dữ liệu và tài nguyên bên ngoài thế giới thực"
    },
    "NaN (Not a Number)": {
      term: "Lỗi toán học NaN (Not a Number)",
      says: "Huấn luyện AI bị sụp đổ hoàn toàn",
      means: "Một giá trị số đặc biệt thể hiện một phép tính vô nghĩa (như 0 chia 0, vô cùng trừ vô cùng). Trong huấn luyện AI, lỗi NaN thường do gradient bị bùng nổ, tốc độ học quá lớn hoặc thực hiện phép toán log của 0."
    },
    "Normalization": {
      term: "Chuẩn hóa dữ liệu (Normalization)",
      says: "Đưa dữ liệu về cùng một thang đo",
      means: "Việc căn chỉnh các giá trị kích hoạt về một phân phối chuẩn hóa trung bình 0 và phương sai 1 (như Batch Normalization hay Layer Normalization), giúp ổn định dòng chảy của gradient và tăng tốc độ hội tụ."
    },
    "Overfitting": {
      term: "Hiện tượng quá khớp (Overfitting)",
      says: "Mô hình học vẹt dữ liệu",
      means: "Trạng thái mô hình đạt độ chính xác cực cao trên tập huấn luyện nhưng dự đoán cực kém trên dữ liệu mới chưa từng thấy, do mô hình đã ghi nhớ cả nhiễu và các đặc trưng rác của tập huấn luyện."
    },
    "Optimizer": {
      term: "Bộ tối ưu hóa (Optimizer)",
      says: "Thuật toán cập nhật trọng số học tập",
      means: "Thuật toán toán học chịu trách nhiệm tính toán và thực hiện việc điều chỉnh các trọng số dựa trên các gradient thu được nhằm giảm thiểu hàm mất mát (như SGD, Adam, AdamW)."
    },
    "Parameter": {
      term: "Tham số mô hình (Parameter)",
      says: "Kích thước hay số lượng tham số của mô hình",
      means: "Các giá trị số học được nằm bên trong mô hình (các trọng số weights và thiên kiến biases). Ví dụ, một mô hình 7 tỷ tham số (7B) nghĩa là có 7 tỷ con số thực cần học và lưu giữ."
    },
    "Perplexity": {
      term: "Độ hỗn loạn (Perplexity)",
      says: "Thước đo độ bối rối của mô hình ngôn ngữ",
      means: "Hàm mũ của độ mất mát cross-entropy trung bình. Điểm càng thấp biểu thị mô hình càng tự tin và chính xác. Một độ hỗn loạn bằng 10 nghĩa là tại mỗi bước sinh chữ, mô hình đang phân vân đều giữa 10 lựa chọn."
    },
    "Precision & Recall": {
      term: "Độ chính xác & Độ bao phủ (Precision & Recall)",
      says: "Các chỉ số đo lường hiệu năng",
      means: "Precision đo tỷ lệ dự đoán đúng trong số các mẫu được gắn nhãn dương. Recall đo tỷ lệ tìm thấy mẫu dương trên toàn bộ thực tế. Hai chỉ số này luôn tỉ lệ nghịch và cần cân bằng qua điểm F1 (F1-score)."
    },
    "Prompt Engineering": {
      term: "Kỹ nghệ gợi ý (Prompt Engineering)",
      says: "Nghệ thuật giao tiếp với AI",
      means: "Quá trình thiết kế, thử nghiệm và tối ưu hóa văn bản đầu vào (prompt) — bao gồm khẩu lệnh hệ thống, ví dụ minh họa và kích hoạt chuỗi tư duy — để LLM cho ra kết quả mong muốn một cách ổn định nhất"
    },
    "Prompt Injection": {
      term: "Tấn công chèn gợi ý (Prompt Injection)",
      says: "Hack hệ thống AI bằng từ ngữ",
      means: "Một dạng tấn công bảo mật nơi kẻ gian đưa các câu lệnh độc hại vào đầu vào để ghi đè lên các chỉ dẫn hệ thống ban đầu của lập trình viên, buộc LLM làm những việc bị cấm"
    },
    "QLoRA": {
      term: "QLoRA (LoRA lượng tử hóa)",
      says: "Phiên bản LoRA siêu tiết kiệm bộ nhớ",
      means: "Kỹ thuật lượng tử hóa mô hình gốc xuống định dạng 4-bit (NF4) siêu nhẹ trong khi vẫn thực hiện huấn luyện các bộ điều hợp LoRA 16-bit, giúp chạy và tinh chỉnh LLM lớn trên phần cứng tiêu dùng bình thường"
    },
    "RAG (Retrieval-Augmented Generation)": {
      term: "RAG (Thế hệ tăng cường truy xuất)",
      says: "Kết nối AI với tài liệu nội bộ",
      means: "Một kiến trúc phần mềm truy xuất các tài liệu liên quan nhất từ kho lưu trữ (qua tìm kiếm vectơ ngữ nghĩa), ghép chúng trực tiếp vào ngữ cảnh đầu vào và yêu cầu LLM trả lời dựa trên kho thông tin chuẩn xác đó"
    },
    "RLHF (Reinforcement Learning from Human Feedback)": {
      term: "Học tăng cường từ phản hồi của con người (RLHF)",
      says: "Cách thức dạy AI trở nên thân thiện và hữu ích",
      means: "Một quy trình huấn luyện tinh vi: thu thập đánh giá của con người về các câu trả lời của AI, huấn luyện một mô hình phần thưởng từ đó, rồi dùng thuật toán học tăng cường (như PPO) để điều chỉnh mô hình gốc"
    },
    "Quantization": {
      term: "Lượng tử hóa trọng số (Quantization)",
      says: "Nén mô hình AI cho nhẹ hơn",
      means: "Quá trình ép kiểu dữ liệu của các trọng số từ số thực độ chính xác cao float32 (4 bytes) xuống các kiểu dữ liệu ngắn hơn như int8 (1 byte) hoặc int4 (0.5 bytes), giúp giảm dung lượng RAM/VRAM cực lớn"
    },
    "ReLU": {
      term: "Hàm kích hoạt ReLU",
      says: "Hàm kích hoạt phổ biến nhất",
      means: "Rectified Linear Unit: f(x) = max(0, x). Một hàm số siêu đơn giản giữ nguyên giá trị dương và triệt tiêu giá trị âm. Phổ biến vì tính toán cực nhanh và giúp tránh hiện tượng triệt tiêu gradient."
    },
    "ROUGE": {
      term: "Chỉ số ROUGE (ROUGE Score)",
      says: "Điểm đánh giá tóm tắt văn bản",
      means: "Recall-Oriented Understudy for Gisting Evaluation. Thước đo mức độ trùng khớp giữa văn bản do AI viết ra và bản mẫu do con người soạn thảo dựa trên độ chồng lấn của các cụm từ (n-grams)."
    },
    "Semantic Search": {
      term: "Tìm kiếm ngữ nghĩa (Semantic Search)",
      says: "Tìm kiếm thông minh hiểu ý nghĩa câu chữ",
      means: "Hệ thống tìm kiếm các tài liệu dựa trên ý nghĩa cốt lõi thay vì đối sánh từ khóa thô, hoạt động bằng cách so sánh khoảng cách hình học giữa vectơ nhúng của câu hỏi và vectơ của các tài liệu trong không gian nhúng"
    },
    "Streaming": {
      term: "Truyền phát dữ liệu (Streaming)",
      says: "Hiện chữ lên màn hình từng từ một",
      means: "Giao thức truyền dữ liệu thời gian thực (như Server-Sent Events) giúp máy chủ gửi các từ tố (tokens) ngay khi chúng vừa được tạo ra thay vì phải đợi LLM hoàn thành toàn bộ câu dài dòng mới phản hồi"
    },
    "Self-Attention": {
      term: "Cơ chế tự chú ý (Self-Attention)",
      says: "Cách mô hình tự liên kết các từ trong câu",
      means: "Cơ chế cốt lõi của Transformer, nơi mỗi từ trong câu tính toán mối quan hệ liên kết và mức độ quan trọng đối với tất cả các từ khác trong cùng câu đó để tạo ra các vectơ ngữ cảnh giàu thông tin"
    },
    "SFT (Supervised Fine-Tuning)": {
      term: "Tinh chỉnh có giám sát (SFT)",
      says: "Dạy AI cách trả lời dưới dạng đối thoại hội thoại",
      means: "Bước tinh chỉnh đầu tiên đưa mô hình nền tảng dạng thô (chỉ biết nối tiếp từ ngẫu nhiên) học tập trên tập dữ liệu dạng (Câu hỏi - Câu trả lời mẫu) chuẩn chỉ để biến nó thành một chatbot hoàn thiện"
    },
    "Softmax": {
      term: "Hàm Softmax",
      says: "Chuyển các con số thành tỷ lệ xác suất",
      means: "Phép toán chuyển đổi một vectơ chứa các số thực bất kỳ thành một phân phối xác suất (tất cả các phần tử dương và tổng bằng 1), thường được dùng ở lớp cuối của các bài toán phân loại"
    },
    "Swarm": {
      term: "Hệ đàn tác tử (Swarm)",
      says: "Một bầy AI cùng phối hợp làm việc",
      means: "Hệ thống nhiều tác tử (agents) độc lập cùng chia sẻ trạng thái chung và phối hợp hành động thông qua truyền tin nhắn, giúp giải quyết các nhiệm vụ phức tạp từ các quy tắc hành vi cá thể đơn giản"
    },
    "System Prompt": {
      term: "Khẩu lệnh hệ thống (System Prompt)",
      says: "Các chỉ thị ẩn cốt lõi của AI",
      means: "Khẩu lệnh đặc biệt được chèn vào đầu cuộc hội thoại để thiết lập vĩnh viễn tính cách, quy chuẩn hành vi, rào cản đạo đức và phạm vi kiến thức cho LLM mà người dùng thông thường không thể sửa đổi dễ dàng"
    },
    "Tensor": {
      term: "Ten-xơ (Tensor)",
      says: "Mảng nhiều chiều lưu trữ số",
      means: "Cấu trúc dữ liệu nền tảng nhất của học sâu. Vectơ là ten-xơ 1 chiều, ma trận là ten-xơ 2 chiều, mảng n-chiều là ten-xơ n-chiều. Chúng lưu giữ các phép toán và có thể chạy cực nhanh trên GPU."
    },
    "Token": {
      term: "Từ tố / Token",
      says: "Một từ ngữ",
      means: "Đơn vị cơ bản của văn bản sau khi qua bộ tách từ (tokenizer), thường là một âm tiết hoặc một phần của từ (khoảng 3-4 ký tự tiếng Anh). Ví dụ từ 'unbelievable' có thể bị tách thành 3 token: 'un' + 'believ' + 'able'."
    },
    "Temperature": {
      term: "Tham số nhiệt độ (Temperature)",
      says: "Độ sáng tạo và ngẫu nhiên của AI",
      means: "Một hệ số chia trực tiếp các giá trị logit trước khi đi qua hàm Softmax. Nhiệt độ càng cao thì phân phối xác suất càng phẳng, dẫn đến câu trả lời càng đa dạng và ngẫu nhiên; nhiệt độ bằng 0 giúp câu trả lời hoàn toàn nhất quán."
    },
    "Transfer Learning": {
      term: "Học chuyển giao (Transfer Learning)",
      says: "Tận dụng tri thức cũ cho nhiệm vụ mới",
      means: "Kỹ thuật sử dụng một mô hình mạng nơ-ron đã được huấn luyện rất tốt ở một nhiệm vụ lớn, giữ lại phần lớn cấu trúc (các lớp đặc trưng chung) để làm nền tảng huấn luyện nhanh chóng cho một nhiệm vụ nhỏ hơn"
    },
    "Transformer": {
      term: "Mô hình Transformer (Transformer Architecture)",
      says: "Kiến trúc mạng nơ-ron đứng sau toàn bộ AI hiện đại",
      means: "Kiến trúc mạng nơ-ron xử lý dữ liệu dạng chuỗi dựa hoàn toàn trên cơ chế tự chú ý (Self-Attention) thay vì các vòng lặp tuần tự (RNN/LSTM), cho phép song song hóa cực lớn khi huấn luyện trên GPU"
    },
    "Underfitting": {
      term: "Hiện tượng dưới khớp (Underfitting)",
      says: "AI không thể học được dữ liệu",
      means: "Trạng thái mô hình quá đơn giản hoặc chưa được huấn luyện đủ lâu để có thể nhận diện và mô tả được các mẫu quy luật của tập dữ liệu huấn luyện, khiến sai số trên cả tập học và tập kiểm thử đều rất cao"
    },
    "VAE (Variational Autoencoder)": {
      term: "Bộ tự mã hóa biến phân (VAE)",
      says: "Mô hình mạng tạo sinh cấu trúc",
      means: "Một mạng nơ-ron tự mã hóa học cách ánh xạ dữ liệu đầu vào thành một không gian ẩn được ràng buộc đi theo phân phối chuẩn Gaussian, giúp ta có thể lấy mẫu ngẫu nhiên không gian này để tạo ra các dữ liệu hoàn toàn mới"
    },
    "Vector Database": {
      term: "Cơ sở dữ liệu vector (Vector Database)",
      says: "Bộ nhớ lưu trữ các dãy số AI",
      means: "Hệ cơ sở dữ liệu chuyên biệt được tối ưu hóa cao cho việc lưu trữ, đánh chỉ mục và thực hiện các phép tìm kiếm láng giềng gần nhất (ANN) trên hàng triệu vectơ nhúng cực nhanh, xương sống của các ứng dụng RAG"
    },
    "Weight": {
      term: "Trọng số (Weight)",
      says: "Những gì mô hình AI tích lũy và học được",
      means: "Các hệ số nhân nằm trong ma trận của mỗi lớp mạng nơ-ron. Khi huấn luyện, các trọng số này sẽ được tinh chỉnh liên tục để giảm sai số đầu ra xuống thấp nhất có thể."
    },
    "Weight Decay": {
      term: "Suy giảm trọng số (Weight Decay)",
      says: "Kỹ thuật kiểm soát độ lớn trọng số",
      means: "Kỹ thuật thường xuyên giảm bớt trị tuyệt đối của các trọng số sau mỗi bước tối ưu hóa để ngăn chúng bùng nổ quá lớn, tương đương về mặt toán học với kỹ thuật điều hòa hóa L2 (L2 regularization)."
    },
    "Zero-Shot": {
      term: "Học không mẫu (Zero-Shot Prompting)",
      says: "Yêu cầu AI làm việc ngay không cần ví dụ",
      means: "Việc đưa thẳng nhiệm vụ vào gợi ý và yêu cầu mô hình giải quyết ngay lập tức mà không đưa thêm bất kỳ ví dụ mẫu nào, dựa hoàn toàn vào khả năng tổng quát hóa tri thức trong quá trình tiền huấn luyện khổng lồ của nó"
    }
  };

  // ─── Export translations API globally ────────────────────────────
  window.AIFSTranslations = {
    getLanguage: function () { return currentLang; },
    setLanguage: function (lang) {
      if (lang !== 'en' && lang !== 'vi') lang = 'en';
      currentLang = lang;
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.setAttribute('lang', lang);
      this.localizeDOM();
      this.applyLocalizedData();

      // Trigger custom event for other modules
      var evt = new CustomEvent('aifs:langchange', { detail: { lang: lang } });
      window.dispatchEvent(evt);
    },
    toggleLanguage: function () {
      this.setLanguage(currentLang === 'en' ? 'vi' : 'en');
    },
    translatePhases: function (original) {
      if (currentLang !== 'vi') return original;
      var copy = JSON.parse(JSON.stringify(original));
      for (var i = 0; i < copy.length; i++) {
        var id = copy[i].id;
        if (PHASES_VI[id]) {
          copy[i].name = PHASES_VI[id].name;
          copy[i].desc = PHASES_VI[id].desc;
        }
      }
      return copy;
    },
    translateGlossary: function (original) {
      if (currentLang !== 'vi') return original;
      var copy = JSON.parse(JSON.stringify(original));
      for (var i = 0; i < copy.length; i++) {
        var term = copy[i].term;
        // Search by raw term
        if (GLOSSARY_VI[term]) {
          copy[i].term = GLOSSARY_VI[term].term;
          copy[i].says = GLOSSARY_VI[term].says;
          copy[i].means = GLOSSARY_VI[term].means;
        }
      }
      return copy;
    },
    translateArtifacts: function (original) {
      if (currentLang !== 'vi') return original;
      var copy = JSON.parse(JSON.stringify(original));
      // Localize general metadata descriptions if applicable
      for (var i = 0; i < copy.length; i++) {
        var kind = copy[i].kind;
        if (kind === 'skill') {
          copy[i].name = copy[i].name.replace(/^skill-/, 'Kỹ năng ');
        } else if (kind === 'prompt') {
          copy[i].name = copy[i].name.replace(/^prompt-/, 'Gợi ý ');
        } else if (kind === 'agent') {
          copy[i].name = copy[i].name.replace(/^agent-/, 'Tác tử ');
        } else if (kind === 'mission') {
          copy[i].name = 'Nhiệm vụ: ' + copy[i].name;
        }
      }
      return copy;
    },
    applyLocalizedData: function () {
      if (!window._aifs_original_phases) {
        if (typeof PHASES !== 'undefined') window._aifs_original_phases = JSON.parse(JSON.stringify(PHASES));
        if (typeof GLOSSARY !== 'undefined') window._aifs_original_glossary = JSON.parse(JSON.stringify(GLOSSARY));
        if (typeof ARTIFACTS !== 'undefined') window._aifs_original_artifacts = JSON.parse(JSON.stringify(ARTIFACTS));
      }

      if (currentLang === 'vi') {
        if (window._aifs_original_phases) window.PHASES = this.translatePhases(window._aifs_original_phases);
        if (window._aifs_original_glossary) window.GLOSSARY = this.translateGlossary(window._aifs_original_glossary);
        if (window._aifs_original_artifacts) window.ARTIFACTS = this.translateArtifacts(window._aifs_original_artifacts);
      } else {
        if (window._aifs_original_phases) window.PHASES = JSON.parse(JSON.stringify(window._aifs_original_phases));
        if (window._aifs_original_glossary) window.GLOSSARY = JSON.parse(JSON.stringify(window._aifs_original_glossary));
        if (window._aifs_original_artifacts) window.ARTIFACTS = JSON.parse(JSON.stringify(window._aifs_original_artifacts));
      }
    },
    localizeDOM: function () {
      var dict = UI[currentLang] || UI.en;
      var els = document.querySelectorAll('[data-translate]');
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var key = el.getAttribute('data-translate');
        if (dict[key]) {
          if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
            el.setAttribute('placeholder', dict[key]);
          } else {
            el.textContent = dict[key];
          }
        }
      }

      // Update lang toggle label
      var label = document.getElementById('langText');
      if (label) {
        label.textContent = currentLang === 'en' ? 'VI' : 'EN';
      }
    },
    init: function () {
      document.documentElement.setAttribute('lang', currentLang);
      var self = this;
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
          self.applyLocalizedData();
          self.localizeDOM();
        });
      } else {
        this.applyLocalizedData();
        this.localizeDOM();
      }
    }
  };

  // Eagerly initialize lang attribute on HTML tag to prevent font flash
  window.AIFSTranslations.init();

})();
