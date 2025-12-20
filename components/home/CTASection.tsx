'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, Star, Check } from 'lucide-react'
import { CountUp } from '@/components/ui/InteractiveElements'

const benefits = [
    'Complimentary airport transfer',
    '24/7 concierge service',
    'VIP welcome package',
    'Private chef available',
]

export default function CTASection() {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

    return (
        <section ref={ref} className="relative py-32 md:py-48 overflow-hidden bg-gray-900">
            {/* Background */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1920&q=80)' }}
                />
                <div className="absolute inset-0 bg-gray-900/85" />
            </motion.div>

            {/* Lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-olive-400/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-olive-400/30 to-transparent" />

            {/* Content */}
            <motion.div
                style={{ y: textY }}
                className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12"
            >
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-3 mb-6 md:mb-8"
                        >
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, rotate: -180 }}
                                        animate={isInView ? { opacity: 1, rotate: 0 } : {}}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                    >
                                        <Star size={14} className="text-olive-400 fill-olive-400" />
                                    </motion.div>
                                ))}
                            </div>
                            <span className="text-white/50 text-sm">Rated 4.9/5 by our guests</span>
                        </motion.div>

                        <div className="overflow-hidden">
                            <motion.h2
                                initial={{ y: 100 }}
                                animate={isInView ? { y: 0 } : {}}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6"
                            >
                                Begin Your <br />
                                <span className="italic text-olive-400">Extraordinary</span> Stay
                            </motion.h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-white/50 text-lg max-w-md mb-8 leading-relaxed"
                        >
                            Let us curate your perfect Bali escape. Our concierge team is
                            ready to craft an unforgettable experience.
                        </motion.p>

                        {/* Benefits */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="grid grid-cols-2 gap-3 mb-10"
                        >
                            {benefits.map((benefit, i) => (
                                <motion.div
                                    key={benefit}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="flex items-center gap-2 text-white/70 text-sm"
                                >
                                    <Check size={14} className="text-olive-400" />
                                    <span>{benefit}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link href="/villas">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-olive-600 text-white font-medium text-sm tracking-[0.1em] uppercase overflow-hidden"
                                >
                                    <span className="relative z-10">Browse Villas</span>
                                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                    <motion.div
                                        className="absolute inset-0 bg-olive-400"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                            </Link>
                            <Link href="/contact">
                                <motion.div
                                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white font-medium text-sm tracking-[0.1em] uppercase transition-colors"
                                >
                                    <Phone size={16} />
                                    <span>Contact Concierge</span>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right - Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden lg:grid grid-cols-2 gap-4"
                    >
                        {[
                            { value: 2000, suffix: '+', label: 'Happy Guests' },
                            { value: 25, suffix: '+', label: 'Luxury Villas' },
                            { value: 4.9, suffix: '', label: 'Average Rating', decimals: true },
                            { value: 8, suffix: '+', label: 'Years Excellence' },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                whileHover={{ scale: 1.03, borderColor: 'rgba(93, 135, 54, 0.5)' }}
                                className="p-6 md:p-8 border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300"
                            >
                                <div className="font-display text-4xl md:text-5xl text-olive-400 mb-2">
                                    {stat.decimals ? (
                                        stat.value
                                    ) : (
                                        <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                                    )}
                                    {stat.decimals && stat.suffix}
                                </div>
                                <p className="text-white/40 text-sm tracking-wide">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
