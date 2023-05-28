"use client"

import { useEffect } from "react"
import parse from "html-react-parser"

import highlight from "highlight.js"
import "highlight.js/styles/monokai-sublime.css"
import "@/styles/customCkeditor.css"

type Props = {
  content: string
}

export default function PostContent({ content }: Props) {
  useEffect(() => {
    highlight.highlightAll()
  }, [])

  return <article className=" ck-content break-all">{parse(content)}</article>
}
