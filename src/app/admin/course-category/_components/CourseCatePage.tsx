"use client"
import { useState, useMemo } from "react"

import Button from "@/components/common/Button"
import { Modal } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import type {
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
} from "@mui/x-data-grid"

import Table from "../../_components/Table/Table"
import CourseCateForm from "./CourseCateForm"
import courseCateApi from "@/api/client-side/courseCateApi"
import dayjs from "dayjs"
import { TAction, TCourseCate } from "@/types"
import DeleteForm from "../../_components/Form/DeleteForm"

type Props = {}

export default function CourseCatePage({}: Props) {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  const [action, setAction] = useState<TAction>(TAction.Add)
  const [selectedRow, setSelectedRow] = useState<TCourseCate | null>(null)

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 90 },
      {
        field: "title",
        headerName: "Title",
        flex: 0.5,
      },
      {
        field: "slug",
        headerName: "Slug",
        flex: 1,
      },
      {
        field: "description",
        headerName: "Description",
        flex: 1,
      },
      {
        field: "createdAt",
        headerName: "Create At",
        sortable: false,
        flex: 1,
        valueGetter: (params: GridValueGetterParams) =>
          dayjs(params.row.createdAt).format("DD-MM-YYYY HH:mm"),
      },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <div className="flex items-center gap-4">
            <button className="rounded-lg bg-green-600 px-3 py-2 font-bold text-slate-900 transition hover:scale-110 hover:brightness-150">
              View
            </button>
            <button
              className="rounded-lg bg-yellow-600 px-3 py-2 font-bold text-slate-900 transition hover:scale-110 hover:brightness-150"
              onClick={() => {
                setSelectedRow(params.row)
                setAction(TAction.Edit)
                setIsOpenForm(true)
              }}
            >
              Edit
            </button>
            <button
              className="rounded-lg bg-red-600 px-3 py-2 font-bold text-slate-900 transition hover:scale-110 hover:brightness-150"
              onClick={() => {
                setSelectedRow(params.row)
                setAction(TAction.Delete)
                setIsOpenForm(true)
              }}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  )
  const { data, isLoading } = useQuery({
    queryKey: ["course-categories"],
    queryFn: courseCateApi.getCourseCate,
  })

  const handleClose = () => setIsOpenForm((prev) => !prev)
  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-100/20 px-10 py-6">
        <h1 className="text-heading">Course Category</h1>
        <Button
          className="bg-pink-700"
          classStroke="stroke-pink-600"
          small
          onClick={() => {
            setAction(TAction.Add)
            setSelectedRow(null)
            setIsOpenForm(true)
          }}
        >
          Add Course
        </Button>
      </div>
      <div className="mt-5 px-10">
        <Table columns={columns} rows={data ?? []} pageSize={8} />
      </div>
      <Modal
        open={isOpenForm}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {action !== TAction.Delete ? (
          <CourseCateForm
            toggleForm={handleClose}
            action={action}
            selectedRow={selectedRow ?? {}}
          />
        ) : (
          <DeleteForm
            toggleForm={handleClose}
            selectedRowId={selectedRow?._id as string}
            type="Course"
          />
        )}
      </Modal>
    </div>
  )
}
