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
      if (!EMAIL_REGEX.test(email.trim())) {
        setError('Informe um e-mail válido.')
        return
      }
      // 100% client-side: nenhum envio real é feito.
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

