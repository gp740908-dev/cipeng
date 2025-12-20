import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <main className="min-h-screen bg-cream flex items-center justify-center px-6">
            <div className="text-center">
                <h1 className="font-display text-display-xl text-primary mb-4">404</h1>
                <p className="text-muted text-lg mb-8">
                    The page you're looking for doesn't exist.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-3 text-primary text-sm tracking-[0.2em] uppercase group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Home</span>
                </Link>
            </div>
        </main>
    )
}
