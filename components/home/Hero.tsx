'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Calendar, Users, Search, ArrowRight, Pause, Play } from 'lucide-react'

// Featured villas data
const featuredVillas = [
    {
        id: '1',
        name: 'Villa Taman Surga',
        tagline: 'Tropical Paradise',
        description: 'A luxurious retreat surrounded by lush tropical gardens and infinity pool overlooking the rice terraces.',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
        bedrooms: 3,
        guests: 6,
        price: 4500000,
    },
    {
        id: '2',
        name: 'Villa Lotus Dream',
        tagline: 'Serene Elegance',
        description: 'Experience tranquility in this modern Balinese villa with private lotus pond and meditation pavilion.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
        bedrooms: 4,
        guests: 8,
        price: 5500000,
    },
    {
        id: '3',
        name: 'Villa Bambu Retreat',
        tagline: 'Nature Harmony',
        description: 'Eco-luxury bamboo architecture blending seamlessly with the surrounding jungle landscape.',
        image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1920&q=80',
        bedrooms: 2,
        guests: 4,
        price: 3800000,
    },
    {
        id: '4',
        name: 'Villa Sawah Indah',
        tagline: 'Rice Field Views',
        description: 'Wake up to stunning sunrise views over endless rice paddies in this exclusive hillside estate.',
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=80',
        bedrooms: 5,
        guests: 10,
        price: 6200000,
    },
]

export default function Hero() {
    const [current, setCurrent] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(2)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const minDate = new Date().toISOString().split('T')[0]

    // Auto-slide effect
    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrent((prev) => (prev + 1) % featuredVillas.length)
            }, 6000) // Change every 6 seconds
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isPlaying])

    const next = () => {
        setCurrent((prev) => (prev + 1) % featuredVillas.length)
    }

    const prev = () => {
        setCurrent((prev) => (prev - 1 + featuredVillas.length) % featuredVillas.length)
    }

    const goTo = (index: number) => {
        setCurrent(index)
    }

    const currentVilla = featuredVillas[current]

    return (
        <section className="relative h-screen min-h-[700px] overflow-hidden bg-gray-900">
            {/* Background Images with Crossfade */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <Image
                        src={currentVilla.image}
                        alt={currentVilla.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/30" />
                </motion.div>
            </AnimatePresence>

            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Upper Content */}
                <div className="flex-1 flex items-center px-6 md:px-12 lg:px-20 pt-24">
                    <div className="max-w-[1400px] mx-auto w-full">
                        <div className="max-w-2xl">
                            {/* Tagline */}
                            <motion.p
                                key={`tagline-${current}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-olive-400 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-6"
                            >
                                {currentVilla.tagline}
                            </motion.p>

                            {/* Villa Name */}
                            <motion.h1
                                key={`name-${current}`}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
                            >
                                {currentVilla.name.split(' ').slice(0, -1).join(' ')}{' '}
                                <span className="italic text-olive-400">
                                    {currentVilla.name.split(' ').slice(-1)}
                                </span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                key={`desc-${current}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed mb-8"
                            >
                                {currentVilla.description}
                            </motion.p>

                            {/* View Villa Button */}
                            <motion.div
                                key={`btn-${current}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <Link
                                    href={`/villas/${currentVilla.id}`}
                                    className="group inline-flex items-center gap-3 px-8 py-4 bg-olive-600 text-white font-medium text-sm tracking-[0.1em] uppercase hover:bg-olive-400 transition-all"
                                >
                                    <span>View Villa</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="px-6 md:px-12 lg:px-20 pb-8 md:pb-12">
                    <div className="max-w-[1400px] mx-auto w-full">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
                            {/* Slider Controls */}
                            <div className="flex items-center gap-6">
                                {/* Play/Pause */}
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors"
                                >
                                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                                </button>

                                {/* Navigation Arrows */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={prev}
                                        className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button
                                        onClick={next}
                                        className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>

                                {/* Progress Indicators */}
                                <div className="flex items-center gap-2">
                                    {featuredVillas.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goTo(index)}
                                            className={`h-1 transition-all duration-500 ${index === current
                                                    ? 'w-12 bg-olive-400'
                                                    : 'w-6 bg-white/30 hover:bg-white/50'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Counter */}
                                <div className="hidden md:flex items-center gap-2 text-white/60 text-sm">
                                    <span className="font-display text-xl text-white">{String(current + 1).padStart(2, '0')}</span>
                                    <span>/</span>
                                    <span>{String(featuredVillas.length).padStart(2, '0')}</span>
                                </div>
                            </div>

                            {/* Availability Calendar Widget */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="bg-white p-4 md:p-6 shadow-2xl w-full lg:max-w-xl"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <Calendar size={16} className="text-olive-600" />
                                    <span className="text-xs tracking-[0.15em] uppercase text-gray-500">Check Availability</span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                    {/* Check In */}
                                    <div className="col-span-1">
                                        <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">Check In</label>
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(e) => {
                                                setCheckIn(e.target.value)
                                                if (checkOut && e.target.value >= checkOut) {
                                                    setCheckOut('')
                                                }
                                            }}
                                            min={minDate}
                                            className="w-full px-2 py-2 border border-gray-200 text-sm focus:border-olive-600 outline-none transition-colors bg-gray-50"
                                        />
                                    </div>

                                    {/* Check Out */}
                                    <div className="col-span-1">
                                        <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">Check Out</label>
                                        <input
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            min={checkIn || minDate}
                                            className="w-full px-2 py-2 border border-gray-200 text-sm focus:border-olive-600 outline-none transition-colors bg-gray-50"
                                        />
                                    </div>

                                    {/* Guests */}
                                    <div className="col-span-1">
                                        <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">Guests</label>
                                        <div className="relative">
                                            <Users size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <select
                                                value={guests}
                                                onChange={(e) => setGuests(Number(e.target.value))}
                                                className="w-full pl-7 pr-2 py-2 border border-gray-200 text-sm focus:border-olive-600 outline-none transition-colors bg-gray-50 appearance-none"
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Search Button */}
                                    <div className="col-span-1 flex items-end">
                                        <Link
                                            href={`/villas?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-olive-600 text-white text-sm font-medium hover:bg-olive-900 transition-colors"
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

            {/* Villa Thumbnails - Desktop Only */}
            <div className="absolute bottom-32 right-20 z-20 hidden xl:flex items-center gap-3">
                {featuredVillas.map((villa, index) => (
                    <button
                        key={villa.id}
                        onClick={() => goTo(index)}
                        className={`relative overflow-hidden transition-all duration-500 ${index === current
                                ? 'w-20 h-20 ring-2 ring-olive-400 ring-offset-2 ring-offset-gray-900'
                                : 'w-16 h-16 opacity-60 hover:opacity-100'
                            }`}
                    >
                        <Image
                            src={villa.image}
                            alt={villa.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                        />
                    </button>
                ))}
            </div>
        </section>
    )
}
