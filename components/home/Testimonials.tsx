'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Testimonials() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [activeIndex, setActiveIndex] = useState(0)

    const testimonials = [
        {
            quote: "An extraordinary escape. The architecture, the silence, the attention to every detail — this is what luxury truly means.",
            author: 'Sarah Mitchell',
            role: 'Architecture Digest Editor',
            location: 'New York',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        },
        {
            quote: "StayinUBUD redefined our understanding of hospitality. Every moment felt curated, yet effortlessly natural.",
            author: 'James Chen',
            role: 'Design Director',
            location: 'Singapore',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        },
        {
            quote: "The perfect balance of Balinese tradition and contemporary elegance. A true sanctuary for the soul.",
            author: 'Emma Williams',
            role: 'Travel Writer',
            location: 'London',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
        },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % testimonials.length)
        }, 8000)
        return () => clearInterval(interval)
    }, [testimonials.length])

    return (
        <section ref={ref} className="py-32 bg-light">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <p className="text-muted text-sm tracking-[0.3em] uppercase mb-4">
                        Testimonials
                    </p>
                    <h2 className="font-display text-display-lg text-primary">
                        Guest <span className="italic">Stories</span>
                    </h2>
                </motion.div>

                {/* Testimonial Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Quote */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6 }}
                            >
                                <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl text-primary leading-[1.3] mb-12">
                                    "{testimonials[activeIndex].quote}"
                                </blockquote>

                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden">
                                        <Image
                                            src={testimonials[activeIndex].image}
                                            alt={testimonials[activeIndex].author}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-primary font-medium text-lg">
                                            {testimonials[activeIndex].author}
                                        </p>
                                        <p className="text-muted text-sm">
                                            {testimonials[activeIndex].role}, {testimonials[activeIndex].location}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-4 flex flex-col justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)}
                                className="w-12 h-12 border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}
                                className="w-12 h-12 border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Progress Indicator */}
                        <div className="hidden lg:block">
                            <p className="text-muted text-sm mb-4">
                                {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                            </p>
                            <div className="h-px bg-primary/10">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dots - Mobile */}
                <div className="flex justify-center gap-3 mt-12 lg:hidden">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === activeIndex ? 'bg-primary w-8' : 'bg-primary/20'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
