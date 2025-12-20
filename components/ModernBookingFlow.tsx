'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Calendar,
    Users,
    User,
    CreditCard,
    Check,
    ChevronLeft,
    ChevronRight,
    Loader2,
    MessageCircle,
    Phone,
    Mail,
    MapPin,
    Sparkles
} from 'lucide-react'
import { format, addDays, parseISO, differenceInDays } from 'date-fns'
import { id } from 'date-fns/locale'
import { Villa } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { formatCurrency } from '@/lib/utils'

interface ModernBookingFlowProps {
    villa: Villa
    onClose?: () => void
}

type BookingStep = 'dates' | 'guests' | 'review' | 'payment' | 'confirmation'

const steps: { id: BookingStep; label: string; icon: React.ElementType }[] = [
    { id: 'dates', label: 'Tanggal', icon: Calendar },
    { id: 'guests', label: 'Tamu', icon: Users },
    { id: 'review', label: 'Review', icon: Check },
    { id: 'payment', label: 'Bayar', icon: CreditCard },
]

export default function ModernBookingFlow({ villa, onClose }: ModernBookingFlowProps) {
    const supabase = createClient()

    const [currentStep, setCurrentStep] = useState<BookingStep>('dates')
    const [isLoading, setIsLoading] = useState(false)
    const [bookingId, setBookingId] = useState<string | null>(null)

    // Form data
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(2)
    const [guestName, setGuestName] = useState('')
    const [guestEmail, setGuestEmail] = useState('')
    const [guestPhone, setGuestPhone] = useState('')
    const [specialRequests, setSpecialRequests] = useState('')
    const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'whatsapp'>('whatsapp')

    // Calculations
    const nights = checkIn && checkOut ? differenceInDays(parseISO(checkOut), parseISO(checkIn)) : 0
    const subtotal = villa.price_per_night * nights
    const serviceFee = Math.round(subtotal * 0.05) // 5% service fee
    const totalPrice = subtotal + serviceFee

    const minDate = format(new Date(), 'yyyy-MM-dd')

    // Admin WhatsApp number from environment variable
    const adminWhatsApp = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || '6281234567890'

    const stepIndex = steps.findIndex(s => s.id === currentStep)

    const canProceed = () => {
        switch (currentStep) {
            case 'dates':
                return checkIn && checkOut && nights > 0
            case 'guests':
                return guestName.trim() && guestEmail.trim() && guestPhone.trim()
            case 'review':
                return true
            case 'payment':
                return paymentMethod
            default:
                return false
        }
    }

    const nextStep = () => {
        const currentIndex = steps.findIndex(s => s.id === currentStep)
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1].id)
        } else if (currentStep === 'payment') {
            handleSubmitBooking()
        }
    }

    const prevStep = () => {
        const currentIndex = steps.findIndex(s => s.id === currentStep)
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1].id)
        }
    }

    const handleSubmitBooking = async () => {
        setIsLoading(true)

        try {
            // Create booking in database
            const { data, error } = await supabase
                .from('bookings')
                .insert({
                    villa_id: villa.id,
                    guest_name: guestName.trim(),
                    guest_email: guestEmail.trim().toLowerCase(),
                    guest_phone: guestPhone.trim(),
                    check_in: checkIn,
                    check_out: checkOut,
                    total_guests: guests,
                    total_price: totalPrice,
                    special_requests: specialRequests.trim() || null,
                    status: 'pending',
                })
                .select()
                .single()

            if (error) throw error

            setBookingId(data.id)
            setCurrentStep('confirmation')

            // Send to WhatsApp if selected
            if (paymentMethod === 'whatsapp') {
                sendToWhatsApp(data.id)
            }

        } catch (error) {
            console.error('Booking error:', error)
            alert('Terjadi kesalahan. Silakan coba lagi.')
        } finally {
            setIsLoading(false)
        }
    }

    const sendToWhatsApp = (bookingRef: string) => {
        const checkInFormatted = format(parseISO(checkIn), 'dd MMMM yyyy', { locale: id })
        const checkOutFormatted = format(parseISO(checkOut), 'dd MMMM yyyy', { locale: id })

        const message = `
🏝️ *BOOKING BARU - StayinUBUD*

📋 *Detail Booking*
━━━━━━━━━━━━━━━
🆔 ID: ${bookingRef.substring(0, 8).toUpperCase()}
🏠 Villa: ${villa.name}
📍 Lokasi: ${villa.location}

📅 *Tanggal*
━━━━━━━━━━━━━━━
Check-in: ${checkInFormatted}
Check-out: ${checkOutFormatted}
Durasi: ${nights} malam

👥 *Tamu*
━━━━━━━━━━━━━━━
Nama: ${guestName}
Email: ${guestEmail}
Telepon: ${guestPhone}
Jumlah: ${guests} orang
${specialRequests ? `\nPermintaan Khusus:\n${specialRequests}` : ''}

💰 *Rincian Harga*
━━━━━━━━━━━━━━━
${formatCurrency(villa.price_per_night)} × ${nights} malam = ${formatCurrency(subtotal)}
Biaya Layanan (5%): ${formatCurrency(serviceFee)}
━━━━━━━━━━━━━━━
*TOTAL: ${formatCurrency(totalPrice)}*

Mohon konfirmasi ketersediaan villa. Terima kasih! 🙏
`.trim()

        const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        }),
    }

    return (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-sage to-sage-dark p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Book {villa.name}</h2>
                    {onClose && (
                        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            ✕
                        </button>
                    )}
                </div>

                {/* Progress Steps */}
                {currentStep !== 'confirmation' && (
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            const isActive = step.id === currentStep
                            const isCompleted = index < stepIndex

                            return (
                                <div key={step.id} className="flex items-center">
                                    <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                    ${isActive ? 'bg-white text-sage scale-110' : ''}
                    ${isCompleted ? 'bg-white/30 text-white' : ''}
                    ${!isActive && !isCompleted ? 'bg-white/10 text-white/50' : ''}
                  `}>
                                        {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`w-12 h-1 mx-2 rounded transition-colors ${isCompleted ? 'bg-white/50' : 'bg-white/10'
                                            }`} />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 min-h-[400px]">
                <AnimatePresence mode="wait" custom={1}>
                    {/* Step 1: Dates */}
                    {currentStep === 'dates' && (
                        <motion.div
                            key="dates"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={1}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-8">
                                <div className="inline-flex p-4 bg-sage/10 rounded-full mb-4">
                                    <Calendar size={32} className="text-sage" />
                                </div>
                                <h3 className="text-2xl font-bold text-olive">Pilih Tanggal Menginap</h3>
                                <p className="text-gray-600">Kapan Anda ingin menginap?</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-olive mb-2">
                                        Check-in
                                    </label>
                                    <input
                                        type="date"
                                        value={checkIn}
                                        onChange={(e) => {
                                            setCheckIn(e.target.value)
                                            if (checkOut && e.target.value >= checkOut) {
                                                setCheckOut('')
                                            }
                                        }}
                                        min={minDate}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sage focus:ring-4 focus:ring-sage/20 transition-all text-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-olive mb-2">
                                        Check-out
                                    </label>
                                    <input
                                        type="date"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        min={checkIn || minDate}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sage focus:ring-4 focus:ring-sage/20 transition-all text-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-olive mb-2">
                                    Jumlah Tamu
                                </label>
                                <div className="flex items-center justify-center space-x-4">
                                    <button
                                        onClick={() => setGuests(Math.max(1, guests - 1))}
                                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-sage hover:text-white transition-all text-xl font-bold"
                                    >
                                        −
                                    </button>
                                    <span className="text-3xl font-bold text-olive w-16 text-center">{guests}</span>
                                    <button
                                        onClick={() => setGuests(Math.min(villa.max_guests, guests + 1))}
                                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-sage hover:text-white transition-all text-xl font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-center text-sm text-gray-500 mt-2">Maksimal {villa.max_guests} tamu</p>
                            </div>

                            {nights > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-cream/50 rounded-2xl p-4 text-center"
                                >
                                    <p className="text-gray-600">Durasi menginap</p>
                                    <p className="text-3xl font-bold text-sage">{nights} Malam</p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* Step 2: Guest Details */}
                    {currentStep === 'guests' && (
                        <motion.div
                            key="guests"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={1}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-8">
                                <div className="inline-flex p-4 bg-sage/10 rounded-full mb-4">
                                    <User size={32} className="text-sage" />
                                </div>
                                <h3 className="text-2xl font-bold text-olive">Data Tamu</h3>
                                <p className="text-gray-600">Masukkan informasi Anda</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-olive mb-2">
                                        Nama Lengkap *
                                    </label>
                                    <div className="relative">
                                        <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={guestName}
                                            onChange={(e) => setGuestName(e.target.value)}
                                            placeholder="Masukkan nama lengkap"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sage focus:ring-4 focus:ring-sage/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-olive mb-2">
                                        Email *
                                    </label>
                                    <div className="relative">
                                        <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            value={guestEmail}
                                            onChange={(e) => setGuestEmail(e.target.value)}
                                            placeholder="email@contoh.com"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sage focus:ring-4 focus:ring-sage/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-olive mb-2">
                                        Nomor WhatsApp *
                                    </label>
                                    <div className="relative">
                                        <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            value={guestPhone}
                                            onChange={(e) => setGuestPhone(e.target.value)}
                                            placeholder="08123456789"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sage focus:ring-4 focus:ring-sage/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-olive mb-2">
                                        Permintaan Khusus (Opsional)
                                    </label>
                                    <textarea
                                        value={specialRequests}
                                        onChange={(e) => setSpecialRequests(e.target.value)}
                                        placeholder="Contoh: Butuh baby cot, alergi makanan, dll."
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sage focus:ring-4 focus:ring-sage/20 transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Review */}
                    {currentStep === 'review' && (
                        <motion.div
                            key="review"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={1}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-6">
                                <div className="inline-flex p-4 bg-sage/10 rounded-full mb-4">
                                    <Check size={32} className="text-sage" />
                                </div>
                                <h3 className="text-2xl font-bold text-olive">Review Booking</h3>
                                <p className="text-gray-600">Periksa detail booking Anda</p>
                            </div>

                            <div className="bg-cream/50 rounded-2xl p-5 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-olive text-lg">{villa.name}</p>
                                        <p className="text-gray-600 text-sm flex items-center">
                                            <MapPin size={14} className="mr-1" /> {villa.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t border-sage/20 pt-4 grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Check-in</p>
                                        <p className="font-semibold text-olive">
                                            {checkIn && format(parseISO(checkIn), 'dd MMM yyyy', { locale: id })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Check-out</p>
                                        <p className="font-semibold text-olive">
                                            {checkOut && format(parseISO(checkOut), 'dd MMM yyyy', { locale: id })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Tamu</p>
                                        <p className="font-semibold text-olive">{guests} orang</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Durasi</p>
                                        <p className="font-semibold text-olive">{nights} malam</p>
                                    </div>
                                </div>

                                <div className="border-t border-sage/20 pt-4 text-sm">
                                    <p className="text-gray-500 mb-1">Nama Tamu</p>
                                    <p className="font-semibold text-olive">{guestName}</p>
                                    <p className="text-gray-600">{guestEmail} • {guestPhone}</p>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="bg-white border-2 border-sage/20 rounded-2xl p-5 space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>{formatCurrency(villa.price_per_night)} × {nights} malam</span>
                                    <span>{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Biaya layanan (5%)</span>
                                    <span>{formatCurrency(serviceFee)}</span>
                                </div>
                                <div className="border-t border-sage/20 pt-3 flex justify-between text-xl font-bold">
                                    <span className="text-olive">Total</span>
                                    <span className="text-sage">{formatCurrency(totalPrice)}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Payment */}
                    {currentStep === 'payment' && (
                        <motion.div
                            key="payment"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={1}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-6">
                                <div className="inline-flex p-4 bg-sage/10 rounded-full mb-4">
                                    <CreditCard size={32} className="text-sage" />
                                </div>
                                <h3 className="text-2xl font-bold text-olive">Metode Pembayaran</h3>
                                <p className="text-gray-600">Pilih cara pembayaran</p>
                            </div>

                            <div className="space-y-4">
                                {/* WhatsApp Option */}
                                <label className={`
                  block p-5 rounded-2xl border-2 cursor-pointer transition-all
                  ${paymentMethod === 'whatsapp'
                                        ? 'border-sage bg-sage/5 shadow-lg'
                                        : 'border-gray-200 hover:border-sage/50'}
                `}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="whatsapp"
                                        checked={paymentMethod === 'whatsapp'}
                                        onChange={() => setPaymentMethod('whatsapp')}
                                        className="hidden"
                                    />
                                    <div className="flex items-center">
                                        <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center mr-4
                      ${paymentMethod === 'whatsapp' ? 'bg-green-500' : 'bg-gray-100'}
                    `}>
                                            <MessageCircle size={24} className={paymentMethod === 'whatsapp' ? 'text-white' : 'text-gray-500'} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-olive">Chat WhatsApp</p>
                                            <p className="text-sm text-gray-600">Lanjutkan booking via WhatsApp admin</p>
                                        </div>
                                        {paymentMethod === 'whatsapp' && (
                                            <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center">
                                                <Check size={16} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                </label>

                                {/* Bank Transfer Option */}
                                <label className={`
                  block p-5 rounded-2xl border-2 cursor-pointer transition-all
                  ${paymentMethod === 'transfer'
                                        ? 'border-sage bg-sage/5 shadow-lg'
                                        : 'border-gray-200 hover:border-sage/50'}
                `}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="transfer"
                                        checked={paymentMethod === 'transfer'}
                                        onChange={() => setPaymentMethod('transfer')}
                                        className="hidden"
                                    />
                                    <div className="flex items-center">
                                        <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center mr-4
                      ${paymentMethod === 'transfer' ? 'bg-blue-500' : 'bg-gray-100'}
                    `}>
                                            <CreditCard size={24} className={paymentMethod === 'transfer' ? 'text-white' : 'text-gray-500'} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-olive">Transfer Bank</p>
                                            <p className="text-sm text-gray-600">BCA, Mandiri, BNI, BRI</p>
                                        </div>
                                        {paymentMethod === 'transfer' && (
                                            <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center">
                                                <Check size={16} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                </label>
                            </div>

                            <div className="bg-cream/50 rounded-2xl p-4 text-center">
                                <p className="text-2xl font-bold text-sage">{formatCurrency(totalPrice)}</p>
                                <p className="text-gray-600 text-sm">Total Pembayaran</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Confirmation */}
                    {currentStep === 'confirmation' && (
                        <motion.div
                            key="confirmation"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                            className="text-center py-8"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="inline-flex p-6 bg-green-100 rounded-full mb-6"
                            >
                                <Sparkles size={48} className="text-green-600" />
                            </motion.div>

                            <h3 className="text-3xl font-bold text-olive mb-2">Booking Berhasil!</h3>
                            <p className="text-gray-600 mb-6">
                                Nomor Booking: <span className="font-mono font-bold text-sage">{bookingId?.substring(0, 8).toUpperCase()}</span>
                            </p>

                            <div className="bg-cream/50 rounded-2xl p-5 mb-6 text-left">
                                <p className="font-bold text-olive mb-2">{villa.name}</p>
                                <p className="text-sm text-gray-600">
                                    {checkIn && format(parseISO(checkIn), 'dd MMM', { locale: id })} - {checkOut && format(parseISO(checkOut), 'dd MMM yyyy', { locale: id })}
                                </p>
                                <p className="text-sm text-gray-600">{guests} tamu • {nights} malam</p>
                                <p className="text-xl font-bold text-sage mt-3">{formatCurrency(totalPrice)}</p>
                            </div>

                            {paymentMethod === 'whatsapp' && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => sendToWhatsApp(bookingId!)}
                                    className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <MessageCircle size={24} />
                                    <span>Hubungi Admin via WhatsApp</span>
                                </motion.button>
                            )}

                            {paymentMethod === 'transfer' && (
                                <div className="bg-blue-50 rounded-2xl p-5 text-left">
                                    <p className="font-bold text-blue-800 mb-3">Transfer ke:</p>
                                    <div className="space-y-2 text-sm">
                                        <p><span className="text-gray-600">Bank:</span> <span className="font-bold">BCA</span></p>
                                        <p><span className="text-gray-600">No. Rekening:</span> <span className="font-mono font-bold">1234567890</span></p>
                                        <p><span className="text-gray-600">Atas Nama:</span> <span className="font-bold">PT StayinUBUD</span></p>
                                        <p><span className="text-gray-600">Jumlah:</span> <span className="font-bold text-sage">{formatCurrency(totalPrice)}</span></p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-4">
                                        Setelah transfer, kirim bukti pembayaran via WhatsApp untuk konfirmasi.
                                    </p>
                                    <button
                                        onClick={() => sendToWhatsApp(bookingId!)}
                                        className="mt-4 w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <MessageCircle size={20} />
                                        <span>Kirim Bukti Transfer</span>
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer Actions */}
            {currentStep !== 'confirmation' && (
                <div className="p-6 border-t bg-gray-50">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={prevStep}
                            disabled={stepIndex === 0}
                            className={`
                flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all
                ${stepIndex === 0
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-olive hover:bg-gray-200'}
              `}
                        >
                            <ChevronLeft size={20} />
                            <span>Kembali</span>
                        </button>

                        <motion.button
                            whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                            whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                            onClick={nextStep}
                            disabled={!canProceed() || isLoading}
                            className={`
                flex items-center space-x-2 px-8 py-3 rounded-xl font-bold transition-all
                ${canProceed()
                                    ? 'bg-sage text-white hover:bg-sage-dark shadow-lg'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
              `}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    <span>Memproses...</span>
                                </>
                            ) : currentStep === 'payment' ? (
                                <>
                                    <span>Konfirmasi Booking</span>
                                    <Check size={20} />
                                </>
                            ) : (
                                <>
                                    <span>Lanjut</span>
                                    <ChevronRight size={20} />
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            )}
        </div>
    )
}
