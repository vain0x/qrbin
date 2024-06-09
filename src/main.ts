import Index from './index'
import { lifecycle, notifyUpdate } from './lifecycle'
import './style.css'
import View from './view'

const url = new URL(window.location.href, window.location.origin)
console.log('url', url, url.pathname, url.search)
console.log('base_url', import.meta.env.BASE_URL)

const app = (() => {
  const pathname = (url.pathname.replace('/qrbin/', '/'))
  switch (pathname) {
    case '/': return Index
    case '/view': return View
    default: return function NotFound() { return `404 Not Found` }
  }
})()

document.querySelector<HTMLDivElement>('#app')!.innerHTML = app()

lifecycle.dispatchEvent(new Event('setup'))
notifyUpdate()
