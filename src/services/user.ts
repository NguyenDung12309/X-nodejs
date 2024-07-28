import { Collection, Db } from "mongodb";
import { databaseService } from "./db.js";
import { UserSchema } from "@/models/schemas/user.js";
import { DatabaseName } from "@/constraints/database.js";
import { reqRegister } from "@/models/dto/register.js";
import { __ } from "i18n";

class UserService {

  createUser(payload: reqRegister) {
    return databaseService.users.insertOne(new UserSchema({
      ...payload,
      date_of_birth: new Date(payload.date_of_birth)
    }));
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