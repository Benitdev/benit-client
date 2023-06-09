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

import Table from "../../_components/Table/Table"
import CodeCateForm from "./CodeTemplateForm"
import { TAction, TCategory, TFilter } from "@/types"
import DeleteForm from "../../_components/Form/DeleteForm"
import { useCodeTemplate } from "@/hooks"
import CodePreview from "@/components/ui/CodePreview"
import codeTemplateApi from "@/api/client-side/codeTemplateApi"
import { STATUS } from "@/constants/status"
import { cn } from "@/utils/cn"
import { formatDateTime } from "@/utils/dayUtil"
import CodeViewer from "./CodeViewer"
import Filter from "../../_components/Filter/Filter"

type Props = {}

const CodeTemplatePage = ({}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  const [action, setAction] = useState<TAction>(TAction.Add)
  const [selectedRow, setSelectedRow] = useState<TCategory | null>(null)
  const [filter, setFilter] = useState<TFilter>({})

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 90 },
      {
        field: "title",
        headerName: "Tiêu đề",
        flex: 0.5,
        minWidth: 150,
      },
      {
        field: "description",
        headerName: "Mô tả",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "Preview",
        headerName: "Preview",
        sortable: false,
        minWidth: 150,
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
        field: "authorId",
        headerName: "Tác giả",
        flex: 0.5,
        minWidth: 150,
        renderCell: (params) => (
          <span className="rounded-xl bg-red-500 px-4 py-2 font-bold capitalize text-slate-900">
            {params.row.authorId.fullName}
          </span>
        ),
      },
      {
        field: "createdAt",
        headerName: "Ngày tạo",
        sortable: false,
        minWidth: 150,
        flex: 1,
        valueGetter: (params: GridValueGetterParams) =>
          formatDateTime(params.row.createdAt),
      },
      {
        field: "status",
        headerName: "Trạng thái",
        sortable: false,
        minWidth: 150,
        flex: 1,
        renderCell: (params) => (
          <span
            className={cn(
              "rounded-xl px-4 py-2 font-bold capitalize text-slate-900",
              STATUS[params.row.status as string].color
            )}
          >
            {STATUS[params.row.status as string].label}
          </span>
        ),
      },
      {
        field: "action",
        headerName: "",
        flex: 1,
        minWidth: 250,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <div className="flex items-center gap-4">
            <button
              className="rounded-lg bg-green-600 px-3 py-2 font-bold text-slate-900 transition hover:scale-110 hover:brightness-150"
              onClick={() => {
                setSelectedRow(params.row)
                setAction(TAction.View)
                setIsOpenForm(true)
              }}
            >
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
  const { data, isLoading } = useCodeTemplate(filter)

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
        <h1 className="text-heading font-bold tracking-wider">Code Template</h1>
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
        <Filter
          page="code"
          value={filter}
          setValue={setFilter}
          isLoading={isLoading}
        />
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
        {action === TAction.Delete ? (
          <DeleteForm
            toggleForm={handleClose}
            selectedRowId={selectedRow?._id as string}
            handleDelete={deleteMutation.mutate}
            type="Code Template"
          />
        ) : action === TAction.View ? (
          <CodeViewer
            toggleForm={handleClose}
            selectedRow={selectedRow ?? {}}
          />
        ) : (
          <CodeCateForm
            toggleForm={handleClose}
            action={action}
            selectedRow={selectedRow ?? {}}
          />
        )}
      </Modal>
    </div>
  )
}

export default CodeTemplatePage
