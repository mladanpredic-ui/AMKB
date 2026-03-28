import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCmSL8TmGrcda-Btnpn0u8mUpWLo6q_aMY",
    authDomain: "autoklub-balkan.firebaseapp.com",
    projectId: "autoklub-balkan",
    storageBucket: "autoklub-balkan.firebasestorage.app",
    messagingSenderId: "499546593125",
    appId: "1:499cluster-balkan:web:7823602797b37e8338b38c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==================== VOLLSTÄNDIGE TRANSLATIONS ====================
const translations = {
    sr: {
        // Header
        welcome: "AK BALKAN",
        desc: "Vaš pouzdan partner na putu širom Evrope.",
        
        // Pakete Section
        pkgTitle: "Izaberite paket zaštite:",
        pkgMoto: "MOTO",
        pkgMotoPrice: "39€",
        pkgMotoFeatures: ["Srbija + Evropa", "Šlep do 50km", "Popravka na licu mesta", "Smeštaj (1 noć)"],
        
        pkgAuto: "AUTO",
        pkgAutoPrice: "89€",
        pkgAutoFeatures: ["Srbija + Evropa", "Šlep do 200km", "Popravka na licu mesta", "E zamensko vozilo (2 dana)", "Smeštaj (2 noći)"],
        
        pkgPremium: "PREMIUM",
        pkgPremiumPrice: "159€",
        pkgPremiumFeatures: ["Neograničen šlep", "Srbija + Evropa + Balkan", "Zamensko vozilo (5 dana)", "Smeštaj (5 noći)", "Povratak vozila kući"],
        
        btnSelect: "IZABERI",
        linkLogin: "Već ste član? Prijavite se",
        
        // Partner Section
        partnerTitle: "🤝 AKTUALNE AKCIJE NAŠIH PARTNERA",
        
        // Partner 1
        p1Name: "GRAWE",
        p1Cat: "Osiguranje",
        p1Disc: "15%",
        p1Text: "Popust za članove",
        p1Info: "Specijalni uslovi osiguranja vozila za članove AK Balkan. Kontakt: info@grawe.rs",
        
        // Partner 2
        p2Name: "AE Mitrović",
        p2Cat: "Čipčovanje",
        p2Disc: "10%",
        p2Text: "Rabatt na Chiptuning",
        p2Info: "Profesionalno čipčovanje sa garantijom. Lokacija: Beograd. Tel: +381 11 XXX XXXX",
        
        // Partner 3
        p3Name: "Ducati Serbia",
        p3Cat: "Motocikli",
        p3Disc: "12%",
        p3Text: "Popust na rezervne delove",
        p3Info: "Originalni delovi za Ducati motocikle. Servis i prodaja. www.ducati-serbia.rs",
        
        // Partner 4
        p4Name: "BlackGlass",
        p4Cat: "Zaštita stakla",
        p4Disc: "20%",
        p4Text: "Specijalna zaštita",
        p4Info: "Premijumska zaštita i usluga čišćenja stakla. Dugotrajna zaštita od UV zraka.",
        
        // Partner 5
        p5Name: "Pirelli Shop",
        p5Cat: "Gume i točkovi",
        p5Disc: "8%",
        p5Text: "Popust na gume",
        p5Info: "Kvalitetne gume Pirelli sa besplatnom montažom. Servis u nekoliko lokacija.",
        
        // Partner 6
        p6Name: "Auto Elektrika",
        p6Cat: "Električni delovi",
        p6Disc: "18%",
        p6Text: "Popust članovima",
        p6Info: "Sve električne komponente za vozila. Stručna saveta i instalacija dostupne.",
        
        // Registration
        regTitle: "Registracija člana",
        regPackage: "Paket:",
        regFirstName: "Ime",
        regLastName: "Prezime",
        regEmail: "E-mail",
        regPlate: "Registarska oznaka",
        regPassword: "Lozinka",
        regLang: "Jezik ugovora:",
        regLangSr: "Srpski",
        regLangDe: "Srpski + Deutsch",
        regTerms: "Prihvatam uslove poslovanja.",
        regSubmit: "POTVRDI",
        regBack: "Nazad"
    },
    
    de: {
        welcome: "AK BALKAN",
        desc: "Ihr zuverlässiger Partner auf Europas Straßen.",
        
        pkgTitle: "Wählen Sie Ihr Schutzpaket:",
        pkgMoto: "MOTO",
        pkgMotoPrice: "39€",
        pkgMotoFeatures: ["Serbien + Europa", "Abschleppdienst bis 50km", "Pannenhilfe vor Ort", "Unterkunft (1 Nacht)"],
        
        pkgAuto: "AUTO",
        pkgAutoPrice: "89€",
        pkgAutoFeatures: ["Serbien + Europa", "Abschleppdienst bis 200km", "Pannenhilfe vor Ort", "Ersatzfahrzeug (2 Tage)", "Unterkunft (2 Nächte)"],
        
        pkgPremium: "PREMIUM",
        pkgPremiumPrice: "159€",
        pkgPremiumFeatures: ["Unbegrenzter Abschleppdienst", "Serbien + Europa + Balkan", "Ersatzfahrzeug (5 Tage)", "Unterkunft (5 Nächte)", "Rückfahrt des Fahrzeugs"],
        
        btnSelect: "WÄHLEN",
        linkLogin: "Bereits Mitglied? Anmelden",
        
        partnerTitle: "🤝 AKTUELLE PARTNER-ANGEBOTE",
        
        p1Name: "GRAWE",
        p1Cat: "Versicherung",
        p1Disc: "15%",
        p1Text: "Rabatt für Mitglieder",
        p1Info: "Spezielle Versicherungsbedingungen für AK Balkan Mitglieder. Kontakt: info@grawe.de",
        
        p2Name: "AE Mitrović",
        p2Cat: "Chiptuning",
        p2Disc: "10%",
        p2Text: "Chiptuning Rabatt",
        p2Info: "Professionelles Chiptuning mit Garantie. Standort: Belgrad. Tel: +381 11 XXX XXXX",
        
        p3Name: "Ducati Serbia",
        p3Cat: "Motorräder",
        p3Disc: "12%",
        p3Text: "Rabatt auf Ersatzteile",
        p3Info: "Original Ducati Ersatzteile. Service und Verkauf. www.ducati-serbia.rs",
        
        p4Name: "BlackGlass",
        p4Cat: "Glasschutz",
        p4Disc: "20%",
        p4Text: "Spezialschutz",
        p4Info: "Premium Glasschutz und Reinigungsservice. Langzeitschutz vor UV-Strahlung.",
        
        p5Name: "Pirelli Shop",
        p5Cat: "Reifen und Räder",
        p5Disc: "8%",
        p5Text: "Reifenrabatt",
        p5Info: "Hochwertige Pirelli Reifen mit kostenlosem Montageservice. Mehrere Standorte.",
        
        p6Name: "Auto Elektrik",
        p6Cat: "Elektrische Teile",
        p6Disc: "18%",
        p6Text: "Rabatt für Mitglieder",
        p6Info: "Alle elektrischen Fahrzeugkomponenten. Fachberatung und Installation verfügbar.",
        
        regTitle: "Mitgliedsregistrierung",
        regPackage: "Paket:",
        regFirstName: "Vorname",
        regLastName: "Nachname",
        regEmail: "E-Mail",
        regPlate: "Kennzeichen",
        regPassword: "Passwort",
        regLang: "Vertragssprache:",
        regLangSr: "Serbisch",
        regLangDe: "Serbisch + Deutsch",
        regTerms: "Ich akzeptiere die Geschäftsbedingungen.",
        regSubmit: "BESTÄTIGEN",
        regBack: "Zurück"
    },
    
    en: {
        welcome: "AK BALKAN",
        desc: "Your reliable partner on European roads.",
        
        pkgTitle: "Choose your protection package:",
        pkgMoto: "MOTO",
        pkgMotoPrice: "39€",
        pkgMotoFeatures: ["Serbia + Europe", "Towing up to 50km", "On-site repair", "Accommodation (1 night)"],
        
        pkgAuto: "AUTO",
        pkgAutoPrice: "89€",
        pkgAutoFeatures: ["Serbia + Europe", "Towing up to 200km", "On-site repair", "Replacement vehicle (2 days)", "Accommodation (2 nights)"],
        
        pkgPremium: "PREMIUM",
        pkgPremiumPrice: "159€",
        pkgPremiumFeatures: ["Unlimited towing", "Serbia + Europe + Balkan", "Replacement vehicle (5 days)", "Accommodation (5 nights)", "Return vehicle to home"],
        
        btnSelect: "CHOOSE",
        linkLogin: "Already a member? Login",
        
        partnerTitle: "🤝 CURRENT PARTNER OFFERS",
        
        p1Name: "GRAWE",
        p1Cat: "Insurance",
        p1Disc: "15%",
        p1Text: "Discount for members",
        p1Info: "Special insurance terms for AK Balkan members. Contact: info@grawe.com",
        
        p2Name: "AE Mitrović",
        p2Cat: "Chiptuning",
        p2Disc: "10%",
        p2Text: "Chiptuning discount",
        p2Info: "Professional chiptuning with warranty. Location: Belgrade. Tel: +381 11 XXX XXXX",
        
        p3Name: "Ducati Serbia",
        p3Cat: "Motorcycles",
        p3Disc: "12%",
        p3Text: "Spare parts discount",
        p3Info: "Original Ducati spare parts. Service and sales. www.ducati-serbia.rs",
        
        p4Name: "BlackGlass",
        p4Cat: "Glass Protection",
        p4Disc: "20%",
        p4Text: "Special protection",
        p4Info: "Premium glass protection and cleaning service. Long-lasting UV protection.",
        
        p5Name: "Pirelli Shop",
        p5Cat: "Tires and Wheels",
        p5Disc: "8%",
        p5Text: "Tire discount",
        p5Info: "Quality Pirelli tires with free mounting service. Several locations.",
        
        p6Name: "Auto Electric",
        p6Cat: "Electrical Parts",
        p6Disc: "18%",
        p6Text: "Member discount",
        p6Info: "All electrical vehicle components. Expert advice and installation available.",
        
        regTitle: "Member Registration",
        regPackage: "Package:",
        regFirstName: "First Name",
        regLastName: "Last Name",
        regEmail: "Email",
        regPlate: "License Plate",
        regPassword: "Password",
        regLang: "Contract Language:",
        regLangSr: "Serbian",
        regLangDe: "Serbian + German",
        regTerms: "I accept the terms and conditions.",
        regSubmit: "CONFIRM",
        regBack: "Back"
    },
    
    fr: {
        welcome: "AK BALKAN",
        desc: "Votre partenaire fiable sur les routes d'Europe.",
        
        pkgTitle: "Choisissez votre formule de protection:",
        pkgMoto: "MOTO",
        pkgMotoPrice: "39€",
        pkgMotoFeatures: ["Serbie + Europe", "Dépannage jusqu'à 50km", "Réparation sur place", "Logement (1 nuit)"],
        
        pkgAuto: "AUTO",
        pkgAutoPrice: "89€",
        pkgAutoFeatures: ["Serbie + Europe", "Dépannage jusqu'à 200km", "Réparation sur place", "Véhicule de remplacement (2 jours)", "Logement (2 nuits)"],
        
        pkgPremium: "PREMIUM",
        pkgPremiumPrice: "159€",
        pkgPremiumFeatures: ["Dépannage illimité", "Serbie + Europe + Balkans", "Véhicule de remplacement (5 jours)", "Logement (5 nuits)", "Retour du véhicule à domicile"],
        
        btnSelect: "CHOISIR",
        linkLogin: "Déjà membre ? Se connecter",
        
        partnerTitle: "🤝 OFFRES PARTENAIRES ACTUELLES",
        
        p1Name: "GRAWE",
        p1Cat: "Assurance",
        p1Disc: "15%",
        p1Text: "Remise pour les membres",
        p1Info: "Conditions d'assurance spéciales pour les membres AK Balkan. Contact: info@grawe.fr",
        
        p2Name: "AE Mitrović",
        p2Cat: "Tuning moteur",
        p2Disc: "10%",
        p2Text: "Remise tuning",
        p2Info: "Tuning moteur professionnel avec garantie. Localisation: Belgrade. Tél: +381 11 XXX XXXX",
        
        p3Name: "Ducati Serbia",
        p3Cat: "Motocyclettes",
        p3Disc: "12%",
        p3Text: "Remise pièces détachées",
        p3Info: "Pièces détachées Ducati originales. Service et vente. www.ducati-serbia.rs",
        
        p4Name: "BlackGlass",
        p4Cat: "Protection verre",
        p4Disc: "20%",
        p4Text: "Protection spéciale",
        p4Info: "Protection verre premium et service de nettoyage. Protection UV durable.",
        
        p5Name: "Pirelli Shop",
        p5Cat: "Pneus et roues",
        p5Disc: "8%",
        p5Text: "Remise pneus",
        p5Info: "Pneus Pirelli de qualité avec service de montage gratuit. Plusieurs points de vente.",
        
        p6Name: "Auto Électrique",
        p6Cat: "Pièces électriques",
        p6Disc: "18%",
        p6Text: "Remise membres",
        p6Info: "Tous les composants électriques du véhicule. Conseil expert et installation disponibles.",
        
        regTitle: "Inscription membre",
        regPackage: "Formule:",
        regFirstName: "Prénom",
        regLastName: "Nom",
        regEmail: "Email",
        regPlate: "Plaque d'immatriculation",
        regPassword: "Mot de passe",
        regLang: "Langue du contrat:",
        regLangSr: "Serbe",
        regLangDe: "Serbe + Allemand",
        regTerms: "J'accepte les conditions d'utilisation.",
        regSubmit: "CONFIRMER",
        regBack: "Retour"
    },
    
    ru: {
        welcome: "AK BALKAN",
        desc: "Ваш надежный партнер на дорогах Европы.",
        
        pkgTitle: "Выберите пакет защиты:",
        pkgMoto: "МОТО",
        pkgMotoPrice: "39€",
        pkgMotoFeatures: ["Сербия + Европа", "Буксировка до 50км", "Ремонт на месте", "Размещение (1 ночь)"],
        
        pkgAuto: "АВТО",
        pkgAutoPrice: "89€",
        pkgAutoFeatures: ["Сербия + Европа", "Буксировка до 200км", "Ремонт на месте", "Замещающий транспорт (2 дня)", "Размещение (2 ночи)"],
        
        pkgPremium: "ПРЕМИУМ",
        pkgPremiumPrice: "159€",
        pkgPremiumFeatures: ["Неограниченная буксировка", "Сербия + Европа + Балканы", "Замещающий транспорт (5 дней)", "Размещение (5 ночей)", "Возврат транспорта домой"],
        
        btnSelect: "ВЫБРАТЬ",
        linkLogin: "Уже член? Войти",
        
        partnerTitle: "🤝 ТЕКУЩИЕ ПРЕДЛОЖЕНИЯ ПАРТНЕРОВ",
        
        p1Name: "GRAWE",
        p1Cat: "Страховка",
        p1Disc: "15%",
        p1Text: "Скидка для членов",
        p1Info: "Специальные условия страховки для членов AK Balkan. Контакт: info@grawe.ru",
        
        p2Name: "AE Mitrović",
        p2Cat: "Чип-тюнинг",
        p2Disc: "10%",
        p2Text: "Скидка на чип-тюнинг",
        p2Info: "Профессиональный чип-тюнинг с гарантией. Местоположение: Белград. Тел: +381 11 XXX XXXX",
        
        p3Name: "Ducati Serbia",
        p3Cat: "Мотоциклы",
        p3Disc: "12%",
        p3Text: "Скидка на запчасти",
        p3Info: "Оригинальные запчасти Ducati. Обслуживание и продажа. www.ducati-serbia.rs",
        
        p4Name: "BlackGlass",
        p4Cat: "Защита стекла",
        p4Disc: "20%",
        p4Text: "Специальная защита",
        p4Info: "Премиум защита стекла и услуга очистки. Долговечная защита от УФ.",
        
        p5Name: "Pirelli Shop",
        p5Cat: "Шины и диски",
        p5Disc: "8%",
        p5Text: "Скидка на шины",
        p5Info: "Качественные шины Pirelli с бесплатной установкой. Несколько мест.",
        
        p6Name: "Auto Электро",
        p6Cat: "Электр. запчасти",
        p6Disc: "18%",
        p6Text: "Скидка членам",
        p6Info: "Все электрические компоненты автомобиля. Профессиональная консультация и установка.",
        
        regTitle: "Регистрация члена",
        regPackage: "Пакет:",
        regFirstName: "Имя",
        regLastName: "Фамилия",
        regEmail: "Email",
        regPlate: "Номер авто",
        regPassword: "Пароль",
        regLang: "Язык контракта:",
        regLangSr: "Сербский",
        regLangDe: "Сербский + Немецкий",
        regTerms: "Я принимаю условия использования.",
        regSubmit: "ПОДТВЕРДИТЬ",
        regBack: "Назад"
    }
};

// ==================== LANGUAGE SWITCH FUNCTION ====================
window.chLang = (lang, btn) => {
    const t = translations[lang] || translations.sr;
    
    // Header
    updateElement('h-welcome', t.welcome);
    updateElement('p-desc', t.desc);
    
    // Packages Section
    updateElement('h-title', t.pkgTitle);
    
    // MOTO Package
    updateElement('moto-badge', t.pkgMoto);
    updateElement('moto-price', t.pkgMotoPrice);
    updateElements('moto-features', t.pkgMotoFeatures);
    
    // AUTO Package
    updateElement('auto-badge', t.pkgAuto);
    updateElement('auto-price', t.pkgAutoPrice);
    updateElements('auto-features', t.pkgAutoFeatures);
    
    // PREMIUM Package
    updateElement('premium-badge', t.pkgPremium);
    updateElement('premium-price', t.pkgPremiumPrice);
    updateElements('premium-features', t.pkgPremiumFeatures);
    
    // Buttons
    updateAllByClass('btn-select', t.btnSelect);
    updateElement('link-login', t.linkLogin);
    
    // Partner Section
    updateElement('h-partner-title', t.partnerTitle);
    
    // Partners
    updateElement('p1-name', t.p1Name);
    updateElement('p1-cat', t.p1Cat);
    updateElement('p1-disc', t.p1Disc);
    updateElement('p1-text', t.p1Text);
    updateElement('p1-info', t.p1Info);
    
    updateElement('p2-name', t.p2Name);
    updateElement('p2-cat', t.p2Cat);
    updateElement('p2-disc', t.p2Disc);
    updateElement('p2-text', t.p2Text);
    updateElement('p2-info', t.p2Info);
    
    updateElement('p3-name', t.p3Name);
    updateElement('p3-cat', t.p3Cat);
    updateElement('p3-disc', t.p3Disc);
    updateElement('p3-text', t.p3Text);
    updateElement('p3-info', t.p3Info);
    
    updateElement('p4-name', t.p4Name);
    updateElement('p4-cat', t.p4Cat);
    updateElement('p4-disc', t.p4Disc);
    updateElement('p4-text', t.p4Text);
    updateElement('p4-info', t.p4Info);
    
    updateElement('p5-name', t.p5Name);
    updateElement('p5-cat', t.p5Cat);
    updateElement('p5-disc', t.p5Disc);
    updateElement('p5-text', t.p5Text);
    updateElement('p5-info', t.p5Info);
    
    updateElement('p6-name', t.p6Name);
    updateElement('p6-cat', t.p6Cat);
    updateElement('p6-disc', t.p6Disc);
    updateElement('p6-text', t.p6Text);
    updateElement('p6-info', t.p6Info);
    
    // Registration
    updateElement('h-reg-title', t.regTitle);
    updateElement('selected-pkg-display', t.regPackage);
    updateElement('fn', t.regFirstName, 'placeholder');
    updateElement('ln', t.regLastName, 'placeholder');
    updateElement('em', t.regEmail, 'placeholder');
    updateElement('lp', t.regPlate, 'placeholder');
    updateElement('pw', t.regPassword, 'placeholder');
    updateElement('l-lng', t.regLang);
    updateElement('l-agb', t.regTerms);
    updateElement('b-sub', t.regSubmit);
    updateElement('btn-back', t.regBack);
    
    // Language select options
    const clOptions = document.getElementById('cl');
    if (clOptions) {
        clOptions.options[0].text = t.regLangSr;
        clOptions.options[1].text = t.regLangDe;
    }
    
    // Active button
    document.querySelectorAll('.l-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    
    console.log("✅ Sprache gewechselt zu:", lang);
};

// ==================== HELPER FUNCTIONS ====================
function updateElement(id, text, attr = 'innerText') {
    const el = document.getElementById(id);
    if (el) {
        if (attr === 'placeholder') {
            el.placeholder = text;
        } else {
            el[attr] = text;
        }
    }
}

function updateElements(baseId, items) {
    // Für Feature-Listen (z.B. "moto-features" → "moto-feature-0", "moto-feature-1", etc.)
    items.forEach((item, i) => {
        updateElement(`${baseId}-${i}`, item);
    });
}

function updateAllByClass(className, text) {
    document.querySelectorAll(`.${className}`).forEach(el => {
        el.innerText = text;
    });
}

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
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Molimo unesite validnu email adresu!");
        return;
    }
    
    const memberId = Math.floor(100000 + Math.random() * 900000).toString();
    
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
        btn.innerText = "⏳...";
        
        console.log("📝 Registracija početa...", userData);
        
        const docRef = await addDoc(collection(db, "users"), userData);
        
        console.log("✅ Registracija uspešna! ID:", docRef.id);
        
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
    if (navigator.vibrate) {
        navigator.vibrate([50]);
    }
};

// ==================== INIT ====================
console.log("✅ Script initialisiert");
