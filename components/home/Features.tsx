'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Shield, Headphones, Award } from 'lucide-react'
import { GlowCard, CountUp } from '@/components/ui/InteractiveElements'

const features = [
    {
        number: '01',
        icon: Sparkles,
        title: 'Curated Excellence',
        description: 'Each villa in our collection is hand-selected to meet the highest standards of luxury, design, and comfort.',
        stat: { value: 25, suffix: '+', label: 'Properties' }
    },
    {
        number: '02',
        icon: Shield,
        title: 'Privacy Guaranteed',
        description: 'Enjoy complete seclusion in our exclusive properties, designed to provide the ultimate private retreat.',
        stat: { value: 100, suffix: '%', label: 'Privacy' }
    },
    {
        number: '03',
        icon: Headphones,
        title: '24/7 Concierge',
        description: 'Our dedicated team is available around the clock to fulfill any request and ensure a flawless stay.',
        stat: { value: 24, suffix: '/7', label: 'Support' }
    },
    {
        number: '04',
        icon: Award,
        title: 'Local Expertise',
        description: 'Benefit from our deep knowledge of Bali to discover hidden gems and authentic experiences.',
        stat: { value: 8, suffix: '+', label: 'Years' }
    },
]

export default function Features() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="max-w-2xl mb-16 md:mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-olive-600 text-xs tracking-[0.3em] uppercase mb-4"
                    >
                        Why Choose Us
                    </motion.p>

                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: 80 }}
                            animate={isInView ? { y: 0 } : {}}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6"
                        >
                            The <span className="italic text-olive-900">StayinUBUD</span> Difference
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
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
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1 + index * 0.1,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                <GlowCard className="bg-white p-8 md:p-10 h-full group cursor-pointer">
                                    {/* Number & Icon */}
                                    <div className="flex items-center justify-between mb-8">
                                        <motion.span
                                            className="text-olive-600 text-xs tracking-[0.2em] font-medium"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {feature.number}
                                        </motion.span>
                                        <motion.div
                                            whileHover={{ rotate: 15, scale: 1.1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <Icon size={24} className="text-gray-300 group-hover:text-olive-600 transition-colors duration-300" />
                                        </motion.div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-display text-xl md:text-2xl text-gray-900 mb-4 group-hover:text-olive-900 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                        {feature.description}
                                    </p>

                                    {/* Stat */}
                                    <div className="pt-6 border-t border-gray-100">
                                        <div className="flex items-baseline gap-1">
                                            <CountUp
                                                end={feature.stat.value}
                                                suffix={feature.stat.suffix}
                                                className="font-display text-3xl text-olive-600"
                                            />
                                        </div>
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">
                                            {feature.stat.label}
                                        </p>
                                    </div>

                                    {/* Hover Line */}
                                    <motion.div
                                        className="mt-6 h-px bg-olive-600"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ transformOrigin: 'left' }}
                                    />
                                </GlowCard>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
