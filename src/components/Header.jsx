import Button from './Button'
import { MenuIcon } from './Icons'
import { navLinks } from '../data/content'
import { useMobileMenu } from '../hooks/useMobileMenu'
import styles from './Header.module.css'

export default function Header({ onCta }) {
  const menu = useMobileMenu()

  const handleCtaClick = () => {
    menu.close()
    onCta()
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Principal">
        <a
          href="#top"
          className={styles.logo}
          aria-label="SPEEDFORCE — voltar ao início"
          onClick={menu.close}
        >
          SPEEDFORCE
        </a>

        <ul
          id="primary-navigation"
          className={`${styles.links} ${menu.isOpen ? styles.linksOpen : ''}`}
        >
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={menu.close}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Button variant="ghost" onClick={handleCtaClick}>
            Lista de espera
          </Button>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={menu.toggle}
            aria-expanded={menu.isOpen}
            aria-controls="primary-navigation"
            aria-label={menu.isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          >
            <MenuIcon open={menu.isOpen} />
          </button>
        </div>
      </nav>
    </header>
  )
}
