'use server'

import * as client from '@/client/item'

// TODO: add session auth and error handling in these actions

export const createItem = async (body: { name: string }) => {
  const item = await client.createItem(body)

  return item
}

export const updateItem = async (id: number, body: { name: string }) => {
  const item = await client.updateItem(id, body)

  return item
}

export const deleteItem = async (id: number) => {
  const item = await client.deleteItem(id)

  return item
}

export const getItem = async (id: number) => {
  const item = await client.getItem(id)

  return item
}

export const getItems = async () => {
  const items = await client.getItems()

  return items
}
