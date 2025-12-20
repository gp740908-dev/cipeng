'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Leaf, Sparkles, Heart, Mountain, Utensils, Palette } from 'lucide-react'

const experiences = [
    {
        id: 1,
        title: 'Yoga & Meditation',
        description: 'Start your day with sunrise yoga sessions overlooking rice terraces, guided by experienced instructors.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
        icon: Heart,
        duration: '2-3 hours',
    },
    {
        id: 2,
        title: 'Balinese Spa',
        description: 'Indulge in traditional Balinese massage and healing treatments using organic local ingredients.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
        icon: Sparkles,
        duration: '1-2 hours',
    },
    {
        id: 3,
        title: 'Rice Terrace Trek',
        description: 'Explore the iconic Tegalalang rice terraces with a private guide and learn about Balinese agriculture.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
        icon: Mountain,
        duration: 'Half day',
    },
    {
        id: 4,
        title: 'Cooking Class',
        description: 'Master the art of Balinese cuisine with our chef, from market visit to cooking authentic dishes.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
        icon: Utensils,
        duration: '4-5 hours',
    },
    {
        id: 5,
        title: 'Art & Culture',
        description: 'Visit local art galleries, watch traditional dance performances, and explore ancient temples.',
        image: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800&q=80',
        icon: Palette,
        duration: 'Full day',
    },
    {
        id: 6,
        title: 'Nature Walks',
        description: 'Discover hidden waterfalls, sacred monkey forests, and scenic walking paths around Ubud.',
        image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80',
        icon: Leaf,
        duration: '3-4 hours',
    },
]

export default function Experience() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="py-24 md:py-32 bg-olive-100/30 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-olive-200/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-white to-transparent pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-olive-900 text-white">
                                <Leaf size={12} />
                                <span className="text-[10px] tracking-[0.2em] uppercase">Curated Experiences</span>
                            </div>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6"
                        >
                            Discover <span className="italic text-olive-600">Ubud</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-gray-500 max-w-lg leading-relaxed"
                        >
                            Beyond your villa, Ubud offers a world of authentic experiences.
                            Let us arrange unforgettable activities during your stay.
                        </motion.p>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-gray-400 text-sm max-w-xs"
                    >
                        All experiences can be customized and arranged by our concierge team.
                    </motion.p>
                </div>

                {/* Experience Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experiences.map((experience, index) => {
                        const Icon = experience.icon
                        return (
                            <motion.div
                                key={experience.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="group bg-white overflow-hidden hover:shadow-xl transition-shadow duration-500"
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={experience.image}
                                        alt={experience.title}
                                        fill
                                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />

                                    {/* Duration Badge */}
                                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm">
                                        <span className="text-gray-900 text-[10px] tracking-[0.1em] uppercase">{experience.duration}</span>
                                    </div>

                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-olive-900/0 group-hover:bg-olive-900/20 transition-colors duration-500" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 flex items-center justify-center bg-olive-100 text-olive-600 flex-shrink-0 group-hover:bg-olive-600 group-hover:text-white transition-colors duration-300">
                                            <Icon size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-display text-xl text-gray-900 mb-2 group-hover:text-olive-600 transition-colors">
                                                {experience.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-relaxed">
                                                {experience.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Bottom Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-4 px-6 py-4 bg-white border border-olive-200">
                        <Sparkles size={16} className="text-olive-600" />
                        <p className="text-gray-600 text-sm">
                            <span className="font-medium text-gray-900">Complimentary concierge</span> service for all villa bookings
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
