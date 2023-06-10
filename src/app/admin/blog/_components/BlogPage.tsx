"use client"
import { useState, useMemo } from "react"

import Button from "@/components/common/Button"
import { Modal } from "@mui/material"
import type {
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
} from "@mui/x-data-grid"
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import Table from "../../_components/Table/Table"
import BlogForm from "./BlogForm"
import { TFilter, TAction, TPost } from "@/types"
import DeleteForm from "../../_components/Form/DeleteForm"
import { usePosts } from "@/hooks/usePosts"
import Image from "next/image"
import { toastErrorUtil } from "@/utils/toastErrorUtil"
import postApi from "@/api/client-side/postApi"
import { cn } from "@/utils/cn"
import { STATUS } from "@/constants/status"
import { formatDateTime } from "@/utils/dayUtil"
import BlogViewer from "./BlogViewer"
import Filter from "../../_components/Filter/Filter"

type Props = {}

const BlogPage = ({}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  const [action, setAction] = useState<TAction>(TAction.Add)
  const [selectedRow, setSelectedRow] = useState<TPost | null>(null)
  const [filter, setFilter] = useState<TFilter>({})

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 80 },
      {
        field: "title",
        headerName: "Tiêu đề",
        flex: 0.5,
        minWidth: 200,
      },
      {
        field: "description",
        headerName: "Mô tả",
        flex: 1,
        minWidth: 250,
      },
      {
        field: "tags",
        headerName: "Tags",
        flex: 0.5,
        minWidth: 250,
        renderCell: (params) => (
          <div className="flex flex-wrap gap-2">
            {params.row.tags.map((tag: any) => (
              <span
                key={tag._id}
                className="rounded-xl bg-red-500 px-2 py-1 text-sm text-slate-900"
              >
                {tag.title}
              </span>
            ))}
          </div>
        ),
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
        field: "status",
        headerName: "Trạng thái",
        flex: 0.5,
        minWidth: 150,
        renderCell: (params) => {
          let bg: string = ""
          switch (params.row.status) {
            case "approved": {
              bg = "bg-green-500"
              break
            }
            case "rejects": {
              bg = "bg-red-500"
              break
            }
            case "pending": {
              bg = "bg-orange-500"
              break
            }
          }

          return (
            <span
              className={cn(
                "rounded-xl px-4 py-2 font-bold capitalize text-slate-900",
                bg
              )}
            >
              {STATUS[params.row.status as string].label}
            </span>
          )
        },
      },
      {
        field: "createdAt",
        headerName: "Ngày tạo",
        sortable: false,
        flex: 1,
        minWidth: 200,
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
  const queryClient = useQueryClient()

  const { data, isLoading } = usePosts(filter)
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
        <h1 className="text-heading font-bold">Bài viết</h1>
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
        <Filter
          page="blog"
          value={filter}
          setValue={setFilter}
          isLoading={isLoading}
          hasFeature
        />
        <Table
          columns={columns}
          rows={data?.data ?? []}
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
        {action === TAction.Delete ? (
          <DeleteForm
            toggleForm={handleClose}
            selectedRowId={selectedRow?._id as string}
            handleDelete={deleteMutation.mutate}
            type="Xoá bài viếT"
          />
        ) : action === TAction.View ? (
          <BlogViewer toggleForm={handleClose} selectedRow={selectedRow} />
        ) : (
          <BlogForm
            toggleForm={handleClose}
            action={action}
            selectedRow={selectedRow!}
          />
        )}
      </Modal>
    </div>
  )
}

export default BlogPage
