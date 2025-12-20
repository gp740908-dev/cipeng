'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

interface WhatsAppButtonProps {
    phoneNumber?: string
    message?: string
}

export default function WhatsAppButton({
    phoneNumber = '6281234567890',
    message = 'Hello, I would like to inquire about your villas.'
}: WhatsAppButtonProps) {
    const [showTooltip, setShowTooltip] = useState(false)

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    return (
        <div className="fixed bottom-8 right-8 z-40">
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full right-0 mb-4 w-64"
                    >
                        <div className="bg-primary text-white p-4 relative">
                            <button
                                onClick={() => setShowTooltip(false)}
                                className="absolute top-2 right-2 text-white/60 hover:text-white"
                            >
                                <X size={14} />
                            </button>
                            <p className="text-sm mb-3">
                                Need assistance? Chat with us directly.
                            </p>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm transition-colors"
                            >
                                Start Chat
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.3 }}
                onClick={() => setShowTooltip(!showTooltip)}
                className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors shadow-lg"
            >
                <MessageCircle size={24} />
            </motion.button>
        </div>
    )
}
