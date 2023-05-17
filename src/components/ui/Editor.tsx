"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

import "@/styles/customCkeditor.css"

type Props = {
  data?: string
  setContent: Dispatch<SetStateAction<string>>
}

const Editor = ({ data, setContent }: Props) => {
  const editorRef = useRef<any>()
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("ckeditor/build/ckeditor"),
    }
    setEditorLoaded(true)
  }, [])
  return (
    <>
      {editorLoaded ? (
        <div className="ck-body-wrapper">
          <CKEditor
            data={data}
            className="wrap-ckeditor mt-3"
            editor={ClassicEditor}
            onChange={(_: any, editor: any) => {
              const data = editor.getData()
              setContent(data)
            }}
          />
        </div>
      ) : (
        "loading..."
      )}
    </>
  )
}

export default Editor
