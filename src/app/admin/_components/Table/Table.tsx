"use client"

import { TCategory } from "@/types"
import { LinearProgress } from "@mui/material"
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridValidRowModel,
  GridValueGetterParams,
} from "@mui/x-data-grid"

type Props = {
  columns: GridColDef[]
  rows: GridValidRowModel[]
  pageSize?: number
  autoRowHeight?: boolean
  isLoading: boolean
}

export default function Table({
  columns,
  rows,
  pageSize = 5,
  autoRowHeight = false,
  isLoading,
}: Props) {
  return (
    <div className="w-full">
      <DataGrid
        sx={{
          border: "none",
          color: "white",
          borderRadius: "1rem",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgb(0 0 0 / 0.4)",
            borderBottom: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderColor: "rgb(226 232 240 / 0.2)",
            backgroundColor: "rgb(0 0 0 / 0.4)",
          },
          "& .MuiTablePagination-root": {
            color: "white",
          },
          "& .MuiButtonBase-root": {
            color: "white",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgb(0 0 0 / 0.4)",
          },
          "& .MuiDataGrid-virtualScrollerContent": {
            backgroundColor: "rgb(30 41 59)",
          },
          ".MuiPaper-root": {
            backgroundColor: "rgb(30 41 59)",
          },
        }}
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        {...(autoRowHeight ? { getRowHeight: () => "auto" } : {})}
        loading={isLoading}
        slots={{
          loadingOverlay: LinearProgress,
        }}
      />
    </div>
  )
}
