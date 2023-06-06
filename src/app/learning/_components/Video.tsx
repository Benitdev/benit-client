"use client"

import { useRouter } from "next/navigation"

import authApi from "@/api/client-side/authApi"
import YouTube, { YouTubeEvent } from "react-youtube"
import { useRef, useState } from "react"
import { Modal } from "@mui/material"
import { IconX } from "@tabler/icons-react"
import Button from "@/components/common/Button"

type Props = {
  videoID: string
  nextLessonID?: string
  courseID?: string
  isLearnedNextLesson?: boolean
  learned?: boolean
}

const Video = ({
  videoID,
  nextLessonID,
  courseID,
  isLearnedNextLesson,
  learned,
}: Props) => {
  const router = useRouter()
  const currentTime = useRef<number>(0)

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleClose = () => setIsOpenModal((prev) => !prev)

  const onPause = (e: YouTubeEvent<number>) => {
    // console.log(e)
  }

  const onStateChange = (e: YouTubeEvent<number>) => {
    const { target } = e
    const time = target.getCurrentTime()
    if (time - currentTime.current > 10 && !learned) {
      setIsOpenModal(true)
      target.seekTo(currentTime.current, true)
    } else currentTime.current = time

    if (target.getDuration() - currentTime.current < 30) {
      if (!isLearnedNextLesson && !learned)
        authApi
          .updateProgress({ course: courseID, nextLessonID: nextLessonID })
          .then(() => {
            router.refresh()
          })
          .catch((e) => console.log(e))
    }
  }

  const onError = (e: YouTubeEvent<number>) => {
    console.log(e)
  }

  return (
    <>
      <YouTube
        videoId={videoID}
        iframeClassName="w-full h-[500px] lg:h-[700px]"
        onPause={onPause}
        onStateChange={onStateChange}
        // onEnd={onEnd}
        onError={onError}
        opts={{
          playerVars: {
            autoplay: 1,
          },
        }}
      />
      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-[300px] rounded-xl bg-slate-900 p-4 lg:w-[400px]">
            <h2 className="relative mb-5 border-b border-gray-200/20 py-3 text-xl font-bold text-yellow-500">
              Cảnh báo!!!
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-red-500"
                onClick={handleClose}
              >
                <IconX />
              </button>
            </h2>
            <p className="mb-4">Bạn đang học quá nhanh</p>
            <div className="flex justify-center gap-8">
              <Button
                className="bg-red-600 px-6 font-bold !text-slate-900"
                small
                onClick={handleClose}
              >
                Vâng
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Video
