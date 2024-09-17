export interface ReqUploadImage {
  image: File
}

export interface ResUploadImage {
  image_url: string
}

export interface Media {
  url: string
  type: MediaType
}

export enum MediaType {
  Image,
  Video
}
