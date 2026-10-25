import styles from './ComicFx.module.css'

// Onomatopeia de gibi (ZOOM!, KRAK!...). color: gold | red | white
export function Sfx({ children, color = 'gold', className = '', ...rest }) {
  return (
    <span
      className={`${styles.sfx} ${styles[color]} ${className}`.trim()}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </span>
  )
}

// Explosão em estrela com texto (selo "NOVO!", "-28%")
export function Burst({ children, className = '', ...rest }) {
  return (
    <span
      className={`${styles.burst} ${className}`.trim()}
      aria-hidden="true"
      {...rest}
    >
      <span className={styles.burstText}>{children}</span>
    </span>
  )
}
