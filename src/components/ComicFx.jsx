import styles from './ComicFx.module.css'

// Onomatopeia de gibi (ZOOM!, KRAK!...). color: gold | red | white
export function Sfx({ children, color = 'gold', className = '', ...rest }) {
  return (
    <span className={`${styles.sfx} ${styles[color]} ${className}`} aria-hidden="true" {...rest}>
      {children}
    </span>
  )
}

// Explosão em estrela com texto (selo "NOVO!", "-28%")
export function Burst({ children, className = '', ...rest }) {
  return (
    <span className={`${styles.burst} ${className}`} {...rest}>
      <span className={styles.burstText}>{children}</span>
    </span>
  )
}

// Retícula (halftone) para sobrepor em seções/painéis
export function Halftone({ className = '' }) {
  return <span className={`${styles.halftone} ${className}`} aria-hidden="true" />
}

