
const meno = document.getElementById("meno");
const nahladMeno = document.getElementById("nahladMeno");

meno.addEventListener("input", function() {
    nahladMeno.textContent = meno.value;
});

const email = document.getElementById("email")
const nahladEmail = document.getElementById("nahladEmail")

email.addEventListener("input", function(){
    nahladEmail.textContent = email.value;
});

const tel = document.getElementById("tel");
const nahladTel = document.getElementById("nahladTel");

tel.addEventListener("input", function() {
    nahladTel.textContent = tel.value;
});

const date = document.getElementById("date");
const nahladDate = document.getElementById("nahladDate");

date.addEventListener("input", function() {
    nahladDate.textContent = date.value;
});

const kurz = document.getElementById("kurz");
const nahladKurz = document.getElementById("nahladKurz");

kurz.addEventListener("input", function() {
    nahladKurz.textContent = kurz.value;
});

const beginner = document.getElementById("beginner");
const intermediate = document.getElementById("intermediate");
const advanced = document.getElementById("advanced");
const nahladUroven = document.getElementById("nahladUroven");

beginner.addEventListener("change", function() {
    nahladUroven.textContent = beginner.value;
});

intermediate.addEventListener("change", function() {
    nahladUroven.textContent = intermediate.value;
});

advanced.addEventListener("change", function() {
    nahladUroven.textContent = advanced.value;
});

const poznamka = document.getElementById("poznamka");
const nahladPoznamka = document.getElementById("nahladPoznamka");

poznamka.addEventListener("input", function() {
    nahladPoznamka.textContent = poznamka.value;
});

const prihlaska = document.getElementById("prihlaska");

prihlaska.addEventListener("submit", function(event) {
    event.preventDefault();
    prihlaska.style.display = "none";
    alert("Formulár bol úspešne odoslaný.");
});
/*submit zachytí odoslanie formulára
event.preventDefault() zabráni odoslaniu a obnoveniu stránky
display = "none" skryje formulár po stlačení submit
alert() zase vyhodí správu že sa formulár podarilo úspešne odoslať
*/