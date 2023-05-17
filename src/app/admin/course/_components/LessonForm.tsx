import { IconArrowLeft, IconPlus } from "@tabler/icons-react"
import { IconMinus } from "@tabler/icons-react"
import { useFieldArray, useWatch } from "react-hook-form"
import YouTube from "react-youtube"

type Props = {}

const LessonForm = ({
  control,
  index,
  chapter,
  register,
  errors,
  setOpenLessonModal,
}: any) => {
  const { fields, append, remove } = useFieldArray({
    name: `courserChapters.${index}.lesson`,
    control,
  })
  const data = useWatch({
    control,
    name: `courserChapters.${index}.lesson`,
  })

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900 p-4 pt-0">
      <div className="scrollbar-style h-full overflow-y-auto pr-1">
        <h1 className="sticky -top-[1px] z-10 bg-slate-900 py-4 text-center text-base font-bold text-slate-200">
          <IconArrowLeft
            className="absolute cursor-pointer hover:text-pink-700"
            onClick={() => setOpenLessonModal(false)}
          />
          {chapter}
        </h1>
        <h2 className="text-sm">Danh sách bài học của chương</h2>
        <div className="mt-4">
          {fields.map((field, i) => (
            <div key={field.id} className="relative mt-6">
              <div className="relative">
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
                  {...register(`courserChapters.${index}.lesson.${i}.title`)}
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
                  placeholder="Tiêu đề bài học"
                />
              </div>
              <div>
                <input
                  {...register(`courserChapters.${index}.lesson.${i}.videoID`)}
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-600  focus:ring-pink-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-pink-500 dark:focus:ring-pink-500"
                  placeholder="Video ID"
                />
              </div>
              <YouTube videoId={data?.[i]?.videoID} iframeClassName="w-full" />
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
