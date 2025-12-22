'use client'

import { useRef, useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, Check, ArrowUpRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

// Settings interface
interface SiteSettings {
    contact: {
        phone: string
        email: string
        whatsapp: string
        address: string
    }
}

const defaultSettings: SiteSettings = {
    contact: {
        phone: '+62 812 3456 7890',
        email: 'hello@stayinubud.com',
        whatsapp: '6281234567890',
        address: 'Ubud, Bali, Indonesia'
    }
}

export default function ContactContent() {
    const formRef = useRef<HTMLElement>(null)
    const [isFormInView, setIsFormInView] = useState(false)
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsFormInView(true)
            },
            { rootMargin: '-100px' }
        )
        if (formRef.current) observer.observe(formRef.current)
        return () => observer.disconnect()
    }, [])

    // Fetch site settings
    useEffect(() => {
        async function fetchSettings() {
            try {
                const supabase = createClient()
                const { data } = await supabase
                    .from('site_settings')
                    .select('key, value')

                if (data && data.length > 0) {
                    const newSettings = { ...defaultSettings }
                    data.forEach((row) => {
                        if (row.key in newSettings) {
                            (newSettings as any)[row.key] = row.value
                        }
                    })
                    setSettings(newSettings)
                }
            } catch (error) {
                console.error('Error fetching settings:', error)
            }
        }

        fetchSettings()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // Dynamic contact info using settings
    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: settings.contact.email,
            href: `mailto:${settings.contact.email}`
        },
        {
            icon: Phone,
            label: 'Phone',
            value: settings.contact.phone,
            href: `tel:${settings.contact.phone.replace(/\s/g, '')}`
        },
        {
            icon: MapPin,
            label: 'Address',
            value: settings.contact.address,
            href: 'https://maps.google.com/?q=Ubud,Bali'
        },
    ]

    return (
        <section ref={formRef} className="py-32 bg-cream">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Left: Info */}
                    <div className={isFormInView ? 'animate-slide-left' : 'opacity-0'}>
                        <p className="text-muted text-sm tracking-[0.3em] uppercase mb-6">
                            Get in Touch
                        </p>
                        <h2 className="font-display text-display-md text-primary mb-8 leading-[1.1]">
                            Let's start a
                            <br />
                            <span className="italic text-accent">conversation</span>
                        </h2>
                        <p className="text-muted leading-relaxed mb-16 max-w-md">
                            Whether you're planning your next escape or have questions about our
                            properties, we're here to help create your perfect Balinese experience.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            {contactInfo.map((item) => {
                                const Icon = item.icon
                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target={item.href.startsWith('http') ? '_blank' : undefined}
                                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="group flex items-start gap-6"
                                    >
                                        <div className="w-12 h-12 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <p className="text-muted text-sm mb-1">{item.label}</p>
                                            <p className="text-primary group-hover:text-accent transition-colors">
                                                {item.value}
                                            </p>
                                        </div>
                                    </a>
                                )
                            })}
                        </div>

                        {/* Map */}
                        <div className="mt-16">
                            <div className="aspect-video relative overflow-hidden border border-primary/10">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63124.21091445856!2d115.22924979999999!3d-8.5068524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23d739f22c9c3%3A0x54a38afd6bf0fa4b!2sUbud%2C%20Gianyar%20Regency%2C%20Bali!5e0!3m2!1sen!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(100%)' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="StayinUBUD Location"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className={isFormInView ? 'animate-slide-right' : 'opacity-0'}>
                        {isSubmitted ? (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-center animate-scale-in">
                                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Check size={32} />
                                    </div>
                                    <h3 className="font-display text-3xl text-primary mb-4">
                                        Message Sent
                                    </h3>
                                    <p className="text-muted">
                                        We'll get back to you within 24 hours.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <label className="block text-sm text-muted mb-3 tracking-wide">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-0 py-4 bg-transparent border-b border-primary/20 text-primary focus:border-primary outline-none transition-colors text-lg"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-muted mb-3 tracking-wide">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-0 py-4 bg-transparent border-b border-primary/20 text-primary focus:border-primary outline-none transition-colors text-lg"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-muted mb-3 tracking-wide">
                                        Subject
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-0 py-4 bg-transparent border-b border-primary/20 text-primary focus:border-primary outline-none transition-colors text-lg"
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="booking">Booking Inquiry</option>
                                        <option value="villa">Villa Information</option>
                                        <option value="special">Special Request</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-muted mb-3 tracking-wide">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-0 py-4 bg-transparent border-b border-primary/20 text-primary focus:border-primary outline-none transition-colors text-lg resize-none"
                                        placeholder="Tell us how we can help..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group inline-flex items-center gap-4 bg-primary text-white px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-secondary transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
