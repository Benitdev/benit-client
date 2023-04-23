"use client"
import { useState } from "react"

import Button from "@/components/common/Button"
import Table from "../../_components/Table/Table"
import { Modal } from "@mui/material"
import CourseForm from "./CourseForm"

type Props = {}

export default function CoursePage({}: Props) {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  const handleClose = () => setIsOpenForm(false)
  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-100/20 px-10 py-6">
        <h1 className="text-heading">Courses</h1>
        <Button
          className="bg-pink-700"
          classStroke="stroke-pink-600"
          small
          onClick={() => setIsOpenForm(true)}
        >
          Add Course
        </Button>
      </div>
      <div className="mt-5 px-10">
        <Table />
      </div>
      <Modal
        open={isOpenForm}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CourseForm handleClose={handleClose} />
      </Modal>
    </div>
  )
}
