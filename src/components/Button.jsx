import styles from './Button.module.css'

// variant: primary (conversão) | cta (oferta) | ghost (secundário) — size: md | lg
export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  full = false,
  className = '',
  ...rest
}) {
  const cls = [
    styles.btn,
    styles[variant],
    size === 'lg' ? styles.lg : '',
    full ? styles.full : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      <span>{children}</span>
    </button>
  )
}
