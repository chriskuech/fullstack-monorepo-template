import { prisma } from '@/integrations/prisma'
import { mapItemModelToEntity } from './mappers'

export const createItem = (data: { name: string }) =>
  prisma.item.create({ data }).then(mapItemModelToEntity)

export const getItem = async (id: number) => {
  const model = await prisma.item.findUnique({
    where: { id },
  })

  return model && mapItemModelToEntity(model)
}

export const getItems = () =>
  prisma.item.findMany().then((items) => items.map(mapItemModelToEntity))

export const updateItem = (id: number, data: { name: string }) =>
  prisma.item
    .update({
      where: { id },
      data,
    })
    .then(mapItemModelToEntity)

export const deleteItem = (id: number) => prisma.item.delete({ where: { id } })
