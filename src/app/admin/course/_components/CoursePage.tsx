"use client"
import { useMemo, useState } from "react"

import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { Modal } from "@mui/material"
import dayjs from "dayjs"

import Button from "@/components/common/Button"
import Table from "../../_components/Table/Table"
import CourseForm from "./CourseForm"
import { TAction } from "@/types"
import { useCourse } from "@/hooks/useCourse"

type Props = {}

const CoursePage = ({}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  const [action, setAction] = useState<TAction>(TAction.Add)
  const [selectedRow, setSelectedRow] = useState<any | null>(null)

  const handleClose = () => setIsOpenForm((prev) => !prev)

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 90 },
      {
        field: "title",
        headerName: "Tiêu đề",
        flex: 0.5,
      },
      {
        field: "category",
        headerName: "Danh mục",
        flex: 0.5,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.categoryID.title,
      },
      {
        field: "slug",
        headerName: "Slug",
        flex: 1,
      },
      {
        field: "description",
        headerName: "Mô tả",
        flex: 1,
      },
      {
        field: "createdAt",
        headerName: "Ngày tạo",
        sortable: false,
        flex: 1,
        valueGetter: (params: GridValueGetterParams) =>
          dayjs(params.row.createdAt).format("DD-MM-YYYY HH:mm"),
      },
      {
        field: "action",
        headerName: "",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <div className="flex items-center gap-4">
            <button className="rounded-lg bg-green-600 px-3 py-2 font-bold text-slate-900 transition hover:scale-110 hover:brightness-150">
              Xem
            </button>
            <button
              className="rounded-lg bg-yellow-600 px-3 py-2 font-bold text-slate-900 transition hover:scale-110 hover:brightness-150"
              onClick={() => {
                setSelectedRow(params.row)
                setAction(TAction.Edit)
                setIsOpenForm(true)
              }}
            >
              Sửa
            </button>
            <button
              className="rounded-lg bg-red-600 px-3 py-2 font-bold text-slate-900 transition hover:scale-110 hover:brightness-150"
              onClick={() => {
                setSelectedRow(params.row)
                setAction(TAction.Delete)
                setIsOpenForm(true)
              }}
            >
              Xoá
            </button>
          </div>
        ),
      },
    ],
    []
  )

  const { data, isLoading } = useCourse()

  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-100/20 px-10 py-6">
        <h1 className="text-heading">Khoá học</h1>
        <Button
          className="bg-pink-700"
          classStroke="stroke-pink-600"
          small
          onClick={() => {
            setIsOpenForm(true)
            setAction(TAction.Add)
            setSelectedRow(null)
          }}
        >
          Thêm khoá học
        </Button>
      </div>
      <div className="mt-5 px-10">
        <Table
          columns={columns}
          rows={data ?? []}
          pageSize={10}
          isLoading={isLoading}
        />
      </div>
      <Modal
        open={isOpenForm}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CourseForm
          action={action}
          toggleForm={handleClose}
          selectedRow={selectedRow ?? {}}
        />
      </Modal>
    </div>
  )
}

export default CoursePage
