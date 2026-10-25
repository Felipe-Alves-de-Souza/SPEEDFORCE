import Section from './Section'
import { Icon } from './Icons'
import { features, sectionHeaders } from '../data/content'
import styles from './Features.module.css'

export default function Features() {
  const { kicker, titlePrefix, titleHighlight } = sectionHeaders.features

  return (
    <Section
      id="features"
      kicker={kicker}
      title={
        <>
          {titlePrefix} <b>{titleHighlight}</b>
        </>
      }
    >
      <div className={styles.grid}>
        {features.map((f) => (
          <article key={f.id} className={styles.card}>
            <span className={styles.tag} aria-hidden="true">
              {f.sfx}
            </span>
            <div className={styles.icon}>
              <Icon name={f.icon} />
            </div>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
