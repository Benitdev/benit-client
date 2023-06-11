type Status = {
  [key: string]: {
    label: string
    color: string
  }
}

export const STATUS: Status = {
  approved: {
    label: "đã phê duyệt",
    color: "bg-green-500",
  },
  rejects: {
    label: "từ chối",
    color: "bg-red-500",
  },
  pending: {
    label: "chờ duyệt",
    color: "bg-orange-500",
  },
}

export const ACCOUNT_ROLES: Status = {
  admin: {
    label: "Quản trị",
    color: "bg-red-500",
  },
  user: {
    label: "Người dùng",
    color: "bg-yellow-600",
  },
}

export const ACCOUNT_STATUS: Status = {
  active: {
    label: "Bình thường",
    color: "bg-green-500",
  },
  banned: {
    label: "Đã khoá",
    color: "bg-orange-600",
  },
  deleted: {
    label: "Đã xoá",
    color: "bg-red-600",
  },
}
