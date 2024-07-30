import { useEffect, useRef } from 'react'

const DEFAULT_EVENTS = ['mousedown', 'touchstart']

export function useClickOutside(handler, events, nodes) {
  const ref = useRef()

  useEffect(() => {
    const listener = (event) => {
      const { target } = event
      if (Array.isArray(nodes)) {
        const shouldIgnore =
          target.hasAttribute('data-ignore-outside-clicks') ||
          (!document.body.contains(target) && target.tagName !== 'HTML')
        const shouldTrigger = nodes.every((node) => !!node && !event.composedPath().includes(node))
        shouldTrigger && !shouldIgnore && handler()
      } else if (ref.current && !ref.current.contains(target)) {
        handler()
      }
    }

    ;(events || DEFAULT_EVENTS).forEach((event) => document.addEventListener(event, listener))

    return () => {
      ;(events || DEFAULT_EVENTS).forEach((event) => document.removeEventListener(event, listener))
    }
  }, [handler, nodes, events])

  return ref
}
