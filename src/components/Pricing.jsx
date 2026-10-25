import Section from './Section'
import Button from './Button'
import { Burst } from './ComicFx'
import { Check } from './Icons'
import { pricing, sectionHeaders } from '../data/content'
import bgImg from '../assets/comic-fire.jpg'
import styles from './Pricing.module.css'

export default function Pricing({ onBuy }) {
  const { kicker, titlePrefix, titleHighlight } = sectionHeaders.pricing

  return (
    <Section
      id="pricing"
      kicker={kicker}
      title={
        <>
          {titlePrefix} <b>{titleHighlight}</b>
        </>
      }
    >
      <div className={styles.outer}>
        <Burst className={styles.burst}>
          -28%
          <br />
          OFF!
        </Burst>
        <div className={styles.box} style={{ '--bg-img': `url(${bgImg})` }}>
          <span className={styles.badge}>{pricing.badge}</span>
          <h3 className={styles.name}>{pricing.name}</h3>
          <div className={styles.priceRow}>
            <span className="sr-only">Preço original: </span>
            <s className={styles.old}>{pricing.oldPrice}</s>
            <span className="sr-only">Preço promocional: </span>
            <span className={styles.price}>{pricing.price}</span>
          </div>
          <p className={styles.installments}>{pricing.installments}</p>
          <ul className={styles.perks}>
            {pricing.perks.map((p) => (
              <li key={p}>
                <span className={styles.check}>
                  <Check />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Button full variant="cta" onClick={onBuy}>
            {pricing.ctaLabel}
          </Button>
        </div>
      </div>
    </Section>
  )
}
