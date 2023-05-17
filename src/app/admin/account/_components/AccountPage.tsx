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
import AccountForm from "./AccountForm"
import dayjs from "dayjs"
import { TAction, TCategory } from "@/types"
import DeleteForm from "../../_components/Form/DeleteForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import categoryApi from "@/api/categoryApi"
import { toast } from "react-toastify"
import { useAccount } from "@/hooks"

import { cookies } from "next/headers"

type Props = {}

const AccountPage = ({}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  const [action, setAction] = useState<TAction>(TAction.Add)
  const [selectedRow, setSelectedRow] = useState<TCategory | null>(null)

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 100 },
      {
        field: "fullName",
        headerName: "Họ và tên",
        flex: 0.5,
        minWidth: 100,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        minWidth: 200,
      },
      {
        field: "role",
        headerName: "Vai trò",
        flex: 0.3,
        minWidth: 140,
        renderCell: (params) => {
          let role: string = ""
          switch (params.row.role) {
            case "user":
              role = "người dùng"
              break
            case "admin":
              role = "quản trị"
              break
            case "staff":
              role = "nhân viên"
              break
          }
          return (
            <span className="rounded-xl bg-pink-700 px-2 py-1 text-sm font-bold capitalize text-slate-900">
              {role}
            </span>
          )
        },
      },
      {
        field: "status",
        headerName: "Trạng thái",
        flex: 0.5,
        minWidth: 100,
        renderCell: (params) => (
          <span className="rounded-xl bg-green-500 px-4 py-2 font-bold capitalize text-slate-900">
            {params.row.status}
          </span>
        ),
      },
      {
        field: "createdAt",
        headerName: "Ngày tạo",
        flex: 0.8,
        minWidth: 200,
        valueGetter: (params: GridValueGetterParams) =>
          dayjs(params.row.createdAt).format("DD-MM-YYYY HH:mm"),
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

  const { data, isLoading } = useAccount()

  const deleteMutation = useMutation({
    mutationFn: categoryApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["accounts"])
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
        <h1 className="text-heading">Tài khoản</h1>
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
          Thêm tài khoản
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
            type="tài khoản"
          />
        )}
      </Modal>
    </div>
  )
}

export default AccountPage
