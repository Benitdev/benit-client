"use client"

import { blueGrey, grey } from "@mui/material/colors"
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
} from "@mui/x-data-grid"

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    flex: 0.5,
  },
  {
    field: "lastName",
    headerName: "Last name",
    flex: 1,
  },
  {
    field: "age",
    headerName: "Age",
    // type: "number",
    flex: 1,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,

    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridColumnHeaderParams) => (
      <div className="flex items-center gap-4">
        <button className="rounded-lg bg-green-600 px-3 py-2 font-bold text-slate-900 transition hover:scale-110 hover:brightness-150">
          View
        </button>
        <button className="rounded-lg bg-yellow-600 px-3 py-2 font-bold text-slate-900 transition hover:scale-110 hover:brightness-150">
          Edit
        </button>
        <button className="rounded-lg bg-red-600 px-3 py-2 font-bold text-slate-900 transition hover:scale-110 hover:brightness-150">
          Delete
        </button>
      </div>
    ),
  },
]

const rows = [
  {
    id: 1,
    lastName:
      "Snow   fsafafas fasf asf asfas fasffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    firstName: "Jon",
    age: 35,
  },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 122 },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
]

export default function Table() {
  return (
    <div className="h-[500px] w-full">
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
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
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
