import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.continua}>Continua na próxima edição...</p>
      <span className={styles.logo}>SPEEDFORCE</span>
      <p>© {YEAR} SPEEDFORCE. Produto fictício — projeto de demonstração.</p>
    </footer>
  )
}
