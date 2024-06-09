import { notifyUpdate, onSetup, onUpdate } from './lifecycle'
import QRCode from 'qrcode'

export default function Index() {
  onSetup(() => {
    const form = document.getElementById('form') as HTMLFormElement
    const textarea = document.getElementById('textarea') as HTMLTextAreaElement
    const canvas = document.createElement('canvas') // document.getElementById('canvas') as HTMLCanvasElement
    const outputImg = document.getElementById('output-img') as HTMLImageElement
    const anchor = document.getElementById('anchor') as HTMLAnchorElement
    const counter = document.getElementById('counter') as HTMLDivElement

    form.addEventListener('submit', ev => ev.preventDefault())

    textarea.addEventListener('input', () => {
      notifyUpdate()
    })

    let generating = false
    let lastViewUrl: string | null = null
    const generate = async (value: string) => {
      if (generating) return

      // console.log('generating')
      generating = true
      try {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          QRCode.toDataURL(canvas, value, { errorCorrectionLevel: 'H' }, (err, url) => {
            if (err) {
              reject(err)
              return
            }
            resolve(url)
          })
        })
        // console.log('rendered', dataUrl)
        outputImg.src = dataUrl
      } finally {
        generating = false
      }
    }

    onUpdate(() => {
      const input = textarea.value.trim()
      const viewUrl = `./view?data=${encodeURIComponent(input)}`

      if (viewUrl !== lastViewUrl) {
        lastViewUrl = viewUrl
        generate(viewUrl)
      }

      anchor.setAttribute('href', viewUrl)
      counter.textContent = `(size: ${viewUrl.length - 12})`
    })
  })

  return `
    <div style="width: 100%; background-color: #4D4D9D">
      <h1 style="margin: 0; padding: 0.25rem 0.5rem; font-size: 1rem; color: white">QR bin / Edit</h1>
    </div>

    <div style="margin: 0.5rem">
    <form id="form">
      <div>input:</div>
      <textarea id="textarea" style="padding: 0.25rem; width: calc(min(max(100% - 2rem, 300px), 600px)); min-height: 150px; font-family: monospace; font-size: 1.2rem; color: #1B1B1B"></textarea>
      <output id="counter"></output>
    </form>

    <div style="margin-top: 2rem">
      output:
      <a id="anchor">Preview</a>

      <div style="box-sizing: content-box; margin-top: 0.5rem; width: min-content; border: 2px solid #1B1B1B">
        <img id="output-img" style="display: block; width: 300px; height: 300px">
      </div>
    </div>

    <div style="position: fixed; bottom: 0; left: 0; right: 0">
      <div style="padding: 0.25rem 0.5rem; width: 100%; color: #4D4D4D">
        <span>Source:</span> <a href="https://github.com/vain0x/qrbin">vain0x/qrbin (GitHub)</a>
      </div>
    </div>
    </div>
  `
}
