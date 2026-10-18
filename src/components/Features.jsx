import Section from './Section'
import { Icon } from './Icons'
import { features } from '../data/content'
import styles from './Features.module.css'

export default function Features() {
  return (
    <Section id="features" kicker="Superpoderes" title={<>Poderes no seu <b>pulso</b></>}>
      <div className={styles.grid}>
        {features.map((f) => (
          <article key={f.id} className={styles.card}>
            <span className={styles.tag} aria-hidden="true">{f.sfx}</span>
            <div className={styles.icon}><Icon name={f.icon} /></div>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
