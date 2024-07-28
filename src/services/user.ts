import { Collection, Db } from "mongodb";
import { databaseService } from "./db.js";
import { UserSchema } from "@/models/schemas/user.js";
import { DatabaseName } from "@/constraints/database.js";
import { reqRegister } from "@/models/api/register.js";

class UserService {
  private db: Db

  constructor() {
    this.db = databaseService.database
  }

  get users(): Collection<UserSchema> {
    return this.db.collection(DatabaseName.USERS)
  }

  createUser(payload: reqRegister) {
    return this.users.insertOne(new UserSchema(payload));
  }
}

export const userService = new UserService()