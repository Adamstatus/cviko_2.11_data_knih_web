
//aby na každej stránke bol rovnaký topbar
fetch('topbar.html')
    .then(response => response.text())
    .then(html => {
        document.body.insertAdjacentHTML('afterbegin', html);
    })
    .catch( error =>{
        console.error('Topbar could not be loaded. Run the website using a local web server(for example Live Server).', error);
    });

//zmena textu po kliknutí tlačidla
const tlacidlo = document.getElementById("zmenText");
const nadpis = document.getElementById("mojText")

if (tlacidlo && nadpis) {
    tlacidlo.addEventListener("click", function() {
        if (nadpis.textContent === "Vitaj vo svete Fast & Furious!") {
            nadpis.textContent = "Život je o rodine!";
        } else {
            nadpis.textContent = "Vitaj vo svete Fast & Furious!";
        }
    });
}

const pridajKlik = document.getElementById("pridajKlik");
const resetKlik = document.getElementById("resetKlik");
const pocetKliknuti = document.getElementById("pocetKliknuti");

if (pridajKlik && resetKlik && pocetKliknuti) {
    let pocet = 0; //vytvorí premennú s hodnotou 0, premennej vieme neskôr zmeniť hodnotu

    pridajKlik.addEventListener("click", function() {
        pocet++;
        pocetKliknuti.textContent = pocet;
    });

    resetKlik.addEventListener("click", function() {
        pocet = 0;
        pocetKliknuti.textContent = pocet;
    });
}
