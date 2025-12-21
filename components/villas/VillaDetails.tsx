'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bed, Bath, Users, MapPin, Check, ChevronLeft, ChevronRight, ArrowLeft, Navigation } from 'lucide-react'
import { Villa } from '@/types'
import { formatCurrency } from '@/lib/utils'
import ModernBookingFlow from '@/components/ModernBookingFlow'

// Dynamic import for map (no SSR)
const VillaMap = dynamic(() => import('@/components/VillaMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-olive-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-500">Loading map...</p>
            </div>
        </div>
    )
})

interface VillaDetailsProps {
    villa: Villa
}

export default function VillaDetails({ villa }: VillaDetailsProps) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [showLightbox, setShowLightbox] = useState(false)
    const [showBookingModal, setShowBookingModal] = useState(false)

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % villa.images.length)
    }

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + villa.images.length) % villa.images.length)
    }

    return (
        <>
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/villas"
                        className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm tracking-wide"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Collection</span>
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <h1 className="font-display text-display-md text-primary mb-4">
                                {villa.name}
                            </h1>
                            <div className="flex items-center text-muted">
                                <MapPin size={16} className="mr-2" />
                                <span>{villa.location}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-display text-4xl text-primary">
                                {formatCurrency(villa.price_per_night)}
                            </p>
                            <p className="text-muted text-sm">per night</p>
                        </div>
                    </div>
                </motion.div>

                {/* Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16"
                >
                    {/* Main Image */}
                    <div
                        className="relative aspect-[16/9] overflow-hidden cursor-pointer group mb-2"
                        onClick={() => setShowLightbox(true)}
                    >
                        <Image
                            src={villa.images[selectedImage]}
                            alt={`${villa.name} - Image ${selectedImage + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-102"
                            priority
                        />
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="grid grid-cols-6 gap-2">
                        {villa.images.slice(0, 6).map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative aspect-square overflow-hidden transition-all
                                    ${selectedImage === index ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'}
                                `}
                            >
                                <Image
                                    src={image}
                                    alt={`${villa.name} thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
                    {/* Left: Details */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Key Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="grid grid-cols-3 gap-8 pb-12 border-b border-primary/10">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Bed size={24} className="text-muted" />
                                        <span className="font-display text-3xl text-primary">{villa.bedrooms}</span>
                                    </div>
                                    <p className="text-muted text-sm">Bedrooms</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Bath size={24} className="text-muted" />
                                        <span className="font-display text-3xl text-primary">{villa.bathrooms}</span>
                                    </div>
                                    <p className="text-muted text-sm">Bathrooms</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Users size={24} className="text-muted" />
                                        <span className="font-display text-3xl text-primary">{villa.max_guests}</span>
                                    </div>
                                    <p className="text-muted text-sm">Guests</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="font-display text-2xl text-primary mb-6">About This Villa</h2>
                            <p className="text-muted leading-relaxed whitespace-pre-line">
                                {villa.description}
                            </p>
                        </motion.div>

                        {/* Amenities */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h2 className="font-display text-2xl text-primary mb-6">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {villa.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <Check size={16} className="text-accent" />
                                        <span className="text-muted">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Location Map */}
                        {villa.latitude && villa.longitude && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-display text-2xl text-primary">Location</h2>
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${villa.latitude},${villa.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-olive-600 hover:text-olive-900 transition-colors"
                                    >
                                        <Navigation size={14} />
                                        <span>Get Directions</span>
                                    </a>
                                </div>
                                <div className="mb-4">
                                    <div className="flex items-center text-muted text-sm">
                                        <MapPin size={14} className="mr-2" />
                                        <span>{villa.location}</span>
                                    </div>
                                </div>
                                <VillaMap
                                    latitude={villa.latitude}
                                    longitude={villa.longitude}
                                    villaName={villa.name}
                                    location={villa.location}
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Right: Booking Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:sticky lg:top-32 h-fit"
                    >
                        <div className="border border-primary/10 p-8">
                            <div className="mb-8">
                                <p className="text-muted text-sm mb-2">Starting from</p>
                                <p className="font-display text-4xl text-primary mb-1">
                                    {formatCurrency(villa.price_per_night)}
                                </p>
                                <p className="text-muted text-sm">per night</p>
                            </div>

                            <button
                                onClick={() => setShowBookingModal(true)}
                                className="w-full bg-primary text-white py-4 text-sm tracking-[0.2em] uppercase hover:bg-secondary transition-colors mb-4"
                            >
                                Check Availability
                            </button>

                            <a
                                href={`https://wa.me/6281234567890?text=Hi, I'm interested in ${villa.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center border border-primary/20 text-primary py-4 text-sm tracking-[0.2em] uppercase hover:bg-primary hover:text-white transition-all"
                            >
                                Contact Us
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {showLightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-primary flex items-center justify-center"
                        onClick={() => setShowLightbox(false)}
                    >
                        <button
                            onClick={() => setShowLightbox(false)}
                            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-primary transition-all"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-primary transition-all"
                        >
                            <ChevronRight size={24} />
                        </button>

                        <div className="relative w-full max-w-5xl aspect-[16/10] mx-8">
                            <Image
                                src={villa.images[selectedImage]}
                                alt={`${villa.name} - Image ${selectedImage + 1}`}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                            {selectedImage + 1} / {villa.images.length}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Booking Modal */}
            {showBookingModal && (
                <ModernBookingFlow
                    villa={villa}
                    onClose={() => setShowBookingModal(false)}
                />
            )}
        </>
    )
}
