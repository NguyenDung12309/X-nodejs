import { createHash } from 'crypto'

export const sha256 = (content: string) => {
  return createHash('sha256').update(content).digest('hex')
}
