import jwt from 'jsonwebtoken';
import { Collection, Db } from "mongodb";
import { databaseService } from "./db.js";
import { UserSchema } from "@/models/schemas/user.js";
import { reqRegister } from "@/models/dto/register.js";
import { __ } from "i18n";
import { sha256 } from "@/helpers/crypto.js";
import { signToken } from '@/helpers/jwt.js';
import { TokenType } from '@/types/type.js';
import { accessTokenExpireTime, refreshTokenExpireTime } from '@/constraints/database.js';

class UserService {
  signAccessToken(user_Id: string) {
    return signToken({
      payload: { user_Id, tokenType: TokenType.AccessToken },
      options: {
        expiresIn: accessTokenExpireTime
      }
    })
  }

  signRefreshToken(user_Id: string) {
    return signToken({
      payload: { user_Id, tokenType: TokenType.RefreshToken },
      options: {
        expiresIn: refreshTokenExpireTime
      }
    })
  }

  async createUser(payload: reqRegister) {
    try {
      const result = await databaseService.users.insertOne(new UserSchema({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: sha256(payload.password)
      }));

      const user_id = result.insertedId.toString()

      const [accessToken, refreshToken] = await Promise.all([
        userService.signAccessToken(user_id),
        userService.signRefreshToken(user_id)
      ])

      return {
        accessToken,
        refreshToken
      }

    } catch (error) {
      console.log(error);

    }
  }

  async checkEmailExists(email: string, { message }: { message: any }) {
    try {
      const isExistEmail = await databaseService.users.findOne({ email })

      if (isExistEmail) {
        return message({
          external: __('emailExist'),
        });
      }

      return true;
    } catch (error) {
      return message({
        external: __('500'),
      });
    }
  }
}

export const userService = new UserService()