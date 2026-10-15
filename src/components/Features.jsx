import Section from './Section'
import { Icon } from './Icons'
import { features } from '../data/content'
import styles from './Features.module.css'

export default function Features() {
  return (
    <Section id="features" kicker="Diferenciais" title={<>Tecnologia na <b>velocidade da luz</b></>}>
      <div className={styles.grid}>
        {features.map((f) => (
          <article key={f.id} className={styles.card}>
            <div className={styles.icon}><Icon name={f.icon} /></div>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

