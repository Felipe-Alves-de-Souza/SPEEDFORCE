import Section from './Section'
import { sectionHeaders, steps } from '../data/content'
import styles from './HowItWorks.module.css'

export default function HowItWorks() {
  const { kicker, titlePrefix, titleHighlight } = sectionHeaders.how

  return (
    <Section
      id="how"
      kicker={kicker}
      title={
        <>
          {titlePrefix} <b>{titleHighlight}</b>
        </>
      }
      className={styles.bg}
    >
      <ol className={styles.steps}>
        {steps.map((s) => (
          <li key={s.number} className={styles.step}>
            <span className={styles.number} aria-hidden="true">
              {s.number}
            </span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
