'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Mail, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [step, setStep] = useState('')

    const supabase = createClient()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setStep('')
        setLoading(true)

        const normalizedEmail = email.trim().toLowerCase()

        try {
            // Step 1: Sign in with Supabase Auth
            setStep('Authenticating...')
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: normalizedEmail,
                password,
            })

            if (authError) {
                throw new Error(authError.message)
            }

            if (!authData.user) {
                throw new Error('Authentication failed')
            }

            setStep('Verifying admin access...')

            // Step 2: Try to check admin_users table directly
            const { data: adminData, error: adminError } = await supabase
                .from('admin_users')
                .select('id, email, role')
                .eq('email', normalizedEmail)
                .maybeSingle()

            // If direct query works
            if (adminData) {
                setStep('Access granted!')
                await new Promise(resolve => setTimeout(resolve, 500))
                router.push('/admin/dashboard')
                router.refresh()
                return
            }

            // If direct query failed due to RLS, try RPC function
            if (adminError) {
                console.log('Direct query failed, trying RPC...', adminError.message)
                
                const { data: isAdmin, error: rpcError } = await supabase
                    .rpc('is_admin', { check_email: normalizedEmail })

                if (rpcError) {
                    console.error('RPC error:', rpcError)
                    await supabase.auth.signOut()
                    throw new Error('Unable to verify admin status. Please check database setup.')
                }

                if (isAdmin) {
                    setStep('Access granted!')
                    await new Promise(resolve => setTimeout(resolve, 500))
                    router.push('/admin/dashboard')
                    router.refresh()
                    return
                }
            }

            // No admin access found
            await supabase.auth.signOut()
            throw new Error(`"${normalizedEmail}" is not registered as admin.`)

        } catch (err: any) {
            console.error('Login error:', err)
            setError(err.message || 'Login failed')
            setStep('')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream via-sage-light/20 to-olive/10 flex items-center justify-center p-4">
            {/* Back to Home */}
            <Link
                href="/"
                className="absolute top-8 left-8 text-olive hover:text-sage transition-colors font-medium"
            >
                ← Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="font-knewave text-4xl text-sage mb-2">StayinUBUD</h1>
                    <p className="text-gray-600">Admin Panel</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
                    <div className="flex items-center justify-center w-16 h-16 bg-sage/10 rounded-full mx-auto mb-6">
                        <Lock size={32} className="text-sage" />
                    </div>

                    <h2 className="text-2xl font-bold text-olive text-center mb-8">
                        Admin Login
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="admin@stayinubud.com"
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter your password"
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3"
                            >
                                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700">{error}</p>
                            </motion.div>
                        )}

                        {step && !error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3"
                            >
                                {step === 'Access granted!' ? (
                                    <CheckCircle size={20} className="text-green-500" />
                                ) : (
                                    <Loader2 size={20} className="text-blue-500 animate-spin" />
                                )}
                                <p className="text-sm text-blue-700">{step}</p>
                            </motion.div>
                        )}

                        <motion.button
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-sage text-white py-3 rounded-lg font-semibold hover:bg-sage-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    <span>Please wait...</span>
                                </>
                            ) : (
                                <span>Sign In</span>
                            )}
                        </motion.button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Protected admin access only
                    </p>
                </div>

                <p className="text-center text-xs text-gray-500 mt-8">
                    © 2024 StayinUBUD. All rights reserved.
                </p>
            </motion.div>
        </div>
    )
}
