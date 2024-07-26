Để thiết kế cơ sở dữ liệu MongoDB hiệu quả, chúng ta cần cân nhắc các yếu tố như tính chất của ứng dụng, hiệu suất, mở rộng và cách truy cập dữ liệu. Dưới đây là một số quy tắc và ví dụ giúp bạn định hình schema MongoDB phù hợp:

### Cách tiếp cận thiết kế cơ sở dữ liệu: Relational vs MongoDB

Trong MongoDB, không nên áp dụng mô hình thiết kế cơ sở dữ liệu quan hệ một cách trực tiếp. Thay vào đó, hãy tận dụng các lợi thế của MongoDB như các document có thể chứa các array và object.

### Thiết kế cơ sở dữ liệu quan hệ

Trong một hệ thống quan hệ, dữ liệu thường được phân tách thành các bảng để tránh dư thừa và có thể kết nối (JOIN) thông qua khóa ngoại. Ví dụ:

**SQL Schema:**

- Bảng Users: chứa thông tin người dùng.
- Bảng Professions và Cars: chứa thông tin nghề nghiệp và xe hơi của người dùng, sử dụng khóa ngoại user_id để kết nối với Users.

### Thiết kế cơ sở dữ liệu MongoDB

Trái lại với SQL, MongoDB cho phép chúng ta nhúng dữ liệu vào các document hoặc tham chiếu tới các collection khác thông qua $lookup.

**Ví dụ MongoDB:**

```json
{
  "first_name": "Paul",
  "surname": "Miller",
  "cell": "447557505611",
  "city": "London",
  "location": [45.123, 47.232],
  "profession": ["banking", "finance", "trader"],
  "cars": [
    { "model": "Bentley", "year": 1973 },
    { "model": "Rolls Royce", "year": 1965 }
  ]
}
```

### Nhúng vs Tham chiếu

Khi thiết kế schema MongoDB, chúng ta cần cân nhắc sử dụng nhúng hoặc tham chiếu dựa trên yêu cầu của ứng dụng:

- **Nhúng:**

  - Ưu điểm: Truy xuất tất cả thông tin liên quan trong một query, update dữ liệu liên quan trong một query.
  - Hạn chế: Dữ liệu lớn có thể làm document nặng và vượt quá giới hạn 16 MB của MongoDB.

- **Tham chiếu:**
  - Ưu điểm: Giảm kích thước document, tránh vượt quá giới hạn 16 MB.
  - Hạn chế: Cần nhiều query hoặc sử dụng $lookup để truy xuất dữ liệu từ các collection khác.

### Các loại quan hệ

1. **1 - 1 (One-to-One)**: Ví dụ, một người dùng có một email duy nhất.
2. **1 - ít (One-to-Few)**: Ví dụ, một người dùng có vài địa chỉ nhận hàng.

3. **1 - nhiều (One-to-Many)**: Ví dụ, một người dùng có nhiều xe hơi.

4. **1 - rất nhiều (One-to-Many)**: Ví dụ, một host có hàng triệu log message.

5. **Nhiều - Nhiều (Many-to-Many)**: Ví dụ, mỗi user có thể có nhiều task và mỗi task có thể được giao cho nhiều user.

### Các quy tắc khi thiết kế cơ sở dữ liệu bằng MongoDB

1. **Ưu tiên nhúng trừ khi cần tham chiếu rõ ràng vào một collection riêng.**

2. **Khi cần truy cập vào một đối tượng riêng biệt, sử dụng tham chiếu.**

3. **Tránh sử dụng JOINs/lookups nếu có thể, nhưng sẵn sàng áp dụng nếu giúp tối ưu hóa schema.**

4. **Tránh phát triển array với số lượng lớn item trong một document.**

5. **Cấu trúc dữ liệu phải phù hợp với cách ứng dụng truy vấn và cập nhật dữ liệu.**
