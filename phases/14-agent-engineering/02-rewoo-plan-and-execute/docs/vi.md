# ReWOO và Kế hoạch-và-Thực thi: Phân tách việc Lập kế hoạch

> ReAct đan xen giữa suy nghĩ và hành động trong một luồng. ReWOO tách biệt chúng: đưa ra một kế hoạch lớn ngay từ đầu, sau đó mới thực thi. Tiết kiệm gấp 5 lần lượng từ tố, tăng +4% độ chính xác trên HotpotQA, và bạn có thể tinh lọc bộ lập kế hoạch vào một mô hình 7B. Mô hình Kế hoạch-và-Thực thi (Plan-and-Execute) đã tổng quát hóa quy trình này; Kế hoạch-và-Hành động (Plan-and-Act) đã nâng quy mô của nó lên cho việc điều hướng web.

**Thể loại:** Xây dựng (Build)
**Ngôn ngữ:** Python (stdlib)
**Điều kiện tiên quyết:** Giai đoạn 14 · 01 (Vòng lặp Tác tử)
**Thời gian:** ~60 phút

## Mục tiêu học tập

- Giải thích lý do tại sao sự phân chia Bộ lập kế hoạch / Công nhân / Bộ giải quyết của ReWOO giúp tiết kiệm từ tố và cải thiện tính mạnh mẽ so với vòng lặp đan xen của ReAct.
- Triển khai một DAG kế hoạch, một bộ thực thi theo thứ tự phụ thuộc, và một bộ giải quyết tổng hợp đầu ra của các công nhân - tất cả chỉ sử dụng thư viện tiêu chuẩn (stdlib).
- Quyết định khi nào một tác vụ nên chạy theo mô hình lập-kế-hoạch-rồi-thực-thi so với ReAct đan xen, sử dụng khung "năm mô hình luồng công việc" năm 2026 (Anthropic).
- Nhận biết khi nào phương pháp dữ liệu kế hoạch tổng hợp của Kế hoạch-và-Hành động là cần thiết cho các tác vụ điều hướng web hoặc di động có chu kỳ dài.

## Vấn đề thực tế

Vòng lặp đan xen suy nghĩ-hành động-quan sát của ReAct rất đơn giản và linh hoạt, nhưng mỗi lệnh gọi công cụ đều phải mang theo toàn bộ ngữ cảnh trước đó - bao gồm cả mọi suy nghĩ trước đó. Lượng sử dụng từ tố tăng theo hàm số mũ với độ sâu của vòng lặp. Tệ hơn nữa: khi một công cụ bị lỗi ở giữa vòng lặp, mô hình phải tự thiết lập lại toàn bộ kế hoạch từ quan sát lỗi đó.

ReWOO (Xu và các cộng sự, arXiv:2305.18323, tháng 5 năm 2023) đã nhận thấy điều này và đưa ra một giải pháp: lập kế hoạch cho toàn bộ quy trình ngay từ đầu, thu thập bằng chứng song song, và tổng hợp câu trả lời ở giai đoạn cuối. Chỉ cần một lượt gọi LLM để lập kế hoạch, N lượt gọi công cụ để lấy bằng chứng (có thể chạy song song), và một lượt gọi LLM để giải quyết. Điều này đánh đổi một chút tính linh hoạt (do kế hoạch là tĩnh) để lấy hiệu quả sử dụng từ tố tốt hơn nhiều và các hình thái lỗi rõ ràng hơn.

## Khái niệm cốt lõi

### Ba vai trò chính

```
Planner (Bộ lập kế hoạch):    câu_hỏi_người_dùng -> [plan_dag]
Workers (Công nhân):          [plan_dag]         -> [bằng_chứng]    (lệnh gọi công cụ, có thể song song)
Solver (Bộ giải quyết):       câu_hỏi_người_dùng, plan_dag, bằng_chứng -> câu_trả_lời_cuối_cùng
```

Bộ lập kế hoạch tạo ra một Đồ thị có hướng không chu trình (DAG). Mỗi nút trong đồ thị chỉ định một công cụ, các đối số của nó, và nút nào trước đó mà nó phụ thuộc vào (sử dụng các tham chiếu như `#E1`, `#E2`). Các công nhân thực thi các nút theo thứ tự sắp xếp tô-pô. Bộ giải quyết sẽ liên kết mọi thứ lại với nhau.

### Tại sao tiết kiệm gấp 5 lần từ tố

ReAct tăng độ dài gợi ý (prompt length) tuyến tính theo số bước. Tại bước 10, gợi ý chứa suy nghĩ 1 cộng với hành động 1 cộng với quan sát 1 cộng với suy nghĩ 2 cộng với hành động 2 cộng với quan sát 2, v.v. Mỗi bước trung gian cũng bao gồm cả gợi ý gốc một cách dư thừa.

ReWOO chỉ trả phí cho một gợi ý của bộ lập kế hoạch (lớn), N gợi ý nhỏ cho công nhân (mỗi gợi ý chỉ là lệnh gọi công cụ, không có chuỗi suy nghĩ), và một gợi ý cho bộ giải quyết. Trên tập HotpotQA, bài báo đo lường được lượng từ tố ít hơn ~5 lần trong khi đạt độ chính xác tuyệt đối cao hơn +4 điểm.

### Tại sao nó mạnh mẽ hơn

Nếu công nhân thứ 3 gặp lỗi trong ReAct, vòng lặp phải tự suy luận ra từ lỗi đó ở giữa luồng. Trong ReWOO, công nhân thứ 3 chỉ cần trả về một chuỗi thông báo lỗi; bộ giải quyết nhìn thấy nó trong ngữ cảnh cùng với kế hoạch gốc và có thể hạ cấp hoạt động một cách nhẹ nhàng. Việc khu trú lỗi được thực hiện trên từng nút, chứ không phải trên từng bước.

### Tinh lọc bộ lập kế hoạch (Planner distillation)

Kết quả thứ hai của bài báo: bởi vì bộ lập kế hoạch không nhìn thấy các quan sát thực tế từ môi trường, bạn có thể tinh chỉnh (fine-tune) một mô hình 7B dựa trên đầu ra của bộ lập kế hoạch từ một mô hình giáo viên 175B. Mô hình nhỏ đảm nhận việc lập kế hoạch; mô hình lớn không cần thiết khi suy luận. Đây hiện là tiêu chuẩn - nhiều tác tử (agent) sản xuất năm 2026 sử dụng một bộ lập kế hoạch nhỏ và một bộ thực thi lớn hoặc ngược lại.

### Kế hoạch-và-Thực thi (Plan-and-Execute - LangChain, 2023)

Đội ngũ của LangChain vào tháng 8 năm 2023 đã tổng quát hóa ReWOO thành một tên gọi mô hình: Kế hoạch-và-Thực thi. Bộ lập kế hoạch ban đầu phát ra một danh sách các bước, bộ thực thi chạy từng bước, và một bộ lập lại kế hoạch (replanner) tùy chọn có thể sửa đổi kế hoạch sau khi quan sát kết quả. Mô hình này gần với ReAct hơn ReWOO (bộ lập lại kế hoạch đưa các quan sát trở lại quá trình lập kế hoạch) nhưng vẫn bảo toàn được sự tiết kiệm từ tố.

### Kế hoạch-và-Hành động (Plan-and-Act - Erdogan và các cộng sự, arXiv:2503.09572, ICML 2025)

Kế hoạch-và-Hành động mở rộng mô hình này cho các tác tử (agent) trên web và di động có chu kỳ dài. Đóng góp chính là dữ liệu kế hoạch tổng hợp: một trình tạo vết chạy được dán nhãn tạo ra dữ liệu huấn luyện nơi kế hoạch được hiển thị rõ ràng. Điều này được sử dụng để tinh chỉnh các mô hình lập kế hoạch có thể tiếp tục hoạt động vượt quá 30-50 bước trên các tác vụ giống như WebArena, nơi một vết chạy ReAct đơn lẻ sẽ mất đi tính mạch lạc.

### Khi nào nên chọn mô hình nào

| Mô hình | Khi nào |
|---------|---------|
| ReAct | Các tác vụ ngắn, môi trường chưa biết, cần xử lý ngoại lệ phản ứng nhanh |
| ReWOO | Các tác vụ có cấu trúc với các công cụ đã biết rõ, nhạy cảm với từ tố, bằng chứng có thể song song hóa |
| Kế hoạch-và-Thực thi | Giống như ReWOO nhưng có lập lại kế hoạch sau khi thực thi một phần |
| Kế hoạch-và-Hành động | Chu kỳ dài (>30 bước), web/di động/sử dụng máy tính |
| Cây suy nghĩ (Tree of Thoughts) | Việc tìm kiếm xứng đáng để chi trả (Bài học 04) |

Hướng dẫn của Anthropic vào tháng 12 năm 2024: hãy bắt đầu với phương án đơn giản nhất. Nếu tác vụ chỉ là một lệnh gọi công cụ cộng với một bản tóm tắt, đừng xây dựng ReWOO. Nếu tác vụ là một nhiệm vụ nghiên cứu dài 40 bước, đừng chỉ thực hiện duy nhất ReAct.

## Xây dựng nó (Build It)

`code/main.py` triển khai một phiên bản ReWOO giả lập:

- `Planner` - một chính sách được lập kịch bản phát ra một DAG kế hoạch từ gợi ý.
- `Worker` - điều phối lệnh gọi công cụ của từng nút thông qua bộ đăng ký công cụ.
- `Solver` - phần tổng hợp được lập kịch bản để đọc bằng chứng và đưa ra câu trả lời cuối cùng.
- Giải quyết phụ thuộc - các tham chiếu như `#E1` được thay thế bằng đầu ra của các công nhân trước đó.

Bản demo trả lời câu hỏi "Dân số của thủ đô nước Pháp là bao nhiêu, làm tròn đến hàng triệu?" sử dụng một kế hoạch hai bước: (1) tra cứu thủ đô, (2) tra cứu dân số, sau đó giải quyết.

Chạy thử:

```
python3 code/main.py
```

Vết chạy hiển thị toàn bộ kế hoạch trước tiên, sau đó đến kết quả của công nhân, rồi đến phần tổng hợp của bộ giải quyết. Hãy so sánh lượng từ tố (chúng tôi in ra số lượng ký tự ước tính) với một lượt chạy kiểu đan xen của ReAct - ReWOO chiến thắng trên loại tác vụ có cấu trúc này.

## Vận dụng nó (Use It)

LangGraph cung cấp Kế hoạch-và-Thực thi dưới dạng một công thức có sẵn (`create_react_agent` cho ReAct, các đồ thị tùy chỉnh cho kế hoạch-thực thi). Các Luồng (Flows) của CrewAI mã hóa trực tiếp mô hình này: bạn xác định các tác vụ ngay từ đầu và DAG Luồng sẽ thực thi chúng. Cách tiếp cận dữ liệu tổng hợp của Kế hoạch-và-Hành động hiện vẫn chủ yếu là nghiên cứu; mô hình thời gian chạy (DAG kế hoạch rõ ràng) được triển khai trong thực tế thông qua LangGraph và các Luồng của CrewAI.

## Sản phẩm (Ship It)

`outputs/skill-rewoo-planner.md` tạo ra một DAG kế hoạch ReWOO từ yêu cầu của người dùng, dựa trên một danh mục công cụ có sẵn. Nó xác thực kế hoạch (không có chu trình, mọi tham chiếu được giải quyết, mọi công cụ đều tồn tại) trước khi bàn giao cho bộ thực thi.

## Bài tập

1. Song song hóa việc thực thi của các công nhân cho các nút kế hoạch độc lập. Điều này giúp ích gì cho bạn trên một DAG gồm 6 nút với 2 nhóm song song?
2. Thêm một nút lập lại kế hoạch (replanner) để kích hoạt nếu bất kỳ công nhân nào trả về lỗi. Thay đổi nhỏ nhất nào đối với ReWOO sẽ biến nó thành Kế hoạch-và-Thực thi?
3. Thay thế `Planner` bằng một mô hình nhỏ (lớp 7B) và giữ `Solver` trên một mô hình tiên tiến. So sánh chất lượng đầu-cuối - điểm phân tách nào bị lỗi?
4. Đọc Mục 4 của bài báo ReWOO về tinh lọc bộ lập kế hoạch. Tái hiện lại kết quả 175B -> 7B về mặt khái niệm: bạn cần dữ liệu huấn luyện nào, và làm thế nào để bạn chấm điểm chất lượng kế hoạch?
5. Chuyển đổi mô hình giả lập sang hình thái vết chạy của Kế hoạch-và-Hành động: kế hoạch là một chuỗi tuần tự, không phải là một DAG. Những đánh đổi nào sẽ thay đổi?

## Các thuật ngữ chính

| Thuật ngữ | Người ta thường nói gì | Ý nghĩa thực tế |
|-----------|------------------------|-----------------|
| ReWOO | "Suy luận không có quan sát" | Lập kế hoạch, sau đó thu thập bằng chứng song song, rồi giải quyết - không có quan sát thực tế trong gợi ý lập kế hoạch |
| Kế hoạch-và-Thực thi | "Mô hình lập kế hoạch-thực thi của LangChain" | ReWOO bổ sung một nút lập lại kế hoạch tùy chọn sau khi thực thi |
| Kế hoạch-và-Hành động | "Kế hoạch-thực thi quy mô lớn" | Phân tách rõ ràng bộ lập kế hoạch/bộ thực thi với dữ liệu huấn luyện kế hoạch tổng hợp cho các tác vụ chu kỳ dài |
| Tham chiếu bằng chứng | "#E1, #E2, ..." | Trình giữ chỗ của nút kế hoạch được thay thế bằng đầu ra của công nhân trước đó tại thời điểm điều phối |
| Tinh lọc bộ lập kế hoạch | "Lập kế hoạch nhỏ, thực thi lớn" | Tinh chỉnh một mô hình nhỏ trên các vết chạy của bộ lập kế hoạch từ một mô hình lớn |
| Hiệu quả từ tố | "Ít lượt khứ hồi hơn" | Tiết kiệm từ tố gấp 5 lần trên HotpotQA so với ReAct trong bài báo |
| Bộ thực thi DAG | "Bộ điều phối tô-pô" | Chạy các nút kế hoạch theo thứ tự phụ thuộc; song song hóa ở mỗi cấp độ |
