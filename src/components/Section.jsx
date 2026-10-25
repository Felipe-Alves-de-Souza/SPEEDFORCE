import styles from './Section.module.css'

export default function Section({ id, kicker, title, children, className = '' }) {
  const titleId = id ? `${id}-title` : undefined

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`${styles.section} ${className}`.trim()}
    >
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.kicker}>{kicker}</span>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}
