"use client"

import { useEffect, useRef, useState } from "react"

import "@/styles/customCkeditor.css"

type Props = {}

const Editor = (props: Props) => {
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
          <CKEditor className="wrap-ckeditor mt-3" editor={ClassicEditor} />
        </div>
      ) : (
        "loading..."
      )}
    </>
  )
}

export default Editor
