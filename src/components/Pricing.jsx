import Section from './Section'
import Button from './Button'
import { Check } from './Icons'
import { pricing } from '../data/content'
import bgImg from '../assets/flash-face.png'
import styles from './Pricing.module.css'

export default function Pricing({ onBuy }) {
  return (
    <Section id="pricing" kicker="Oferta" title={<>Garanta a sua <b>unidade</b></>}>
      <div className={styles.outer}>
        <div className={styles.box} style={{ '--bg-img': `url(${bgImg})` }}>
          <span className={styles.badge}>{pricing.badge}</span>
          <h3 className={styles.name}>{pricing.name}</h3>
          <div className={styles.priceRow}>
            <s className={styles.old}>{pricing.oldPrice}</s>
            <span className={styles.price}>{pricing.price}</span>
          </div>
          <p className={styles.installments}>{pricing.installments}</p>
          <ul className={styles.perks}>
            {pricing.perks.map((p) => (
              <li key={p}>
                <span className={styles.check}><Check /></span>
                {p}
              </li>
            ))}
          </ul>
          <Button full variant="cta" onClick={onBuy}>Comprar agora</Button>
        </div>
      </div>
    </Section>
  )
}
