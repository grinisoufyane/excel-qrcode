import './style.css'
import {setupQrcodeGenerator} from "./generate-qrcode.js";

document.querySelector('#app').innerHTML = `
  <div class="w-screen min-h-screen bg-gray-50 p-4">
    <div class="max-w-lg mx-auto flex flex-col items-center justify-center gap-6">
      <img src="qr_code.png" alt="" class="w-[150px]" id="preview-img" />
      
      <div class="w-full flex flex-col gap-3">
        <input type="url" id="url" placeholder="Enter URL..."
          class="w-full border border-gray-400 rounded px-4 py-2 text-sm outline-none focus:ring-2 ring-sky-500" />

        <input type="text" id="title" placeholder="Enter title (optional)"
          class="w-full border border-gray-400 rounded px-4 py-2 text-sm outline-none focus:ring-2 ring-sky-500" />

        <input type="file" id="logo" accept="image/*"
          class="w-full text-sm text-gray-600 file:bg-sky-900 file:text-white file:rounded file:px-3 file:py-1 file:border-0" />

        <button id="qrcode-generator"
          class="bg-sky-900 text-white px-4 py-2 rounded text-sm w-full hover:bg-sky-800 transition">
          Generate QR Code
        </button>
      </div>
    </div>
  </div>
`

setupQrcodeGenerator(document.querySelector('#qrcode-generator'))

