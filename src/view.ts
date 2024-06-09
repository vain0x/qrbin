import { onSetup } from './lifecycle'

const url = new URL(window.location.href, window.location.origin)

export default function View() {
  onSetup(() => {
    const data = url.searchParams.get('data') || '(No data.)'

    const outputEl = (document.getElementById('output') as HTMLDivElement)!
    outputEl.textContent = data
  })

  return `
    <div style="width: 100%; background-color: #4D4D9D">
      <h1 style="margin: 0; padding: 0.25rem 0.5rem; font-size: 1rem; color: white">QR bin / View</h1>
    </div>

    <div id="output" style="padding: 0.25rem; white-space: pre-wrap; border: 1px solid #F3F3F3; background-color: white"></div>
  `
}
