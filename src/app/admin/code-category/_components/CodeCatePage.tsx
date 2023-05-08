"use client"
import { useState, useMemo } from "react"

import Button from "@/components/common/Button"
import { Modal } from "@mui/material"
import type {
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
} from "@mui/x-data-grid"

import Table from "../../_components/Table/Table"
import CodeCateForm from "./CodeCateForm"
import dayjs from "dayjs"
import { TAction, TCategory } from "@/types"
import DeleteForm from "../../_components/Form/DeleteForm"
import { useCategory } from "@/hooks/useCategory"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import categoryApi from "@/api/client-side/categoryApi"
import { toast } from "react-toastify"

type Props = {}

const CodeCatePage = ({}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  const [action, setAction] = useState<TAction>(TAction.Add)
  const [selectedRow, setSelectedRow] = useState<TCategory | null>(null)

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
  const queryClient = useQueryClient()

  const { data, isLoading } = useCategory("code-categories", "code")
  const deleteMutation = useMutation({
    mutationFn: categoryApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["code-categories"])
      toast.success(data.message)
      setIsOpenForm(false)
    },
    onError: (error) => {
      toast.error(error as string)
    },
  })

  const handleClose = () => setIsOpenForm((prev) => !prev)
  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-100/20 px-10 py-6">
        <h1 className="text-heading">Code Category</h1>
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
          Add code category
        </Button>
      </div>
      <div className="mt-5 px-10">
        <Table
          columns={columns}
          rows={data ?? []}
          pageSize={8}
          isLoading={isLoading}
        />
      </div>
      <Modal
        open={isOpenForm}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {action !== TAction.Delete ? (
          <CodeCateForm
            toggleForm={handleClose}
            action={action}
            selectedRow={selectedRow ?? {}}
          />
        ) : (
          <DeleteForm
            toggleForm={handleClose}
            selectedRowId={selectedRow?._id as string}
            handleDelete={deleteMutation.mutate}
            type="Course"
          />
        )}
      </Modal>
    </div>
  )
}

export default CodeCatePage
