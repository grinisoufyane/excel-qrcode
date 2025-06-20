import QRCode from 'qrcode'

export function setupQrcodeGenerator(buttonElement) {
    buttonElement.addEventListener('click', async () => {
        const input = document.querySelector('#url')
        const url = input.value.trim()

        if (!url || !url.startsWith('http')) {
            alert('Please enter a valid URL starting with http or https.')
            return
        }

        try {
            const dataUrl = await QRCode.toDataURL(url, {
                width: 500,
                margin: 1,
                color: {
                    dark: '#09090b',
                    light: '#fafafa'
                }
            });

            // Trigger download without adding element to DOM
            const link = document.createElement('a')
            link.href = dataUrl

            const now = new Date()
            const timestamp = now.toISOString().replace(/[:]/g, '-').split('.')[0];
            const fileName = `qr_code_${timestamp}.png`

            link.style.display = 'none'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (err) {
            console.error('QR Code generation error:', err)
            alert('Failed to generate QR code.')
        }
    })
}
