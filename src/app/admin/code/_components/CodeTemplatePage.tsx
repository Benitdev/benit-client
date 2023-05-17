"use client"
import { useState, useMemo } from "react"

import Button from "@/components/common/Button"
import { Modal } from "@mui/material"
import type {
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
} from "@mui/x-data-grid"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import dayjs from "dayjs"

import Table from "../../_components/Table/Table"
import CodeCateForm from "./CodeTemplateForm"
import { TAction, TCategory } from "@/types"
import DeleteForm from "../../_components/Form/DeleteForm"
import { useCodeTemplate } from "@/hooks"
import CodePreview from "@/components/ui/CodePreview"
import codeTemplateApi from "@/api/codeTemplateApi"

type Props = {}

const CodeTemplatePage = ({}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  const [action, setAction] = useState<TAction>(TAction.Add)
  const [selectedRow, setSelectedRow] = useState<TCategory | null>(null)

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 90 },
      {
        field: "title",
        headerName: "Tiêu đề",
        flex: 0.5,
      },
      {
        field: "description",
        headerName: "Mô tả",
        flex: 1,
      },
      {
        field: "Preview",
        headerName: "Preview",
        sortable: false,
        flex: 1,
        renderCell: (params) => (
          <div className="h-[150px] py-4">
            <div className="h-full border border-slate-200/10 bg-slate-900/40">
              <CodePreview
                htmlCode={params.row.htmlCode}
                cssCode={params.row.cssCode}
                jsCode={params.row.jsCode}
              />
            </div>
          </div>
        ),
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
        field: "status",
        headerName: "Trạng thái",
        sortable: false,
        flex: 1,
        renderCell: (params) => (
          <span className="rounded-xl bg-green-500 px-4 py-2 font-bold capitalize text-slate-900">
            {params.row.status}
          </span>
        ),
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
  const { data, isLoading } = useCodeTemplate()

  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: codeTemplateApi.deleteTemplate,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["code-template"])
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
        <h1 className="text-heading tracking-wider">Code Template</h1>
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
          Add Template Code
        </Button>
      </div>
      <div className="mt-5 px-10">
        <Table
          columns={columns}
          rows={data ?? []}
          pageSize={8}
          autoRowHeight
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
            type="Code Template"
          />
        )}
      </Modal>
    </div>
  )
}

export default CodeTemplatePage
