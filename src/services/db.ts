import { Collection, Db, MongoClient } from 'mongodb'
import 'dotenv/config'
import { UserSchema } from '@/models/schemas/user'
import { DatabaseName } from '@/constraints/database'
import { RefreshTokenSchema } from '@/models/schemas/refreshToken'
import { FollowSchema } from '@/models/schemas/follow'

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@x.grxx64n.mongodb.net/?retryWrites=true&w=majority&appName=X`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(`${process.env.DB_NAME}`)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      // eslint-disable-next-line no-console
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)

      throw error
    }
  }

  get users(): Collection<UserSchema> {
    return this.db.collection(DatabaseName.USERS)
  }

  get refreshToken(): Collection<RefreshTokenSchema> {
    return this.db.collection(DatabaseName.REFRESH_TOKEN)
  }

  get follow(): Collection<FollowSchema> {
    return this.db.collection(DatabaseName.FOLLOW)
  }
}

export const databaseService = new DatabaseService()
