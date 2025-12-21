'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Calendar, Users, Search, ArrowRight, Pause, Play } from 'lucide-react'

interface FeaturedVilla {
    id: string
    name: string
    tagline: string
    description: string
    image: string
    bedrooms: number
    guests: number
    price: number
}

interface HeroClientProps {
    villas: FeaturedVilla[]
}

export default function HeroClient({ villas }: HeroClientProps) {
    const [current, setCurrent] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(2)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const heroRef = useRef<HTMLElement>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const minDate = new Date().toISOString().split('T')[0]

    // Track mouse for parallax effect
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!heroRef.current) return
        const { clientX, clientY } = e
        const { width, height } = heroRef.current.getBoundingClientRect()
        setMousePosition({
            x: (clientX / width - 0.5) * 20,
            y: (clientY / height - 0.5) * 20,
        })
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [handleMouseMove])

    // Auto-slide
    useEffect(() => {
        if (isPlaying && villas.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrent((prev) => (prev + 1) % villas.length)
            }, 5000)
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isPlaying, villas.length])

    const next = () => setCurrent((prev) => (prev + 1) % villas.length)
    const prev = () => setCurrent((prev) => (prev - 1 + villas.length) % villas.length)
    const goTo = (index: number) => setCurrent(index)

    const currentVilla = villas[current]

    if (!currentVilla) return null

    return (
        <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden bg-gray-900">
            {/* Background with Parallax */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <motion.div
                        animate={{ x: mousePosition.x, y: mousePosition.y }}
                        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
                        className="absolute inset-[-20px]"
                    >
                        <Image
                            src={currentVilla.image}
                            alt={currentVilla.name}
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/30" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
                <div className="flex-1 flex items-center px-6 md:px-12 lg:px-20 pt-24">
                    <div className="max-w-[1400px] mx-auto w-full">
                        <div className="max-w-2xl">
                            {/* Tagline */}
                            <motion.p
                                key={`tagline-${current}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="text-olive-400 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-6"
                            >
                                {currentVilla.tagline}
                            </motion.p>

                            {/* Title with split animation */}
                            <div className="overflow-hidden mb-6">
                                <motion.h1
                                    key={`name-${current}`}
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1]"
                                >
                                    {currentVilla.name.split(' ').slice(0, -1).join(' ')}{' '}
                                    <span className="italic text-olive-400">
                                        {currentVilla.name.split(' ').slice(-1)}
                                    </span>
                                </motion.h1>
                            </div>

                            {/* Description */}
                            <motion.p
                                key={`desc-${current}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed mb-8"
                            >
                                {currentVilla.description}
                            </motion.p>

                            {/* CTA Button with hover effect */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <Link
                                    href={`/villas/${currentVilla.id}`}
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-olive-600 text-white font-medium text-sm tracking-[0.1em] uppercase overflow-hidden"
                                >
                                    <span className="relative z-10">View Villa</span>
                                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                    <motion.div
                                        className="absolute inset-0 bg-olive-400"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="px-6 md:px-12 lg:px-20 pb-8 md:pb-12">
                    <div className="max-w-[1400px] mx-auto w-full">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
                            {/* Controls */}
                            <div className="flex items-center gap-4 md:gap-6">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors"
                                >
                                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                                </motion.button>

                                <div className="flex items-center gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={prev}
                                        className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors"
                                    >
                                        <ChevronLeft size={18} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={next}
                                        className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors"
                                    >
                                        <ChevronRight size={18} />
                                    </motion.button>
                                </div>

                                {/* Progress */}
                                <div className="flex items-center gap-2">
                                    {villas.map((_, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => goTo(index)}
                                            className="relative h-1 overflow-hidden"
                                            initial={false}
                                            animate={{ width: index === current ? 48 : 24 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="absolute inset-0 bg-white/30" />
                                            {index === current && (
                                                <motion.div
                                                    className="absolute inset-0 bg-olive-400"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ duration: 5, ease: 'linear' }}
                                                    style={{ transformOrigin: 'left' }}
                                                    key={`progress-${current}`}
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>

                                <div className="hidden md:flex items-center gap-2 text-white/60 text-sm font-mono">
                                    <span className="text-xl text-white">{String(current + 1).padStart(2, '0')}</span>
                                    <span>/</span>
                                    <span>{String(villas.length).padStart(2, '0')}</span>
                                </div>
                            </div>

                            {/* Calendar Widget */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-white p-4 md:p-6 shadow-2xl w-full lg:max-w-xl"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <Calendar size={16} className="text-olive-600" />
                                    <span className="text-xs tracking-[0.15em] uppercase text-gray-500">Check Availability</span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                    <div className="col-span-1">
                                        <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">Check In</label>
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(e) => {
                                                setCheckIn(e.target.value)
                                                if (checkOut && e.target.value >= checkOut) setCheckOut('')
                                            }}
                                            min={minDate}
                                            className="w-full px-2 py-2.5 border border-gray-200 text-sm focus:border-olive-600 outline-none transition-colors bg-gray-50 hover:border-gray-300"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">Check Out</label>
                                        <input
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            min={checkIn || minDate}
                                            className="w-full px-2 py-2.5 border border-gray-200 text-sm focus:border-olive-600 outline-none transition-colors bg-gray-50 hover:border-gray-300"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">Guests</label>
                                        <div className="relative">
                                            <Users size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <select
                                                value={guests}
                                                onChange={(e) => setGuests(Number(e.target.value))}
                                                className="w-full pl-7 pr-2 py-2.5 border border-gray-200 text-sm focus:border-olive-600 outline-none transition-colors bg-gray-50 appearance-none hover:border-gray-300"
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex items-end">
                                        <Link
                                            href={`/villas?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-olive-600 text-white text-sm font-medium hover:bg-olive-900 transition-colors"
                                        >
                                            <Search size={16} />
                                            <span className="hidden md:inline">Search</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-32 right-20 z-20 hidden xl:flex items-center gap-3">
                {villas.map((villa, index) => (
                    <motion.button
                        key={villa.id}
                        onClick={() => goTo(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative overflow-hidden transition-all duration-300 ${index === current
                                ? 'w-20 h-20 ring-2 ring-olive-400 ring-offset-2 ring-offset-gray-900'
                                : 'w-16 h-16 opacity-50 hover:opacity-100'
                            }`}
                    >
                        <Image src={villa.image} alt={villa.name} fill className="object-cover" sizes="80px" />
                    </motion.button>
                ))}
            </div>
        </section>
    )
}
