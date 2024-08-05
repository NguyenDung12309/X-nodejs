import { UserSchema } from '@/models/schemas/user'

export interface UserDto extends Omit<UserSchema, 'password' | 'email_verify_token' | 'forgot_password_token'> {}
