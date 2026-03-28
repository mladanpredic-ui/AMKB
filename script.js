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

// ==================== TRANSLATIONS ====================
const txt = {
    sr: { 
        welcome: "AK BALKAN", 
        desc: "Vaš pouzdan partner na putu širom Evrope.", 
        title: "Izaberite paket zaštite:", 
        login: "Već ste član? Prijavite se", 
        regTitle: "Registracija člana", 
        fn: "Ime", 
        ln: "Prezime", 
        em: "E-mail", 
        lp: "Registarska oznaka", 
        pw: "Lozinka", 
        lng: "Jezik ugovora:", 
        agb: "Prihvatam uslove poslovanja.", 
        btnSub: "POTVRDI", 
        select: "IZABERI", 
        back: "Nazad",
        partnerTitle: "🤝 AKTUALNE AKCIJE NAŠIH PARTNERA"
    },
    de: { 
        welcome: "AK BALKAN", 
        desc: "Ihr zuverlässiger Partner auf Europas Straßen.", 
        title: "Wählen Sie Ihr Schutzpaket:", 
        login: "Bereits Mitglied? Login", 
        regTitle: "Mitgliedsregistrierung", 
        fn: "Vorname", 
        ln: "Nachname", 
        em: "E-Mail", 
        lp: "Kennzeichen", 
        pw: "Passwort", 
        lng: "Vertragssprache:", 
        agb: "Ich akzeptiere die AGB.", 
        btnSub: "BESTÄTIGEN", 
        select: "WÄHLEN", 
        back: "Zurück",
        partnerTitle: "🤝 AKTUELLE PARTNER-AKTIONEN"
    },
    en: { 
        welcome: "AK BALKAN", 
        desc: "Your reliable partner on European roads.", 
        title: "Choose your protection package:", 
        login: "Already a member? Login", 
        regTitle: "Registration", 
        fn: "First Name", 
        ln: "Last Name", 
        em: "E-Mail", 
        lp: "License Plate", 
        pw: "Password", 
        lng: "Contract Language:", 
        agb: "I accept terms.", 
        btnSub: "CONFIRM", 
        select: "CHOOSE", 
        back: "Back",
        partnerTitle: "🤝 CURRENT PARTNER OFFERS"
    },
    fr: { 
        welcome: "AK BALKAN", 
        desc: "Votre partenaire fiable sur les routes d'Europe.", 
        title: "Choisissez votre formule :", 
        login: "Déjà membre ? Connexion", 
        regTitle: "Inscription", 
        fn: "Prénom", 
        ln: "Nom", 
        em: "E-mail", 
        lp: "Plaque", 
        pw: "Mot de passe", 
        lng: "Langue :", 
        agb: "J'accepte les conditions.", 
        btnSub: "CONFIRMER", 
        select: "CHOISIR", 
        back: "Retour",
        partnerTitle: "🤝 OFFRES PARTENAIRES ACTUELLES"
    },
    ru: { 
        welcome: "AK BALKAN", 
        desc: "Ваш надежный партнер на дорогах Европы.", 
        title: "Выберите пакет защиты:", 
        login: "Уже зарегистрированы? Войти", 
        regTitle: "Регистрация", 
        fn: "Имя", 
        ln: "Фамилия", 
        em: "E-mail", 
        lp: "Номер авто", 
        pw: "Пароль", 
        lng: "Язык контракта:", 
        agb: "Я принимаю условия.", 
        btnSub: "ПОДТВЕРДИТЬ", 
        select: "ВЫБРАТЬ", 
        back: "Назад",
        partnerTitle: "🤝 ТЕКУЩИЕ ПРЕДЛОЖЕНИЯ ПАРТНЕРОВ"
    }
};

// ==================== LANGUAGE SWITCH ====================
window.chLang = (lang, btn) => {
    const t = txt[lang] || txt.sr;
    
    // Header
    const welcomeEl = document.getElementById('h-welcome');
    const descEl = document.getElementById('p-desc');
    const titleEl = document.getElementById('h-title');
    const regTitleEl = document.getElementById('h-reg-title');
    const loginLinkEl = document.getElementById('link-login');
    const partnerTitleEl = document.getElementById('h-partner-title');
    
    if (welcomeEl) welcomeEl.innerText = t.welcome;
    if (descEl) descEl.innerText = t.desc;
    if (titleEl) titleEl.innerText = t.title;
    if (regTitleEl) regTitleEl.innerText = t.regTitle;
    if (loginLinkEl) loginLinkEl.innerText = t.login;
    if (partnerTitleEl) partnerTitleEl.innerText = t.partnerTitle;
    
    // Form fields
    const fnEl = document.getElementById('fn');
    const lnEl = document.getElementById('ln');
    const emEl = document.getElementById('em');
    const lpEl = document.getElementById('lp');
    const pwEl = document.getElementById('pw');
    const lngEl = document.getElementById('l-lng');
    const agbEl = document.getElementById('l-agb');
    const bSubEl = document.getElementById('b-sub');
    const btnBackEl = document.getElementById('btn-back');
    
    if (fnEl) fnEl.placeholder = t.fn;
    if (lnEl) lnEl.placeholder = t.ln;
    if (emEl) emEl.placeholder = t.em;
    if (lpEl) lpEl.placeholder = t.lp;
    if (pwEl) pwEl.placeholder = t.pw;
    if (lngEl) lngEl.innerText = t.lng;
    if (agbEl) agbEl.innerText = t.agb;
    if (bSubEl) bSubEl.innerText = t.btnSub;
    if (btnBackEl) btnBackEl.innerText = t.back;
    
    // Buttons
    document.querySelectorAll('.btn-select').forEach(b => b.innerText = t.select);
    
    // Active button
    document.querySelectorAll('.l-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    
    console.log("✅ Sprache gewechselt zu:", lang);
};

// ==================== PACKAGE SELECTION ====================
window.selectPkg = (val) => {
    console.log("📦 Paket ausgewählt:", val);
    document.getElementById('pk').value = val;
    document.getElementById('selected-pkg-display').innerText = val;
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('reg-section').style.display = 'block';
    window.scrollTo(0, 0);
};

// ==================== BACK TO WELCOME ====================
window.showWelcome = () => {
    console.log("🔙 Zurück zur Startseite");
    document.getElementById('welcome-section').style.display = 'block';
    document.getElementById('reg-section').style.display = 'none';
    document.getElementById('regForm').reset();
    window.scrollTo(0, 0);
};

// ==================== REGISTRATION FORM SUBMIT ====================
document.getElementById('regForm').onsubmit = async (e) => {
    e.preventDefault();
    
    // Validierung
    const firstName = document.getElementById('fn').value.trim();
    const lastName = document.getElementById('ln').value.trim();
    const email = document.getElementById('em').value.trim();
    const licensePlate = document.getElementById('lp').value.trim();
    const packageType = document.getElementById('pk').value;
    const lang = document.getElementById('cl').value;
    
    if (!firstName || !lastName || !email || !licensePlate) {
        alert("Molimo popunite sva polja!");
        return;
    }
    
    // Email Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Molimo unesite validnu email adresu!");
        return;
    }
    
    // Generiere eindeutige Member ID
    const memberId = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Daten für Firebase
    const userData = {
        memberID: memberId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        licensePlate: licensePlate,
        package: packageType,
        lang: lang,
        status: "čeka_uplatu",
        createdAt: serverTimestamp()
    };
    
    const btn = document.getElementById('b-sub');
    const originalText = btn.innerText;
    
    try {
        btn.disabled = true;
        btn.innerText = "⏳ Slanje...";
        
        console.log("📝 Registracija početa...", userData);
        
        // Spremi u Firestore
        const docRef = await addDoc(collection(db, "users"), userData);
        
        console.log("✅ Registracija uspešna! ID:", docRef.id);
        console.log("💾 Korisnik ID:", memberId);
        
        // Preusmeri sa parametrima
        const params = new URLSearchParams({
            id: memberId,
            fn: firstName,
            ln: lastName,
            lp: licensePlate,
            pk: packageType,
            lg: lang
        });
        
        window.location.href = `vertrag.html?${params.toString()}`;
        
    } catch (err) {
        console.error("❌ Greška pri registraciji:", err);
        alert("Greška pri registraciji: " + err.message);
        btn.disabled = false;
        btn.innerText = originalText;
    }
};

// ==================== PARTNER CARD TOGGLE ====================
window.togglePartnerCard = (element) => {
    console.log("🤝 Partner Kachel geklickt");
    element.classList.toggle('active');
    
    // Mobile Vibration
    if (navigator.vibrate) {
        navigator.vibrate([50]);
    }
};

// ==================== INIT ====================
console.log("✅ Script initialisiert - Firebase App:", app.name);
