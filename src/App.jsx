import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Faq from './components/Faq'
import Footer from './components/Footer'
import WaitlistModal from './components/WaitlistModal'
import Preloader from './components/Preloader'
import { useModal } from './hooks/useModal'

// Raiz da View: o ViewModel do modal vive aqui e é injetado nos CTAs.
export default function App() {
  const modal = useModal()
  // vira true quando a timeline do preloader termina (onComplete)
  const [isLoaded, setIsLoaded] = useState(false)
  const handleLoaded = useCallback(() => setIsLoaded(true), [])

  // Trava o scroll durante o preloader e libera ao concluir.
  useEffect(() => {
    if (isLoaded) return undefined
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoaded])

  return (
    <>
      {!isLoaded && <Preloader onComplete={handleLoaded} />}
      <Header onCta={modal.open} />
      <main>
        <Hero onCta={modal.open} isLoaded={isLoaded} />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing onBuy={modal.open} />
        <Faq />
      </main>
      <Footer />
      <WaitlistModal isOpen={modal.isOpen} onClose={modal.close} />
    </>
  )
}
