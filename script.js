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
        btnSub: "POTVRDI I PREUZMI UGOVOR", select: "IZABERI", back: "Nazad"
    },
    de: {
        welcome: "AK BALKAN", desc: "Ihr zuverlässiger Partner auf Europas Straßen.",
        title: "Wählen Sie Ihr Schutzpaket:", login: "Bereits Mitglied? Login",
        regTitle: "Mitgliedsregistrierung", fn: "Vorname", ln: "Nachname", em: "E-Mail Adresse", lp: "Kennzeichen",
        pw: "Passwort", lng: "Vertragssprache:", agb: "Ich akzeptiere die AGB.",
        btnSub: "BESTÄTIGEN & VERTRAG LADEN", select: "WÄHLEN", back: "Zurück"
    },
    en: {
        welcome: "AK BALKAN", desc: "Your reliable partner on European roads.",
        title: "Choose your protection package:", login: "Already a member? Login",
        regTitle: "Member Registration", fn: "First Name", ln: "Last Name", em: "E-Mail Address", lp: "License Plate",
        pw: "Password", lng: "Contract Language:", agb: "I accept the terms and conditions.",
        btnSub: "CONFIRM & DOWNLOAD CONTRACT", select: "CHOOSE", back: "Back"
    },
    fr: {
        welcome: "AK BALKAN", desc: "Votre partenaire fiable sur les routes d'Europe.",
        title: "Choisissez votre formule de protection :", login: "Déjà membre ? Connexion",
        regTitle: "Inscription des membres", fn: "Prénom", ln: "Nom", em: "Adresse e-mail", lp: "Plaque d'immatriculation",
        pw: "Mot de passe", lng: "Langue du contrat :", agb: "J'accepte les conditions générales.",
        btnSub: "CONFIRMER ET TÉLÉCHARGER", select: "CHOISIR", back: "Retour"
    },
    ru: {
        welcome: "AK BALKAN", desc: "Ваш надежный партнер на дорогах Европы.",
        title: "Выберите пакет защиты:", login: "Уже зарегистрированы? Войти",
        regTitle: "Регистрация участника", fn: "Имя", ln: "Фамилия", em: "E-mail адрес", lp: "Номер авто",
        pw: "Пароль", lng: "Язык контракта:", agb: "Я принимаю условия использования.",
        btnSub: "ПОДТВЕРДИТЬ И СКАЧАТЬ", select: "ВЫБРАТЬ", back: "Назад"
    }
};

// --- GLOBAL FUNCTIONS ---
window.chLang = function(lang, btn) {
    const t = txt[lang] || txt.sr;
    
    // Header & Titles
    if(document.getElementById('h-welcome')) document.getElementById('h-welcome').innerText = t.welcome;
    if(document.getElementById('p-desc')) document.getElementById('p-desc').innerText = t.desc;
    if(document.getElementById('h-title')) document.getElementById('h-title').innerText = t.title;
    if(document.getElementById('h-reg-title')) document.getElementById('h-reg-title').innerText = t.regTitle;
    if(document.getElementById('link-login')) document.getElementById('link-login').innerText = t.login;
    
    // Form Placeholders
    if(document.getElementById('fn')) document.getElementById('fn').placeholder = t.fn;
    if(document.getElementById('ln')) document.getElementById('ln').placeholder = t.ln;
    if(document.getElementById('em')) document.getElementById('em').placeholder = t.em;
    if(document.getElementById('lp')) document.getElementById('lp').placeholder = t.lp;
    if(document.getElementById('pw')) document.getElementById('pw').placeholder = t.pw;
    if(document.getElementById('l-lng')) document.getElementById('l-lng').innerText = t.lng;
    if(document.getElementById('l-agb')) document.getElementById('l-agb').innerText = t.agb;
    if(document.getElementById('b-sub')) document.getElementById('b-sub').innerText = t.btnSub;
    if(document.getElementById('btn-back')) document.getElementById('btn-back').innerText = t.back;

    // Package Buttons
    document.querySelectorAll('.btn-select').forEach(b => {
        b.innerText = t.select;
    });

    // Active Button State
    document.querySelectorAll('.l-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
};

window.selectPkg = function(val) {
    if(document.getElementById('pk')) document.getElementById('pk').value = val;
    if(document.getElementById('selected-pkg-display')) document.getElementById('selected-pkg-display').innerText = val;
    
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('reg-section').style.display = 'block';
    window.scrollTo(0,0);
};

window.showWelcome = function() {
    document.getElementById('welcome-section').style.display = 'block';
    document.getElementById('reg-section').style.display = 'none';
};

// --- FORM LOGIC ---
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
            console.error(error);
            alert("Error!");
            subBtn.disabled = false;
        }
    };
}
