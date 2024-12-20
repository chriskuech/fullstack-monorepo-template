import 'server-only'
import assert from 'assert'
import { revalidateTag } from 'next/cache'
import { client } from './api-client'
import { Item } from './types'

const tag = 'Item'

export const createItem = async (body: { name: string }): Promise<Item> => {
  revalidateTag(tag)

  const { data } = await client().POST('/api/items/', { body })

  assert(data, 'No item found')

  return data
}

export const getItems = async (): Promise<Item[]> => {
  const { data } = await client().GET('/api/items/', {
    next: { tags: [tag] },
  })

  assert(data, 'No items found')

  return data
}

export const getItem = async (id: number): Promise<Item> => {
  const { data } = await client().GET('/api/items/{id}', {
    params: { path: { id } },
    next: { tags: [tag] },
  })

  assert(data, 'No item found')

  return data
}

export const updateItem = async (
  id: number,
  body: { name: string },
): Promise<Item> => {
  revalidateTag(tag)

  const { data } = await client().PUT('/api/items/{id}', {
    params: { path: { id } },
    body,
  })

  assert(data, 'No item found')

  return data
}

export const deleteItem = async (id: number): Promise<Item> => {
  revalidateTag(tag)

  const { data } = await client().DELETE('/api/items/{id}', {
    params: { path: { id } },
  })

  assert(data, 'No item found')

  return data
}
