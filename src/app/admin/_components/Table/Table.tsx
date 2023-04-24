"use client"

import { TCourseCate } from "@/types"
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
} from "@mui/x-data-grid"

type Props = {
  columns: GridColDef[]
  rows: TCourseCate[]
  pageSize?: number
}

export default function Table({ columns, rows, pageSize = 5 }: Props) {
  return (
    <div className="max-h-[800px] w-full">
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
      />
    </div>
  )
}
