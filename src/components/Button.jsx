import styles from './Button.module.css'

// variant: primary (conversão) | cta (oferta) | ghost (secundário) — size: md | lg
export default function Button({ children, onClick, variant = 'primary', size = 'md', type = 'button', full = false }) {
  const cls = [styles.btn, styles[variant], size === 'lg' ? styles.lg : '', full ? styles.full : ''].join(' ')
  return (
    <button type={type} className={cls} onClick={onClick}>
      <span>{children}</span>
    </button>
  )
}
