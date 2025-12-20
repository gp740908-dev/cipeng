'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Shield, Headphones, Award } from 'lucide-react'

const features = [
    {
        number: '01',
        icon: Sparkles,
        title: 'Curated Excellence',
        description: 'Each villa in our collection is hand-selected to meet the highest standards of luxury, design, and comfort.'
    },
    {
        number: '02',
        icon: Shield,
        title: 'Privacy Guaranteed',
        description: 'Enjoy complete seclusion in our exclusive properties, designed to provide the ultimate private retreat.'
    },
    {
        number: '03',
        icon: Headphones,
        title: '24/7 Concierge',
        description: 'Our dedicated team is available around the clock to fulfill any request and ensure a flawless stay.'
    },
    {
        number: '04',
        icon: Award,
        title: 'Local Expertise',
        description: 'Benefit from our deep knowledge of Bali to discover hidden gems and authentic experiences.'
    },
]

export default function Features() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="max-w-2xl mb-16 md:mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-4"
                    >
                        Why Choose Us
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6"
                    >
                        The <span className="italic text-amber-700">StayinUBUD</span> Difference
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-500 leading-relaxed"
                    >
                        We don't just offer accommodations—we craft unforgettable experiences
                        that exceed expectations at every touchpoint.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={feature.number}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="bg-white p-8 md:p-10 group hover:bg-gray-50 transition-colors duration-500"
                            >
                                {/* Number */}
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-amber-400 text-xs tracking-[0.2em] font-medium">
                                        {feature.number}
                                    </span>
                                    <Icon size={24} className="text-gray-300 group-hover:text-amber-500 transition-colors duration-500" />
                                </div>

                                {/* Content */}
                                <h3 className="font-display text-xl md:text-2xl text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover Line */}
                                <div className="mt-8 h-px w-0 group-hover:w-full bg-amber-400 transition-all duration-500" />
                            </motion.div>
                        )
                    })}
                </div>

                {/* Bottom Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-400 text-sm">
                        Trusted by <span className="text-gray-900 font-medium">2,000+</span> guests from around the world
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
