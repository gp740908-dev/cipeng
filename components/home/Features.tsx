'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Features() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const features = [
        {
            number: '01',
            title: 'Private Infinity Pools',
            description: 'Each villa features its own infinity pool with panoramic views, offering complete privacy and serenity.',
        },
        {
            number: '02',
            title: 'Concierge Service',
            description: 'Our dedicated team provides 24/7 personalized assistance to curate your perfect Balinese experience.',
        },
        {
            number: '03',
            title: 'Architectural Excellence',
            description: 'Award-winning designs that seamlessly blend traditional Balinese aesthetics with modern luxury.',
        },
        {
            number: '04',
            title: 'Curated Experiences',
            description: 'From private yoga sessions to temple tours, we create bespoke moments that last a lifetime.',
        },
    ]

    return (
        <section ref={ref} className="py-32 bg-primary text-white">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-6">
                            The Experience
                        </p>
                        <h2 className="font-display text-display-lg leading-[1.1]">
                            Crafted for the
                            <br />
                            <span className="italic text-accent">discerning</span> few
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-end"
                    >
                        <p className="text-white/60 text-lg leading-relaxed max-w-md">
                            We believe in offering more than accommodation — we create
                            sanctuaries where every detail is considered and every
                            moment is meaningful.
                        </p>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.number}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="bg-primary p-12 group hover:bg-secondary transition-colors duration-500"
                        >
                            <span className="text-accent text-sm tracking-widest mb-8 block">
                                {feature.number}
                            </span>
                            <h3 className="font-display text-3xl md:text-4xl mb-6 group-hover:text-accent transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-white/60 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
