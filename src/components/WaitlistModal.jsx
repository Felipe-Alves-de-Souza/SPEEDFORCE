import { useEffect } from 'react'
import Button from './Button'
import { useWaitlistForm } from '../hooks/useWaitlistForm'
import styles from './WaitlistModal.module.css'

export default function WaitlistModal({ isOpen, onClose }) {
  const { email, error, submitted, onChange, onSubmit, reset } = useWaitlistForm()

  // limpa o formulário sempre que o modal é fechado
  useEffect(() => {
    if (!isOpen) reset()
  }, [isOpen, reset])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">×</button>

        {submitted ? (
          <div className={styles.success}>
            <h2 id="waitlist-title">Você está na fila! ⚡</h2>
            <p>Avisaremos <strong>{email}</strong> assim que a Speed Force for liberada.</p>
            <Button full onClick={onClose}>Fechar</Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <h2 id="waitlist-title">Entre na lista de espera</h2>
            <p className={styles.text}>Seja o primeiro a ativar a Speed Force na Edição Limitada Flash.</p>
            <label htmlFor="waitlist-email" className={styles.label}>Seu melhor e-mail</label>
            <input
              id="waitlist-email"
              type="email"
              className={styles.input}
              placeholder="voce@email.com"
              value={email}
              onChange={onChange}
              autoFocus
              aria-invalid={!!error}
              aria-describedby={error ? 'waitlist-error' : undefined}
            />
            {error && <p id="waitlist-error" className={styles.error} role="alert">{error}</p>}
            <Button type="submit" full>Entrar na lista</Button>
          </form>
        )}
      </div>
    </div>
  )
}

