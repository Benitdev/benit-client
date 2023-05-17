type Props = {
  item: any
}

const According = ({ item }: Props) => {
  return (
    <div className="p-4">
      <div className="flex justify-between gap-2">
        <span>{item.name}</span>
        <span>{item.count}</span>
      </div>
    </div>
  )
}

export default According
