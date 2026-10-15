import { useCallback, useState } from 'react'

// VIEWMODEL — estado do Accordion (apenas um item aberto por vez).
export function useAccordion(initialOpenId = null) {
  const [openId, setOpenId] = useState(initialOpenId)

  const toggle = useCallback(
    (id) => setOpenId((current) => (current === id ? null : id)),
    [],
  )

  const isOpen = useCallback((id) => openId === id, [openId])

  return { openId, toggle, isOpen }
}

