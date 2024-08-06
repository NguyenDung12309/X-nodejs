import { UserVerifyStatus } from '@/types/type'

export const API_CONST = {
  register: '/register',
  logout: '/logout',
  login: '/login',
  refreshToken: '/refresh-token',
  verifyEmail: '/verify-email',
  resendVerifyEmail: '/resend-verify-email',
  forgotPassword: '/forgot-password',
  verifyForgotPassword: '/verify-forgot-password',
  me: '/me',
  updateProfile: '/update-profile'
}

const verifyOnly = [UserVerifyStatus.verified]
const verifyAndUnVerify = [UserVerifyStatus.verified, UserVerifyStatus.unverified]

export const apiAccessPermissions = {
  [API_CONST.login]: verifyAndUnVerify,
  [API_CONST.me]: verifyAndUnVerify,
  [API_CONST.updateProfile]: verifyOnly
}
