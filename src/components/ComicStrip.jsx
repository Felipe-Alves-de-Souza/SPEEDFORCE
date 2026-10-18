import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Section from './Section'
import { Sfx } from './ComicFx'
import { comicPanels } from '../data/content'
import styles from './ComicStrip.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// HQ "A Origem": página de gibi com painéis que "pulam" na tela ao rolar.
export default function ComicStrip() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.utils.toArray(`.${styles.panel}`).forEach((panel, i) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: panel, start: 'top 85%', once: true },
        })
        tl.from(panel, {
          autoAlpha: 0,
          scale: 0.8,
          rotate: i % 2 ? 5 : -5,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }).from(
          panel.querySelectorAll('[data-pop]'),
          { autoAlpha: 0, scale: 0, duration: 0.45, ease: 'back.out(3)', stagger: 0.15 },
          '-=0.2',
        )
      })
    },
    { scope: root },
  )

  return (
    <Section id="origin" kicker="Edição #1" title={<>A origem da <b>Speed Force</b></>}>
      <div ref={root} className={styles.page}>
        {comicPanels.map((p) => (
          <figure key={p.id} className={`${styles.panel} ${styles[p.area]}`}>
            <img src={p.img} alt={p.alt} loading="lazy" />
            {p.caption && <figcaption className={styles.caption} data-pop>{p.caption}</figcaption>}
            {p.bubble && (
              <p className={styles.bubble} style={p.bubblePos} data-pop>{p.bubble}</p>
            )}
            {p.sfx && (
              <span className={styles.sfxWrap} style={p.sfxPos} data-pop>
                <Sfx color={p.sfxColor} className={styles.sfx}>{p.sfx}</Sfx>
              </span>
            )}
          </figure>
        ))}
      </div>
    </Section>
  )
}

