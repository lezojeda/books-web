type Props = {
  items: string[]
}

export const UnorderedStringList = ({ items }: Props) => {
  return (
    <ul className="border w-full flex flex-col items-center">
      {items.map((item, index) => (
        <li key={item + index}>{item}</li>
      ))}
    </ul>
  )
}
