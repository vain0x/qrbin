export const lifecycle = new EventTarget()

export const onSetup = (handler: () => void) => {
  lifecycle.addEventListener('setup', handler)
  return () => lifecycle.removeEventListener('setup', handler)
}

export const onUpdate = (handler: () => void) => {
  lifecycle.addEventListener('update', handler)
  return () => lifecycle.removeEventListener('update', handler)
}

export const notifyUpdate = () => lifecycle.dispatchEvent(new Event('update'))
