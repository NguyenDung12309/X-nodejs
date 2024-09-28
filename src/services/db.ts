import { Collection, Db, MongoClient } from 'mongodb'
import 'dotenv/config'
import { UserSchema } from '@/models/schemas/user'
import { DatabaseName } from '@/constraints/database'
import { RefreshTokenSchema } from '@/models/schemas/refreshToken'
import { FollowSchema } from '@/models/schemas/follow'
import { TweetSchema } from '@/models/schemas/tweet'
import { HashTagSchema } from '@/models/schemas/hashTag'

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

  get tweet(): Collection<TweetSchema> {
    return this.db.collection(DatabaseName.TWEET)
  }

  get hashtag(): Collection<HashTagSchema> {
    return this.db.collection(DatabaseName.HASHTAG)
  }

  indexUsers = async () => {
    const exists = await this.users.indexExists(['email_1_password_1', 'email_1', 'username_1'])

    if (exists) return
    this.users.createIndex({ email: 1, password: 1 })
    this.users.createIndex({ email: 1 }, { unique: true })
    this.users.createIndex({ username: 1 })
  }

  indexRefreshToken = async () => {
    const exists = await this.users.indexExists(['token_1', 'exp_1'])

    if (exists) return

    this.refreshToken.createIndex({ token: 1 })
    this.refreshToken.createIndex({ exp: 1 }, { expireAfterSeconds: 0 })
  }

  indexFollow = async () => {
    const exists = await this.follow.indexExists(['user_id_1_followed_user_id_1'])

    if (exists) return

    this.follow.createIndex({ user_id: 1, followed_user_id: 1 })
  }
}

export const databaseService = new DatabaseService()
