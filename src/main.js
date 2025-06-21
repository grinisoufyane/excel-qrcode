import './style.css'
import {setupQrcodeGenerator} from "./generate-qrcode.js";

document.querySelector('#app').innerHTML = `
  <div class="w-screen h-screen">
    <div class="w-full h-full flex flex-col items-center justify-center gap-8 px-4">
      <img src="qr_code.png" alt="" class="w-[150px]" />
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full max-w-[500px] gap-2">
        <input type="url" name="url" id="url"
          class="flex-1 border border-[0.5px] border-gray-600 ring-0 outline-0 px-4 py-2 text-sm" />
        <button id="qrcode-generator"
          class="bg-sky-900 text-white px-4 py-2 rounded text-sm w-full sm:w-auto">Generate QrCode</button>
      </div>
    </div>
  </div>
`


setupQrcodeGenerator(document.querySelector('#qrcode-generator'))

