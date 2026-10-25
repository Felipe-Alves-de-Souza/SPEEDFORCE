import { useEffect, useRef } from 'react'
import Button from './Button'
import { modalContent } from '../data/content'
import { useWaitlistForm } from '../hooks/useWaitlistForm'
import styles from './WaitlistModal.module.css'

export default function WaitlistModal({ isOpen, onClose, dialogRef }) {
  const { email, error, submitted, onChange, onSubmit, reset } = useWaitlistForm()
  const closeSuccessBtnRef = useRef(null)

  // limpa o formulário sempre que o modal é fechado
  useEffect(() => {
    if (!isOpen) reset()
  }, [isOpen, reset])

  // move o foco para o botão de fechar quando o formulário entra no estado de sucesso
  useEffect(() => {
    if (isOpen && submitted && closeSuccessBtnRef.current) {
      closeSuccessBtnRef.current.focus()
    }
  }, [isOpen, submitted])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
        aria-describedby="waitlist-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label={modalContent.closeLabel}
        >
          ×
        </button>

        {submitted ? (
          <div className={styles.success} role="status" aria-live="polite">
            <h2 id="waitlist-title">{modalContent.successTitle}</h2>
            <p id="waitlist-desc">
              {modalContent.successPrefix} <strong>{email}</strong>{' '}
              {modalContent.successSuffix}
            </p>
            <Button ref={closeSuccessBtnRef} full onClick={onClose}>
              {modalContent.closeLabel}
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <h2 id="waitlist-title">{modalContent.title}</h2>
            <p id="waitlist-desc" className={styles.text}>
              {modalContent.subtitle}
            </p>
            <label htmlFor="waitlist-email" className={styles.label}>
              {modalContent.emailLabel}
            </label>
            <input
              id="waitlist-email"
              type="email"
              name="email"
              autoComplete="email"
              className={styles.input}
              placeholder={modalContent.emailPlaceholder}
              value={email}
              onChange={onChange}
              autoFocus
              aria-invalid={!!error}
              aria-describedby={error ? 'waitlist-error' : undefined}
            />
            {error && (
              <p id="waitlist-error" className={styles.error} role="alert">
                {error}
              </p>
            )}
            <Button type="submit" full>
              {modalContent.submitLabel}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
