## users

- Người dùng đăng ký nhập `name`, `email`, `day_of_birth`, `password`.
- Sau khi đăng ký sẽ có email đính kèm `email_verify_token` để xác thực email. Mỗi user chỉ có 1 `email_verify_token` duy nhất, nếu re-send thì override cái cũ
- Tương tự chức năng quên mật khẩu thì gửi mail về để reset password, sử dụng `forgot_password_token` để xác thực
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

## followers

- Một người dùng có thể follow nhiều user. Nếu dùng 1 mảng `followings` chứa id trong collection `users` thì sẽ không tối ưu, khi muốn tìm kiếm ai đang follow user A thì lại khó. Nê tạo ra 1 collection riêng để lưu mối quan hệ follow giữa các user

```ts
interface followers {
  _id: ObjectId
  user_id: ObjectId
  followed_user_id: ObjectId
  created_at: Date
}
```

## tweets

- tweet có thể chứa text, hashtags, mentions, ảnh, video
- tweet có thể hiển thị cho everyone hoặc twitter circle
- tweet có thể quy định người replay (everyone, follower, mention)
- tweet có thể nested tweet. tạo thêm 1 `parent_id` để biết tweet này là tweet con của ai. Nếu `null` thì là tweet gốc
- Nếu là tweet bình thường thì sẽ có `content` là string. Nếu là retweet thì không có `content` mà chỉ có `parent_id`
- `audience` đại diện tính riêng tư của tweet. Tweet có thể public cho tất cả mọi người cùng xem `Everyone` hoặc chỉ có 1 nhóm nhất đinh `TwitterCircle`
- `type` đại diện cho loại tweet: tweet, retweet, quote tweet
- `hashtag` là mảng chứa ObjectId của các hashTag.
- `mentions` là mảng chứa ObjectId của các user được mention
- `medias` là mảng chứa ObjectId của media (image, video).
- Sử dụng lượt view để phân tích lượt tiếp cận của tweet. Lượt view chia làm 2 lại `guest_view` là số lượng lượt xem từ user chưa login và `user_views` là user login.

```ts
interface tweet {
  _id: ObjectId
  user_id: ObjectId
  content: string
  audience: TweetAudience //những người có thể thấy tweet
  parent_id: ObjectId | null
  hashtags: ObjectId[]
  mentions: ObjectId[]
  medias: Media[]
  guest_views: number
  user_views: number
  created_at: Date
  updated_at: Date
}
```

```ts
interface Media {
  url: string,
  type: MediaType
}

enum MediaType {
  Image,
  Video
}

enum TweetAudience {
  Everyone,
  TwitterCircle
}

enum TweetType {
  Tweet,
  Retweet,
  Comment,với
  QuoteTweet
}
```

## Bookmarks

- Bookmarks các tweet lại, mỗi user không giới hạn số lượng bookmark.

```ts
interface Bookmark {
  _id: ObjectId
  user_id: ObjectId
  tweet_id: ObjectId
  created_at: Date
}
```

## Likes

```ts
interface Like {
  _id: ObjectId
  user_id: ObjectId
  tweet_id: ObjectId
  created_at: Date
}
```

## Hashtag

```ts
interface Hashtag {
  _id: ObjectId
  name: string
  created_at: Date
}
```
