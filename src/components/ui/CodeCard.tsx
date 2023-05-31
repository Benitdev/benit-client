"use client"

import { useState } from "react"
import copyToClipBoard from "@/utils/copyToClipboard"
import pretty from "pretty"
import cssbeautify from "cssbeautify"

import CodePreview from "./CodePreview"
import jsBeautify from "js-beautify"
import { IconEye } from "@tabler/icons-react"
import ModalViewCode from "../common/Modal/ModalViewCode"
import { Modal } from "@mui/material"

type Props = {
  title: string
  htmlCode: string
  cssCode: string
  jsCode?: string
  author?: string
  preview?: boolean
}

const CodeCard = (props: Props) => {
  const {
    title,
    htmlCode,
    cssCode,
    jsCode = "",
    author = null,
    preview = false,
  } = props
  const [isShowCode, setIsShowCode] = useState<boolean>(false)

  const handleClose = () => setIsShowCode(false)

  return (
    <>
      <div className="card relative flex h-[400px] flex-col rounded border border-slate-800 p-5 drop-shadow-2xl transition-all hover:border-slate-600">
        <div className="flex items-center justify-between">
          <h4 className="relative z-10 flex items-center gap-x-2 text-sm font-normal text-slate-500">
            {author && (
              <>
                <span>Credit: </span>
                <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap font-medium text-slate-400">
                  {author}
                </span>
              </>
            )}
          </h4>
          {!preview && (
            <div className="flex items-center gap-x-2">
              <ButtonAction onClick={() => setIsShowCode(true)}>
                <IconEye />
              </ButtonAction>
            </div>
          )}
        </div>
        <div className="flex-1 py-5">
          <CodePreview htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} />
        </div>
        <div className="card-footer relative z-10 mt-auto flex items-center justify-between gap-x-2">
          <h3 className="card-title max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-white lg:max-w-[150px]">
            {title}
          </h3>
          {!preview && (
            <div
              className="flex items-center gap-x-2"
              aria-label="button-combination"
            >
              <ButtonCopy
                type="javascript"
                onClick={() => copyToClipBoard(jsBeautify(jsCode ?? "", {}))}
              >
                Javascript
              </ButtonCopy>
              <ButtonCopy
                type="css"
                onClick={() =>
                  copyToClipBoard(
                    cssbeautify(cssCode ?? "", {
                      indent: `  `,
                      autosemicolon: true,
                    })
                  )
                }
              >
                CSS
              </ButtonCopy>
              <ButtonCopy
                type="html"
                onClick={() =>
                  copyToClipBoard(
                    pretty(htmlCode ?? "", {
                      ocd: true,
                    })
                  )
                }
              >
                HTML
              </ButtonCopy>
            </div>
          )}
        </div>
      </div>
      <Modal
        open={isShowCode}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalViewCode
          htmlCode={pretty(htmlCode ?? "", {
            ocd: true,
          })}
          cssCode={cssbeautify(cssCode ?? "", {
            indent: `  `,
            autosemicolon: true,
          })}
          jsCode={jsCode}
        />
      </Modal>
    </>
  )
}

function ButtonAction({ children, onClick }: any) {
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-40 p-2 text-slate-400 hover:text-white"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function ButtonCopy({
  children,
  onClick = () => {},
  type = "html",
}: any) {
  let bgClassName =
    type === "html"
      ? "hover:bg-pink-500"
      : type === "css"
      ? "hover:bg-cyan-500"
      : "hover:bg-yellow-700"

  return (
    <button
      className={`inline-flex items-center gap-x-2 rounded-lg px-2 py-1 text-sm font-medium text-slate-500 transition-all hover:text-black ${bgClassName}`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
      <span>{children}</span>
    </button>
  )
}

export default CodeCard
