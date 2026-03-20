import { peptides } from '@/data/peptides'
import PeptideDetail from './PeptideDetail'

export function generateStaticParams() {
  return peptides.map((p) => ({ id: p.id }))
}

export default function PeptideDetailPage({ params }: { params: { id: string } }) {
  return <PeptideDetail id={params.id} />
}
