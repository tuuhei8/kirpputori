

// Kirjautumistoiminnot:






// Kauppatavaran laittaminen näkyviin "hyllyyn":















// Dropdown valikko kirjautumiselle
function kirjauduIkkuna() {
    document.getElementById('id01').classList.toggle('hide')
}

window.onclick = function(event) {
    if (!event.target.matches('.kirjaududd')) {
        let luokat = document.getElementById('id01').classList
        if (luokat.contains('hide') === false) {
            luokat.add('hide')
        }
    }
}