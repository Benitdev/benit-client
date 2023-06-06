import { Alert, AlertColor, Snackbar } from "@mui/material"

type Props = {
  open: boolean
  text: string
  type?: AlertColor
  handleClose: () => void
}

export default function ToastSuccess({ open, text, type, handleClose }: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={null}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{
          width: "100%",
        }}
        variant="filled"
      >
        {text}
      </Alert>
    </Snackbar>
  )
}
