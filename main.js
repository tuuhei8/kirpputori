

// Kirjautumistoiminnot:






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