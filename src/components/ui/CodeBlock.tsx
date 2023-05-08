import CodeEditor from "@uiw/react-codemirror"
import { html } from "@codemirror/lang-html"
import { css } from "@codemirror/lang-css"
import { javascript } from "@codemirror/lang-javascript"
import { dracula } from "@uiw/codemirror-theme-dracula"
import pretty from "pretty"
import cssBeautify from "cssbeautify"
import jsBeautify from "js-beautify"

type Props = {
  language: "css" | "html" | "javascript"
  name: string
  code: string
  setValue?: any
  height?: string
  showTitle?: boolean
  placeholder?: string
}
function CodeEditorBlock(props: Props) {
  const {
    language = "html",
    name,
    code,
    setValue,
    height,
    showTitle,
    placeholder,
  } = props

  const onChange = (code: string) => {
    setValue((prev: any) => {
      return {
        ...prev,
        [name]: code,
      }
    })
  }
  const setLanguage = () => {
    if (language == "html")
      return html({
        autoCloseTags: true,
        matchClosingTags: true,
      })
    if (language == "javascript") return javascript({ typescript: true })
    return css()
  }
  const handleFormat = () => {
    switch (language) {
      case "html":
        setValue((prev: any) => {
          return {
            ...prev,
            [name]: pretty(prev[name] ?? "", {
              ocd: true,
            }),
          }
        })
        return
      case "css":
        setValue((prev: any) => {
          return {
            ...prev,
            [name]: cssBeautify(prev[name] ?? "", {
              indent: `  `,
              autosemicolon: true,
            }),
          }
        })
        return
      case "javascript":
        setValue((prev: any) => {
          return {
            ...prev,
            [name]: jsBeautify(prev[name] ?? "", {}),
          }
        })
        return
    }
  }
  return (
    <div className="wrapper-code relative flex w-full flex-col overflow-x-auto">
      {showTitle && (
        <h1
          className={`p-4 text-xl font-bold capitalize ${
            language == "html"
              ? "text-pink-500"
              : language == "css"
              ? "text-cyan-500"
              : "text-yellow-500"
          }`}
        >
          {language}
        </h1>
      )}
      <CodeEditor
        value={code}
        minHeight="100px"
        height={height || "auto"}
        maxHeight={"500px"}
        theme={dracula}
        extensions={[setLanguage()]}
        onChange={onChange}
        placeholder={placeholder}
      />
      <div
        className="absolute bottom-1 right-1 cursor-pointer rounded-lg bg-slate-700 p-2 text-[10px] text-white"
        onClick={handleFormat}
      >
        Format
      </div>
    </div>
  )
}

export default CodeEditorBlock
