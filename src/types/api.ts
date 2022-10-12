export type Error = {
  statusCode: number
  message: string
  error: string
}

export type Collection<ItemType> = {
  kind: string
  totalItems: number
  items: ItemType[]
}
