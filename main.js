

// Kirjautumistoiminnot:






// Kauppatavaran laittaminen näkyviin "hyllyyn":















// Dropdown valikko kirjautumiselle
function kirjauduIkkuna() {
   // document.getElementById('id01').classList.toggle('hide')
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