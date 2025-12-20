'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Leaf, Sparkles, Heart, Mountain, Utensils, Palette, ArrowRight } from 'lucide-react'

const experiences = [
    {
        id: 1,
        title: 'Yoga & Meditation',
        description: 'Start your day with sunrise yoga sessions overlooking rice terraces.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
        icon: Heart,
        duration: '2-3 hours',
        color: 'from-rose-500/20',
    },
    {
        id: 2,
        title: 'Balinese Spa',
        description: 'Traditional massage and healing treatments using organic ingredients.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
        icon: Sparkles,
        duration: '1-2 hours',
        color: 'from-purple-500/20',
    },
    {
        id: 3,
        title: 'Rice Terrace Trek',
        description: 'Explore Tegalalang with a private guide.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
        icon: Mountain,
        duration: 'Half day',
        color: 'from-emerald-500/20',
    },
    {
        id: 4,
        title: 'Cooking Class',
        description: 'Master Balinese cuisine from market visit to cooking.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
        icon: Utensils,
        duration: '4-5 hours',
        color: 'from-orange-500/20',
    },
    {
        id: 5,
        title: 'Art & Culture',
        description: 'Galleries, traditional dance, and ancient temples.',
        image: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800&q=80',
        icon: Palette,
        duration: 'Full day',
        color: 'from-blue-500/20',
    },
    {
        id: 6,
        title: 'Nature Walks',
        description: 'Hidden waterfalls and scenic paths around Ubud.',
        image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80',
        icon: Leaf,
        duration: '3-4 hours',
        color: 'from-teal-500/20',
    },
]

export default function Experience() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="py-24 md:py-32 bg-olive-100/30 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-olive-200/30 to-transparent pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-olive-900 text-white">
                                <Leaf size={12} />
                                <span className="text-[10px] tracking-[0.2em] uppercase">Curated Experiences</span>
                            </div>
                        </motion.div>

                        <div className="overflow-hidden">
                            <motion.h2
                                initial={{ y: 80 }}
                                animate={isInView ? { y: 0 } : {}}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6"
                            >
                                Discover <span className="italic text-olive-600">Ubud</span>
                            </motion.h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-gray-500 max-w-lg leading-relaxed"
                        >
                            Beyond your villa, Ubud offers a world of authentic experiences.
                            Let us arrange unforgettable activities during your stay.
                        </motion.p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {experiences.map((exp, index) => {
                        const Icon = exp.icon
                        return (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1 + index * 0.08,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                whileHover={{ y: -8 }}
                                className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                            >
                                {/* Image */}
                                <div className="relative h-48 md:h-56 overflow-hidden">
                                    <Image
                                        src={exp.image}
                                        alt={exp.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t ${exp.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                    {/* Duration */}
                                    <motion.div
                                        className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <span className="text-gray-900 text-[10px] tracking-[0.1em] uppercase font-medium">{exp.duration}</span>
                                    </motion.div>

                                    {/* Explore Button */}
                                    <motion.div
                                        className="absolute bottom-4 left-4 px-4 py-2 bg-white/95 backdrop-blur-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                        initial={{ y: 10 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <span className="text-gray-900 text-xs font-medium">Explore</span>
                                        <ArrowRight size={12} className="text-olive-600" />
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="p-5 md:p-6">
                                    <div className="flex items-start gap-4">
                                        <motion.div
                                            className="w-10 h-10 flex items-center justify-center bg-olive-100 text-olive-600 flex-shrink-0"
                                            whileHover={{ rotate: 15, scale: 1.1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <Icon size={18} />
                                        </motion.div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-display text-lg md:text-xl text-gray-900 mb-1 group-hover:text-olive-600 transition-colors truncate">
                                                {exp.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 md:mt-16 text-center"
                >
                    <motion.div
                        className="inline-flex items-center gap-4 px-6 py-4 bg-white border border-olive-200 cursor-pointer"
                        whileHover={{ scale: 1.02, borderColor: '#5D8736' }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sparkles size={16} className="text-olive-600" />
                        <p className="text-gray-600 text-sm">
                            <span className="font-medium text-gray-900">Complimentary concierge</span> service for all villa bookings
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
