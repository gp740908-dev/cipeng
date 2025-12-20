'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    const links = {
        explore: [
            { label: 'All Villas', href: '/villas' },
            { label: 'About Us', href: '/about' },
            { label: 'Journal', href: '/blog' },
            { label: 'Contact', href: '/contact' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Booking Policy', href: '/booking-policy' },
        ],
        social: [
            { label: 'Instagram', href: 'https://instagram.com' },
            { label: 'Pinterest', href: 'https://pinterest.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com' },
        ],
    }

    return (
        <footer ref={ref} className="bg-primary text-white">
            {/* Main Footer */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5"
                    >
                        <Link href="/" className="inline-block mb-8">
                            <span className="font-display text-4xl">StayinUBUD</span>
                        </Link>
                        <p className="text-white/50 max-w-sm leading-relaxed mb-8">
                            Curating exceptional villa experiences in Ubud, Bali.
                            Where architectural excellence meets Balinese tranquility.
                        </p>
                        <a
                            href="mailto:hello@stayinubud.com"
                            className="text-accent hover:text-accent-light transition-colors"
                        >
                            hello@stayinubud.com
                        </a>
                    </motion.div>

                    {/* Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="lg:col-span-2"
                    >
                        <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-6">
                            Explore
                        </p>
                        <ul className="space-y-4">
                            {links.explore.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-6">
                            Legal
                        </p>
                        <ul className="space-y-4">
                            {links.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:col-span-3"
                    >
                        <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-6">
                            Connect
                        </p>
                        <ul className="space-y-4">
                            {links.social.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                                    >
                                        <span>{link.label}</span>
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white/40 text-sm">
                            © {new Date().getFullYear()} StayinUBUD. All rights reserved.
                        </p>
                        <p className="text-white/40 text-sm">
                            Ubud, Bali, Indonesia
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
