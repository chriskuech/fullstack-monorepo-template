import { Item as ItemModel } from '@prisma/client'
import { Item } from './schemas'

export const mapItemModelToEntity = (model: ItemModel): Item => ({
  id: model.id,
  name: model.name,
})
