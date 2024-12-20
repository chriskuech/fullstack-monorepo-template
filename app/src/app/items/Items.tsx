import 'server-only'

import { getItems } from '@/actions/item'
import { ItemsView } from './ItemsView'

export const Items = async () => {
  const items = await getItems()

  return <ItemsView items={items} />
}
