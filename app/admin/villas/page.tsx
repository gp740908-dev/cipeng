'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Home,
    Plus,
    Edit,
    Trash2,
    Eye,
    Loader2,
} from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Villa } from '@/types'
import { formatCurrency } from '@/lib/utils'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminVillasPage() {
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = useState(true)
    const [villas, setVillas] = useState<Villa[]>([])
    const [deleting, setDeleting] = useState<string | null>(null)

    useEffect(() => {
        checkAuth()
        fetchVillas()
    }, [])

    async function checkAuth() {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            router.push('/admin/login')
            return
        }
    }

    async function fetchVillas() {
        try {
            const { data, error } = await supabase
                .from('villas')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setVillas(data || [])
        } catch (error) {
            console.error('Error fetching villas:', error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Apakah Anda yakin ingin menghapus villa ini?')) return

        setDeleting(id)
        try {
            const { error } = await supabase
                .from('villas')
                .delete()
                .eq('id', id)

            if (error) throw error
            setVillas(villas.filter(v => v.id !== id))
        } catch (error) {
            console.error('Error deleting villa:', error)
            alert('Gagal menghapus villa')
        } finally {
            setDeleting(null)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-display text-gray-900">Kelola Villa</h2>
                            <p className="text-gray-500 text-sm">Tambah, edit, dan hapus villa</p>
                        </div>
                        <Link
                            href="/admin/villas/new"
                            className="flex items-center gap-2 px-4 py-2 bg-olive-600 text-white text-sm font-medium hover:bg-olive-900 transition-colors"
                        >
                            <Plus size={16} />
                            <span>Tambah Villa</span>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <Loader2 size={40} className="animate-spin text-olive-600 mx-auto" />
                            <p className="mt-4 text-gray-500 text-sm">Memuat data villa...</p>
                        </div>
                    ) : villas.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-gray-100">
                            <Home size={48} className="text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 mb-4">Belum ada villa</p>
                            <Link
                                href="/admin/villas/new"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-olive-600 text-white text-sm hover:bg-olive-900 transition-colors"
                            >
                                <Plus size={16} />
                                <span>Tambah Villa Pertama</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white border border-gray-100">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Villa</th>
                                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Harga/Malam</th>
                                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Kamar</th>
                                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Maks Tamu</th>
                                        <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {villas.map((villa) => (
                                        <motion.tr
                                            key={villa.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-16 h-12 overflow-hidden bg-gray-100">
                                                        {villa.images?.[0] && (
                                                            <Image
                                                                src={villa.images[0]}
                                                                alt={villa.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{villa.name}</p>
                                                        <p className="text-xs text-gray-400">{villa.location}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="font-medium text-olive-600">
                                                    {formatCurrency(villa.price_per_night)}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {villa.bedrooms} kamar
                                            </td>
                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {villa.max_guests} orang
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        href={`/villas/${villa.id}`}
                                                        target="_blank"
                                                        className="p-2 hover:bg-gray-100 transition-colors text-gray-400 hover:text-olive-600"
                                                        title="Lihat di Website"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/villas/${villa.id}/edit`}
                                                        className="p-2 hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600"
                                                        title="Edit"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(villa.id)}
                                                        disabled={deleting === villa.id}
                                                        className="p-2 hover:bg-gray-100 transition-colors text-gray-400 hover:text-red-600 disabled:opacity-50"
                                                        title="Hapus"
                                                    >
                                                        {deleting === villa.id ? (
                                                            <Loader2 size={18} className="animate-spin" />
                                                        ) : (
                                                            <Trash2 size={18} />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
