import { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Experience from '@/components/home/Experience'
import Features from '@/components/home/Features'
import Testimonials from '@/components/home/Testimonials'
import CTASection from '@/components/home/CTASection'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import BackToTop from '@/components/BackToTop'
import PromoBanner from '@/components/PromoBanner'

export const metadata: Metadata = {
  title: 'StayinUBUD - Luxury Villa Rentals in Ubud, Bali',
  description: 'Experience luxury in the heart of Ubud with our premium villa rentals. Private pools, stunning rice field views, and authentic Balinese hospitality.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Experience />
      <Testimonials />
      <CTASection />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <PromoBanner page="home" />
    </main>
  )
}

