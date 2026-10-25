import { footerContent } from '../data/content'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.continua}>{footerContent.continua}</p>
      <span className={styles.logo}>{footerContent.logo}</span>
      <p>
        © {YEAR} {footerContent.disclaimer}
      </p>
    </footer>
  )
}
