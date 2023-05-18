"use client"
import { useState, useMemo } from "react"

import Button from "@/components/common/Button"
import { Modal } from "@mui/material"
import type {
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
} from "@mui/x-data-grid"
import dayjs from "dayjs"
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import Table from "../../_components/Table/Table"
import AccountForm from "./BlogForm"
import { TAction, TCategory } from "@/types"
import DeleteForm from "../../_components/Form/DeleteForm"
import { usePosts } from "@/hooks/usePosts"
import Image from "next/image"
import { toastErrorUtil } from "@/utils/toastErrorUtil"
import postApi from "@/api/postApi"

type Props = {}

const BlogPage = ({}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  const [action, setAction] = useState<TAction>(TAction.Add)
  const [selectedRow, setSelectedRow] = useState<TCategory | null>(null)

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 100 },
      {
        field: "title",
        headerName: "Tiêu đề",
        flex: 0.5,
        minWidth: 200,
      },
      {
        field: "slug",
        headerName: "Slug",
        flex: 1,
        minWidth: 200,
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
        field: "status",
        headerName: "Trạng thái",
        flex: 0.5,
        minWidth: 120,
        renderCell: (params) => (
          <span className="rounded-xl bg-green-500 px-4 py-2 font-bold capitalize text-slate-900">
            {params.row.status}
          </span>
        ),
      },
      {
        field: "createdAt",
        headerName: "Ngày tạo",
        sortable: false,
        flex: 1,
        minWidth: 200,
        valueGetter: (params: GridValueGetterParams) =>
          dayjs(params.row.createdAt).format("DD-MM-YYYY HH:mm"),
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
  const queryClient = useQueryClient()

  const { data, isLoading } = usePosts()

  const deleteMutation = useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"])
      toast.success(data.message)
      setIsOpenForm(false)
    },
    onError: (error) => {
      toastErrorUtil(error, "Delete failed!")
    },
  })

  const handleClose = () => setIsOpenForm((prev) => !prev)
  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-100/20 px-10 py-6">
        <h1 className="text-heading">Bài viết</h1>
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
          Thêm bài viết
        </Button>
      </div>
      <div className="mt-5 px-10">
        <Table
          columns={columns}
          rows={data ?? []}
          pageSize={8}
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
        {action !== TAction.Delete ? (
          <AccountForm
            toggleForm={handleClose}
            action={action}
            selectedRow={selectedRow ?? {}}
          />
        ) : (
          <DeleteForm
            toggleForm={handleClose}
            selectedRowId={selectedRow?._id as string}
            handleDelete={deleteMutation.mutate}
            type="bài viết"
          />
        )}
      </Modal>
    </div>
  )
}

export default BlogPage