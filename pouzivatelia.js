const registraciaForm = document.getElementById("registraciaForm");
const sprava = document.getElementById("sprava");
const zoznamPouzivatelov = document.getElementById("zoznamPouzivatelov");

function zobrazSpravu(text) {
    sprava.textContent = text;
}

async function nacitajPouzivatelov() {
    const odpoved = await fetch("/api/pouzivatelia");
    if (!odpoved.ok) {
        throw new Error(await odpoved.text() || "Chyba pri načítaní používateľov");
    }

    const pouzivatelia = await odpoved.json();
    zoznamPouzivatelov.replaceChildren();

    pouzivatelia.forEach(pouzivatel => {
        const riadok = document.createElement("tr");
        [pouzivatel.id, pouzivatel.meno, pouzivatel.email].forEach(hodnota => {
            const bunka = document.createElement("td");
            bunka.textContent = hodnota;
            riadok.appendChild(bunka);
        });

        const akcia = document.createElement("td");
        const tlacidlo = document.createElement("button");
        tlacidlo.type = "button";
        tlacidlo.textContent = "Vymazať";
        tlacidlo.addEventListener("click", async () => {
            if (!confirm(`Naozaj chceš vymazať používateľa ${pouzivatel.meno}?`)) return;

            try {
                const odpoved = await fetch(`/api/pouzivatelia/${pouzivatel.id}`, {
                    method: "DELETE"
                });
                if (!odpoved.ok) {
                    throw new Error(await odpoved.text() || "Používateľa sa nepodarilo vymazať");
                }

                zobrazSpravu("Používateľ bol vymazaný.");
                sprava.style.color = "green";
                await nacitajPouzivatelov();
            } catch (error) {
                console.error("Chyba pri vymazávaní používateľa:", error);
                zobrazSpravu(error.message || "Nepodarilo sa spojiť so serverom.");
                sprava.style.color = "red";
            }
        });

        akcia.appendChild(tlacidlo);
        riadok.appendChild(akcia);
        zoznamPouzivatelov.appendChild(riadok);
    });
}

registraciaForm.addEventListener("submit", async event => {
    event.preventDefault();
    const pouzivatel = {
        meno: document.getElementById("meno").value.trim(),
        email: document.getElementById("email").value.trim(),
        heslo: document.getElementById("heslo").value
    };

    try {
        const odpoved = await fetch("/api/pouzivatelia", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pouzivatel)
        });
        const vysledok = await odpoved.text();
        zobrazSpravu(vysledok);
        sprava.style.color = odpoved.ok ? "green" : "red";
        if (!odpoved.ok) {
            throw new Error(vysledok || "Používateľa sa nepodarilo zaregistrovať");
        }

        registraciaForm.reset();
        await nacitajPouzivatelov();
    } catch (error) {
        console.error("Chyba pri registrácii používateľa:", error);
        zobrazSpravu(error.message || "Nepodarilo sa spojiť so serverom.");
        sprava.style.color = "red";
    }
});

nacitajPouzivatelov().catch(error => {
    console.error("Chyba pri načítaní používateľov:", error);
    zobrazSpravu(error.message || "Nepodarilo sa načítať zoznam používateľov.");
    sprava.style.color = "red";
});
