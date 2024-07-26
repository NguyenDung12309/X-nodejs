## users

- Người dùng đăng ký nhập `name`, `email`, `day_of_birth`, `password`.
- Sau khi đăng ký sẽ có email đính kèm `email_verify_token` để xác thực email. Mỗi user chỉ có 1 `email_verify_token` duy nhất, nếu re-send thì override cái cũ. Nếu user đã xác thực thì set `''`
- Tương tự chức năng quên mật khẩu thì gửi mail về để reset password, sử dụng `forgot_password_token` để xác thực. Nếu user đã xác thực thì set `''`
- `verify` để xác thực status của account. Chưa xác thực mail, đã xác thực, bị khóa, tích xanh. Kiểu enum
- User có thể update các thông tin sau vào profile: `bio`, `location`, `website`, `username`, `avatar`, `cover_photo`.
- sử dụng field `created_at`, `updated_at` để biết thời gian tạo và cập nhật info. Kiểu Date

```ts
enum UserVerifyStatus {
  unverified,
  verified,
  banned
}

interface User {
  _id: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at: Date
  updated_at: Date
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  bio: string //optional
  location: string //optional
  website: string //optional
  username: string //optional
  avatar: string //optional
  cover_photo: string //optional
}
```

## refresh_tokens

- Hệ thống dùng JWT để xác thực người dùng. Mỗi lần user login success thì sẽ tạo ra 1 JWT access token và 1 refresh token.
- JWT access token thì không cần lưu vào database
- refresh token thì lưu vào database để tăng tính bảo mật
- Một user có nhiều refresh token nên tạo ra 1 collection riêng để lưu refresh token

```ts
interface RefreshToken {
  _id: ObjectId
  token: string
  created_at: Date
  user_id: ObjectId
}
```
