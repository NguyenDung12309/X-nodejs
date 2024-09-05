export interface reqUploadImage {
  image: File
}

export interface resUploadImage {
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
