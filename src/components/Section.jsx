import styles from './Section.module.css'

export default function Section({ id, kicker, title, children, className = '' }) {
  return (
    <section id={id} className={`${styles.section} ${className}`}>
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.kicker}>{kicker}</span>
          <h2 className={styles.title}>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}

