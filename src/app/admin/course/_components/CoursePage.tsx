"use client"
import Image from "next/image"
import { useMemo, useState } from "react"

import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { Modal } from "@mui/material"

import Button from "@/components/common/Button"
import Table from "../../_components/Table/Table"
import CourseForm from "./CourseForm"
import { TAction, TFilter } from "@/types"
import { useCourse } from "@/hooks/useCourse"
import { formatDateTime } from "@/utils/dayUtil"
import Filter from "../../_components/Filter/Filter"

type Props = {}

const CoursePage = ({}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  const [action, setAction] = useState<TAction>(TAction.Add)
  const [selectedRow, setSelectedRow] = useState<any | null>(null)
  const [filter, setFilter] = useState<TFilter>({})

  const handleClose = () => setIsOpenForm((prev) => !prev)

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 100 },
      {
        field: "title",
        headerName: "Tiêu đề",
        flex: 0.5,
        minWidth: 150,
      },
      {
        field: "category",
        headerName: "Danh mục",
        flex: 0.5,
        minWidth: 150,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.categoryId.title,
      },
      {
        field: "slug",
        headerName: "Slug",

        flex: 1,
        minWidth: 150,
      },
      {
        field: "image",
        headerName: "Ảnh bìa",
        flex: 1,
        minWidth: 200,
        renderCell: (params) => (
          <div className="relative my-2 h-[150px] w-full py-2">
            {params.row.image && (
              <Image
                src={params.row.image}
                alt=""
                fill
                className="object-cover"
              />
            )}
          </div>
        ),
      },
      {
        field: "description",
        headerName: "Mô tả",
        flex: 1,
        minWidth: 200,
        renderCell: (params) => (
          <p className="line-clamp-3 break-all">{params.row.description}</p>
        ),
      },
      {
        field: "createdAt",
        headerName: "Ngày tạo",
        sortable: false,
        flex: 1,
        minWidth: 150,
        valueGetter: (params: GridValueGetterParams) =>
          formatDateTime(params.row.createdAt),
      },
      {
        field: "action",
        headerName: "",
        flex: 1,
        minWidth: 200,
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

  const { data, isLoading } = useCourse(filter)

  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-100/20 px-10 py-6">
        <h1 className="text-heading font-bold">Khoá học</h1>
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
        <Filter
          page="course"
          value={filter}
          setValue={setFilter}
          isLoading={isLoading}
        />
        <Table
          columns={columns}
          rows={data ?? []}
          pageSize={10}
          isLoading={isLoading}
          autoRowHeight
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
