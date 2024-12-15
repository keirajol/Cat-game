// maak hier een class aan voor de kat. Hierbij heb ik de waardes gegeven.
class Kat {
    constructor(Naam) {
        this.Naam = Naam;
        this.honger = 5; // standaard waardes die worden gegeven bij het opstraten van het spel
        this.energie = 5;
        this.geluk = 5;
        this.leven = true;
        this.hongerGetal = setInterval(() => this.verhoogHonger(), 4000); // snelheid van dat het het gaat optellen/aftellen
        this.gelukGetal = setInterval(() => this.verlaagGeluk(), 4000);
    }

      // Dit is het eten gedeelte. Hij geeft hierbij aan hoeveel honger hij heeft. Waneer het niet gevoerd wordt gaat hij dood.
      // dit is voor wanneer je op de buttons drukt
    eten() {
        // statement dat wanneer je de kat eten geeft dat het omlaag gaat en en wanneer je geen eten geeft telt het op.
        if (this.leven) {
            if (this.honger > 0) {
                this.honger -= 1; 
                this.vooruitgang();
            } else {
                toonMelding(`${this.Naam} heeft geen honger.`);// als het op 0 staat geeft het melding dat het geen honger heeft
            }
        } else {
            toonMelding(`${this.Naam} is dood.`); // melding dat de kat dood is wanneer je nog niet op speel opnieuw hebt gedrukt maar wel op de knoppen.
        }
    }

        // Dit is het zelfde als de vorige maar dan met geluk. Als hij energie heeft door te slapen kan hij spelen waardoor zijn geluk omhoog gaat.
    spelen() {
        if (this.leven) {
            if (this.energie > 0) {
                this.geluk += 1; // wanneer je genoeg energie hebt kan je spelen en geluk omhoog brengen, zodra je speelt gaat energie wel omlaag waardoor die moet slapen.
                this.energie -= 1;
                this.vooruitgang();
            } else {
                toonMelding(`${this.Naam} is te moe om te spelen.`); 
            }
        } else {
            toonMelding(`${this.Naam} is dood.`); // melding wanneer je drukt op spelen dat de kat al dood is.
        }
    }

      // Door te slapen gaat zijn energie omhoog waardoor hij kan spelen.
    slapen() {
        if (this.leven) {
            this.energie += 1; // wanneer die slaapt gaat energie omhoog waardoor je kan spelen met hem en zijn geluk om hoog gaat.
            this.vooruitgang();
        } else {
            toonMelding(`${this.Naam} is dood.`); // melding wanneer je drukt op slapen dat de kat al dood is.
        }
    }

   // Hier zorg ervoor dat wanneer de kat honger heeft of ongeluk is het een waarschuwing geeft zodat je weet dat je hem moet voeren of met hem moet spelen.
    vooruitgang() {
        document.getElementById('status').innerText = `Honger: ${this.honger}, Energie: ${this.energie}, Geluk: ${this.geluk}`; 
        // bepaald wanneer het een waarschuwing geeft van dat het honger heeft of ongelukkig is.
        if (this.honger >= 8) {
            document.getElementById('warning-honger').classList.remove('hidden');
        } else {
            document.getElementById('warning-honger').classList.add('hidden');
        }

        if (this.geluk <= 2) {
            document.getElementById('warning-geluk').classList.remove('hidden');
        } else {
            document.getElementById('warning-geluk').classList.add('hidden');
        }
    }


     // Het instellen van de naam
    setNaam(Naam) {
        this.Naam = Naam; // wordt opgeslagen in de eigenschap Naam
        document.getElementById('Naam').innerText = this.Naam; // html wordt aangepast door de nieuwe waarde
    }

        // De honger verhogen zodat het dood kan gaan en je weet dat het meer honger heeft
        // wanneer je niet op de knoppen drukt 
    verhoogHonger() {
        if (this.leven) {
            this.honger += 1; // wanneer je geen eten geeft gaat het omhoog
            this.vooruitgang();
            if (this.honger >= 10) { // bij 10 is de kat dood gegaan van de honger. 10 is de max
                this.sterf("van de honger"); // voor de melding dat het dood is
            } 
            
        }
    }

        // Geluk verlagen zodat hij dood kan gaan en je weet dat je met hem moet gaan spelen.
    verlaagGeluk() {
        if (this.leven) {
            this.geluk -= 1;
            this.vooruitgang();
            if (this.geluk <= 0) {
                this.sterf("van depressie");
            } 
        }
    }

        // Hier sterft hij als er niet met wordt gespeeld of als hij niet gevoerd wordt.
    sterf(reden) {
        this.leven = false; // leven is niet meer true omdat hij dood is, zo werken andere acties niet meer
        clearInterval(this.hongerGetal); // stopt met verhogen
        clearInterval(this.gelukGetal);
        toonMelding(`${this.Naam} is gestorven ${reden}.`);// melding met reden waarom hij dood is
        document.getElementById('status').innerText = `${this.Naam} is dood.`;
        document.getElementById('reset').classList.remove('hidden'); // maakt de opnieuw beginnen knop zichtbaar.
    }
}

let pet = new Kat('Naamloze kat'); // om de naam kunnen veranderen van de kat

document.getElementById('set-naam-btn').addEventListener('click', setNaam); // om de naam in te stellen wanneer je op de knop drukt.
document.getElementById('voer-btn').addEventListener('click', () => pet.eten()); // roept uit de html op dat je op deze button kan klikken
document.getElementById('speel-btn').addEventListener('click', () => pet.spelen());
document.getElementById('slaap-btn').addEventListener('click', () => pet.slapen());
document.getElementById('black-cat-btn').addEventListener('click', () => veranderKat('blackCat.png'));
document.getElementById('orange-cat-btn').addEventListener('click', () => veranderKat('orangeCat.png'));
document.getElementById('white-cat-btn').addEventListener('click', () => veranderKat('whiteCat.png'));
document.getElementById('reset-btn').addEventListener('click', resetGame);

// De kat veranderen van kleur door middel van een foto te veranderen.
function veranderKat(afbeeldingKat) {
    if (pet.leven) {
        document.getElementById('kat-img').src = afbeeldingKat;
    }
}

// het mogelijk maken om een naam te geven. 
function setNaam() {
    const Naam = document.getElementById('Naam-input').value; // de ingevulde naam op en slaat het op in een variable naam.
    if (Naam) {
        pet.setNaam(Naam); // controleert of iets ingevuld is en als het is ingevuld slaat hij het op en wordt het in de HTML aangepast.
    } else {
        toonMelding('Geef je kat een naam.'); // melding wanneer je op de knop naam instellen drukt zonder iets in te vullen dat je het een naam moet geven.
    }
}

// functie om het spel op nieuw te beginnen
function resetGame() {
    pet = new Kat('Naamloze kat'); // alle eigenschappen worden terug gezet naar hun begin waarde
    document.getElementById('reset').classList.add('hidden'); // verbegen van de reset knop
}

// Functie om een melding weer te geven
function toonMelding(bericht) {
    const meldingElement = document.createElement('div'); // maakt soort van een blok aan voor de meldingen
    meldingElement.className = 'melding-blok'; // class toevoegen
    meldingElement.innerText = bericht; // tekst van de meldingen

    
    document.body.appendChild(meldingElement); // het toevoegen van de meldingen aan het scherm

    // Verwijder de melding na 3 seconden
    setTimeout(() => {
        meldingElement.remove();
    }, 3000);
}
