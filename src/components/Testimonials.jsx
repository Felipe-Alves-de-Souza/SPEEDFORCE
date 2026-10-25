import Section from './Section'
import { Star } from './Icons'
import { sectionHeaders, testimonials } from '../data/content'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const { kicker, titlePrefix, titleHighlight } = sectionHeaders.reviews

  return (
    <Section
      id="reviews"
      kicker={kicker}
      title={
        <>
          {titlePrefix} <b>{titleHighlight}</b>
        </>
      }
    >
      <div className={styles.grid}>
        {testimonials.map((t) => (
          <figure key={t.id} className={styles.card}>
            {/* balão de fala de gibi */}
            <div className={styles.bubble}>
              <div
                className={styles.stars}
                role="img"
                aria-label={`${t.stars} de 5 estrelas`}
              >
                {Array.from({ length: t.stars }, (_, i) => (
                  <span key={i} className={styles.star}>
                    <Star />
                  </span>
                ))}
              </div>
              <blockquote>&ldquo;{t.text}&rdquo;</blockquote>
            </div>
            <figcaption className={styles.author}>
              {/* avatar fictício: iniciais com borda dourada */}
              <span className={styles.avatar} aria-hidden="true">
                {t.author.replace(/\./g, '')}
              </span>
              <span className={styles.name}>{t.author}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
