'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowDownRight, Star } from 'lucide-react'

export default function Hero() {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

    return (
        <section ref={ref} className="relative h-screen overflow-hidden bg-primary">
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y: backgroundY, scale }}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)',
                    }}
                />
                {/* Luxury Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/20 to-primary/70" />
            </motion.div>

            {/* Exclusive Badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute top-28 md:top-32 left-6 md:left-12 z-20"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 backdrop-blur-sm border border-accent/30">
                    <Star size={12} className="text-accent fill-accent" />
                    <span className="text-accent text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium">
                        Award Winning Villas
                    </span>
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
                style={{ y: textY, opacity }}
                className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-32"
            >
                <div className="max-w-[1400px] mx-auto w-full">
                    {/* Overline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase mb-6 md:mb-8 font-light"
                    >
                        Curated Luxury Villas in Ubud, Bali
                    </motion.p>

                    {/* Main Heading */}
                    <div className="overflow-hidden mb-4 md:mb-6">
                        <motion.h1
                            initial={{ y: 120 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.9] tracking-[-0.03em]"
                        >
                            Redefining
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden mb-10 md:mb-12">
                        <motion.h1
                            initial={{ y: 120 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-[-0.03em]"
                        >
                            <span className="text-accent italic">Spaces</span>
                        </motion.h1>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="text-white/60 text-base md:text-lg lg:text-xl max-w-md font-light leading-relaxed"
                        >
                            Experience architectural excellence and serene luxury
                            in the heart of Bali's cultural paradise.
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.1 }}
                            className="flex items-center gap-8"
                        >
                            <Link href="/villas" className="group inline-flex items-center gap-4">
                                <span className="text-white text-xs md:text-sm tracking-[0.2em] uppercase font-light">
                                    Explore Collection
                                </span>
                                <div className="w-14 h-14 md:w-16 md:h-16 border border-white/30 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                                    <ArrowDownRight size={20} className="text-white group-hover:text-primary transition-colors" />
                                </div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                        className="hidden md:flex items-center gap-16 mt-16 pt-8 border-t border-white/10"
                    >
                        <div>
                            <p className="font-display text-4xl text-white mb-1">25+</p>
                            <p className="text-white/40 text-xs tracking-[0.1em] uppercase">Exclusive Villas</p>
                        </div>
                        <div>
                            <p className="font-display text-4xl text-white mb-1">4.9</p>
                            <p className="text-white/40 text-xs tracking-[0.1em] uppercase">Guest Rating</p>
                        </div>
                        <div>
                            <p className="font-display text-4xl text-white mb-1">8</p>
                            <p className="text-white/40 text-xs tracking-[0.1em] uppercase">Years Excellence</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
            >
                <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-12 bg-gradient-to-b from-accent via-white/30 to-transparent"
                />
            </motion.div>

            {/* Side Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden xl:block"
            >
                <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center whitespace-nowrap">
                    Est. 2016 — Ubud, Bali
                </p>
            </motion.div>
        </section>
    )
}
