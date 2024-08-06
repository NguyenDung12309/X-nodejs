import { pick } from 'lodash'

export const objectAssign = (data: object, source: any): void => {
  if (data === undefined) {
    for (const key of Object.keys(source)) {
      source[key] = null
    }
  } else {
    // Nếu data có giá trị, lọc và gán giá trị cho các thuộc tính của source
    const filteredData = pick(data, Object.keys(source))

    Object.assign(source, filteredData)
  }
}

export const objectToString = (obj: any) => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ')
}

export const stringToObject = (str: string): Record<string, string> => {
  const obj: Record<string, string> = {}
  const entries = str.split(', ').map((pair) => pair.split(': '))

  entries.forEach(([key, value]) => {
    obj[key] = value
  })

  return obj
}
