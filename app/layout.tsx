import type { Metadata, Viewport } from "next";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import Providers from "@/components/Providers";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4A5D23",
};

export const metadata: Metadata = {
  title: "StayinUBUD - Luxury Villa Rentals in Ubud, Bali",
  description: "Experience architectural excellence and serene luxury in the heart of Bali's cultural paradise. Curated villa collection with private pools and stunning views.",
  keywords: "Ubud villas, Bali accommodation, luxury villas, rice field view, private pool, Ubud rental, architectural design",
  authors: [{ name: "StayinUBUD" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "StayinUBUD",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: "StayinUBUD - Luxury Villa Rentals in Ubud, Bali",
    description: "Experience architectural excellence and serene luxury in the heart of Bali's cultural paradise.",
    type: "website",
    locale: "en_US",
    siteName: "StayinUBUD",
  },
  twitter: {
    card: "summary_large_image",
    title: "StayinUBUD - Luxury Villa Rentals",
    description: "Experience architectural excellence and serene luxury in Ubud, Bali.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* PWA Meta Tags */}
        <meta name="application-name" content="StayinUBUD" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="StayinUBUD" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />

        {/* Splash Screens for iOS */}
        <link rel="apple-touch-startup-image" href="/splash/splash-640x1136.png" media="(device-width: 320px) and (device-height: 568px)" />
        <link rel="apple-touch-startup-image" href="/splash/splash-750x1334.png" media="(device-width: 375px) and (device-height: 667px)" />
        <link rel="apple-touch-startup-image" href="/splash/splash-1242x2208.png" media="(device-width: 414px) and (device-height: 736px)" />
      </head>
      <body className="antialiased bg-cream font-body text-primary">
        <Providers>
          <ServiceWorkerRegister />
          <AnalyticsTracker />
          {children}
        </Providers>
      </body>
    </html>
  );
}
