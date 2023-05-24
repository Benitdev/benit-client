"use client"

import { useRouter } from "next/navigation"

import authApi from "@/api/client-side/authApi"
import YouTube, { YouTubeEvent } from "react-youtube"

type Props = {
  videoID: string
  lessonID?: string
  courseID?: string
}

const Video = ({ videoID, lessonID, courseID }: Props) => {
  const router = useRouter()
  const onPause = (e: YouTubeEvent<number>) => {
    // console.log(e)
  }
  const onStateChange = (e: YouTubeEvent<number>) => {
    console.log(e.target.playVideoAt(100))
  }
  const onEnd = (e: YouTubeEvent<number>) => {
    authApi
      .updateProgress({ course: courseID, currentLesson: lessonID })
      .then(() => {
        router.refresh()
      })
      .catch((e) => console.log(e))
  }
  const onError = (e: YouTubeEvent<number>) => {
    console.log(e)
  }

  return (
    <YouTube
      videoId={videoID}
      iframeClassName="w-full h-[500px] lg:h-[700px]"
      onPause={onPause}
      onStateChange={onStateChange}
      onEnd={onEnd}
      onError={onError}
    />
  )
}

export default Video
