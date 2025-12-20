import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import WhatsAppButton from '@/components/WhatsAppButton'
import BackToTop from '@/components/BackToTop'
import ContactContent from '@/components/contact/ContactContent'

export const metadata: Metadata = {
    title: 'Contact Us - StayinUBUD | Get in Touch',
    description: 'Have questions about our villas or need help with your booking? Contact StayinUBUD and let us help plan your perfect Balinese escape.',
}

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-cream">
            <Navbar />
            <PageHeader
                title="Contact"
                subtitle="We're here to help create your perfect Balinese experience"
                backgroundImage="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80"
                breadcrumbs={[{ label: 'Contact' }]}
                height="small"
            />
            <ContactContent />
            <Footer />
            <WhatsAppButton />
            <BackToTop />
        </main>
    )
}
