

// Kirjautumistoiminnot:
const registrationForm = document.getElementById("registrationForm");
const loginForm = document.getElementById("loginForm");
const formMessage = document.getElementById("form-message");

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("kayttajaNimi").value;
    const email = document.getElementById("asetaSposti").value;
    const password = document.getElementById("asetaPsw").value;
    const verifyPassword = document.getElementById("vahvistaPsw").value;

    const allInputs = [document.getElementById("kayttajaNimi"), document.getElementById("asetaSposti"), document.getElementById("asetaPsw"), document.getElementById("vahvistaPsw")];

    allInputs.forEach(input => {
        input.addEventListener("input", () => {
            formMessage.innerText = "";
            if (input.parentElement.classList.contains("incorrect")) {
                input.parentElement.classList.remove("incorrect");
            }
        });
    });

    if (!username.trim() || username.length < 5) {
        document.getElementById("kayttajaNimi").parentElement.classList.add('incorrect');
        showMessage("Käyttäjänimen täytyy olla vähintään 5 merkkiä pitkä!", "error");
        return;
    }

    if (!password.trim() || !isStrongPassword(password)) {
        document.getElementById("asetaPsw").parentElement.classList.add('incorrect');
        showMessage("Salasanan täytyy sisältää pieniä ja isoja kirjaimia, sekä sisältää yhden numeron ja erikoismerkin!", "error");
        return;
    }

    if (verifyPassword != password) {
        document.getElementById("vahvistaPsw").parentElement.classList.add('incorrect');
        showMessage("Salasanat eivät täsmää!", "error");
        return;
    }

    if (!email.trim() || !isValidEmail(email)) {
        document.getElementById("asetaSposti").parentElement.classList.add('incorrect');
        showMessage("Tarkista sähköpostiosoite!", "error");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        //alert("Already exists");
        showMessage("Tämä sähköposti on jo käytössä!", "error");
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    //alert("Jep!");
    showMessage("Tilin luominen onnistui!", "success");
    registrationForm.reset();

});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
    let tester = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;
    return tester.test(password);
}

function showMessage(message, type) {
    formMessage.innerText = message;
    formMessage.className = type;
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
        let kVirheilmoitus = ''

        if (!etunimi.trim() || etunimi.length < 2 || !tarkistaNimi(etunimi)) {
            document.getElementById('etunimi').focus()
            kVirheilmoitus = '<p>Tarkista että etunimi on kirjoitettu oikein.</p>'
            kassaVirhe(kVirheilmoitus)
            valid = false
            return
        }

        if (!sukunimi.trim() || sukunimi.length < 2 || !tarkistaNimi(sukunimi)) {
            document.getElementById('sukunimi').focus()
            kVirheilmoitus = '<p>Tarkista että sukunimi on kirjoitettu oikein.</p>'
            kassaVirhe(kVirheilmoitus)
            valid = false
            return
        }

        if (!osoite.trim() || !tarkistaOsoite(osoite)) {
            document.getElementById('osoite').focus()
            kVirheilmoitus = '<p>Tarkista että osoite on kirjoitettu oikein.</p>'
            kassaVirhe(kVirheilmoitus)
            valid = false
            return
        }

        if (!postinumero.trim() || postinumero.length !== 5 || isNaN(postinumero)) {
            document.getElementById('postiNumero').focus()
            kVirheilmoitus = '<p>Tarkista että postinumero on oikein.</p>'
            kassaVirhe(kVirheilmoitus)
            valid = false
            return
        }

        if (!paikkakunta.trim() || paikkakunta.length < 2 || !tarkistaNimi(paikkakunta)) {
            document.getElementById('paikkakunta').focus()
            kVirheilmoitus = '<p>Tarkista paikkakunnan oikeinkirjoitus.</p>'
            kassaVirhe(kVirheilmoitus)
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

function kassaVirhe(kVirheilmoitus) {
    document.getElementById('kVirhe').innerHTML = kVirheilmoitus
    console.log(kVirheilmoitus);
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