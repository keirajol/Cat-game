// maak hier een class aan voor de kat. Hierbij heb ik de waardes gegeven.
class Kat {
    constructor(Naam) {
        this.Naam = Naam;
        this.honger = 5;
        this.energie = 5;
        this.geluk = 5;
        this.leven = true;
        this.hongerGetal = setInterval(() => this.verhoogHonger(), 4000);
        this.gelukGetal= setInterval(() => this.verlaagGeluk(), 4000);
    }

    // Dit is het eten gedeelte. Hij geeft hierbij aan hoeveel honger hij heeft. Waneer het niet gevoerd wordt gaat hij dood.
    eten() {
        if (this.leven) {
            if (this.honger > 0) {
                this.honger -= 1;
                this.vooruitgang();
            } else {
                alert(`${this.Naam} heeft geen honger.`);
            }
        } else {
            alert(`${this.Naam} is dood.`);
        }
    }

    // Dit is het zelfde als de vorige maar dan met geluk. Als hij energie heeft door te slapen kan hij spelen waardoor zijn geluk omhoog gaat.
    spelen() {
        if (this.leven) {
            if (this.energie > 0) {
                this.geluk += 1;
                this.energie -= 1;
                this.vooruitgang();
            } else {
                alert(`${this.Naam} is te moe om te spelen.`);
            }
        } else {
            alert(`${this.Naam} is dood.`);
        }
    }

    // Door te slapen gaat zijn energie omhoog waardoor hij kan spelen.
    slapen() {
        if (this.leven) {
            this.energie += 1;
            this.vooruitgang();
        } else {
            alert(`${this.Naam} is dood.`);
        }
    }

    // Hier zorg ervoor dat wanneer de kat honger heeft of ongeluk is het een waarschuwing geeft zodat je weet dat je hem moet voeren of met hem moet spelen.
    vooruitgang() {
        document.getElementById('status').innerText = `Honger: ${this.honger}, Energie: ${this.energie}, Geluk: ${this.geluk}`;
        if (this.honger >= 8) {
            document.getElementById('warning-honger').style.display = 'block';
        } else {
            document.getElementById('warning-honger').style.display = 'none';
        }
        if (this.geluk <= 2) {
            document.getElementById('warning-geluk').style.display = 'block';
        } else {
            document.getElementById('warning-geluk').style.display = 'none';
        }
    }

    // Het oproepen van de naam
    setNaam(Naam) {
        this.Naam = Naam;
        document.getElementById('Naam').innerText = this.Naam;
    }

    // De honger verhogen zodat het dood kan gaan en je weet dat het meer honger heeft
    verhoogHonger() {
        if (this.leven) {
            this.honger += 1;
            this.vooruitgang();
            if (this.honger >= 10) {
                this.sterf("van de honger");
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
        this.leven = false;
        clearInterval(this.hongerGetal);
        clearInterval(this.gelukGetal);
        alert(`${this.Naam} is gestorven ${reden}.`);
        document.getElementById('status').innerText = `${this.Naam} is dood.`;
        document.getElementById('reset').style.display = 'block';
    }
}

let pet = new Kat('Naamloze kat');
// functies aanroepen
function eten() {
    pet.eten();
}

function spelen() {
    pet.spelen();
}

function slapen() {
    pet.slapen();
}

// De kat veranderen van kleur door middel van een foto te veranderen.
function veranderKat(afbeeldingKat) {
    if (pet.leven) {
        document.getElementById('kat-img').src = afbeeldingKat;
    } 
}

// het mogelijk maken om een naam te geven. 
function setNaam() {
    const Naam = document.getElementById('Naam-input').value;
    if (Naam) {
        pet.setNaam(Naam);
    } else {
        alert('Geef je kat een naam.');
    }
}

// functie om het spel op nieuw te beginnen
function resetGame() {
    pet = new Kat('Naamloze kat');
    pet.setNaam(document.getElementById('Naam').innerText);
    document.getElementById('reset').style.display = 'none';
    document.getElementById('kat-img').src = 'blackCat.png'; 
}


