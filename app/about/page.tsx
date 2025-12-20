import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import WhatsAppButton from '@/components/WhatsAppButton'
import BackToTop from '@/components/BackToTop'
import AboutContent from '@/components/about/AboutContent'

export const metadata: Metadata = {
    title: 'About Us - StayinUBUD | Luxury Villa Rentals in Ubud',
    description: 'Learn about StayinUBUD\'s story, our mission to provide exceptional villa experiences in Ubud, Bali, and meet the team behind our luxury properties.',
}

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-cream/30">
            <Navbar />
            <PageHeader
                title="About Us"
                subtitle="Discover the story behind StayinUBUD and our passion for creating unforgettable Balinese experiences"
                backgroundImage="https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1920&q=80"
                breadcrumbs={[{ label: 'About Us' }]}
                height="large"
            />
            <AboutContent />
            <Footer />
            <WhatsAppButton />
            <BackToTop />
        </main>
    )
}
