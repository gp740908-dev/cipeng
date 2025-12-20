'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
        return () => { document.body.style.overflow = 'unset' }
    }, [isMobileMenuOpen])

    const menuItems = [
        { href: '/villas', label: 'Villas' },
        { href: '/about', label: 'About' },
        { href: '/blog', label: 'Journal' },
        { href: '/contact', label: 'Contact' },
    ]

    const isActive = (href: string) => pathname === href
    const isTransparent = !isScrolled

    return (
        <>
            {/* Desktop Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isTransparent
                        ? 'bg-transparent py-6'
                        : 'bg-cream/95 backdrop-blur-md py-4 border-b border-primary/5'}
                `}
            >
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="relative z-10">
                            <motion.span
                                className={`font-display text-2xl md:text-3xl tracking-tight transition-colors duration-300
                                    ${isTransparent ? 'text-white' : 'text-primary'}
                                `}
                            >
                                StayinUBUD
                            </motion.span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-12">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative group"
                                >
                                    <span className={`text-sm tracking-widest uppercase transition-colors duration-300
                                        ${isActive(item.href)
                                            ? isTransparent ? 'text-white' : 'text-primary'
                                            : isTransparent ? 'text-white/70 hover:text-white' : 'text-muted hover:text-primary'}
                                    `}>
                                        {item.label}
                                    </span>
                                    <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                                        ${isTransparent ? 'bg-white' : 'bg-primary'}
                                        ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'}
                                    `} />
                                </Link>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden lg:block">
                            <Link
                                href="/villas"
                                className={`text-sm tracking-widest uppercase px-6 py-3 border transition-all duration-300
                                    ${isTransparent
                                        ? 'border-white/30 text-white hover:bg-white hover:text-primary'
                                        : 'border-primary/20 text-primary hover:bg-primary hover:text-white'}
                                `}
                            >
                                Book Now
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className={`lg:hidden p-2 transition-colors ${isTransparent ? 'text-white' : 'text-primary'}`}
                            aria-label="Open menu"
                        >
                            <Menu size={24} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 bg-primary/20 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-cream lg:hidden"
                        >
                            <div className="h-full flex flex-col p-8">
                                {/* Close Button */}
                                <div className="flex justify-end mb-16">
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 text-primary"
                                        aria-label="Close menu"
                                    >
                                        <X size={24} strokeWidth={1.5} />
                                    </button>
                                </div>

                                {/* Menu Items */}
                                <div className="flex-1">
                                    {menuItems.map((item, index) => (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`block py-4 text-4xl font-display border-b border-primary/10 transition-colors
                                                    ${isActive(item.href) ? 'text-primary' : 'text-muted hover:text-primary'}
                                                `}
                                            >
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Bottom Info */}
                                <div className="pt-8 border-t border-primary/10">
                                    <p className="text-sm text-muted mb-2">Contact</p>
                                    <a href="mailto:hello@stayinubud.com" className="text-primary hover:text-accent transition-colors">
                                        hello@stayinubud.com
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
