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

const txt = {
    sr: {
        welcome: "AK BALKAN", desc: "Vaš pouzdan partner na putu širom Evrope.",
        title: "Izaberite paket zaštite:", login: "Već ste član? Prijavite se",
        regTitle: "Registracija člana", fn: "Ime", ln: "Prezime", em: "E-mail adresa", lp: "Registarska oznaka",
        pw: "Lozinka", lng: "Jezik ugovora:", agb: "Prihvatam uslove poslovanja.",
        btnSub: "POTVRDI I PREUZMI UGOVOR", select: "IZABERI", selectP: "IZABRANO"
    },
    de: {
        welcome: "AK BALKAN", desc: "Ihr zuverlässiger Partner auf Europas Straßen.",
        title: "Wählen Sie Ihr Schutzpaket:", login: "Bereits Mitglied? Login",
        regTitle: "Mitgliedsregistrierung", fn: "Vorname", ln: "Nachname", em: "E-Mail Adresse", lp: "Kennzeichen",
        pw: "Passwort", lng: "Vertragssprache:", agb: "Ich akzeptiere die AGB.",
        btnSub: "BESTÄTIGEN & VERTRAG LADEN", select: "WÄHLEN", selectP: "GEWÄHLT"
    }
    // Weitere Sprachen (en, fr, ru) können hier wie oben ergänzt werden
};

// --- FUNKTIONEN GLOBAL VERFÜGBAR MACHEN ---

window.chLang = function(lang, btn) {
    const t = txt[lang] || txt.sr;
    
    // Texte auf der Seite anpassen
    if(document.getElementById('h-welcome')) document.getElementById('h-welcome').innerText = t.welcome;
    if(document.getElementById('p-desc')) document.getElementById('p-desc').innerText = t.desc;
    if(document.getElementById('h-title')) document.getElementById('h-title').innerText = t.regTitle;
    if(document.getElementById('b-sub')) document.getElementById('b-sub').innerText = t.btnSub;
    
    // Platzhalter anpassen
    if(document.getElementById('fn')) document.getElementById('fn').placeholder = t.fn;
    if(document.getElementById('ln')) document.getElementById('ln').placeholder = t.ln;
    if(document.getElementById('em')) document.getElementById('em').placeholder = t.em;
    if(document.getElementById('lp')) document.getElementById('lp').placeholder = t.lp;
    if(document.getElementById('pw')) document.getElementById('pw').placeholder = t.pw;

    // Aktiven Button markieren
    document.querySelectorAll('.l-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
};

window.selectPkg = function(val) {
    if(document.getElementById('pk')) document.getElementById('pk').value = val;
    if(document.getElementById('selected-pkg-display')) document.getElementById('selected-pkg-display').innerText = val;
    
    const welcome = document.getElementById('welcome-section');
    const reg = document.getElementById('reg-section');
    
    if(welcome && reg) {
        welcome.style.display = 'none';
        reg.style.display = 'block';
        window.scrollTo(0,0);
    }
};

window.showWelcome = function() {
    document.getElementById('welcome-section').style.display = 'block';
    document.getElementById('reg-section').style.display = 'none';
};

// --- REGISTRIERUNG LOGIK ---

const regForm = document.getElementById('regForm');
if(regForm) {
    regForm.onsubmit = async (e) => {
        e.preventDefault();
        const subBtn = document.getElementById('b-sub');
        subBtn.disabled = true;
        subBtn.innerText = "...";

        const id = Math.floor(100000 + Math.random() * 900000).toString();
        const d = {
            memberID: id,
            firstName: document.getElementById('fn').value,
            lastName: document.getElementById('ln').value,
            email: document.getElementById('em').value,
            licensePlate: document.getElementById('lp').value,
            password: document.getElementById('pw').value,
            package: document.getElementById('pk').value,
            lang: document.getElementById('cl') ? document.getElementById('cl').value : 'sr',
            status: "čeka_uplatu",
            createdAt: serverTimestamp()
        };

        try {
            await addDoc(collection(db, "users"), d);
            // Weiterleitung zur vertrag.html mit allen Daten
            window.location.href = `vertrag.html?id=${id}&fn=${encodeURIComponent(d.firstName)}&ln=${encodeURIComponent(d.lastName)}&lp=${encodeURIComponent(d.licensePlate)}&pk=${encodeURIComponent(d.package)}&lg=${d.lang}`;
        } catch (error) {
            console.error("Firebase Error:", error);
            alert("Fehler beim Speichern. Bitte versuche es erneut.");
            subBtn.disabled = false;
            subBtn.innerText = "PROBAJ PONOVO";
        }
    };
}
