import pretty from "pretty"
import cssbeautify from "cssbeautify"
import jsBeautify from "js-beautify"

import { ButtonCopy } from "@/components/ui/CodeCard"
import CodeEditorBlock from "@/components/ui/CodeBlock"
import copyToClipBoard from "@/utils/copyToClipboard"
import { useEffect } from "react"

const ModalViewCode = ({ htmlCode, cssCode, jsCode }: any) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])
  return (
    <div className="scrollbar-style absolute left-1/2 top-1/2 max-h-[80vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-slate-900/70 backdrop-blur-md">
      <div className="sticky top-0 z-10 bg-slate-900 py-2 text-center font-bold uppercase tracking-wider text-pink-600 drop-shadow-xl">
        Thông tin Template
      </div>
      <div className="space-y-2 p-5 pt-1">
        <div className="flex flex-col">
          <div className="flex items-end justify-between">
            <label
              className={`inline-block cursor-pointer text-base text-sm font-semibold text-slate-400`}
            >
              HTML
            </label>
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
              Copy
            </ButtonCopy>
          </div>
          <CodeEditorBlock
            name="htmlCode"
            code={htmlCode ?? ""}
            language="html"
            placeholder="Hông có giề!~~"
            format={false}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-end justify-between">
            <label
              className={`inline-block cursor-pointer text-base text-sm font-semibold text-slate-400`}
            >
              CSS
            </label>
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
              Copy
            </ButtonCopy>
          </div>
          <CodeEditorBlock
            code={cssCode ?? ""}
            language="css"
            name="cssCode"
            placeholder="Hông có giề!~~"
            format={false}
          ></CodeEditorBlock>
        </div>
        <div className="mb-5 flex flex-col">
          <div className="flex items-end justify-between">
            <label
              className={`inline-block cursor-pointer text-base text-sm font-semibold text-slate-400`}
            >
              JAVASCRIPT
            </label>
            <ButtonCopy
              type="javascript"
              onClick={() => copyToClipBoard(jsBeautify(jsCode ?? "", {}))}
            >
              Copy
            </ButtonCopy>
          </div>
          <CodeEditorBlock
            code={jsCode ?? ""}
            language="javascript"
            name="jsCode"
            placeholder="Hông có giề!~~"
            format={false}
          ></CodeEditorBlock>
        </div>
      </div>
    </div>
  )
}

export default ModalViewCode
