import Link from "next/link"

type Props = {
  item: any
}

const NavItem = ({ item }: Props) => {
  return (
    <Link
      href={item.url}
      className="flex h-[48px] items-center gap-4 rounded-xl px-4"
    >
      <item.icon />
      <span>{item.title}</span>
    </Link>
  )
}

export default NavItem
