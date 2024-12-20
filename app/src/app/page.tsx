import { Items } from './items/Items'

export default async function Home() {
  return (
    <div style={{ margin: '1rem auto', width: '500px' }}>
      <h1>Hello World</h1>
      <Items />
    </div>
  )
}
