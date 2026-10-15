import Section from './Section'
import { steps } from '../data/content'
import styles from './HowItWorks.module.css'

export default function HowItWorks() {
  return (
    <Section id="how" kicker="Como funciona" title={<>Três passos para a <b>velocidade</b></>} className={styles.bg}>
      <ol className={styles.steps}>
        {steps.map((s) => (
          <li key={s.number} className={styles.step}>
            <span className={styles.number}>{s.number}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

