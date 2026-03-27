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
        btn: "POTVRDI I PREUZMI UGOVOR", back: "Nazad na izbor paketa", select: "Izaberi", selectP: "Izaberi Paket"
    },
    de: {
        welcome: "AK BALKAN", desc: "Ihr zuverlässiger Partner auf Europas Straßen.",
        title: "Wählen Sie Ihr Schutzpaket:", login: "Bereits Mitglied? Anmelden",
        regTitle: "Mitglieder-Registrierung", fn: "Vorname", ln: "Nachname", em: "E-Mail Adresse", lp: "Kennzeichen",
        pw: "Passwort", lng: "Vertragssprache:", agb: "AGB akzeptieren.",
        btn: "BESTÄTIGEN & VERTRAG LADEN", back: "Zurück zur Auswahl", select: "Wählen", selectP: "Paket Wählen"
    },
    en: {
        welcome: "AK BALKAN", desc: "Your reliable partner on European roads.",
        title: "Choose your protection package:", login: "Already a member? Login",
        regTitle: "Member Registration", fn: "First Name", ln: "Last Name", em: "E-mail address", lp: "License Plate",
        pw: "Password", lng: "Contract Language:", agb: "Accept Terms.",
        btn: "CONFIRM & DOWNLOAD CONTRACT", back: "Back to selection", select: "Select", selectP: "Select Package"
    },
    fr: {
        welcome: "AK BALKAN", desc: "Votre partenaire fiable sur les routes d'Europe.",
        title: "Choisissez votre forfait :", login: "Déjà membre ? Se connecter",
        regTitle: "Inscription des membres", fn: "Prénom", ln: "Nom", em: "Adresse e-mail", lp: "Plaque d'immatriculation",
        pw: "Mot de passe", lng: "Langue du contrat :", agb: "Accepter les conditions.",
        btn: "CONFIRMER & TÉLÉCHARGER", back: "Retour à la sélection", select: "Choisir", selectP: "Choisir le forfait"
    },
    ru: {
        welcome: "AK BALKAN", desc: "Ваш надежный партнер на дорогах Европы.",
        title: "Выберите пакет защиты:", login: "Уже зарегистрированы? Войти",
        regTitle: "Регистрация участника", fn: "Имя", ln: "Фамилия", em: "E-mail адрес", lp: "Номер авто",
        pw: "Пароль", lng: "Язык контракта:", agb: "Принять условия.",
        btn: "ПОДТВЕРДИТЬ И СКАЧАТЬ", back: "Назад к выбору", select: "Выбрать", selectP: "Выбрать пакет"
    }
};

window.chLang = function(lang, btn) {
    const t = txt[lang];
    if(!t) return;

    document.getElementById('h-welcome').innerText = t.welcome;
    document.getElementById('p-desc').innerText = t.desc;
    if(document.querySelector('.section-title')) document.querySelector('.section-title').innerText = t.title;
    document.getElementById('link-login').innerText = t.login;
    
    document.getElementById('h-title').innerText = t.regTitle;
    document.getElementById('fn').placeholder = t.fn;
    document.getElementById('ln').placeholder = t.ln;
    document.getElementById('em').placeholder = t.em;
    document.getElementById('lp').placeholder = t.lp;
    document.getElementById('pw').placeholder = t.pw;
    document.getElementById('l-lng').innerText = t.lng;
    document.getElementById('l-agb').innerText = t.agb;
    document.getElementById('b-sub').innerText = t.btn;
    document.querySelector('.btn-link').innerText = t.back;

    // Buttons in den Karten übersetzen
    document.querySelectorAll('.btn-select').forEach(b => {
        b.innerText = b.classList.contains('gold') ? t.selectP : t.select;
    });

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
            alert("Greška: " + error.message);
            subBtn.disabled = false;
        }
    };
}
