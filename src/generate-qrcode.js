import QRCode from 'qrcode'

export function setupQrcodeGenerator(buttonElement) {
    buttonElement.addEventListener('click', async () => {
        const url = document.querySelector('#url').value.trim()
        const title = document.querySelector('#title').value.trim()
        const logoFile = document.querySelector('#logo').files[0]

        if (!url || !url.startsWith('http')) {
            alert('Please enter a valid URL starting with http or https.')
            return
        }

        try {
            const qrSize = 500
            const titleHeight = title ? 100 : 0
            const finalCanvas = document.createElement('canvas')
            finalCanvas.width = qrSize
            finalCanvas.height = qrSize + titleHeight

            const qrCanvas = document.createElement('canvas')
            qrCanvas.width = qrSize
            qrCanvas.height = qrSize

            // Step 1: Draw QR Code to offscreen canvas
            await QRCode.toCanvas(qrCanvas, url, {
                width: qrSize,
                errorCorrectionLevel: 'H',
                margin: 1,
                color: {
                    dark: '#09090b',
                    light: '#fafafa'
                }
            })

            const ctx = finalCanvas.getContext('2d')

            // ️ Clip canvas into a rounded rectangle
            const radius = 32
            ctx.beginPath()
            ctx.moveTo(radius, 0)
            ctx.lineTo(finalCanvas.width - radius, 0)
            ctx.quadraticCurveTo(finalCanvas.width, 0, finalCanvas.width, radius)
            ctx.lineTo(finalCanvas.width, finalCanvas.height - radius)
            ctx.quadraticCurveTo(finalCanvas.width, finalCanvas.height, finalCanvas.width - radius, finalCanvas.height)
            ctx.lineTo(radius, finalCanvas.height)
            ctx.quadraticCurveTo(0, finalCanvas.height, 0, finalCanvas.height - radius)
            ctx.lineTo(0, radius)
            ctx.quadraticCurveTo(0, 0, radius, 0)
            ctx.closePath()
            ctx.clip()

            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height)

            ctx.drawImage(qrCanvas, 0, 0)

            // Step 2: Draw logo if uploaded
            if (logoFile) {
                const logo = new Image()
                logo.src = URL.createObjectURL(logoFile)

                await new Promise((resolve, reject) => {
                    logo.onload = () => {
                        const logoSize = qrSize * 0.2
                        const x = (qrSize - logoSize) / 2
                        const y = (qrSize - logoSize) / 2

                        // Draw white background circle
                        ctx.save()
                        ctx.beginPath()
                        ctx.arc(qrSize / 2, qrSize / 2, logoSize / 2 + 6, 0, Math.PI * 2)
                        ctx.fillStyle = '#ffffff'
                        ctx.fill()
                        ctx.restore()

                        // Draw clipped circular logo
                        ctx.save()
                        ctx.beginPath()
                        ctx.arc(qrSize / 2, qrSize / 2, logoSize / 2, 0, Math.PI * 2)
                        ctx.clip()
                        ctx.drawImage(logo, x, y, logoSize, logoSize)
                        ctx.restore()

                        resolve()
                    }
                    logo.onerror = reject
                })
            }

            // Step 3: Draw title text if provided
            if (title) {
                ctx.fillStyle = '#09090b'
                ctx.font = 'bold 24px sans-serif'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'top'
                ctx.fillText(title, qrSize / 2, qrSize + 20)
            }


            // Step 4: Update image preview (optional)
            // document.querySelector('#preview-img').src = finalCanvas.toDataURL('image/png')

            // Step 5: Download QR code
            const link = document.createElement('a')
            link.href = finalCanvas.toDataURL('image/png')
            const timestamp = new Date().toISOString().replace(/[:]/g, '-').split('.')[0]
            link.download = `qr_code_${timestamp}.png`
            link.click()

        } catch (err) {
            console.error('QR code generation failed:', err)
            alert('QR code generation failed.')
        }
    })
}
