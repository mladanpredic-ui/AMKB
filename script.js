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

// Übersetzungstexte für alle 5 Sprachen
const txt = {
    sr: {
        welcome: "DOBRODOŠLI U AK BALKAN",
        desc: "Vaš pouzdan partner na putu širom Evrope.",
        title: "Izaberite paket zaštite:",
        login: "Već ste član? Prijavite se",
        regTitle: "Registracija člana",
        fn: "Ime", ln: "Prezime", em: "E-mail adresa", lp: "Registarska oznaka", pw: "Lozinka",
        lng: "Jezik ugovora:", agb: "Prihvatam uslove poslovanja.", btn: "POTVRDI I PREUZMI UGOVOR",
        back: "Nazad na izbor paketa", select: "Izaberi"
    },
    de: {
        welcome: "WILLKOMMEN BEIM AK BALKAN",
        desc: "Ihr zuverlässiger Partner auf Europas Straßen.",
        title: "Wählen Sie Ihr Schutzpaket:",
        login: "Bereits Mitglied? Anmelden",
        regTitle: "Mitglieder-Registrierung",
        fn: "Vorname", ln: "Nachname", em: "E-Mail Adresse", lp: "Kennzeichen", pw: "Passwort",
        lng: "Vertragssprache:", agb: "AGB akzeptieren.", btn: "BESTÄTIGEN & VERTRAG LADEN",
        back: "Zurück zur Auswahl", select: "Wählen"
    },
    en: {
        welcome: "WELCOME TO AK BALKAN",
        desc: "Your reliable partner on European roads.",
        title: "Choose your protection package:",
        login: "Already a member? Login",
        regTitle: "Member Registration",
        fn: "First Name", ln: "Last Name", em: "E-mail address", lp: "License Plate", pw: "Password",
        lng: "Contract Language:", agb: "Accept Terms.", btn: "CONFIRM & DOWNLOAD CONTRACT",
        back: "Back to selection", select: "Select"
    },
    fr: {
        welcome: "BIENVENUE À AK BALKAN",
        desc: "Votre partenaire fiable sur les routes d'Europe.",
        title: "Choisissez votre forfait :",
        login: "Déjà membre ? Se connecter",
        regTitle: "Inscription des membres",
        fn: "Prénom", ln: "Nom", em: "Adresse e-mail", lp: "Plaque d'immatriculation", pw: "Mot de passe",
        lng: "Langue du contrat :", agb: "Accepter les conditions.", btn: "CONFIRMER & TÉLÉCHARGER",
        back: "Retour à la sélection", select: "Choisir"
    },
    ru: {
        welcome: "ДОБРО ПОЖАЛОВАТЬ В АК БАЛКАН",
        desc: "Ваш надежный партнер на дорогах Европы.",
        title: "Выберите пакет защиты:",
        login: "Уже зарегистрированы? Войти",
        regTitle: "Регистрация участника",
        fn: "Имя", ln: "Фамилия", em: "E-mail адрес", lp: "Номер авто", pw: "Пароling",
        lng: "Язык контракта:", agb: "Принять условия.", btn: "ПОДТВЕРДИТЬ И СКАЧАТЬ",
        back: "Назад к выбору", select: "Выбрать"
    }
};

// WICHTIG: Funktion an window binden, damit onclick im HTML funktioniert
window.chLang = function(lang, btn) {
    const t = txt[lang];
    if(!t) return;

    // Texte auf der Seite tauschen
    document.getElementById('h-welcome').innerText = t.welcome;
    document.getElementById('p-desc').innerText = t.desc;
    if(document.querySelector('.section-title')) document.querySelector('.section-title').innerText = t.title;
    document.getElementById('link-login').innerText = t.login;
    
    // Formular-Texte
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

    // Alle "Izaberi" Buttons in den Karten übersetzen
    document.querySelectorAll('.btn-select').forEach(b => {
        if(!b.classList.contains('gold')) b.innerText = t.select;
    });

    // Aktiven Button markieren
    document.querySelectorAll('.l-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
};

// Registrierungs-Logik
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
