import React from "react"
import Heading from "../common/Heading"
import Image from "next/image"
import Link from "next/link"

type Props = {}

const PostList = (props: Props) => {
  return (
    <div className="relative p-10">
      <Heading>Bài viết nổi bật</Heading>
      <ol className="relative mx-10 ml-40 mt-8 border-l border-gray-200 dark:border-gray-700">
        <li className="mb-10 ml-4 space-y-4">
          <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="text-sm mb-1 -translate-x-full font-normal leading-none text-gray-400 dark:text-gray-500">
            February 2022
          </time>
          <div className="flex gap-4">
            <div className="relative max-h-[300px] min-h-[200px] w-[250px] shrink-0 overflow-hidden rounded-xl">
              <Image src="/images/7.png" alt="" fill className="object-cover" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Application UI code in Tailwind CSS
              </h3>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                Get access to over 20+ pages including a dashboard layout,
                charts, kanban board, calendar, and pre-order E-commerce &
                Marketing pages. kanban board, calendar, and pre-order
              </p>
              <div className="flex items-center gap-4">
                <span className="font-bold text-pink-600">Thien Phan</span>
                <span className="h-1 w-1 rounded-full bg-pink-600"></span>
                <span className="text-gray-500">4 phút đọc</span>
              </div>
              <Link
                href="#"
                className="text-sm inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Learn more{" "}
                <svg
                  className="ml-2 h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </li>
        <li className="mb-10 ml-4 space-y-4">
          <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="text-sm mb-1 font-normal leading-none text-gray-400 dark:text-gray-500">
            February 2022
          </time>
          <div className="flex gap-4">
            <div className="relative max-h-[300px] min-h-[200px] w-[250px] shrink-0 overflow-hidden rounded-xl">
              <Image src="/images/7.png" alt="" fill className="object-cover" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Application UI code in Tailwind CSS
              </h3>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                Get access to over 20+ pages including a dashboard layout,
                charts, kanban board, calendar, and pre-order E-commerce &
                Marketing pages. kanban board, calendar, and pre-order
              </p>
              <div className="flex gap-4">
                <span className="font-bold text-pink-600">Thien Phan</span>
                <span className="text-gray-500">4 phút đọc</span>
              </div>
              <Link
                href="#"
                className="text-sm inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Learn more{" "}
                <svg
                  className="ml-2 h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </li>
        <li className="mb-10 ml-4 space-y-4">
          <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="text-sm mb-1 font-normal leading-none text-gray-400 dark:text-gray-500">
            February 2022
          </time>
          <div className="flex gap-4">
            <div className="relative max-h-[300px] min-h-[200px] w-[250px] shrink-0 overflow-hidden rounded-xl">
              <Image src="/images/7.png" alt="" fill className="object-cover" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Application UI code in Tailwind CSS
              </h3>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                Get access to over 20+ pages including a dashboard layout,
                charts, kanban board, calendar, and pre-order E-commerce &
                Marketing pages. kanban board, calendar, and pre-order
              </p>
              <div className="flex gap-4">
                <span className="font-bold text-pink-600">Thien Phan</span>
                <span className="text-gray-500">4 phút đọc</span>
              </div>
              <Link
                href="#"
                className="text-sm inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Learn more{" "}
                <svg
                  className="ml-2 h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </li>
      </ol>
      <div className="absolute left-11 top-[50%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/70 bg-gradient-to-tr blur-[200px]"></div>
    </div>
  )
}

export default PostList
