import { useCallback, useState } from 'react';
import { sendWaitlistEmail } from '../model/services/emailService';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function useWaitlistViewModel() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  const onChange = useCallback((e) => {
    setEmail(e.target.value);
    if (status !== 'loading') {
      setError('');
    }
  }, [status]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isLoading) return;

      const trimmed = email.trim();
      if (!trimmed) {
        setError('Por favor, digite o seu e-mail.');
        setStatus('error');
        return;
      }
      if (!EMAIL_REGEX.test(trimmed)) {
        setError('Informe um e-mail válido (ex: voce@dominio.com).');
        setStatus('error');
        return;
      }

      setEmail(trimmed);
      setError('');
      setStatus('loading');

      try {
        await sendWaitlistEmail({ email: trimmed });
        setStatus('success');
      } catch (err) {
        const message =
          typeof err === 'string'
            ? err
            : err?.text || err?.message || 'Não foi possível enviar seu e-mail. Tente novamente.';
        setError(message);
        setStatus('error');
      }
    },
    [email, isLoading],
  );

  const reset = useCallback(() => {
    setEmail('');
    setError('');
    setStatus('idle');
  }, []);

  return {
    email,
    status,
    error,
    isLoading,
    isSuccess,
    isError,
    onChange,
    onSubmit,
    reset,
  };
}
