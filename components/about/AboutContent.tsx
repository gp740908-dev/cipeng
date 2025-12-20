'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { Heart, Star, Home, Users, Award, Leaf, Shield, Globe } from 'lucide-react'
import Link from 'next/link'

// Animated Counter Component
function AnimatedCounter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (isInView) {
            let startTime: number
            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
                setCount(Math.floor(progress * end))
                if (progress < 1) {
                    requestAnimationFrame(animate)
                }
            }
            requestAnimationFrame(animate)
        }
    }, [isInView, end, duration])

    return <span ref={ref}>{count}{suffix}</span>
}

export default function AboutContent() {
    const storyRef = useRef(null)
    const statsRef = useRef(null)
    const teamRef = useRef(null)
    const valuesRef = useRef(null)

    const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" })
    const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })
    const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" })
    const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" })

    const stats = [
        { icon: Home, value: 25, suffix: '+', label: 'Luxury Villas' },
        { icon: Users, value: 5000, suffix: '+', label: 'Happy Guests' },
        { icon: Star, value: 4.9, suffix: '', label: 'Average Rating' },
        { icon: Award, value: 8, suffix: '', label: 'Years Experience' },
    ]

    const team = [
        {
            name: 'Made Wijaya',
            role: 'Founder & CEO',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
            bio: 'Born and raised in Ubud, Made brings authentic Balinese hospitality to every guest experience.'
        },
        {
            name: 'Ketut Sari',
            role: 'Head of Operations',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
            bio: 'With 10+ years in hospitality, Ketut ensures every villa meets our luxury standards.'
        },
        {
            name: 'Wayan Putra',
            role: 'Guest Relations Manager',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
            bio: 'Dedicated to creating personalized experiences for every guest who stays with us.'
        },
        {
            name: 'Ni Luh Ayu',
            role: 'Marketing Director',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
            bio: 'Passionate about sharing the beauty of Ubud with travelers from around the world.'
        },
    ]

    const values = [
        {
            icon: Heart,
            title: 'Authentic Hospitality',
            description: 'We infuse genuine Balinese warmth into every interaction, making guests feel like family.'
        },
        {
            icon: Leaf,
            title: 'Sustainable Tourism',
            description: 'Committed to eco-friendly practices that protect Ubud\'s natural beauty for generations.'
        },
        {
            icon: Shield,
            title: 'Quality Assurance',
            description: 'Every villa is personally vetted to ensure it meets our exceptional standards.'
        },
        {
            icon: Globe,
            title: 'Cultural Preservation',
            description: 'We support local artisans and traditions, keeping Balinese culture alive.'
        },
    ]

    return (
        <>
            {/* Story Section */}
            <section ref={storyRef} className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=80"
                                    alt="Balinese villa interior"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Decorative Element */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={isStoryInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="absolute -bottom-6 -right-6 w-48 h-48 bg-sage/20 rounded-2xl -z-10"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="absolute -bottom-8 left-8 bg-cream p-6 rounded-xl shadow-xl"
                            >
                                <p className="text-3xl font-bold text-sage">8+</p>
                                <p className="text-olive text-sm">Years of Excellence</p>
                            </motion.div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="inline-block text-sage font-semibold text-sm uppercase tracking-wider mb-4">
                                Our Story
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-olive mb-6 leading-tight">
                                A Journey of Passion and
                                <span className="text-sage"> Balinese Heritage</span>
                            </h2>
                            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                                <p>
                                    Founded in 2016, StayinUBUD began with a simple dream: to share the
                                    enchanting beauty of Ubud with travelers seeking authentic experiences.
                                    What started as a single family-owned villa has blossomed into a
                                    curated collection of over 25 luxury properties.
                                </p>
                                <p>
                                    Our founder, Made Wijaya, grew up in the rice terraces of Ubud and
                                    witnessed the transformation of this spiritual haven. His vision was
                                    to create spaces where guests could experience luxury while remaining
                                    connected to Bali's rich cultural heritage.
                                </p>
                                <p>
                                    Today, every villa in our collection tells a story – of Balinese
                                    craftsmanship, of sustainable living, and of the warm hospitality
                                    that has made Ubud a beloved destination for millions.
                                </p>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="mt-8"
                            >
                                <Link
                                    href="/villas"
                                    className="inline-flex items-center space-x-2 bg-sage text-white px-8 py-4 rounded-full font-semibold hover:bg-sage-dark transition-all shadow-lg hover:shadow-xl"
                                >
                                    <span>Explore Our Villas</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className="py-20 bg-gradient-to-br from-olive to-sage text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto">
                            Years of dedication to exceptional hospitality have helped us create
                            memorable experiences for thousands of guests.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="inline-flex p-4 bg-white/10 rounded-2xl mb-4">
                                        <Icon size={32} />
                                    </div>
                                    <p className="text-4xl md:text-5xl font-bold mb-2">
                                        {isStatsInView ? (
                                            <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                        ) : (
                                            '0'
                                        )}
                                    </p>
                                    <p className="text-white/80">{stat.label}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section ref={valuesRef} className="py-20 md:py-28 bg-cream/50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-sage font-semibold text-sm uppercase tracking-wider mb-4">
                            What We Stand For
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-olive mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            These principles guide everything we do, from selecting properties
                            to serving our guests.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
                                >
                                    <div className="inline-flex p-4 bg-sage/10 rounded-xl mb-6 group-hover:bg-sage group-hover:text-white transition-all">
                                        <Icon size={32} className="text-sage group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-olive mb-3">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section ref={teamRef} className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-sage font-semibold text-sm uppercase tracking-wider mb-4">
                            The People Behind
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-olive mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Passionate individuals dedicated to making your stay unforgettable.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative mb-6 overflow-hidden rounded-2xl">
                                    <div className="relative h-80">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-olive/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <p className="text-white text-sm">{member.bio}</p>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-olive">{member.name}</h3>
                                <p className="text-sage font-medium">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-sage to-sage-dark text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            Ready to Experience Ubud?
                        </h2>
                        <p className="text-white/90 text-lg mb-8">
                            Let us help you find the perfect villa for your Balinese adventure.
                            Our team is ready to create your dream stay.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/villas"
                                className="inline-flex items-center justify-center space-x-2 bg-white text-sage px-8 py-4 rounded-full font-semibold hover:bg-cream transition-all shadow-lg hover:shadow-xl"
                            >
                                <span>Browse Villas</span>
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-sage transition-all"
                            >
                                <span>Contact Us</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
