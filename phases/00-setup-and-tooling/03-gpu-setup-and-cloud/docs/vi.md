# Cài đặt GPU & Đám mây

> Huấn luyện trên CPU là tốt cho việc học tập. Huấn luyện thực tế cần có GPU.

**Thể loại:** Xây dựng (Build)
**Ngôn ngữ:** Python
**Điều kiện tiên quyết:** Giai đoạn 0, Bài học 01
**Thời gian:** ~45 phút

## Mục tiêu học tập

- Xác minh tính khả dụng của GPU cục bộ bằng cách sử dụng `nvidia-smi` và API CUDA của PyTorch
- Cấu hình Google Colab với GPU T4 để thực hiện các thử nghiệm miễn phí trên đám mây
- Đánh giá hiệu năng nhân ma trận trên CPU so với GPU và đo lường mức độ tăng tốc
- Ước tính mô hình lớn nhất có thể vừa với VRAM của bạn bằng quy tắc ngón tay cái fp16

## Vấn đề thực tế

Hầu hết các bài học từ giai đoạn 1-3 chạy tốt trên CPU. Nhưng một khi bạn bắt đầu huấn luyện mạng CNN, transformer, hoặc LLM (giai đoạn 4 trở lên), bạn cần tăng tốc GPU. Một lượt chạy huấn luyện mất 8 giờ trên CPU chỉ mất 10 phút trên GPU.

Bạn có ba lựa chọn: GPU cục bộ, GPU đám mây, hoặc Google Colab (miễn phí).

## Khái niệm cốt lõi

```
Các lựa chọn của bạn:

1. GPU NVIDIA Cục bộ
   Chi phí: $0 (bạn đã có sẵn)
   Cài đặt: Cài đặt CUDA + cuDNN
   Phù hợp nhất cho: Sử dụng thường xuyên, tập dữ liệu lớn

2. Google Colab (gói miễn phí)
   Chi phí: $0
   Cài đặt: Không cần
   Phù hợp nhất cho: Thử nghiệm nhanh, không có GPU ở nhà

3. GPU đám mây (Lambda, RunPod, Vast.ai)
   Chi phí: $0.20-2.00/giờ
   Cài đặt: SSH + cài đặt
   Phù hợp nhất cho: Huấn luyện nghiêm túc, mô hình lớn
```

## Thực hiện nó (Build It)

### Lựa chọn 1: GPU NVIDIA Cục bộ

Kiểm tra xem bạn có sẵn GPU hay không:

```bash
nvidia-smi
```

Cài đặt PyTorch với CUDA:

```python
import torch

print(f"CUDA available: {torch.cuda.is_available()}")
print(f"CUDA version: {torch.version.cuda}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"Memory: {torch.cuda.get_device_properties(0).total_memory / 1e9:.1f} GB")
```

### Lựa chọn 2: Google Colab

1. Truy cập [colab.research.google.com](https://colab.research.google.com)
2. Runtime > Change runtime type > T4 GPU
3. Chạy `!nvidia-smi` để xác minh

Tải trực tiếp các notebook từ khóa học này lên Colab.

### Lựa chọn 3: GPU đám mây

Đối với Lambda Labs, RunPod, hoặc Vast.ai:

```bash
ssh user@your-gpu-instance

pip install torch torchvision torchaudio
python -c "import torch; print(torch.cuda.get_device_name(0))"
```

### Không có GPU? Không vấn đề gì.

Hầu hết các bài học đều hoạt động trên CPU. Những bài học cần GPU sẽ được ghi rõ và đính kèm liên kết Colab.

```python
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using: {device}")
```

## Xây dựng: Đánh giá hiệu năng GPU vs CPU

```python
import torch
import time

size = 5000

a_cpu = torch.randn(size, size)
b_cpu = torch.randn(size, size)

start = time.time()
c_cpu = a_cpu @ b_cpu
cpu_time = time.time() - start
print(f"CPU: {cpu_time:.3f}s")

if torch.cuda.is_available():
    a_gpu = a_cpu.to("cuda")
    b_gpu = b_cpu.to("cuda")

    torch.cuda.synchronize()
    start = time.time()
    c_gpu = a_gpu @ b_gpu
    torch.cuda.synchronize()
    gpu_time = time.time() - start
    print(f"GPU: {gpu_time:.3f}s")
    print(f"Speedup: {cpu_time / gpu_time:.0f}x")
```

## Bài tập

1. Chạy chương trình đánh giá hiệu năng ở trên và so sánh thời gian của CPU vs GPU
2. Nếu bạn không có GPU, hãy chạy nó trên Google Colab và so sánh
3. Kiểm tra xem bạn có bao nhiêu bộ nhớ GPU và ước tính mô hình lớn nhất bạn có thể nạp vừa (quy tắc ngón tay cái: 2 byte cho mỗi tham số đối với định dạng fp16)

## Các thuật ngữ chính

| Thuật ngữ | Người ta thường nói gì | Ý nghĩa thực tế |
|-----------|------------------------|-----------------|
| CUDA | "Lập trình GPU" | Nền tảng tính toán song song của NVIDIA cho phép bạn chạy mã nguồn trên GPU |
| VRAM | "Bộ nhớ GPU" | RAM video trên GPU, độc lập với RAM hệ thống. Giới hạn kích thước mô hình. |
| fp16 | "Độ chính xác một nửa" | Dạng số thực dấu phẩy động 16-bit, sử dụng một nửa bộ nhớ so với fp32 với mức suy giảm độ chính xác tối thiểu |
| Tensor Core | "Phần cứng ma trận nhanh" | Các lõi GPU chuyên dụng cho phép nhân ma trận, nhanh hơn từ 4-8 lần so với các lõi thông thường |
