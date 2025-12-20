'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bed, Bath, Users, MapPin, Check, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Villa } from '@/types'
import { formatCurrency } from '@/lib/utils'
import ModernBookingFlow from '@/components/ModernBookingFlow'

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
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Main Image */}
                        <div
                            className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-4 cursor-pointer group"
                            onClick={() => setShowLightbox(true)}
                        >
                            <Image
                                src={villa.images[selectedImage]}
                                alt={`${villa.name} - Image ${selectedImage + 1}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-4 py-2 rounded-lg text-sm md:text-base">
                                    Click to enlarge
                                </span>
                            </div>
                        </div>

                        {/* Thumbnail Grid */}
                        <div className="grid grid-cols-4 gap-2">
                            {villa.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative h-16 md:h-20 rounded-lg overflow-hidden ${selectedImage === index
                                        ? 'ring-4 ring-sage'
                                        : 'ring-2 ring-transparent hover:ring-sage/50'
                                        } transition-all`}
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

                    {/* Right Column - Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Villa Info */}
                        <div className="mb-6 md:mb-8">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-olive mb-3 md:mb-4">
                                {villa.name}
                            </h1>

                            <div className="flex items-center text-gray-600 mb-4 md:mb-6">
                                <MapPin size={18} className="text-sage mr-2 flex-shrink-0" />
                                <span className="text-sm md:text-base">{villa.location}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-4 md:mb-6">
                                <div className="flex items-center space-x-2">
                                    <Bed size={20} className="text-sage md:w-6 md:h-6" />
                                    <span className="text-olive text-sm md:text-lg">{villa.bedrooms} Bedroom{villa.bedrooms > 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Bath size={20} className="text-sage md:w-6 md:h-6" />
                                    <span className="text-olive text-sm md:text-lg">{villa.bathrooms} Bathroom{villa.bathrooms > 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Users size={20} className="text-sage md:w-6 md:h-6" />
                                    <span className="text-olive text-sm md:text-lg">Max {villa.max_guests} Guests</span>
                                </div>
                            </div>

                            <div className="mb-4 md:mb-6">
                                <span className="text-2xl md:text-4xl font-bold text-sage">
                                    {formatCurrency(villa.price_per_night)}
                                </span>
                                <span className="text-gray-600 text-base md:text-xl"> / night</span>
                            </div>

                            <p className="text-gray-700 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                                {villa.description}
                            </p>

                            {/* Amenities */}
                            <div className="mb-6 md:mb-8">
                                <h3 className="text-xl md:text-2xl font-semibold text-olive mb-3 md:mb-4">Amenities</h3>
                                <div className="grid grid-cols-2 gap-2 md:gap-3">
                                    {villa.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-sage/20 rounded-full flex items-center justify-center">
                                                <Check size={12} className="text-sage md:w-4 md:h-4" />
                                            </div>
                                            <span className="text-gray-700 text-sm md:text-base">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Booking Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-sage to-sage-dark rounded-xl md:rounded-2xl p-4 md:p-6 text-white lg:sticky lg:top-24"
                        >
                            <div className="text-center mb-4 md:mb-6">
                                <p className="text-white/80 mb-1 text-sm md:text-base">Starting from</p>
                                <p className="text-2xl md:text-3xl font-bold">{formatCurrency(villa.price_per_night)}</p>
                                <p className="text-white/80 text-sm md:text-base">per night</p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowBookingModal(true)}
                                className="w-full bg-white text-sage py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:bg-cream transition-colors flex items-center justify-center space-x-2 shadow-lg"
                            >
                                <Calendar size={20} className="md:w-6 md:h-6" />
                                <span>Book Now</span>
                            </motion.button>

                            <p className="text-center text-white/70 text-xs md:text-sm mt-3 md:mt-4">
                                Free cancellation within 24 hours
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Lightbox */}
                <AnimatePresence>
                    {showLightbox && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                            onClick={() => setShowLightbox(false)}
                        >
                            <button
                                onClick={() => setShowLightbox(false)}
                                className="absolute top-4 right-4 text-white hover:text-sage transition-colors z-10"
                            >
                                <X size={28} className="md:w-8 md:h-8" />
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    prevImage()
                                }}
                                className="absolute left-2 md:left-4 text-white hover:text-sage transition-colors"
                            >
                                <ChevronLeft size={36} className="md:w-12 md:h-12" />
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    nextImage()
                                }}
                                className="absolute right-2 md:right-4 text-white hover:text-sage transition-colors"
                            >
                                <ChevronRight size={36} className="md:w-12 md:h-12" />
                            </button>

                            <div
                                className="relative w-full max-w-5xl h-[60vh] md:h-[80vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src={villa.images[selectedImage]}
                                    alt={`${villa.name} - Image ${selectedImage + 1}`}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-base md:text-lg">
                                {selectedImage + 1} / {villa.images.length}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Booking Modal */}
            <AnimatePresence>
                {showBookingModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
                        onClick={() => setShowBookingModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="my-4 md:my-8 w-full max-w-2xl"
                        >
                            <ModernBookingFlow
                                villa={villa}
                                onClose={() => setShowBookingModal(false)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
