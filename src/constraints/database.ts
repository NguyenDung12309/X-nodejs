export enum DatabaseName {
  USERS = 'users',
  REFRESH_TOKEN = 'refreshToken',
  FOLLOW = 'follow',
  TWEET = 'tweet',
  HASHTAG = 'hashtag',
  BOOKMARK = 'bookmark'
}

export const accessTokenExpireTime = '15m'

export const emailExpireTime = '30m'

export const forgotPasswordExpireTime = '7d'

export const refreshTokenExpireTime = '100d'
