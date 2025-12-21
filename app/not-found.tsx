'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search, Compass } from 'lucide-react'

export default function NotFound() {
    return (
        <main className="min-h-screen bg-gray-900 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920"
                    alt="Bali Landscape"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900" />
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating circles */}
                <motion.div
                    className="absolute top-20 left-20 w-64 h-64 rounded-full bg-olive-600/10 blur-3xl"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-olive-400/10 blur-3xl"
                    animate={{
                        x: [0, -30, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-olive-500/5 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Navigation */}
            <nav className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-8">
                <Link href="/" className="inline-flex items-center gap-3 group">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src="/images/logo.png"
                            alt="StayinUBUD"
                            width={180}
                            height={80}
                            className="h-16 w-auto"
                        />
                    </motion.div>
                </Link>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 min-h-[calc(100vh-120px)] flex items-center justify-center px-6">
                <div className="text-center max-w-3xl mx-auto">
                    {/* 404 Number */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative mb-8"
                    >
                        <span className="text-[180px] md:text-[280px] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 leading-none select-none">
                            404
                        </span>

                        {/* Decorative compass icon */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Compass size={80} className="text-olive-400/30" strokeWidth={1} />
                        </motion.div>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-olive-400 text-xs tracking-[0.4em] uppercase mb-4">Lost in Paradise</p>
                        <h1 className="font-display text-4xl md:text-6xl text-white mb-6">
                            Page Not <span className="italic text-olive-400">Found</span>
                        </h1>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
                    >
                        The page you are looking for might have been moved, deleted,
                        or perhaps never existed in our sanctuary.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/"
                            className="group flex items-center gap-3 px-8 py-4 bg-olive-600 text-white font-medium text-sm tracking-[0.1em] uppercase hover:bg-olive-500 transition-all duration-300"
                        >
                            <Home size={18} />
                            <span>Back to Home</span>
                        </Link>

                        <Link
                            href="/villas"
                            className="group flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-medium text-sm tracking-[0.1em] uppercase border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                        >
                            <Search size={18} />
                            <span>Explore Villas</span>
                        </Link>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-16 pt-8 border-t border-white/10"
                    >
                        <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-6">Or try these pages</p>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            {[
                                { href: '/about', label: 'About Us' },
                                { href: '/blog', label: 'Journal' },
                                { href: '/contact', label: 'Contact' },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-white/50 hover:text-olive-400 text-sm transition-colors duration-300 flex items-center gap-1 group"
                                >
                                    <span>{link.label}</span>
                                    <ArrowLeft size={14} className="rotate-180 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Decorative Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-olive-600/50 to-transparent" />

            {/* Corner Decorations */}
            <div className="absolute bottom-8 left-8 hidden md:block">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-white/20 text-xs tracking-[0.3em] uppercase"
                >
                    StayinUBUD
                </motion.div>
            </div>

            <div className="absolute bottom-8 right-8 hidden md:block">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-white/20 text-xs tracking-[0.3em] uppercase"
                >
                    Ubud, Bali
                </motion.div>
            </div>
        </main>
    )
}
