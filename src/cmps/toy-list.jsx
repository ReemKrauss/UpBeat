import { ToyPreview } from './toy-preview'

export function ToyList({ toys }) {
  return (
    <div className="toy-list">
      {toys.map((toy) => {
        return <ToyPreview key={toy._id} toy={toy} />
      })}
    </div>
  )
}
