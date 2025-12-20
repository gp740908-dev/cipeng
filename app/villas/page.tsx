import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import VillasList from '@/components/villas/VillasList'
import WhatsAppButton from '@/components/WhatsAppButton'
import BackToTop from '@/components/BackToTop'

export const metadata: Metadata = {
    title: 'Our Villas - StayinUBUD | Luxury Villa Collection',
    description: 'Browse our curated collection of luxury villas in Ubud. Find your perfect retreat with private pools, rice field views, and premium amenities.',
}

export default function VillasPage() {
    return (
        <main className="min-h-screen bg-cream">
            <Navbar />
            <PageHeader
                title="Our Collection"
                subtitle="Curated properties representing the pinnacle of Balinese architecture and hospitality"
                backgroundImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
                breadcrumbs={[{ label: 'Villas' }]}
                height="medium"
            />
            <section className="py-24">
                <VillasList />
            </section>
            <Footer />
            <WhatsAppButton />
            <BackToTop />
        </main>
    )
}
