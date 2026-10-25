import Section from './Section'
import { Chevron } from './Icons'
import { faqs, sectionHeaders } from '../data/content'
import { useAccordion } from '../hooks/useAccordion'
import styles from './Faq.module.css'

export default function Faq() {
  const { toggle, isOpen } = useAccordion()
  const { kicker, titlePrefix, titleHighlight } = sectionHeaders.faq

  return (
    <Section
      id="faq"
      kicker={kicker}
      title={
        <>
          {titlePrefix} <b>{titleHighlight}</b>
        </>
      }
    >
      <div className={styles.list}>
        {faqs.map((f) => {
          const open = isOpen(f.id)
          return (
            <div key={f.id} className={`${styles.item} ${open ? styles.open : ''}`}>
              <h3>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={open}
                  aria-controls={`faq-${f.id}`}
                  id={`faq-btn-${f.id}`}
                  onClick={() => toggle(f.id)}
                >
                  {f.question}
                  <span className={styles.chevron}>
                    <Chevron />
                  </span>
                </button>
              </h3>
              <div
                id={`faq-${f.id}`}
                role="region"
                aria-labelledby={`faq-btn-${f.id}`}
                aria-hidden={!open}
                className={styles.panel}
              >
                <div className={styles.panelInner}>
                  <p>{f.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
