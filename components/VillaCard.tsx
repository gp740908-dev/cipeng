'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Villa } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

interface VillaCardProps {
    villa: Villa
    index?: number
    variant?: 'default' | 'featured' | 'compact'
}

export default function VillaCard({ villa, index = 0, variant = 'default' }: VillaCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
        >
            <Link href={`/villas/${villa.id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-light mb-6">
                    <Image
                        src={villa.images[0]}
                        alt={villa.name}
                        fill
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />

                    {/* Arrow */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/0 group-hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <ArrowUpRight size={18} className="text-primary" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-2xl text-primary group-hover:text-accent transition-colors">
                            {villa.name}
                        </h3>
                        <span className="text-muted text-sm whitespace-nowrap">
                            {villa.bedrooms} BR
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-muted text-sm">
                            {villa.max_guests} Guests · {villa.bathrooms} Bath
                        </p>
                        <p className="text-primary font-medium">
                            {formatCurrency(villa.price_per_night)}
                            <span className="text-muted font-normal text-sm">/night</span>
                        </p>
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}
