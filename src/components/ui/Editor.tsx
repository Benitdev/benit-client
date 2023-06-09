"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

import courseApi from "@/api/client-side/courseApi"
import "@/styles/customCkeditor.css"
import { cn } from "@/utils/cn"
import { toast } from "react-toastify"

type Props = {
  data?: string
  className?: string
  setContent: any
}

const Editor = ({ data, className, setContent }: Props) => {
  const editorRef = useRef<any>()
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false)
  const [isEditorReady, setIsEditorReady] = useState<boolean>(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("ckeditor_2.0/build/ckeditor"),
    }
    setEditorLoaded(true)
  }, [])

  useEffect(() => {
    if (isEditorReady) {
      const editor = editorRef.current.editor
      editor.plugins.get("FileRepository").createUploadAdapter = (
        loader: any
      ) => {
        return new CustomUploadAdapter(loader)
      }
    }
  }, [isEditorReady])

  class CustomUploadAdapter {
    private loader
    constructor(loader: any) {
      this.loader = loader
    }

    upload() {
      return new Promise(async (resolve, reject) => {
        // Gửi yêu cầu tải lên tệp tin đến API endpoint của bạn
        const file = await this.loader.file
        courseApi
          .uploadImage(file)
          .then((data) => {
            // Trả về đường dẫn tệp tin đã tải lên
            resolve({ default: data.imagePath })
          })
          .catch((error) => {
            reject(error)
            toast.error("Tải ảnh không thành công!")
          })
      })
    }

    abort() {
      // Hủy tải lên nếu cần
      // ...
    }
  }
  return (
    <>
      {editorLoaded ? (
        <div className={cn("ck-body-wrapper", className)}>
          <CKEditor
            data={data}
            className="wrap-ckeditor mt-3"
            editor={ClassicEditor}
            config={{
              simpleUpload: {
                uploadUrl: "",
              },
            }}
            onChange={(_: any, editor: any) => {
              const data = editor.getData()
              setContent(data)
            }}
            onReady={(editor: any) => {
              editorRef.current.editor = editor
              setIsEditorReady(true)
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
