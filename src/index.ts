import { notifyUpdate, onSetup, onUpdate } from './lifecycle'

export default function Index() {
  onSetup(() => {
    const form = document.getElementById('form') as HTMLFormElement
    const textarea = document.getElementById('textarea') as HTMLTextAreaElement
    const output = document.getElementById('output-img') as HTMLImageElement
    const anchor = document.getElementById('anchor') as HTMLAnchorElement

    form.addEventListener('submit', ev => ev.preventDefault())

    let lastInput = ''
    textarea.addEventListener('input', () => {
      lastInput = textarea.value
      notifyUpdate()
    })

    onUpdate(() => {
      const data = lastInput
      anchor.setAttribute('href', `./view?data=${encodeURIComponent(data)}`)
    })
  })

  return `
    <h1>QR bin</h1>

    input:
    <form id="form">
      <textarea id="textarea"></textarea>
    </form>

    output:
    <img id="output-img">

    <a id="anchor">Preview</a>

    <div style="position: fixed; bottom: 0; left: 0; right: 0">
      <hr>

      <div style="margin-inline: 0.5rem; color: #9D9D9D">
        <span>Source:</span> <a href="https://github.com/vain0x/qrbin">vain0x/qrbin (GitHub)</a>
      </div>
    </div>
  `
}
