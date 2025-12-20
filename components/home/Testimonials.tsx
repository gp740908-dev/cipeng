'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
    {
        id: 1,
        quote: "An absolutely transcendent experience. The attention to detail was extraordinary, and our private villa exceeded every expectation.",
        author: "Alexandra Chen",
        location: "Hong Kong",
        rating: 5,
        villa: "Villa Lotus Dream",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
    },
    {
        id: 2,
        quote: "StayinUBUD set a new standard for luxury. The concierge service was impeccable, and the villa was simply breathtaking.",
        author: "James Miller",
        location: "London, UK",
        rating: 5,
        villa: "Villa Taman Surga",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
    },
    {
        id: 3,
        quote: "A hidden paradise. The privacy, the views, the service—everything was curated to perfection. Already planning our return.",
        author: "Sophie Laurent",
        location: "Paris, France",
        rating: 5,
        villa: "Villa Bambu Retreat",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
    },
]

export default function Testimonials() {
    const [current, setCurrent] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    // Drag handling
    const dragX = useMotionValue(0)

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

    const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
        if (info.offset.x > 50) prev()
        else if (info.offset.x < -50) next()
    }

    return (
        <section ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Decorative Quote */}
            <motion.div
                className="absolute top-20 left-10 md:left-20 opacity-[0.02] pointer-events-none"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            >
                <Quote size={300} className="text-olive-900" />
            </motion.div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-8">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className="text-olive-600 text-xs tracking-[0.3em] uppercase mb-4"
                        >
                            Guest Experiences
                        </motion.p>
                        <div className="overflow-hidden">
                            <motion.h2
                                initial={{ y: 80 }}
                                animate={isInView ? { y: 0 } : {}}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900"
                            >
                                What Our <span className="italic">Guests</span> Say
                            </motion.h2>
                        </div>
                    </div>

                    {/* Nav */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-3"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={prev}
                            className="w-12 h-12 flex items-center justify-center border border-gray-200 hover:bg-olive-900 hover:border-olive-900 hover:text-white transition-all"
                        >
                            <ChevronLeft size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={next}
                            className="w-12 h-12 flex items-center justify-center border border-gray-200 hover:bg-olive-900 hover:border-olive-900 hover:text-white transition-all"
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Testimonial - Draggable */}
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                    style={{ x: dragX }}
                    className="cursor-grab active:cursor-grabbing"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center py-8"
                        >
                            {/* Image */}
                            <div className="lg:col-span-4 flex justify-center lg:justify-start">
                                <motion.div
                                    className="relative"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-gray-200 ring-4 ring-white shadow-xl">
                                        <Image
                                            src={testimonials[current].image}
                                            alt={testimonials[current].author}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <motion.div
                                        className="absolute -inset-3 border border-olive-400/40 rounded-full"
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className="lg:col-span-8">
                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-4 md:mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <Star size={18} className="text-olive-600 fill-olive-600" />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="font-display text-xl md:text-2xl lg:text-3xl text-gray-900 mb-6 md:mb-8 leading-relaxed">
                                    "{testimonials[current].quote}"
                                </blockquote>

                                {/* Author */}
                                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                                    <div>
                                        <p className="text-gray-900 font-medium">{testimonials[current].author}</p>
                                        <p className="text-gray-400 text-sm">{testimonials[current].location}</p>
                                    </div>
                                    <div className="hidden md:block w-px h-8 bg-gray-200" />
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-wider">Stayed at</p>
                                        <p className="text-olive-600 text-sm font-medium">{testimonials[current].villa}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center justify-center gap-3 mt-8"
                >
                    {testimonials.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setCurrent(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`h-2 rounded-full transition-all duration-300 ${index === current
                                    ? 'w-8 bg-olive-600'
                                    : 'w-2 bg-gray-300 hover:bg-olive-400'
                                }`}
                        />
                    ))}
                </motion.div>

                {/* Swipe hint - mobile */}
                <p className="text-center text-gray-400 text-xs mt-4 md:hidden">
                    ← Swipe to navigate →
                </p>
            </div>
        </section>
    )
}
