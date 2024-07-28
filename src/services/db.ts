import { Collection, Db, MongoClient } from 'mongodb'
import 'dotenv/config'
import { UserSchema } from '@/models/schemas/user'
import { DatabaseName } from '@/constraints/database'

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@x.grxx64n.mongodb.net/?retryWrites=true&w=majority&appName=X`
const client = new MongoClient(uri)

export async function run() {
  try {
    await client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')
  } finally {
    await client.close()
  }
}

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
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error);

      throw error
    }
  }

  get users(): Collection<UserSchema> {
    return this.db.collection(DatabaseName.USERS)
  }
}

export const databaseService = new DatabaseService()
