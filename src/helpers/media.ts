import { RequestTypes } from '@/types/type'
import formidable from 'formidable'
import path from 'path'
import { useI18n } from './i18n'

export const handleUploadSingleMedia = (req: RequestTypes<unknown, unknown>) => {
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024, // 300KB
    filter: ({ name, originalFilename: _, mimetype }) => {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))

      if (!valid) {
        form.emit('error' as any, new Error(useI18n.__('validate.common.invalid', { field: 'file' })) as any)
      }

      return valid
    }
  })

  return new Promise((resolve, reject) => {
    form.parse(req, (err, _, files) => {
      if (err) {
        return reject(err)
      }

      if (!files.image) {
        return reject(new Error(useI18n.__('validate.common.invalid', { field: 'file' })))
      }

      resolve(files)
    })
  })
}
