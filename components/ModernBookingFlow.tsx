'use client'

import { useState } from 'react'
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
    Sparkles,
    X
} from 'lucide-react'
import { format, parseISO, differenceInDays } from 'date-fns'
import { Villa } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { formatCurrency } from '@/lib/utils'

interface ModernBookingFlowProps {
    villa: Villa
    onClose?: () => void
}

type BookingStep = 'dates' | 'guests' | 'review' | 'payment' | 'confirmation'

const steps: { id: BookingStep; label: string; icon: React.ElementType }[] = [
    { id: 'dates', label: 'Dates', icon: Calendar },
    { id: 'guests', label: 'Guest', icon: Users },
    { id: 'review', label: 'Review', icon: Check },
    { id: 'payment', label: 'Pay', icon: CreditCard },
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
            alert('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const sendToWhatsApp = (bookingRef: string) => {
        const checkInFormatted = format(parseISO(checkIn), 'dd MMM yyyy')
        const checkOutFormatted = format(parseISO(checkOut), 'dd MMM yyyy')

        const message = `
🏝️ *NEW BOOKING - StayinUBUD*

📋 *Booking Details*
━━━━━━━━━━━━━━━
🆔 ID: ${bookingRef.substring(0, 8).toUpperCase()}
🏠 Villa: ${villa.name}
📍 Location: ${villa.location}

📅 *Dates*
━━━━━━━━━━━━━━━
Check-in: ${checkInFormatted}
Check-out: ${checkOutFormatted}
Duration: ${nights} night${nights > 1 ? 's' : ''}

👥 *Guest*
━━━━━━━━━━━━━━━
Name: ${guestName}
Email: ${guestEmail}
Phone: ${guestPhone}
Total Guests: ${guests} person${guests > 1 ? 's' : ''}
${specialRequests ? `\nSpecial Requests:\n${specialRequests}` : ''}

💰 *Price Breakdown*
━━━━━━━━━━━━━━━
${formatCurrency(villa.price_per_night)} × ${nights} night${nights > 1 ? 's' : ''} = ${formatCurrency(subtotal)}
Service Fee (5%): ${formatCurrency(serviceFee)}
━━━━━━━━━━━━━━━
*TOTAL: ${formatCurrency(totalPrice)}*

Please confirm villa availability. Thank you! 🙏
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
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden w-full max-w-[95vw] md:max-w-2xl mx-auto max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-sage to-sage-dark p-4 md:p-6 text-white flex-shrink-0">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                    <h2 className="text-lg md:text-2xl font-bold truncate pr-4">Book {villa.name}</h2>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-1.5 md:p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
                        >
                            <X size={20} />
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
                    flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-300
                    ${isActive ? 'bg-white text-sage scale-105 md:scale-110' : ''}
                    ${isCompleted ? 'bg-white/30 text-white' : ''}
                    ${!isActive && !isCompleted ? 'bg-white/10 text-white/50' : ''}
                  `}>
                                        {isCompleted ? <Check size={16} className="md:w-5 md:h-5" /> : <Icon size={16} className="md:w-5 md:h-5" />}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`w-6 md:w-12 h-0.5 md:h-1 mx-1 md:mx-2 rounded transition-colors ${isCompleted ? 'bg-white/50' : 'bg-white/10'
                                            }`} />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Content - Scrollable */}
            <div className="p-4 md:p-6 flex-1 overflow-y-auto">
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
                            className="space-y-4 md:space-y-6"
                        >
                            <div className="text-center mb-4 md:mb-8">
                                <div className="inline-flex p-3 md:p-4 bg-sage/10 rounded-full mb-3 md:mb-4">
                                    <Calendar size={24} className="md:w-8 md:h-8 text-sage" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-olive">Select Your Dates</h3>
                                <p className="text-gray-600 text-sm md:text-base">When would you like to stay?</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-olive mb-1 md:mb-2">
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
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-2 border-gray-200 focus:border-sage focus:ring-4 focus:ring-sage/20 transition-all text-sm md:text-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-olive mb-1 md:mb-2">
                                        Check-out
                                    </label>
                                    <input
                                        type="date"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        min={checkIn || minDate}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-2 border-gray-200 focus:border-sage focus:ring-4 focus:ring-sage/20 transition-all text-sm md:text-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs md:text-sm font-medium text-olive mb-2">
                                    Number of Guests
                                </label>
                                <div className="flex items-center justify-center space-x-4">
                                    <button
                                        onClick={() => setGuests(Math.max(1, guests - 1))}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-sage hover:text-white transition-all text-lg md:text-xl font-bold"
                                    >
                                        −
                                    </button>
                                    <span className="text-2xl md:text-3xl font-bold text-olive w-12 md:w-16 text-center">{guests}</span>
                                    <button
                                        onClick={() => setGuests(Math.min(villa.max_guests, guests + 1))}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-sage hover:text-white transition-all text-lg md:text-xl font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-center text-xs md:text-sm text-gray-500 mt-2">Maximum {villa.max_guests} guests</p>
                            </div>

                            {nights > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-cream/50 rounded-xl md:rounded-2xl p-3 md:p-4 text-center"
                                >
                                    <p className="text-gray-600 text-sm">Duration</p>
                                    <p className="text-2xl md:text-3xl font-bold text-sage">{nights} Night{nights > 1 ? 's' : ''}</p>
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
                            className="space-y-4 md:space-y-6"
                        >
                            <div className="text-center mb-4 md:mb-8">
                                <div className="inline-flex p-3 md:p-4 bg-sage/10 rounded-full mb-3 md:mb-4">
                                    <User size={24} className="md:w-8 md:h-8 text-sage" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-olive">Guest Information</h3>
                                <p className="text-gray-600 text-sm md:text-base">Enter your details</p>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-olive mb-1 md:mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={guestName}
                                            onChange={(e) => setGuestName(e.target.value)}
                                            placeholder="Enter your full name"
                                            className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-2 border-gray-200 focus:border-sage focus:ring-4 focus:ring-sage/20 transition-all text-sm md:text-base"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-olive mb-1 md:mb-2">
                                        Email *
                                    </label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            value={guestEmail}
                                            onChange={(e) => setGuestEmail(e.target.value)}
                                            placeholder="email@example.com"
                                            className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-2 border-gray-200 focus:border-sage focus:ring-4 focus:ring-sage/20 transition-all text-sm md:text-base"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-olive mb-1 md:mb-2">
                                        WhatsApp Number *
                                    </label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            value={guestPhone}
                                            onChange={(e) => setGuestPhone(e.target.value)}
                                            placeholder="+62 812 3456 7890"
                                            className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-2 border-gray-200 focus:border-sage focus:ring-4 focus:ring-sage/20 transition-all text-sm md:text-base"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-medium text-olive mb-1 md:mb-2">
                                        Special Requests (Optional)
                                    </label>
                                    <textarea
                                        value={specialRequests}
                                        onChange={(e) => setSpecialRequests(e.target.value)}
                                        placeholder="E.g., Early check-in, baby cot, dietary restrictions..."
                                        rows={3}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-2 border-gray-200 focus:border-sage focus:ring-4 focus:ring-sage/20 transition-all resize-none text-sm md:text-base"
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
                            className="space-y-4 md:space-y-6"
                        >
                            <div className="text-center mb-4 md:mb-6">
                                <div className="inline-flex p-3 md:p-4 bg-sage/10 rounded-full mb-3 md:mb-4">
                                    <Check size={24} className="md:w-8 md:h-8 text-sage" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-olive">Review Your Booking</h3>
                                <p className="text-gray-600 text-sm md:text-base">Please verify your details</p>
                            </div>

                            <div className="bg-cream/50 rounded-xl md:rounded-2xl p-4 md:p-5 space-y-3 md:space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-olive text-base md:text-lg">{villa.name}</p>
                                        <p className="text-gray-600 text-xs md:text-sm flex items-center">
                                            <MapPin size={12} className="mr-1" /> {villa.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t border-sage/20 pt-3 md:pt-4 grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                                    <div>
                                        <p className="text-gray-500">Check-in</p>
                                        <p className="font-semibold text-olive">
                                            {checkIn && format(parseISO(checkIn), 'dd MMM yyyy')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Check-out</p>
                                        <p className="font-semibold text-olive">
                                            {checkOut && format(parseISO(checkOut), 'dd MMM yyyy')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Guests</p>
                                        <p className="font-semibold text-olive">{guests} person{guests > 1 ? 's' : ''}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Duration</p>
                                        <p className="font-semibold text-olive">{nights} night{nights > 1 ? 's' : ''}</p>
                                    </div>
                                </div>

                                <div className="border-t border-sage/20 pt-3 md:pt-4 text-xs md:text-sm">
                                    <p className="text-gray-500 mb-1">Guest Name</p>
                                    <p className="font-semibold text-olive">{guestName}</p>
                                    <p className="text-gray-600 text-xs md:text-sm">{guestEmail} • {guestPhone}</p>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="bg-white border-2 border-sage/20 rounded-xl md:rounded-2xl p-4 md:p-5 space-y-2 md:space-y-3">
                                <div className="flex justify-between text-gray-600 text-sm md:text-base">
                                    <span>{formatCurrency(villa.price_per_night)} × {nights} night{nights > 1 ? 's' : ''}</span>
                                    <span>{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm md:text-base">
                                    <span>Service fee (5%)</span>
                                    <span>{formatCurrency(serviceFee)}</span>
                                </div>
                                <div className="border-t border-sage/20 pt-2 md:pt-3 flex justify-between text-lg md:text-xl font-bold">
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
                            className="space-y-4 md:space-y-6"
                        >
                            <div className="text-center mb-4 md:mb-6">
                                <div className="inline-flex p-3 md:p-4 bg-sage/10 rounded-full mb-3 md:mb-4">
                                    <CreditCard size={24} className="md:w-8 md:h-8 text-sage" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-olive">Payment Method</h3>
                                <p className="text-gray-600 text-sm md:text-base">Choose how to proceed</p>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                {/* WhatsApp Option */}
                                <label className={`
                  block p-4 md:p-5 rounded-xl md:rounded-2xl border-2 cursor-pointer transition-all
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
                      w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 md:mr-4
                      ${paymentMethod === 'whatsapp' ? 'bg-green-500' : 'bg-gray-100'}
                    `}>
                                            <MessageCircle size={20} className={`md:w-6 md:h-6 ${paymentMethod === 'whatsapp' ? 'text-white' : 'text-gray-500'}`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-olive text-sm md:text-base">Chat via WhatsApp</p>
                                            <p className="text-xs md:text-sm text-gray-600">Continue booking via admin WhatsApp</p>
                                        </div>
                                        {paymentMethod === 'whatsapp' && (
                                            <div className="w-5 h-5 md:w-6 md:h-6 bg-sage rounded-full flex items-center justify-center">
                                                <Check size={14} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                </label>

                                {/* Bank Transfer Option */}
                                <label className={`
                  block p-4 md:p-5 rounded-xl md:rounded-2xl border-2 cursor-pointer transition-all
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
                      w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 md:mr-4
                      ${paymentMethod === 'transfer' ? 'bg-blue-500' : 'bg-gray-100'}
                    `}>
                                            <CreditCard size={20} className={`md:w-6 md:h-6 ${paymentMethod === 'transfer' ? 'text-white' : 'text-gray-500'}`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-olive text-sm md:text-base">Bank Transfer</p>
                                            <p className="text-xs md:text-sm text-gray-600">BCA, Mandiri, BNI, BRI</p>
                                        </div>
                                        {paymentMethod === 'transfer' && (
                                            <div className="w-5 h-5 md:w-6 md:h-6 bg-sage rounded-full flex items-center justify-center">
                                                <Check size={14} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                </label>
                            </div>

                            <div className="bg-cream/50 rounded-xl md:rounded-2xl p-3 md:p-4 text-center">
                                <p className="text-xl md:text-2xl font-bold text-sage">{formatCurrency(totalPrice)}</p>
                                <p className="text-gray-600 text-xs md:text-sm">Total Payment</p>
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
                            className="text-center py-4 md:py-8"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="inline-flex p-4 md:p-6 bg-green-100 rounded-full mb-4 md:mb-6"
                            >
                                <Sparkles size={36} className="md:w-12 md:h-12 text-green-600" />
                            </motion.div>

                            <h3 className="text-2xl md:text-3xl font-bold text-olive mb-2">Booking Successful!</h3>
                            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                                Booking ID: <span className="font-mono font-bold text-sage">{bookingId?.substring(0, 8).toUpperCase()}</span>
                            </p>

                            <div className="bg-cream/50 rounded-xl md:rounded-2xl p-4 md:p-5 mb-4 md:mb-6 text-left">
                                <p className="font-bold text-olive mb-2 text-sm md:text-base">{villa.name}</p>
                                <p className="text-xs md:text-sm text-gray-600">
                                    {checkIn && format(parseISO(checkIn), 'dd MMM')} - {checkOut && format(parseISO(checkOut), 'dd MMM yyyy')}
                                </p>
                                <p className="text-xs md:text-sm text-gray-600">{guests} guest{guests > 1 ? 's' : ''} • {nights} night{nights > 1 ? 's' : ''}</p>
                                <p className="text-lg md:text-xl font-bold text-sage mt-3">{formatCurrency(totalPrice)}</p>
                            </div>

                            {paymentMethod === 'whatsapp' && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => sendToWhatsApp(bookingId!)}
                                    className="w-full bg-green-500 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 text-sm md:text-base"
                                >
                                    <MessageCircle size={20} />
                                    <span>Contact Admin via WhatsApp</span>
                                </motion.button>
                            )}

                            {paymentMethod === 'transfer' && (
                                <div className="bg-blue-50 rounded-xl md:rounded-2xl p-4 md:p-5 text-left">
                                    <p className="font-bold text-blue-800 mb-2 md:mb-3 text-sm md:text-base">Transfer to:</p>
                                    <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                                        <p><span className="text-gray-600">Bank:</span> <span className="font-bold">BCA</span></p>
                                        <p><span className="text-gray-600">Account No:</span> <span className="font-mono font-bold">1234567890</span></p>
                                        <p><span className="text-gray-600">Account Name:</span> <span className="font-bold">PT StayinUBUD</span></p>
                                        <p><span className="text-gray-600">Amount:</span> <span className="font-bold text-sage">{formatCurrency(totalPrice)}</span></p>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-gray-500 mt-3 md:mt-4">
                                        After transfer, please send proof of payment via WhatsApp for confirmation.
                                    </p>
                                    <button
                                        onClick={() => sendToWhatsApp(bookingId!)}
                                        className="mt-3 md:mt-4 w-full bg-green-500 text-white py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 text-sm md:text-base"
                                    >
                                        <MessageCircle size={18} />
                                        <span>Send Payment Proof</span>
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer Actions */}
            {currentStep !== 'confirmation' && (
                <div className="p-4 md:p-6 border-t bg-gray-50 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={prevStep}
                            disabled={stepIndex === 0}
                            className={`
                flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-medium transition-all text-sm md:text-base
                ${stepIndex === 0
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-olive hover:bg-gray-200'}
              `}
                        >
                            <ChevronLeft size={18} />
                            <span>Back</span>
                        </button>

                        <motion.button
                            whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                            whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                            onClick={nextStep}
                            disabled={!canProceed() || isLoading}
                            className={`
                flex items-center space-x-1 md:space-x-2 px-4 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold transition-all text-sm md:text-base
                ${canProceed()
                                    ? 'bg-sage text-white hover:bg-sage-dark shadow-lg'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
              `}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : currentStep === 'payment' ? (
                                <>
                                    <span>Confirm Booking</span>
                                    <Check size={18} />
                                </>
                            ) : (
                                <>
                                    <span>Continue</span>
                                    <ChevronRight size={18} />
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            )}
        </div>
    )
}
