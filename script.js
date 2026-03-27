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
        welcome: "Dobrodošli u AK Balkan",
        desc: "Vaš pouzdan partner na putu širom Evrope.",
        join: "POSTANI ČLAN",
        login: "Prijava za članove",
        title: "ČLANSKA REGISTRACIJA",
        fn: "Ime", ln: "Prezime", em: "E-mail", lp: "Tablice", pw: "Lozinka",
        pkg: "Izaberite paket:", lng: "Jezik ugovora:", agb: "Prihvatam uslove poslovanja.", btn: "POTVRDI REGISTRACIJU"
    },
    de: {
        welcome: "Willkommen beim AK Balkan",
        desc: "Ihr zuverlässiger Partner auf Europas Straßen.",
        join: "JETZT MITGLIED WERDEN",
        login: "Login für Mitglieder",
        title: "MITGLIEDER-REGISTRIERUNG",
        fn: "Vorname", ln: "Nachname", em: "E-Mail", lp: "Kennzeichen", pw: "Passwort",
        pkg: "Paket wählen:", lng: "Vertragssprache:", agb: "AGB akzeptieren.", btn: "REGISTRIERUNG ABSCHLIESSEN"
    }
};

window.chLang = (lang, btn) => {
    const t = txt[lang];
    if(!t) return;
    
    // Startseite Übersetzungen
    if(document.getElementById('h-welcome')) document.getElementById('h-welcome').innerText = t.welcome;
    if(document.getElementById('p-desc')) document.getElementById('p-desc').innerText = t.desc;
    if(document.getElementById('btn-join')) document.getElementById('btn-join').innerText = t.join;
    if(document.getElementById('link-login')) document.getElementById('link-login').innerText = t.login;

    // Formular Übersetzungen
    if(document.getElementById('h-title')) document.getElementById('h-title').innerText = t.title;
    if(document.getElementById('fn')) document.getElementById('fn').placeholder = t.fn;
    if(document.getElementById('ln')) document.getElementById('ln').placeholder = t.ln;
    if(document.getElementById('em')) document.getElementById('em').placeholder = t.em;
    if(document.getElementById('lp')) document.getElementById('lp').placeholder = t.lp;
    if(document.getElementById('pw')) document.getElementById('pw').placeholder = t.pw;
    if(document.getElementById('l-pkg')) document.getElementById('l-pkg').innerText = t.pkg;
    if(document.getElementById('l-lng')) document.getElementById('l-lng').innerText = t.lng;
    if(document.getElementById('l-agb')) document.getElementById('l-agb').innerText = t.agb;
    if(document.getElementById('b-sub')) document.getElementById('b-sub').innerText = t.btn;
    
    document.querySelectorAll('.l-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
};

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
            lang: document.getElementById('cl').value,
            status: "čeka_uplatu",
            createdAt: serverTimestamp()
        };

        try {
            await addDoc(collection(db, "users"), d);
            window.location.href = `vertrag.html?id=${id}&fn=${encodeURIComponent(d.firstName)}&ln=${encodeURIComponent(d.lastName)}&lp=${encodeURIComponent(d.licensePlate)}&pk=${encodeURIComponent(d.package)}&lg=${d.lang}`;
        } catch (error) {
            alert("Error: " + error.message);
            subBtn.disabled = false;
        }
    };
}
