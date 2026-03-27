// Wir nutzen die Browser-kompatiblen Skripte
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

// Die Sprach-Texte (SR, DE, EN, FR, RU)
const txt = {
    sr: { title: "ČLANSKA REGISTRACIJA", fn: "Ime", ln: "Prezime", em: "E-mail", lp: "Tablice", pw: "Lozinka", pkg: "Izaberite paket:", lng: "Jezik ugovora:", agb: "Prihvatam uslove poslovanja.", btn: "REGISTRUJ SE" },
    de: { title: "MITGLIEDSCHAFT", fn: "Vorname", ln: "Nachname", em: "E-mail", lp: "Kennzeichen", pw: "Passwort", pkg: "Paket wählen:", lng: "Vertragssprache:", agb: "Ich akzeptiere die AGB.", btn: "REGISTRIEREN" },
    en: { title: "MEMBERSHIP", fn: "First Name", ln: "Last Name", em: "E-mail", lp: "License Plate", pw: "Password", pkg: "Select Package:", lng: "Contract Language:", agb: "I accept the Terms.", btn: "REGISTER NOW" },
    fr: { title: "INSCRIPTION", fn: "Prénom", ln: "Nom", em: "E-mail", lp: "Plaque", pw: "Mot de passe", pkg: "Choisir le forfait:", lng: "Langue du contrat:", agb: "J'accepte les conditions.", btn: "S'INSCRIRE" },
    ru: { title: "РЕГИСТРАЦИЯ", fn: "Имя", ln: "Фамилия", em: "E-mail", lp: "Номер авто", pw: "Пароль", pkg: "Выберите пакет:", lng: "Язык контракта:", agb: "Я принимаю условия.", btn: "ЗАРЕГИСТРИРОВАТЬСЯ" }
};

// GLOBAL MACHEN: Damit onclick im HTML funktioniert
window.chLang = (l, b) => {
    document.querySelectorAll('.l-btn').forEach(btn => btn.classList.remove('active'));
    if(b) b.classList.add('active');
    const t = txt[l];
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
};

// Formular-Logik
document.getElementById('regForm').onsubmit = async (e) => {
    e.preventDefault();
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
        window.location.href = `vertrag.html?id=${id}&fn=${d.firstName}&ln=${d.lastName}&lp=${d.licensePlate}&lg=${d.lang}&pk=${d.package}`;
    } catch (err) { 
        console.error(err);
        alert("Greška / Error!"); 
    }
};
