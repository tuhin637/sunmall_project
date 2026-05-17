import Navbar from '@/components/layout/Navbar'
import CartSidebar from '@/components/layout/CartSidebar'
import HeroSection from '@/components/sections/HeroSection'
import ProductsSection from '@/components/sections/ProductsSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <CartSidebar />
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
