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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Main Image */}
                        <div
                            className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-4 cursor-pointer group"
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
                                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-4 py-2 rounded-lg">
                                    Klik untuk perbesar
                                </span>
                            </div>
                        </div>

                        {/* Thumbnail Grid */}
                        <div className="grid grid-cols-4 gap-2">
                            {villa.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative h-20 rounded-lg overflow-hidden ${selectedImage === index
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
                        <div className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-olive mb-4">
                                {villa.name}
                            </h1>

                            <div className="flex items-center text-gray-600 mb-6">
                                <MapPin size={20} className="text-sage mr-2" />
                                <span>{villa.location}</span>
                            </div>

                            <div className="flex items-center space-x-6 mb-6 text-lg">
                                <div className="flex items-center space-x-2">
                                    <Bed size={24} className="text-sage" />
                                    <span className="text-olive">{villa.bedrooms} Kamar</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Bath size={24} className="text-sage" />
                                    <span className="text-olive">{villa.bathrooms} Kamar Mandi</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Users size={24} className="text-sage" />
                                    <span className="text-olive">Maks {villa.max_guests} Tamu</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <span className="text-4xl font-bold text-sage">
                                    {formatCurrency(villa.price_per_night)}
                                </span>
                                <span className="text-gray-600 text-xl"> / malam</span>
                            </div>

                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                {villa.description}
                            </p>

                            {/* Amenities */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold text-olive mb-4">Fasilitas</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {villa.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <div className="flex-shrink-0 w-6 h-6 bg-sage/20 rounded-full flex items-center justify-center">
                                                <Check size={16} className="text-sage" />
                                            </div>
                                            <span className="text-gray-700">{amenity}</span>
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
                            className="bg-gradient-to-br from-sage to-sage-dark rounded-2xl p-6 text-white sticky top-24"
                        >
                            <div className="text-center mb-6">
                                <p className="text-white/80 mb-1">Mulai dari</p>
                                <p className="text-3xl font-bold">{formatCurrency(villa.price_per_night)}</p>
                                <p className="text-white/80">per malam</p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowBookingModal(true)}
                                className="w-full bg-white text-sage py-4 rounded-xl font-bold text-lg hover:bg-cream transition-colors flex items-center justify-center space-x-2 shadow-lg"
                            >
                                <Calendar size={24} />
                                <span>Pesan Sekarang</span>
                            </motion.button>

                            <p className="text-center text-white/70 text-sm mt-4">
                                Gratis pembatalan dalam 24 jam
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
                                <X size={32} />
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    prevImage()
                                }}
                                className="absolute left-4 text-white hover:text-sage transition-colors"
                            >
                                <ChevronLeft size={48} />
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    nextImage()
                                }}
                                className="absolute right-4 text-white hover:text-sage transition-colors"
                            >
                                <ChevronRight size={48} />
                            </button>

                            <div
                                className="relative w-full max-w-5xl h-[80vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src={villa.images[selectedImage]}
                                    alt={`${villa.name} - Image ${selectedImage + 1}`}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg">
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
                        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto"
                        onClick={() => setShowBookingModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="my-8"
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
