import { objectAssign } from '@/helpers/utils'
import { ObjectId } from 'mongodb'

export class HashTagSchema {
  _id?: ObjectId
  name: string
  created_at: Date

  constructor(data: Partial<HashTagSchema>) {
    const date = new Date()

    objectAssign(
      {
        ...data,
        created_at: data.created_at || date
      },
      this
    )
  }
}
