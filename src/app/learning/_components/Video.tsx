"use client"

import { useRouter } from "next/navigation"

import authApi from "@/api/client-side/authApi"
import YouTube, { YouTubeEvent } from "react-youtube"

type Props = {
  videoID: string
  nextLessonID?: string
  courseID?: string
  isLearnedNextLesson?: boolean
}

const Video = ({
  videoID,
  nextLessonID,
  courseID,
  isLearnedNextLesson,
}: Props) => {
  const router = useRouter()
  const onPause = (e: YouTubeEvent<number>) => {
    // console.log(e)
  }
  const onStateChange = (e: YouTubeEvent<number>) => {
    console.log(e.target.playVideoAt(100))
  }
  const onEnd = (e: YouTubeEvent<number>) => {
    if (!isLearnedNextLesson)
      authApi
        .updateProgress({ course: courseID, nextLessonID: nextLessonID })
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
      opts={{
        playerVars: {
          autoplay: 1,
        },
      }}
    />
  )
}

export default Video
