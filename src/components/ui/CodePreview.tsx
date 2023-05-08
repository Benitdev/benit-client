import React, { useEffect, useRef } from "react"

type Props = {
  htmlCode: string
  cssCode: string
  jsCode: string
  className?: string
}

const CodePreview = ({ htmlCode, cssCode, jsCode, className }: Props) => {
  return (
    <iframe
      // ref={ref}
      srcDoc={`<style>
      body::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      }
      body::-webkit-scrollbar-track {
        border-radius: 100rem;
      }
      body::-webkit-scrollbar-thumb {
        border-radius: 100rem;
        background-image: linear-gradient(245deg, #5142d6, #a047c0);
      }
      ${cssCode}
      </style>
      <body>
        ${htmlCode}
        <script>
        ${jsCode}
        </script>
      </body>`}
      className={`h-full w-full ${className}`}
    />
  )
}

export default CodePreview
