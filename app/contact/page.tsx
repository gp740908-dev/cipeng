import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import WhatsAppButton from '@/components/WhatsAppButton'
import BackToTop from '@/components/BackToTop'
import ContactContent from '@/components/contact/ContactContent'

export const metadata: Metadata = {
    title: 'Contact Us - StayinUBUD | Get in Touch',
    description: 'Have questions about our villas or need help with your booking? Contact StayinUBUD through our form, WhatsApp, or visit our office in Ubud, Bali.',
}

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-cream/30">
            <Navbar />
            <PageHeader
                title="Contact Us"
                subtitle="We're here to help make your Ubud stay extraordinary"
                backgroundImage="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80"
                breadcrumbs={[{ label: 'Contact' }]}
                height="medium"
            />
            <ContactContent />
            <Footer />
            <WhatsAppButton />
            <BackToTop />
        </main>
    )
}
