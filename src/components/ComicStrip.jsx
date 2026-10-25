import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Section from './Section'
import { Sfx } from './ComicFx'
import { comicPanels, sectionHeaders } from '../data/content'
import styles from './ComicStrip.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// HQ "A Origem": página de gibi com painéis que "pulam" na tela ao rolar.
export default function ComicStrip() {
  const root = useRef(null)
  const { kicker, titlePrefix, titleHighlight } = sectionHeaders.origin

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 861px) and (prefers-reduced-motion: no-preference)',
          isMobile: '(max-width: 860px) and (prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { isMobile } = context.conditions

          gsap.utils.toArray(`.${styles.panel}`).forEach((panel, i) => {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: panel, start: 'top 86%', once: true },
            })
            tl.from(panel, {
              autoAlpha: 0,
              scale: isMobile ? 0.92 : 0.82,
              rotate: isMobile ? 0 : i % 2 ? 4 : -4,
              duration: 0.55,
              ease: 'back.out(1.6)',
            }).from(
              panel.querySelectorAll('[data-pop]'),
              {
                autoAlpha: 0,
                scale: 0,
                duration: 0.4,
                ease: 'back.out(2.5)',
                stagger: 0.12,
              },
              '-=0.2',
            )
          })
        },
      )
    },
    { scope: root },
  )

  return (
    <Section
      id="origin"
      kicker={kicker}
      title={
        <>
          {titlePrefix} <b>{titleHighlight}</b>
        </>
      }
    >
      <div ref={root} className={styles.page}>
        {comicPanels.map((p) => (
          <figure key={p.id} className={`${styles.panel} ${styles[p.area]}`}>
            <img src={p.img} alt={p.alt} loading="lazy" />
            {p.caption && (
              <figcaption className={styles.caption} data-pop>
                {p.caption}
              </figcaption>
            )}
            {p.bubble && (
              <p
                className={`${styles.bubble} ${styles[p.bubblePlace]}`}
                data-pop
              >
                {p.bubble}
              </p>
            )}
            {p.sfx && (
              <span
                className={`${styles.sfxWrap} ${styles[p.sfxPlace]}`}
                data-pop
              >
                <Sfx color={p.sfxColor} className={styles.sfx}>
                  {p.sfx}
                </Sfx>
              </span>
            )}
          </figure>
        ))}
      </div>
    </Section>
  )
}
