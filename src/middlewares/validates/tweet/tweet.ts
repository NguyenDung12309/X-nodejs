import { joi } from '@/helpers/joi'
import { reqTweet } from '@/models/dto/tweet/tweet'

export const tweetValidate = joi.object<reqTweet>({})
