"use client"

import { useRef, useState } from "react"

import Tippy from "@tippyjs/react/headless"
import { IconSearch, IconX } from "@tabler/icons-react"

import { useDebounce } from "@/hooks"
import { useQuery } from "@tanstack/react-query"
import searchApi from "@/api/client-side/searchApi"
import SearchItem from "./SearchItem"

type Props = {}

const Searchbar = (props: Props) => {
  const resultText = useRef<string>("")
  const [typingText, setTypingText] = useState<string>("")
  const [visible, setVisible] = useState<boolean>(false)

  const searchText = useDebounce(typingText, 1500)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["search", searchText],
    queryFn: () => searchApi.search({ text: searchText }),
    enabled: !!searchText && !searchText.startsWith(" "),
  })

  const togglePopup = () => setVisible((prev) => !prev)

  if (!isFetching) resultText.current = `Kết quả cho "${typingText}"`
  if (isFetching) resultText.current = `Đang tìm "${typingText}"`
  if (data?.posts.length === 0 && data?.courses.length === 0)
    resultText.current = `không tìm thấy "${typingText}"`

  return (
    <div className="relative max-w-[550px] [&>#tippy-1]:w-full">
      <Tippy
        visible={visible && !!typingText}
        interactive
        onClickOutside={togglePopup}
        render={(attrs) => (
          <div className="w-full rounded-xl bg-slate-700 p-4">
            <p className="flex items-center gap-2 text-sm italic text-slate-300">
              <IconSearch className="h-4 w-4" />
              {resultText.current}
            </p>
            {data && (
              <div className="space-y-6 p-2">
                {data?.posts.length !== 0 && (
                  <div>
                    <p className="border-b border-slate-200/20 pb-2 font-bold">
                      Bài viết
                    </p>
                    <div className="mt-3 space-y-4">
                      {data?.posts.map((post) => (
                        <SearchItem key={post._id} item={post} type="blogs" />
                      ))}
                    </div>
                  </div>
                )}
                {data?.courses.length !== 0 && (
                  <div>
                    <p className="border-b border-slate-200/20 pb-2 font-bold">
                      Khoá học
                    </p>
                    <div className="mt-3 space-y-4">
                      {data?.courses.map((course) => (
                        <SearchItem
                          key={course._id}
                          item={course}
                          type="blogs"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      >
        <div className="flex w-full items-center rounded-full bg-slate-700 px-3 text-slate-200">
          <IconSearch className="h-5 w-5 shrink-0" />
          <input
            type="text"
            className="h-[38px] w-full bg-transparent px-2 text-base text-slate-200 focus:outline-none"
            placeholder="Tìm kiếm khoá học, bài viết, video, ..."
            value={typingText}
            onChange={(e) => setTypingText(e.target.value)}
            onClick={() => setVisible(true)}
          />
          {typingText ? (
            <IconX
              className="h-5 w-5 cursor-pointer hover:text-pink-600"
              onClick={() => setTypingText("")}
            />
          ) : null}
        </div>
      </Tippy>
    </div>
  )
}

export default Searchbar
