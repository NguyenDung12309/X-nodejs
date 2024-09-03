import { RequestTypes } from '@/types/type'
import formidable, { File } from 'formidable'
import { useI18n } from './i18n'
import { UPLOAD_TEMP_DIR } from '@/constraints/path'

export const handleUploadMedia = (req: RequestTypes<unknown, unknown>) => {
  const form = formidable({
    uploadDir: UPLOAD_TEMP_DIR,
    maxFiles: 4,
    keepExtensions: true,
    maxFileSize: 300 * 1024, // 300KB
    maxTotalFileSize: 300 * 1024 * 4,
    filter: ({ name, originalFilename: _, mimetype }) => {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))

      if (!valid) {
        form.emit('error' as any, new Error(useI18n.__('validate.common.invalid', { field: 'file' })) as any)
      }

      return valid
    }
  })

  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, _, files) => {
      if (err) {
        return reject(err)
      }

      if (!files.image) {
        return reject(new Error(useI18n.__('validate.common.invalid', { field: 'file' })))
      }
      const result = files.image

      resolve(result)
    })
  })
}
