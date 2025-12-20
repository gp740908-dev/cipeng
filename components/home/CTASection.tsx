'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function CTASection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="relative py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80)',
                    }}
                />
                <div className="absolute inset-0 bg-primary/80" />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-accent text-sm tracking-[0.3em] uppercase mb-8"
                    >
                        Begin Your Journey
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="font-display text-display-lg text-white mb-8 leading-[1.1]"
                    >
                        Ready to experience
                        <br />
                        <span className="italic text-accent">something extraordinary?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/60 text-lg leading-relaxed mb-12 max-w-xl"
                    >
                        Let us curate your perfect Balinese escape. Our team is ready
                        to help you discover your ideal sanctuary.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-6"
                    >
                        <Link
                            href="/villas"
                            className="group inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-accent transition-colors duration-300"
                        >
                            <span>Explore Villas</span>
                            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>

                        <Link
                            href="/contact"
                            className="group inline-flex items-center justify-center gap-3 border border-white/30 text-white px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-primary transition-all duration-300"
                        >
                            <span>Get in Touch</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
