import { UserVerifyStatus } from '@/types/type'

export const USER_API_CONST = {
  meUpdate: '/me-update',
  me: '/me',
  resendVerifyEmail: '/resend-verify-email',
  follow: '/follow',
  uploadMedia: '/upload-media'
}

export const API_CONST = {
  register: '/register',
  logout: '/logout',
  login: '/login',
  refreshToken: '/refresh-token',
  verifyEmail: '/verify-email',
  forgotPassword: '/forgot-password',
  verifyForgotPassword: '/verify-forgot-password',
  userProfile: '/user-profile/',
  resetPassword: '/reset-password',
  ...USER_API_CONST
}

const verifyOnly = [UserVerifyStatus.verified]
const verifyAndUnVerify = [UserVerifyStatus.verified, UserVerifyStatus.unverified]

export const apiAccessPermissions = {
  [API_CONST.login]: verifyAndUnVerify,
  [API_CONST.me]: verifyAndUnVerify,
  [API_CONST.meUpdate]: verifyOnly,
  [API_CONST.follow]: verifyOnly,
  [API_CONST.uploadMedia]: verifyOnly
}
