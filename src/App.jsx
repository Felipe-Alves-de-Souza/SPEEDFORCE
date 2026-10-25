import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ComicStrip from './components/ComicStrip'
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

  // Controle unificado de bloqueio de scroll (Preloader OU Modal abertos), evitando condição de corrida.
  useEffect(() => {
    const shouldLockScroll = !isLoaded || modal.isOpen
    document.body.style.overflow = shouldLockScroll ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoaded, modal.isOpen])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      {!isLoaded && <Preloader onComplete={handleLoaded} />}
      <div inert={modal.isOpen ? '' : undefined} aria-hidden={modal.isOpen}>
        <Header onCta={modal.open} />
        <main id="main-content" tabIndex={-1}>
          <Hero onCta={modal.open} isLoaded={isLoaded} />
          <ComicStrip />
          <Features />
          <HowItWorks />
          <Testimonials />
          <Pricing onBuy={modal.open} />
          <Faq />
        </main>
        <Footer />
      </div>
      <WaitlistModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        dialogRef={modal.dialogRef}
      />
    </>
  )
}
