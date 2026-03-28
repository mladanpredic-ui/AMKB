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
    sr: { welcome: "AK BALKAN", desc: "Vaš pouzdan partner na putu širom Evrope.", title: "Izaberite paket zaštite:", login: "Već ste član? Prijavite se", regTitle: "Registracija člana", fn: "Ime", ln: "Prezime", em: "E-mail", lp: "Registarska oznaka", pw: "Lozinka", lng: "Jezik ugovora:", agb: "Prihvatam uslove poslovanja.", btnSub: "POTVRDI", select: "IZABERI", back: "Nazad" },
    de: { welcome: "AK BALKAN", desc: "Ihr zuverlässiger Partner auf Europas Straßen.", title: "Wählen Sie Ihr Schutzpaket:", login: "Bereits Mitglied? Login", regTitle: "Mitgliedsregistrierung", fn: "Vorname", ln: "Nachname", em: "E-Mail", lp: "Kennzeichen", pw: "Passwort", lng: "Vertragssprache:", agb: "Ich akzeptiere die AGB.", btnSub: "BESTÄTIGEN", select: "WÄHLEN", back: "Zurück" },
    en: { welcome: "AK BALKAN", desc: "Your reliable partner on European roads.", title: "Choose your protection package:", login: "Already a member? Login", regTitle: "Registration", fn: "First Name", ln: "Last Name", em: "E-Mail", lp: "License Plate", pw: "Password", lng: "Contract Language:", agb: "I accept terms.", btnSub: "CONFIRM", select: "CHOOSE", back: "Back" },
    fr: { welcome: "AK BALKAN", desc: "Votre partenaire fiable sur les routes d'Europe.", title: "Choisissez votre formule :", login: "Déjà membre ? Connexion", regTitle: "Inscription", fn: "Prénom", ln: "Nom", em: "E-mail", lp: "Plaque", pw: "Mot de passe", lng: "Langue :", agb: "J'accepte les conditions.", btnSub: "CONFIRMER", select: "CHOISIR", back: "Retour" },
    ru: { welcome: "AK BALKAN", desc: "Ваш надежный партнер на дорогах Европы.", title: "Выберите пакет защиты:", login: "Уже зарегистрированы? Войти", regTitle: "Регистрация", fn: "Имя", ln: "Фамилия", em: "E-mail", lp: "Номер авто", pw: "Пароль", lng: "Язык контракта:", agb: "Я принимаю условия.", btnSub: "ПОДТВЕРДИТЬ", select: "ВЫБРАТЬ", back: "Назад" }
};

window.chLang = (lang, btn) => {
    const t = txt[lang] || txt.sr;
    document.getElementById('h-welcome').innerText = t.welcome;
    document.getElementById('p-desc').innerText = t.desc;
    document.getElementById('h-title').innerText = t.title;
    document.getElementById('h-reg-title').innerText = t.regTitle;
    document.getElementById('link-login').innerText = t.login;
    document.getElementById('fn').placeholder = t.fn;
    document.getElementById('ln').placeholder = t.ln;
    document.getElementById('em').placeholder = t.em;
    document.getElementById('lp').placeholder = t.lp;
    document.getElementById('pw').placeholder = t.pw;
    document.getElementById('l-lng').innerText = t.lng;
    document.getElementById('l-agb').innerText = t.agb;
    document.getElementById('b-sub').innerText = t.btnSub;
    document.getElementById('btn-back').innerText = t.back;
    document.querySelectorAll('.btn-select').forEach(b => b.innerText = t.select);
    document.querySelectorAll('.l-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
};

window.selectPkg = (val) => {
    document.getElementById('pk').value = val;
    document.getElementById('selected-pkg-display').innerText = val; // ✅ FIXED: Zeige Paket im Formular an
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('reg-section').style.display = 'block';
    window.scrollTo(0,0);
};

window.showWelcome = () => {
    document.getElementById('welcome-section').style.display = 'block';
    document.getElementById('reg-section').style.display = 'none';
};

document.getElementById('regForm').onsubmit = async (e) => {
    e.preventDefault();
    const btn = document.getElementById('b-sub');
    btn.disabled = true; btn.innerText = "...";
const d = { memberID: id, firstName: document.getElementById('fn').value, lastName: document.getElementById('ln').value, email: document.getElementById('em').value, licensePlate: document.getElementById('lp').value, password: document.getElementById('pw').value, package: document.getElementById('pk').value, lang: document.getElementById('cl').value, status: "čeka_uplatu", createdAt: serverTimestamp() };
    // ✅ FIXED: Passwort NICHT in Firebase speichern (Sicherheitsrisiko!)
    const d = { 
        memberID: id, 
        firstName: document.getElementById('fn').value, 
        lastName: document.getElementById('ln').value, 
        email: document.getElementById('em').value, 
        licensePlate: document.getElementById('lp').value, 
        package: document.getElementById('pk').value, 
        lang: document.getElementById('cl').value, 
        status: "čeka_uplatu", 
        createdAt: serverTimestamp() 
    };
    try {
        await addDoc(collection(db, "users"), d);
        window.location.href = `vertrag.html?id=${id}&fn=${encodeURIComponent(d.firstName)}&ln=${encodeURIComponent(d.lastName)}&lp=${encodeURIComponent(d.licensePlate)}&pk=${encodeURIComponent(d.package)}&lg=${d.lang}`;
    } catch (err) { alert("Error!"); btn.disabled = false; }
};
