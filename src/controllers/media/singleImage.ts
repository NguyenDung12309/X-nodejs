import { handleResponseSuccess } from '@/helpers/handler'
import { Controller } from '@/types/type'
import formidable from 'formidable'
import path from 'path'

export const uploadSingleImageController: Controller<any> = async (req, res) => {
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024 // 300KB
  })

  form.parse(req, (err) => {
    if (err) {
      throw err
    }

    handleResponseSuccess(res)
  })
}
