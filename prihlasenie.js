const prihlasenieForm = document.getElementById("prihlasenieForm");
const vysledokEl = document.getElementById("vysledok");

function zobrazStavPrihlasenia() {
    const ulozenyPouzivatel = sessionStorage.getItem("prihlasenyPouzivatel");
    vysledokEl.replaceChildren();
    if (!ulozenyPouzivatel) return;

    const pouzivatel = JSON.parse(ulozenyPouzivatel);
    const info = document.createElement("p");
    info.style.color = "green";
    info.textContent = `Prihlásený používateľ: ${pouzivatel.meno} (${pouzivatel.email})`;

    const odhlasitBtn = document.createElement("button");
    odhlasitBtn.type = "button";
    odhlasitBtn.textContent = "Odhlásiť sa";
    odhlasitBtn.addEventListener("click", () => {
        sessionStorage.removeItem("prihlasenyPouzivatel");
        vysledokEl.replaceChildren();
        const sprava = document.createElement("p");
        sprava.textContent = "Boli ste odhlásený.";
        vysledokEl.appendChild(sprava);
    });

    vysledokEl.append(info, odhlasitBtn);
}

prihlasenieForm.addEventListener("submit", async event => {
    event.preventDefault();
    vysledokEl.textContent = "";

    try {
        const odpoved = await fetch("/api/prihlasenie", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: document.getElementById("email").value.trim(),
                heslo: document.getElementById("heslo").value
            })
        });
        const vysledok = await odpoved.json();
        if (!odpoved.ok) {
            vysledokEl.textContent = vysledok.sprava || "Prihlásenie sa nepodarilo.";
            vysledokEl.style.color = "red";
            return;
        }

        sessionStorage.setItem("prihlasenyPouzivatel", JSON.stringify(vysledok.pouzivatel));
        prihlasenieForm.reset();
        zobrazStavPrihlasenia();
    } catch (error) {
        console.error("Chyba pri prihlasovaní:", error);
        vysledokEl.textContent = "Nepodarilo sa spojiť so serverom.";
        vysledokEl.style.color = "red";
    }
});

zobrazStavPrihlasenia();
