

// Kirjautumistoiminnot:
const registrationForm = document.getElementById("registrationForm");
const loginForm = document.getElementById("loginForm");

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("kayttajaNimi").value;
    const email = document.getElementById("asetaSposti").value;
    const password = document.getElementById("asetaPsw").value;
    const verifyPassword = document.getElementById("vahvistaPsw").value;

    const allInputs = [document.getElementById("kayttajaNimi"), document.getElementById("asetaSposti"), document.getElementById("asetaPsw"), document.getElementById("vahvistaPsw")];

    allInputs.forEach(input => { //Clear the error messages if the user starts typing again
        input.addEventListener("input", () => {
            const form = input.closest("form");
            const formMessage = form.querySelector(".form-message");

            formMessage.innerText = "";

            if (input.parentElement.classList.contains("incorrect")) {
                input.parentElement.classList.remove("incorrect");
            }
        });
    });

    if (!username.trim() || username.length < 5) {
        document.getElementById("kayttajaNimi").parentElement.classList.add('incorrect');
        showMessage(registrationForm, "Käyttäjänimen täytyy olla vähintään viisi merkkiä pitkä!");
        return;
    }

    if (!password.trim() || !isStrongPassword(password)) {
        document.getElementById("asetaPsw").parentElement.classList.add('incorrect');
        showMessage(registrationForm, "Salasanan täytyy sisältää pieniä ja isoja kirjaimia, sekä sisältää yhden numeron ja erikoismerkin!");
        return;
    }

    if (verifyPassword != password) {
        document.getElementById("vahvistaPsw").parentElement.classList.add('incorrect');
        showMessage(registrationForm, "Salasanat eivät täsmää!");
        return;
    }

    if (!email.trim() || !isValidEmail(email)) {
        document.getElementById("asetaSposti").parentElement.classList.add('incorrect');
        showMessage(registrationForm, "Tarkista sähköpostiosoite!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        //alert("Already exists");
        showMessage(registrationForm, "Tämä sähköposti on jo käytössä!");
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    //alert("Jep!");
    showMessage(registrationForm, "Tilin luominen onnistui!", false);
    registrationForm.reset();

});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
    let tester = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;
    return tester.test(password);
}

function showMessage(form, message, isError = true) {
    const formMessage = form.querySelector(".form-message");
    formMessage.innerText = message;
    formMessage.style.color = isError ? "red" : "green";
}

function showToast(message, isError = false) {
    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.remove("toast-error", "show");

    if (isError) {
        toast.classList.add("toast-error");
    }

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function toggleProfiles(show) {
    const displayStyle = show ? "block" : "none";
    const profileLink = document.getElementById("profileLink");
    const footerProfile = document.getElementById("footerProfile");

    if (profileLink) profileLink.style.display = displayStyle;
    if (footerProfile) footerProfile.style.display = displayStyle;
}

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("kNimi").value;
    const password = document.getElementById("psw").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const allInputs = [document.getElementById("kNimi"), document.getElementById("psw")];

    allInputs.forEach(input => { //Clear the error messages if the user starts typing again
        input.addEventListener("input", () => {
            const form = input.closest("form");
            const formMessage = form.querySelector(".form-message");

            formMessage.innerText = "";
            
            if (input.parentElement.classList.contains("incorrect")) {
                input.parentElement.classList.remove("incorrect");
            }
        });
    });

    const userNameInput = document.getElementById("kNimi");
    const passwordInput = document.getElementById("psw");

    const userByUsername = users.find(user => user.username === username);

    if (!userByUsername) {
        showMessage(loginForm, "Tarkista käyttäjänimi!");
        userNameInput.parentElement.classList.add("incorrect");
        kirjauduIkkuna();
        return;
    }

    if (userByUsername.password !== password) {
        showMessage(loginForm, "Tarkista salasana!");
        passwordInput.parentElement.classList.add("incorrect");
        kirjauduIkkuna();
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(userByUsername));
    toggleProfiles(true);
    document.getElementById("logout").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("createAccount").style.display = "none";
    showToast("Kirjautuminen onnistui!");
});

document.addEventListener("DOMContentLoaded", function () {
    const logInDiv = document.getElementById("login");
    const logoutDiv = document.getElementById("logout");
    const logoutBtn = document.getElementById("kirjauduUlos");
    const createAccountBtn = document.getElementById("createAccount");

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        toggleProfiles(false);
    }

    if (loggedInUser) {
        logoutDiv.style.display = "block";
        logInDiv.style.display = "none";
        createAccountBtn.style.display = "none";
    }
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            logoutDiv.style.display = "none";
            logInDiv.style.display = "block";
            createAccountBtn.style.display = "block";
            showToast("Olet kirjautunut ulos", true);

            setTimeout(() => {
                window.location.href = "index.html";
            }, 2500);
        });
    }
});

// Dropdown valikko kirjautumiselle
const luokat = document.getElementById('id01').classList;

function kirjauduIkkuna() {
    document.getElementById('id01').classList.toggle('show');
}

window.onclick = function(event) {
   if (!event.target.matches('.kirjaududd')) {
        if (luokat.contains('show')) {
            luokat.remove('show');
        }
    }
}

// Nuoli-painike sivun yläosaan palaamiseksi
const arrow = document.querySelector(".upArrow");

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
    const tilaus = document.getElementById('kassa01');

    tilaus.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const etunimi = document.getElementById('etunimi').value;
        const sukunimi = document.getElementById('sukunimi').value;
        const osoite = document.getElementById('osoite').value;
        const postinumero = document.getElementById('postiNumero').value;
        const paikkakunta = document.getElementById('paikkakunta').value;
        let valid = true;
        let kVirheilmoitus = '';

        if (!etunimi.trim() || etunimi.length < 2 || !tarkistaNimi(etunimi)) {
            document.getElementById('etunimi').classList.add('kassaBorder');
            kVirheilmoitus += '<p>Etunimen on oltava vähintään 2 merkkiä ja alettava isolla kirjaimella.</p>';
            kassaVirhe(kVirheilmoitus);
            valid = false;
        } else if (document.getElementById('etunimi').classList.contains('kassaBorder')) {
            document.getElementById('etunimi').classList.remove('kassaBorder')
        }

        if (!sukunimi.trim() || sukunimi.length < 2 || !tarkistaNimi(sukunimi)) {
            document.getElementById('sukunimi').classList.add('kassaBorder');
            kVirheilmoitus += '<p>Sukunimen on oltava vähintään 2 merkkiä ja alettava isolla kirjaimella.</p>';
            kassaVirhe(kVirheilmoitus);
            valid = false; 
        } else if (document.getElementById('sukunimi').classList.contains('kassaBorder')) {
            document.getElementById('sukunimi').classList.remove('kassaBorder')
        }

        if (!osoite.trim() || !tarkistaOsoite(osoite)) {
            document.getElementById('osoite').classList.add('kassaBorder');
            kVirheilmoitus += '<p>Tarkista että katuosoite on kirjoitettu oikein. Esim. "Katu A1", "Katu 23".</p>';
            kassaVirhe(kVirheilmoitus);
            valid = false;
        } else if (document.getElementById('osoite').classList.contains('kassaBorder')) {
            document.getElementById('osoite').classList.remove('kassaBorder')
        }

        if (!postinumero.trim() || postinumero.length !== 5 || isNaN(postinumero)) {
            document.getElementById('postiNumero').classList.add('kassaBorder');
            kVirheilmoitus += '<p>Postinumeron on koostuttava viidestä numerosta.</p>';
            kassaVirhe(kVirheilmoitus);
            valid = false;
        } else if (document.getElementById('postiNumero').classList.contains('kassaBorder')) {
            document.getElementById('postiNumero').classList.remove('kassaBorder')
        }

        if (!paikkakunta.trim() || paikkakunta.length < 2 || !tarkistaNimi(paikkakunta)) {
            document.getElementById('paikkakunta').classList.add('kassaBorder');
            kVirheilmoitus += '<p>Paikkakunnan on oltava vähintään 2 merkkiä ja alettava isolla kirjaimella.</p>';
            kassaVirhe(kVirheilmoitus);
            valid = false;
        } else if (document.getElementById('paikkakunta').classList.contains('kassaBorder')) {
            document.getElementById('paikkakunta').classList.remove('kassaBorder')
        }
        
        if (valid === true) {
            kVirheilmoitus = '';
            kassaVirhe(kVirheilmoitus);
            const summary = {
                sumEtunimi:etunimi,
                sumSukunimi:sukunimi,
                sumOsoite:osoite,
                sumPostiNumero:postinumero,
                sumPaikkakunta:paikkakunta
            }
            document.getElementById('kassa01').style.display = 'none';
            document.getElementById('summary').style.display = 'block';
            document.getElementById('sumEtunimi').innerHTML = summary.sumEtunimi;
            document.getElementById('sumSukunimi').innerHTML = summary.sumSukunimi;
            document.getElementById('sumOsoite').innerHTML = summary.sumOsoite;
            document.getElementById('sumPostiNumero').innerHTML = summary.sumPostiNumero;
            document.getElementById('sumPaikkakunta').innerHTML = summary.sumPaikkakunta;
            document.getElementById('kassa02').style.display = 'block';
        } else {
            return;
        }
    });
}

function kassaVirhe(kVirheilmoitus) {
    document.getElementById('kVirhe').innerHTML = kVirheilmoitus;
}

function tarkistaNimi(nimi) {
    return /^[A-ZÅÄÖ]+[-A-ZÅÄÖa-zåäö]+$/.test(nimi);
}

function tarkistaOsoite(osoite) {
    return /^[A-ZÅÄÖ]+[-A-ZÅÄÖa-zåäö]+\s[A-ZÅÄÖ0-9\d]+$/.test(osoite);
}

// Palaa edelliseen vaiheeseen kassa-sivulla
function kassaPalaa() {
    document.getElementById('summary').style.display = 'none';
    document.getElementById('kassa02').style.display = 'none';
    document.getElementById('kassa01').style.display = 'block';

    const maksuValinnat = document.getElementsByName('maksutapa');

    for (i = 0; i < maksuValinnat.length; i++) {
        maksuValinnat[i].checked = false;
        document.getElementById(`mKaavake${i}`).classList.remove('show');
    }
}

// Maksutapa pudotusvalikko
function showPaymentForm(valinta) {
    document.getElementById(valinta).checked = true
    const maksuValinnat = document.getElementsByName('maksutapa');

    for (i = 0; i < maksuValinnat.length; i++) {
        if (maksuValinnat[i].checked === false) {
            document.getElementById(`mKaavake${i}`).classList.remove('show');
        }
    }

    for (i = 0; i < maksuValinnat.length; i++) {
        if (maksuValinnat[i].checked) {
            document.getElementById(`mKaavake${i}`).classList.add('show');
        }
    }
}




