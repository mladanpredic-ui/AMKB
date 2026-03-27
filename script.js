// AK BALKAN - MASTER SCRIPT
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCmSL8TmGrcda-Btnpn0u8mUpWLo6q_aMY",
    authDomain: "autoklub-balkan.firebaseapp.com",
    projectId: "autoklub-balkan",
    storageBucket: "autoklub-balkan.firebasestorage.app",
    messagingSenderId: "499546593125",
    appId: "1:499546593125:web:7823602797b37e8338b38c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mehrsprachigkeit
const txt = {
    sr: { title: "ČLANSKA REGISTRACIJA", fn: "Ime", ln: "Prezime", em: "E-mail", lp: "Tablice", pw: "Lozinka", pkg: "Izaberite paket:", lng: "Jezik ugovora:", agb: "Prihvatam uslove poslovanja.", btn: "REGISTRUJ SE" },
    de: { title: "MITGLIEDER-REGISTRIERUNG", fn: "Vorname", ln: "Nachname", em: "E-Mail", lp: "Kennzeichen", pw: "Passwort", pkg: "Paket wählen:", lng: "Vertragssprache:", agb: "AGB akzeptieren.", btn: "REGISTRIEREN" }
};

window.chLang = (lang, btn) => {
    const t = txt[lang];
    if(!t) return;
    document.getElementById('h-title').innerText = t.title;
    document.getElementById('fn').placeholder = t.fn;
    document.getElementById('ln').placeholder = t.ln;
    document.getElementById('em').placeholder = t.em;
    document.getElementById('lp').placeholder = t.lp;
    document.getElementById('pw').placeholder = t.pw;
    document.getElementById('l-pkg').innerText = t.pkg;
    document.getElementById('l-lng').innerText = t.lng;
    document.getElementById('l-agb').innerText = t.agb;
    document.getElementById('b-sub').innerText = t.btn;
    
    document.querySelectorAll('.l-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
};

// Registrierungs-Logik
const regForm = document.getElementById('regForm');
if(regForm) {
    regForm.onsubmit = async (e) => {
        e.preventDefault();
        
        // Button deaktivieren um Mehrfachklicks zu verhindern
        const submitBtn = document.getElementById('b-sub');
        submitBtn.disabled = true;
        submitBtn.innerText = "...";

        const id = Math.floor(100000 + Math.random() * 900000).toString();
        const d = {
            memberID: id,
            firstName: document.getElementById('fn').value,
            lastName: document.getElementById('ln').value,
            email: document.getElementById('em').value,
            licensePlate: document.getElementById('lp').value,
            password: document.getElementById('pw').value,
            package: document.getElementById('pk').value,
            lang: document.getElementById('cl').value,
            status: "čeka_uplatu",
            createdAt: serverTimestamp()
        };

        try {
            // 1. In Firestore speichern
            await addDoc(collection(db, "users"), d);
            
            // 2. Weiterleitung zur vertrag.html (KORRIGIERT MIT ANFÜHRUNGSZEICHEN)
            const targetUrl = `vertrag.html?id=${id}&fn=${encodeURIComponent(d.firstName)}&ln=${encodeURIComponent(d.lastName)}&lp=${encodeURIComponent(d.licensePlate)}&pk=${encodeURIComponent(d.package)}&lg=${d.lang}`;
            window.location.href = targetUrl;

        } catch (error) {
            console.error("Fehler bei der Registrierung:", error);
            alert("Greška / Fehler: " + error.message);
            submitBtn.disabled = false;
            submitBtn.innerText = "REGISTRUJ SE";
        }
    };
}
