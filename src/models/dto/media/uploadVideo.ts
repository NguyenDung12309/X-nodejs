export interface ReqUploadVideo {
  video: File
}

export interface ResUploadVideo {
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
