'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { useRef } from 'react'

interface Breadcrumb {
    label: string
    href?: string
}

interface PageHeaderProps {
    title: string
    subtitle?: string
    backgroundImage?: string
    breadcrumbs?: Breadcrumb[]
    overlay?: 'light' | 'dark' | 'gradient'
    height?: 'small' | 'medium' | 'large'
}

export default function PageHeader({
    title,
    subtitle,
    backgroundImage = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80',
    breadcrumbs = [],
    overlay = 'gradient',
    height = 'medium'
}: PageHeaderProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    const heightClasses = {
        small: 'h-[280px] md:h-[320px]',
        medium: 'h-[350px] md:h-[420px]',
        large: 'h-[450px] md:h-[520px]'
    }

    const overlayClasses = {
        light: 'bg-white/30',
        dark: 'bg-black/50',
        gradient: 'bg-gradient-to-b from-black/60 via-black/40 to-cream'
    }

    return (
        <div ref={ref} className={`relative ${heightClasses[height]} overflow-hidden`}>
            {/* Parallax Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 w-full h-[130%]"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            </motion.div>

            {/* Overlay */}
            <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute -top-20 -right-20 w-80 h-80 bg-sage rounded-full blur-3xl"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.08, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    className="absolute -bottom-20 -left-20 w-60 h-60 bg-sage-light rounded-full blur-3xl"
                />
            </div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center"
            >
                {/* Breadcrumbs */}
                {breadcrumbs.length > 0 && (
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6"
                        aria-label="Breadcrumb"
                    >
                        <ol className="flex items-center justify-center flex-wrap gap-2 text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center text-white/80 hover:text-sage-light transition-colors"
                                >
                                    <Home size={16} className="mr-1" />
                                    <span>Home</span>
                                </Link>
                            </li>
                            {breadcrumbs.map((crumb, index) => (
                                <li key={index} className="flex items-center">
                                    <ChevronRight size={16} className="text-white/50 mx-1" />
                                    {crumb.href ? (
                                        <Link
                                            href={crumb.href}
                                            className="text-white/80 hover:text-sage-light transition-colors"
                                        >
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className="text-sage-light font-medium">
                                            {crumb.label}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </motion.nav>
                )}

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                >
                    <span className="relative">
                        {title}
                        <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-sage to-sage-light rounded-full"
                        />
                    </span>
                </motion.h1>

                {/* Subtitle */}
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-lg md:text-xl text-white/90 max-w-2xl"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </motion.div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z"
                        className="fill-cream/30"
                    />
                    <path
                        d="M0 60V40C360 20 720 10 1080 20C1260 25 1380 35 1440 40V60H0Z"
                        className="fill-cream"
                    />
                </svg>
            </div>
        </div>
    )
}
