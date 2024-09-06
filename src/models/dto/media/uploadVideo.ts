export interface reqUploadVideo {
  video: File
}

export interface resUploadVideo {
  video_url: string
}

export interface Media {
  url: string
  type: MediaType
}

export enum MediaType {
  Image,
  Video
}
