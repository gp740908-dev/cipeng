'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import OptimizedImage from '@/components/OptimizedImage'

export default function AboutContent() {
    const storyRef = useRef<HTMLElement>(null)
    const valuesRef = useRef<HTMLElement>(null)
    const teamRef = useRef<HTMLElement>(null)

    const [isStoryInView, setIsStoryInView] = useState(false)
    const [isValuesInView, setIsValuesInView] = useState(false)
    const [isTeamInView, setIsTeamInView] = useState(false)

    useEffect(() => {
        const options = { rootMargin: '-100px', threshold: 0.1 }

        const storyObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsStoryInView(true)
        }, options)

        const valuesObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsValuesInView(true)
        }, options)

        const teamObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsTeamInView(true)
        }, options)

        if (storyRef.current) storyObserver.observe(storyRef.current)
        if (valuesRef.current) valuesObserver.observe(valuesRef.current)
        if (teamRef.current) teamObserver.observe(teamRef.current)

        return () => {
            storyObserver.disconnect()
            valuesObserver.disconnect()
            teamObserver.disconnect()
        }
    }, [])

    const values = [
        {
            number: '01',
            title: 'Architectural Excellence',
            description: 'We curate properties that represent the pinnacle of design, where form meets function in perfect harmony.'
        },
        {
            number: '02',
            title: 'Authentic Experience',
            description: 'Every stay is an immersion into Balinese culture, crafted with respect for local traditions and communities.'
        },
        {
            number: '03',
            title: 'Sustainable Luxury',
            description: 'Our commitment to the environment ensures that luxury and sustainability coexist beautifully.'
        },
        {
            number: '04',
            title: 'Personalized Service',
            description: 'We believe in anticipating needs before they arise, creating seamless experiences for every guest.'
        },
    ]

    const team = [
        {
            name: 'Made Wijaya',
            role: 'Founder & CEO',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        },
        {
            name: 'Ketut Sari',
            role: 'Head of Operations',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        },
        {
            name: 'Wayan Putra',
            role: 'Guest Relations',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
        },
    ]

    return (
        <>
            {/* Story Section */}
            <section ref={storyRef} className="py-32 bg-cream">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Image */}
                        <div className={`relative ${isStoryInView ? 'animate-slide-left' : 'opacity-0'}`}>
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <OptimizedImage
                                    src="https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=80"
                                    alt="Balinese villa"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Decorative Element */}
                            <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-accent/30 -z-10" />
                        </div>

                        {/* Content */}
                        <div className={isStoryInView ? 'animate-slide-right' : 'opacity-0'}>
                            <p className="text-muted text-sm tracking-[0.3em] uppercase mb-6">
                                Our Story
                            </p>
                            <h2 className="font-display text-display-md text-primary mb-8">
                                A vision born from
                                <br />
                                <span className="italic text-accent">Balinese heritage</span>
                            </h2>
                            <div className="space-y-6 text-muted leading-relaxed">
                                <p>
                                    Founded in 2016, StayinUBUD emerged from a simple yet profound vision:
                                    to share the transformative beauty of Ubud with discerning travelers
                                    who seek more than just accommodation.
                                </p>
                                <p>
                                    What began as a single family-owned villa has evolved into a carefully
                                    curated collection of 25+ exceptional properties, each representing the
                                    pinnacle of Balinese hospitality and architectural excellence.
                                </p>
                                <p>
                                    Today, we continue to honor our founding principles: authenticity,
                                    excellence, and an unwavering commitment to creating experiences that
                                    resonate long after departure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section ref={valuesRef} className="py-32 bg-primary text-white">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className={`max-w-2xl mb-24 ${isValuesInView ? 'animate-fade-up' : 'opacity-0'}`}>
                        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-6">
                            Our Values
                        </p>
                        <h2 className="font-display text-display-md leading-[1.1]">
                            Principles that guide
                            <br />
                            <span className="italic text-accent">everything</span> we do
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
                        {values.map((value, index) => {
                            const staggerClass = `stagger-${index + 1}`
                            return (
                                <div
                                    key={value.number}
                                    className={`bg-primary p-12 group hover:bg-secondary transition-colors duration-500 ${isValuesInView ? `animate-fade-up ${staggerClass}` : 'opacity-0'}`}
                                >
                                    <span className="text-accent text-sm tracking-widest mb-8 block">
                                        {value.number}
                                    </span>
                                    <h3 className="font-display text-3xl mb-6 group-hover:text-accent transition-colors">
                                        {value.title}
                                    </h3>
                                    <p className="text-white/60 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section ref={teamRef} className="py-32 bg-light">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8 ${isTeamInView ? 'animate-fade-up' : 'opacity-0'}`}>
                        <div>
                            <p className="text-muted text-sm tracking-[0.3em] uppercase mb-4">
                                The Team
                            </p>
                            <h2 className="font-display text-display-md text-primary">
                                Meet the <span className="italic">People</span>
                            </h2>
                        </div>
                        <p className="text-muted max-w-md">
                            Passionate individuals dedicated to creating extraordinary experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => {
                            const staggerClass = `stagger-${index + 1}`
                            return (
                                <div
                                    key={member.name}
                                    className={`group ${isTeamInView ? `animate-fade-up ${staggerClass}` : 'opacity-0'}`}
                                >
                                    <div className="aspect-[3/4] relative overflow-hidden mb-6">
                                        <OptimizedImage
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="font-display text-2xl text-primary mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-muted">{member.role}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-cream">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
                    <div className="animate-fade-up">
                        <h2 className="font-display text-display-md text-primary mb-8">
                            Ready to experience
                            <br />
                            <span className="italic text-accent">Ubud?</span>
                        </h2>
                        <Link
                            href="/villas"
                            className="group inline-flex items-center gap-3 text-primary text-sm tracking-[0.2em] uppercase"
                        >
                            <span>Explore Our Collection</span>
                            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
