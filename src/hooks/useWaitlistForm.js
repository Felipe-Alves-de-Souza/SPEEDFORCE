import { useCallback, useState } from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// VIEWMODEL — formulário da lista de espera (validação + envio mockado).
export function useWaitlistForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onChange = useCallback((e) => {
    setEmail(e.target.value)
    setError('')
  }, [])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const trimmed = email.trim()
      if (!trimmed) {
        setError('Por favor, digite o seu e-mail.')
        return
      }
      if (!EMAIL_REGEX.test(trimmed)) {
        setError('Informe um e-mail válido (ex: voce@dominio.com).')
        return
      }
      // 100% client-side: nenhum envio real é feito.
      setEmail(trimmed)
      setSubmitted(true)
    },
    [email],
  )

  const reset = useCallback(() => {
    setEmail('')
    setError('')
    setSubmitted(false)
  }, [])

  return { email, error, submitted, onChange, onSubmit, reset }
}
