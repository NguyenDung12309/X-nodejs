import i18n from 'i18n'
import path from 'path'

const baseDir = path.join(__dirname, '..')

i18n.configure({
  locales: ['vi'],
  directory: path.join(baseDir, 'locales'),
  defaultLocale: 'vi',
  objectNotation: true,
  cookie: 'locale'
})

export { i18n as useI18n }
