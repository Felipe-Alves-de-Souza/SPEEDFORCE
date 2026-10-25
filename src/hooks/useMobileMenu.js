import { useCallback, useEffect, useState } from 'react'

// VIEWMODEL — menu de navegação mobile (abre/fecha, fecha com ESC ou ao redimensionar para desktop).
export function useMobileMenu(breakpoint = 860) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return undefined

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close()
    }

    const onResize = () => {
      if (window.innerWidth > breakpoint) close()
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [isOpen, close, breakpoint])

  return { isOpen, toggle, close }
}

