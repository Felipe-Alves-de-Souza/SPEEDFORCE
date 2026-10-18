import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Button from './Button'
import { Burst, Sfx } from './ComicFx'
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
    <section ref={root} id="top" className={styles.hero} style={{ '--bg-img': `url(${bgImg})` }}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow} data-reveal>Smartwatch de alta performance</span>
          <h1 className={styles.title} data-reveal>
            Não fique apenas correndo contra o tempo. <em>Assuma o controle.</em>
          </h1>
          <p className={styles.sub} data-reveal>
            Desperte a Speed Force que há em você com o relógio definitivo para reflexos, foco e hiperprodutividade.
          </p>
          <div data-reveal>
            <Button size="lg" onClick={onCta}>Ativar minha Speed Force</Button>
          </div>
        </div>

        <div className={styles.visual} data-reveal>
          <div className={styles.glow} />
          <div className={styles.smoke} />
          <div className={styles.smoke2} />
          <div className={styles.lines} />
          <img src={watchImg} alt="Smartwatch SPEEDFORCE vermelho com raios na tela" className={styles.watch} />
          <Sfx className={styles.zoom}>ZOOM!</Sfx>
          <Burst className={styles.burst}>NOVO!</Burst>
        </div>
      </div>
    </section>
  )
}
