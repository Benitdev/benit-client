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
import { TAction, TCategory, TFilter } from "@/types"
import DeleteForm from "../../_components/Form/DeleteForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import categoryApi from "@/api/client-side/categoryApi"
import { toast } from "react-toastify"
import { useAccount } from "@/hooks"

import Avatar from "@/components/ui/Avatar"
import { ACCOUNT_ROLES, ACCOUNT_STATUS } from "@/constants/status"
import { cn } from "@/utils/cn"
import { formatDateTime } from "@/utils/dayUtil"
import Filter from "../../_components/Filter/Filter"

type Props = {}

const AccountPage = ({}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)
  const [action, setAction] = useState<TAction>(TAction.Add)
  const [selectedRow, setSelectedRow] = useState<TCategory | null>(null)
  const [filter, setFilter] = useState<TFilter>({})

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 100 },
      {
        field: "avatar",
        headerName: "Ảnh",
        flex: 0.3,
        minWidth: 60,
        renderCell: (params) => <Avatar avatar={params.row.avatar} />,
      },
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
        minWidth: 150,
        renderCell: (params) => (
          <span
            className={cn(
              "rounded-xl px-4 py-2 font-bold capitalize text-slate-900",
              ACCOUNT_ROLES[params.row.role as string].color
            )}
          >
            {ACCOUNT_ROLES[params.row.role as string].label}
          </span>
        ),
      },
      {
        field: "status",
        headerName: "Trạng thái",
        flex: 0.5,
        minWidth: 150,
        renderCell: (params) => {
          let bg
          switch (params.row.status) {
            case "active": {
              bg = "bg-green-500"
              break
            }
            case "banned": {
              bg = "bg-orange-600"
              break
            }
            case "deleted": {
              bg = "bg-red-600"
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
              {ACCOUNT_STATUS[params.row.status as string].label}
            </span>
          )
        },
      },
      {
        field: "createdAt",
        headerName: "Ngày tạo",
        flex: 0.8,
        minWidth: 200,
        valueGetter: (params: GridValueGetterParams) =>
          formatDateTime(params.row.createdAt),
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
              Khoá
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
        <Filter
          page="account"
          value={filter}
          setValue={setFilter}
          isLoading={isLoading}
        />
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
