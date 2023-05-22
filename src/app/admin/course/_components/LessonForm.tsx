import { durationToSecond } from "@/utils/durationify"
import { slugify } from "@/utils/slugify"
import { IconArrowLeft, IconPlus } from "@tabler/icons-react"
import { IconMinus } from "@tabler/icons-react"
import { UseQueryResult, useQueries } from "@tanstack/react-query"
import axios from "axios"
import { useFieldArray, useWatch } from "react-hook-form"
import YouTube from "react-youtube"

const LessonForm = ({
  control,
  index,
  chapter,
  register,
  errors,
  setValue,
  setOpenLessonModal,
}: any) => {
  const { fields, append, remove } = useFieldArray({
    name: `courseChapters.${index}.lessons`,
    control,
  })
  const data = useWatch({
    control,
    name: `courseChapters.${index}.lessons`,
  })

  const videoQueries: UseQueryResult<any, unknown>[] = useQueries({
    queries: data
      ? data.map((item: any, i: number) => {
          return {
            queryKey: ["duration", item?.videoID],
            queryFn: () =>
              axios.get(
                `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${item?.videoID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_V3_API_KEY}`
              ),
            onSuccess: (data: any) => {
              setValue(
                `courseChapters.${index}.lessons.${i}.duration`,
                durationToSecond(data?.data?.items[0]?.contentDetails.duration)
              )
            },
          }
        })
      : [],
  })

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900 p-4 pt-0">
      <div className="scrollbar-style h-full overflow-y-auto pr-1">
        <h1 className="sticky -top-[1px] z-10 bg-slate-900 py-4 text-center text-base font-bold text-slate-200">
          <IconArrowLeft
            className="absolute cursor-pointer hover:text-pink-700"
            onClick={() => setOpenLessonModal(null)}
          />
          {chapter}
        </h1>
        <h2 className="text-sm font-bold">Danh sách bài học của chương</h2>
        <div className="mt-4">
          {fields.map((field, i) => (
            <div key={field.id} className="relative mt-6">
              <div className="relative text-sm">
                Bài {index + 1}.{i + 1}
                <button
                  onClick={() => remove(i)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-pink-700 p-1 text-black"
                  type="button"
                >
                  <IconMinus className="h-4 w-4" />
                </button>
              </div>
              <div className="my-2">
                <input
                  {...register(`courseChapters.${index}.lessons.${i}.title`)}
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
                  placeholder="Tiêu đề bài học"
                />
                <small className="font-bold text-pink-600">
                  {errors.courseChapters?.message}
                </small>
              </div>
              <div>
                <input
                  {...register(`courseChapters.${index}.lessons.${i}.videoID`)}
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
                  placeholder="Video ID"
                />
              </div>
              {data?.[i]?.videoID && (
                <YouTube
                  videoId={data?.[i]?.videoID}
                  iframeClassName="w-full"
                />
              )}
              <div className="p-2 text-right text-slate-200">
                <span>
                  Thời lượng video:{` `}
                  {videoQueries?.[
                    i
                  ]?.data?.data?.items[0]?.contentDetails.duration
                    ?.replace("PT", "")
                    .replace("H", " giờ ")
                    .replace("M", " phút ")
                    .replace("S", " giây")}
                </span>
                {/* <input
                  {...register(
                    `courseChapters.${index}.lessons.${i}.duration`
                  )}
                  type="text"
                  value={
                    videoQueries?.[i]?.data?.data?.items[0]?.contentDetails
                      .duration ?? 0
                  }
                  className="w-0"
                /> */}
              </div>
            </div>
          ))}
          <button
            onClick={() => append({ title: "", videoID: "" })}
            className="mx-auto mt-4 block rounded-full bg-pink-700 p-1 text-black"
            type="button"
          >
            <IconPlus />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LessonForm
