import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Button from './Button'
import { Burst, Sfx } from './ComicFx'
import { heroContent } from '../data/content'
import watchImg from '../assets/watch.jpg'
import bgImg from '../assets/comic-strike.jpg'
import styles from './Hero.module.css'

gsap.registerPlugin(useGSAP)

export default function Hero({ onCta, isLoaded }) {
  const root = useRef(null)

  // Antes do preloader terminar: esconde os elementos (layout effect, sem "flicker").
  // Depois: revela de baixo para cima com stagger rápido (só transform + opacity).
  useGSAP(
    () => {
      const items = gsap.utils.toArray('[data-reveal]', root.current)

      if (!isLoaded) {
        gsap.set(items, { autoAlpha: 0, y: 50 })
        return
      }

      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.1,
        clearProps: 'transform',
      })
    },
    { scope: root, dependencies: [isLoaded] },
  )

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-title"
      className={styles.hero}
      style={{ '--bg-img': `url(${bgImg})` }}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow} data-reveal>
            {heroContent.eyebrow}
          </span>
          <h1 id="hero-title" className={styles.title} data-reveal>
            {heroContent.titleMain} <em>{heroContent.titleHighlight}</em>
          </h1>
          <p className={styles.sub} data-reveal>
            {heroContent.subtitle}
          </p>
          <div data-reveal>
            <Button size="lg" onClick={onCta}>
              {heroContent.ctaLabel}
            </Button>
          </div>
        </div>

        <div className={styles.visual} data-reveal>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.smoke} aria-hidden="true" />
          <div className={styles.smoke2} aria-hidden="true" />
          <div className={styles.lines} aria-hidden="true" />
          <img
            src={watchImg}
            alt={heroContent.watchAlt}
            className={styles.watch}
            fetchPriority="high"
          />
          <Sfx className={styles.zoom}>{heroContent.sfxText}</Sfx>
          <Burst className={styles.burst}>{heroContent.burstText}</Burst>
        </div>
      </div>
    </section>
  )
}
