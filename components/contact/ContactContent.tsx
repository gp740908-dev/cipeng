'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react'

export default function ContactContent() {
    const formRef = useRef(null)
    const infoRef = useRef(null)
    const faqRef = useRef(null)

    const isFormInView = useInView(formRef, { once: true, margin: "-100px" })
    const isInfoInView = useInView(infoRef, { once: true, margin: "-100px" })
    const isFaqInView = useInView(faqRef, { once: true, margin: "-100px" })

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000))

        // For demo purposes, always succeed
        setSubmitStatus('success')
        setIsSubmitting(false)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })

        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            value: 'info@stayinubud.com',
            link: 'mailto:info@stayinubud.com',
            description: 'Send us an email anytime'
        },
        {
            icon: Phone,
            title: 'Call Us',
            value: '+62 361 234 567',
            link: 'tel:+62361234567',
            description: 'Mon-Sat from 8am to 6pm'
        },
        {
            icon: MessageCircle,
            title: 'WhatsApp',
            value: '+62 812 3456 7890',
            link: 'https://wa.me/6281234567890',
            description: 'Quick response guaranteed'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            value: 'Jalan Raya Ubud, Bali',
            link: 'https://maps.google.com/?q=Ubud,Bali',
            description: 'Ubud, Bali 80571, Indonesia'
        },
    ]

    const faqs = [
        {
            question: 'What are your check-in and check-out times?',
            answer: 'Standard check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out can be arranged based on availability, please contact us in advance.'
        },
        {
            question: 'Is airport transfer available?',
            answer: 'Yes, we provide airport transfer services from Ngurah Rai International Airport to all our villas in Ubud. The journey takes approximately 1.5-2 hours depending on traffic.'
        },
        {
            question: 'What is your cancellation policy?',
            answer: 'Free cancellation is available up to 7 days before check-in. Cancellations made within 7 days are subject to a 50% charge. No refund for no-shows or cancellations on the day of arrival.'
        },
        {
            question: 'Do you offer long-term rental discounts?',
            answer: 'Yes! We offer special rates for stays of 7 nights or more. Contact us directly for a personalized quote based on your preferred villa and duration.'
        },
        {
            question: 'Are the villas suitable for children?',
            answer: 'Most of our villas are family-friendly with amenities like baby cots, high chairs, and pool fencing available upon request. Please let us know your needs when booking.'
        },
    ]

    return (
        <>
            {/* Contact Info Cards */}
            <section ref={infoRef} className="py-16 -mt-20 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon
                            return (
                                <motion.a
                                    key={index}
                                    href={info.link}
                                    target={info.link.startsWith('http') ? '_blank' : undefined}
                                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="inline-flex p-3 bg-sage/10 rounded-xl group-hover:bg-sage transition-colors">
                                            <Icon size={24} className="text-sage group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-olive mb-1">{info.title}</h3>
                                            <p className="text-sage font-medium group-hover:text-sage-dark transition-colors">
                                                {info.value}
                                            </p>
                                            <p className="text-gray-500 text-sm mt-1">{info.description}</p>
                                        </div>
                                    </div>
                                </motion.a>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Form & Map Section */}
            <section ref={formRef} className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block text-sage font-semibold text-sm uppercase tracking-wider mb-4">
                                Get in Touch
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-olive mb-6">
                                Send Us a Message
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Have a question about our villas or need help planning your stay?
                                Fill out the form below and we'll get back to you within 24 hours.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-olive mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-olive mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-olive mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all outline-none"
                                            placeholder="+62 812 3456 7890"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-olive mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all outline-none bg-white"
                                        >
                                            <option value="">Select a topic</option>
                                            <option value="booking">Booking Inquiry</option>
                                            <option value="villa">Villa Information</option>
                                            <option value="availability">Availability Check</option>
                                            <option value="special">Special Request</option>
                                            <option value="partnership">Partnership</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-olive mb-2">
                                        Your Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all outline-none resize-none"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all ${isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-sage hover:bg-sage-dark text-white shadow-lg hover:shadow-xl'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </motion.button>

                                {/* Status Messages */}
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-xl"
                                    >
                                        <CheckCircle size={20} />
                                        <span>Thank you! Your message has been sent successfully.</span>
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl"
                                    >
                                        <AlertCircle size={20} />
                                        <span>Something went wrong. Please try again later.</span>
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>

                        {/* Map & Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className="inline-block text-sage font-semibold text-sm uppercase tracking-wider mb-4">
                                Our Location
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-olive mb-6">
                                Find Us in Ubud
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Located in the heart of Ubud, our office is easily accessible
                                and surrounded by the beautiful rice terraces of Bali.
                            </p>

                            {/* Google Map Embed */}
                            <div className="rounded-2xl overflow-hidden shadow-lg mb-8 h-[300px] md:h-[400px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63124.21091445856!2d115.22924979999999!3d-8.5068524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23d739f22c9c3%3A0x54a38afd6bf0fa4b!2sUbud%2C%20Gianyar%20Regency%2C%20Bali!5e0!3m2!1sen!2sid!4v1702000000000!5m2!1sen!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="StayinUBUD Location"
                                />
                            </div>

                            {/* Office Hours */}
                            <div className="bg-cream p-6 rounded-2xl">
                                <div className="flex items-center space-x-3 mb-4">
                                    <Clock size={24} className="text-sage" />
                                    <h3 className="text-xl font-bold text-olive">Office Hours</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-gray-700">
                                    <div>
                                        <p className="font-medium">Monday - Friday</p>
                                        <p className="text-sage">8:00 AM - 6:00 PM</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Saturday</p>
                                        <p className="text-sage">9:00 AM - 4:00 PM</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Sunday</p>
                                        <p className="text-gray-500">Closed</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">WhatsApp</p>
                                        <p className="text-sage">24/7 Available</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section ref={faqRef} className="py-20 bg-cream/50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-sage font-semibold text-sm uppercase tracking-wider mb-4">
                            Common Questions
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-olive mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Find quick answers to common questions about our villas and services.
                        </p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-olive pr-4">{faq.question}</span>
                                    <motion.div
                                        animate={{ rotate: openFaq === index ? 45 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex-shrink-0 w-8 h-8 bg-sage/10 rounded-full flex items-center justify-center"
                                    >
                                        <span className="text-sage text-xl font-bold">+</span>
                                    </motion.div>
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: openFaq === index ? 'auto' : 0,
                                        opacity: openFaq === index ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-olive to-sage text-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Prefer to Chat Directly?
                        </h2>
                        <p className="text-white/90 text-lg mb-8">
                            Get instant answers on WhatsApp. Our team is ready to assist you
                            with booking inquiries, villa recommendations, and more.
                        </p>
                        <a
                            href="https://wa.me/6281234567890?text=Halo%20StayinUBUD%2C%20saya%20tertarik%20untuk%20memesan%20villa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                        >
                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span>Chat on WhatsApp</span>
                        </a>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
