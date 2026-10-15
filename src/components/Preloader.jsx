import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import styles from './Preloader.module.css'

gsap.registerPlugin(useGSAP)

// Raio em zigue-zague (viewBox 100x100, esticado verticalmente na tela).
const BOLT_PATH = 'M58 0 L44 22 L56 26 L38 50 L50 54 L30 80 L40 83 L26 100'

/**
 * Preloader cinematográfico:
 *  1) Rastro do Flash cruzando a tela  2) Raio caindo  3) Flash bang + remoção.
 * Chama `onComplete` quando toda a timeline termina.
 */
export default function Preloader({ onComplete }) {
  const root = useRef(null)
  const text = useRef(null)
  const flash = useRef(null)

  useGSAP(
    () => {
      // Acessibilidade: sem animação para quem prefere movimento reduzido.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(root.current, { display: 'none' })
        onComplete()
        return
      }

      const streaks = gsap.utils.toArray(`.${styles.streak}`)
      const bolt = `.${styles.bolt}`

      gsap.set(streaks, { x: '-80vw' })
      gsap.set(flash.current, { autoAlpha: 0 })
      gsap.set(bolt, { autoAlpha: 0, strokeDashoffset: 1 })

      const tl = gsap.timeline({ onComplete })

      // 1. Texto aparece rápido
      tl.fromTo(
        text.current,
        { autoAlpha: 0, scale: 0.96 },
        { autoAlpha: 1, scale: 1, duration: 0.2, ease: 'power2.out' },
      )
        // A corrida: rastros em altíssima velocidade (apenas transform)
        .to(
          streaks,
          { x: '110vw', duration: 0.5, ease: 'expo.in', stagger: 0.04 },
          0.25,
        )
        // Texto some enquanto o rastro passa
        .to(text.current, { autoAlpha: 0, scale: 1.05, duration: 0.15, ease: 'power2.in' }, 0.6)

        // 2. O raio cai de cima para baixo (stroke-dashoffset)
        .set(bolt, { autoAlpha: 1 }, '+=0.05')
        .to(bolt, { strokeDashoffset: 0, duration: 0.14, ease: 'none' })

        // 3. Flash bang: tela branca/amarela, preloader some instantaneamente
        .set(flash.current, { autoAlpha: 1 }, '+=0.04')
        .set(root.current, { autoAlpha: 0, display: 'none' })
        .to(flash.current, { autoAlpha: 0, duration: 0.4, ease: 'power2.out' }, '+=0.1')
    },
    { scope: root },
  )

  return (
    <>
      <div ref={root} className={styles.preloader} aria-hidden="true">
        <div className={styles.track}>
          {[styles.glow, styles.core, styles.thin, styles.thin2].map((variant, i) => (
            <span key={i} className={`${styles.streak} ${variant}`} />
          ))}
        </div>

        <p ref={text} className={styles.text}>CALIBRANDO SPEED FORCE...</p>

        <svg className={styles.boltSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path className={styles.bolt} d={BOLT_PATH} pathLength="1" />
        </svg>
      </div>

      {/* O flash fica fora do container preto para sobreviver à sua remoção */}
      <div ref={flash} className={styles.flash} aria-hidden="true" />
    </>
  )
}
