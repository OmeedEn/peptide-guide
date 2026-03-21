import { suppliers } from '@/data/suppliers'
import SupplierDetail from './SupplierDetail'

export function generateStaticParams() {
  return suppliers.map((s) => ({ id: s.id }))
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const supplier = suppliers.find((s) => s.id === params.id)
  return {
    title: supplier ? `${supplier.name} — PeptideGuide` : 'Supplier — PeptideGuide',
    description: supplier?.description,
  }
}

export default function SupplierPage({ params }: { params: { id: string } }) {
  return <SupplierDetail supplierId={params.id} />
}
