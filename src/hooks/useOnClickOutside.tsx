import React, { useCallback, useEffect } from 'react'

export const useOnClickOutside = <T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>,
  callback: (event: MouseEvent | TouchEvent) => void
) => {
  const listener = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const node = ref.current
      if (!node || (node && node.contains(event.target as Node))) {
        return
      }

      callback(event)
    },
    [callback, ref]
  )

  useEffect(() => {
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [listener])
}
