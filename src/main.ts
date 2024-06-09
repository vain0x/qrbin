import { setupCounter } from './counter.ts'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Vite app</h1>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
