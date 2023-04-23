"use client"

import Particles from "./Particles"
import { motion } from "framer-motion"
import {
  HtmlIcon,
  CssIcon,
  JsIcon,
  ReactIcon,
  AngularIcon,
  VueIcon,
} from "@/assets/icons"

import { EnvelopeIcon, CodeBracketIcon } from "@heroicons/react/24/solid"

import { useEffect, useState } from "react"
import clsx from "clsx"
import Button from "../common/Button"

const desc =
  "Nơi học tập, chia sẻ kiến thức về lập trình, công nghệ, xây dựng UI Website."

const slides = [HtmlIcon, CssIcon, JsIcon, ReactIcon, AngularIcon, VueIcon]

const Banner = () => {
  const [slideActive, setSlideActive] = useState<number>(0)
  useEffect(() => {
    setTimeout(() => {
      setSlideActive((prev) => (prev == 5 ? 0 : prev + 1))
    }, 1500)
  }, [slideActive])

  return (
    <section className="relative h-[calc(100vh-60px)]">
      <Particles />
      <div className="p-10">
        <h1 className="text-2xl relative bg-gradient-to-b from-pink-700 to-red-400 bg-clip-text pb-4 font-bold text-transparent">
          {"<Trang chủ />"}
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{
              duration: 0.7,
              type: "spring",
            }}
            className="absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-pink-700 to-red-400"
          ></motion.span>
        </h1>
        <div className="mt-14 flex items-stretch">
          <div className="flex-[0.6] space-y-4">
            <h1 className="bg-gradient-to-b from-pink-700 to-red-400 bg-clip-text text-headingLarge font-bold leading-tight text-transparent ">
              Benit!
            </h1>
            <div className="text-heading font-extrabold text-slate-200 xl:text-[3.5vw]">
              {desc.split("").map((value, index) => {
                if (value !== " ")
                  return (
                    <motion.span
                      key={index}
                      className="inline-block leading-tight hover:text-cyan-500 hover:underline"
                      whileHover={{ y: -15 }}
                    >
                      {value}{" "}
                    </motion.span>
                  )
                else if (index == 20 || index == 44 || index == 64)
                  return <br key={index}></br>
                else return " "
              })}
            </div>
            <div className="!mt-8 flex flex-col gap-x-8 gap-y-4 xl:flex-row">
              <Button classStroke="stroke-pink-600" className=" bg-pink-600/90">
                <CodeBracketIcon className="h-6 w-6" />
                UI Components
              </Button>
              <Button classStroke="stroke-cyan-600" className="bg-cyan-600">
                <EnvelopeIcon className="h-6 w-6" />
                Nhắn tin cho tôi
              </Button>
            </div>
          </div>
          <div className="relative mt-10 flex flex-[0.4] items-center justify-center">
            {slides.map((Icon, index) => (
              <div
                key={index}
                className={clsx("absolute transition-opacity duration-500", {
                  "opacity-0": slideActive !== index,
                  "opacity-100": slideActive == index,
                })}
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
