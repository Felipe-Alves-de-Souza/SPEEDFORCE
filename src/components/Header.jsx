import Button from './Button'
import { navLinks } from '../data/content'
import styles from './Header.module.css'

export default function Header({ onCta }) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Principal">
        <a href="#top" className={styles.logo}>SPEEDFORCE</a>
        <ul className={styles.links}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <Button variant="ghost" onClick={onCta}>Lista de espera</Button>
      </nav>
    </header>
  )
}

