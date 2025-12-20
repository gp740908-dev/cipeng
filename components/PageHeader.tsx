'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface PageHeaderProps {
    title: string
    subtitle?: string
    backgroundImage?: string
    breadcrumbs?: BreadcrumbItem[]
    overlay?: 'light' | 'dark' | 'gradient'
    height?: 'small' | 'medium' | 'large'
}

export default function PageHeader({
    title,
    subtitle,
    backgroundImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    breadcrumbs = [],
    overlay = 'dark',
    height = 'medium'
}: PageHeaderProps) {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

    const heightClasses = {
        small: 'h-[50vh] min-h-[400px]',
        medium: 'h-[65vh] min-h-[500px]',
        large: 'h-[80vh] min-h-[600px]'
    }

    return (
        <header ref={ref} className={`relative ${heightClasses[height]} overflow-hidden bg-primary`}>
            {/* Parallax Background */}
            <motion.div
                style={{ y: backgroundY, scale }}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-primary/50" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24"
            >
                <div className="max-w-[1400px] mx-auto w-full">
                    {/* Breadcrumbs */}
                    {breadcrumbs.length > 0 && (
                        <motion.nav
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center gap-2 text-sm text-white/60 mb-8"
                        >
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            {breadcrumbs.map((item, index) => (
                                <span key={index} className="flex items-center gap-2">
                                    <ChevronRight size={14} />
                                    {item.href ? (
                                        <Link href={item.href} className="hover:text-white transition-colors">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className="text-white">{item.label}</span>
                                    )}
                                </span>
                            ))}
                        </motion.nav>
                    )}

                    {/* Title */}
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display text-display-xl text-white mb-6"
                        >
                            {title}
                        </motion.h1>
                    </div>

                    {/* Subtitle */}
                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-white/70 text-lg md:text-xl max-w-2xl"
                        >
                            {subtitle}
                        </motion.p>
                    )}
                </div>
            </motion.div>

            {/* Scroll Line */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"
                />
            </motion.div>
        </header>
    )
}
