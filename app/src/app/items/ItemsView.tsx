'use client'

import { FC, useState } from 'react'
import { Item } from '@/client/types'
import { createItem, deleteItem } from '@/actions/item'

type Props = {
  items: Item[]
}

export const ItemsView: FC<Props> = ({ items }) => {
  const [name, setName] = useState('')

  return (
    <div>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          disabled={!name}
          onClick={() => {
            if (!name) return

            createItem({ name })
            setName('')
          }}
        >
          Add
        </button>
      </div>
      <div>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}
              <button
                onClick={() => {
                  deleteItem(item.id)
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
