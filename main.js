

// Kirjautumistoiminnot:
const registrationForm = document.getElementById("registrationForm");
const loginForm = document.getElementById("loginForm");

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("kayttajaNimi").value;
    const email = document.getElementById("asetaSposti").value;
    const password = document.getElementById("asetaPsw").value;
    const verifyPassword = document.getElementById("vahvistaPsw").value;

    if (!username.trim() || username.length < 5) {
        document.getElementById("kayttajaNimi").focus();
        return;
    }

    if (!password.trim() || !isStrongPassword(password) || password != verifyPassword) {
        document.getElementById("asetaPsw").focus();
        return;
    }

    if (!email.trim() || !isValidEmail(email)) {
        document.getElementById("asetaSposti").focus();
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        alert("Already exists");
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Jep!");
    registrationForm.reset();

});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
    let tester = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;
    return tester.test(password);
}

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("kNimi").value;
    const password = document.getElementById("psw").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        document.getElementById("logout").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("createAccount").style.display = "none";
    } else {
        alert("Ei");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const logInDiv = document.getElementById("login");
    const logoutDiv = document.getElementById("logout");
    const logoutBtn = document.getElementById("kirjauduUlos");
    const createAccountBtn = document.getElementById("createAccount");

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        logoutDiv.style.display = "block";
        logInDiv.style.display = "none";
        createAccountBtn.style.display = "none";
    }

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        logoutDiv.style.display = "none";
        logInDiv.style.display = "block";
        createAccountBtn.style.display = "block";
        window.location.href = "index.html";
    });
});




// Kauppatavaran laittaminen näkyviin "hyllyyn":















// Dropdown valikko kirjautumiselle
function kirjauduIkkuna() {
    document.getElementById('id01').classList.toggle('show')
}

window.onclick = function(event) {
    if (!event.target.matches('.kirjaududd')) {
        let luokat = document.getElementById('id01').classList
        if (luokat.contains('show')) {
            luokat.remove('show')
        }
    }
}

// Nuoli-painike sivun yläosaan palaamiseksi
const arrow = document.querySelector(".upArrow")

window.onscroll = function() {
    var top = window.scrollY;
    if(top >= 100) {
        arrow.classList.add('show');
    }
    else {
        arrow.classList.remove('show');
    }
}

// Kassa-sivun toiminnot
function kassaSkriptit() {
    const tilaus = document.getElementById('kassa01')

    tilaus.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const etunimi = document.getElementById('etunimi').value
        const sukunimi = document.getElementById('sukunimi').value
        const osoite = document.getElementById('osoite').value
        const postinumero = document.getElementById('postiNumero').value
        const paikkakunta = document.getElementById('paikkakunta').value
        let valid = true

        if (!etunimi.trim() || etunimi.length < 2 || !tarkistaNimi(etunimi)) {
            document.getElementById('etunimi').focus()
            console.log('etu');
            valid = false
            return
        }

        if (!sukunimi.trim() || sukunimi.length < 2 || !tarkistaNimi(sukunimi)) {
            document.getElementById('sukunimi').focus()
            console.log('suku');
            valid = false
            return
        }

        if (!osoite.trim() || !tarkistaOsoite(osoite)) {
            document.getElementById('osoite').focus()
            console.log('osoite');
            valid = false
            return
        }

        if (!postinumero.trim() || postinumero.length !== 5 || isNaN(postinumero)) {
            document.getElementById('postiNumero').focus()
            console.log('posti');
            valid = false
            return
        }

        if (!paikkakunta.trim() || paikkakunta.length < 2 || !tarkistaNimi(paikkakunta)) {
            document.getElementById('paikkakunta').focus()
            console.log(tarkistaNimi(paikkakunta.length, 'pkunta'));
            valid = false
            return
        }

        if (valid === true) {
            const summary = {
                sumEtunimi:etunimi,
                sumSukunimi:sukunimi,
                sumOsoite:osoite,
                sumPostiNumero:postinumero,
                sumPaikkakunta:paikkakunta
            }
            document.getElementById('kassa01').style.display = 'none'
            document.getElementById('summary').style.display = 'block'
            document.getElementById('sumEtunimi').innerHTML = summary.sumEtunimi
            document.getElementById('sumSukunimi').innerHTML = summary.sumSukunimi
            document.getElementById('sumOsoite').innerHTML = summary.sumOsoite
            document.getElementById('sumPostiNumero').innerHTML = summary.sumPostiNumero
            document.getElementById('sumPaikkakunta').innerHTML = summary.sumPaikkakunta
            document.getElementById('kassa02').style.display = 'block'
        }
        
    })
}

function tarkistaNimi(nimi) {
    return /^[A-Zåäö]+[a-zåäö]+$/.test(nimi);
}

function tarkistaOsoite(osoite) {
    return /^[A-Zåäö]+[a-zåäö]+\s[0-9]+$/.test(osoite);
}

// Palaa edelliseen vaiheeseen kassa-sivulla
function kassaPalaa() {
    document.getElementById('summary').style.display = 'none'
    document.getElementById('kassa02').style.display = 'none'
    document.getElementById('kassa01').style.display = 'block'

    const maksuValinnat = document.getElementsByName('maksutapa')

    for (i = 0; i < maksuValinnat.length; i++) {
        maksuValinnat[i].checked = false
        document.getElementById(`mKaavake${i}`).classList.remove('show')
    }
}

// Maksutapa pudotusvalikko
function showPaymentForm() {
    const maksuValinnat = document.getElementsByName('maksutapa')

    for (i = 0; i < maksuValinnat.length; i++) {
        if (maksuValinnat[i].checked === false) {
            document.getElementById(`mKaavake${i}`).classList.remove('show')
        }
    }

    for (i = 0; i < maksuValinnat.length; i++) {
        if (maksuValinnat[i].checked) {
            document.getElementById(`mKaavake${i}`).classList.add('show')
        }
    }
}