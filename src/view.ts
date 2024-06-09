import { onSetup } from './lifecycle'

const url = new URL(window.location.href, window.location.origin)

export default function View() {
  onSetup(() => {
    const data = url.searchParams.get('data') || '(No data.)'

    const outputEl = (document.getElementById('output') as HTMLDivElement)!
    outputEl.textContent = data
  })

  return `
    <h1>QR bin / View</h1>
    <div id="output"></div>
  `
}
