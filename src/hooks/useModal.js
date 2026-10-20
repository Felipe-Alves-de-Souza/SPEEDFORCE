import { useCallback, useEffect, useState } from 'react'

// VIEWMODEL — estado do Modal, com fechamento por ESC e bloqueio de scroll.
export function useModal() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return undefined

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close()
    }
    // Lock scroll while modal is open and restore previous overflow on close.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Preserve and restore focus: store the element that had focus when opened
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      // Try to restore focus to the previously focused element when modal closes
      try {
        if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus()
      } catch {
        // ignore focus restore errors
      }
    }
  }, [isOpen, close])

  return { isOpen, open, close }
}
