import _configSettings from "../config.js";
import _heroData from "../data/heroes.js";

function initDraftSection() {

}

function draftHero(e) {

}

function toggleDraftedHero($target) {

}

function addDraftedHeroToTeam($article, id) {

}

function removeDraftedHeroFromTeam($article, id) {

}

function startDraft(e) {

}

/* your functions */
let goodHeroes = [];
let badHeroes = [];
let selectedHeroes = [];
let villain = []; // Define villain here
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectNValues(array, n) {
    const shuffledArray = shuffleArray(array);
    const selectedValues = [];
    for (let i = 0; i < n; i++) {
        selectedValues.push(shuffledArray[i]);
    }
    return selectedValues;
}

const selectedValues = selectNValues(_heroData, _configSettings.selection);


document.getElementById("gotoarena").addEventListener("click", function () {


    document.querySelector(".heroes").style.display = "none";
    document.querySelector(".Go-to-arena").style.display = "block";
    document.querySelector(".start-draft").style.display = "flex";
    document.querySelector(".open-a-booster-pack").style.display = "none";
    document.querySelector(".progress").style.display = "none";
    document.querySelector(".container2").style.display = "none";
    document.querySelector(".start-battle").style.display = "none";
    document.querySelector(".hero-section").style.display = "none";
    document.querySelector(".villain-section").style.display = "none";
    document.querySelector(".fight").style.display = "none";
    selectedHeroes = [];
    villain = [];
    container3.innerHTML = "";
    container4.innerHTML = "";
    container5.innerHTML = "";
    let countGood = 0;
    let countBad = 0;
    let countOther = 0;

    selectedValues.forEach(hero => {
        const alignment = hero.biography.alignment;
        if (alignment === "good") {
            countGood++;
            goodHeroes.push(hero);
        } else if (alignment === "bad") {
            countBad++;
            badHeroes.push(hero);
        } else {
            countOther++;
        }
    });
    document.getElementById("goodvalue").innerHTML = `good (${countGood})`;
    document.getElementById("badvalue").innerHTML = `bad (${countBad})`;

});

document.querySelector(".draft-btn").addEventListener("click", function () {

    document.querySelector(".start-draft").style.display = "none";
    document.querySelector(".open-a-booster-pack").style.display = "flex";
    document.querySelector(".progress").style.display = "flex";
    document.querySelector(".container2").style.display = "flex";


    let inputgoodradio = document.getElementById("inputgoodradio");
    let inputbadradio = document.getElementById("inputbadradio");
    draftedHeroesCount = 0;
    totalCost = 0;
    totalPriority = 0;
    updateProgressBar(document.querySelector('.progress-bar-1'), draftedHeroesCount, maxDraftedHeroes);
    updateProgressBar(document.querySelector('.progress-bar-2'), totalCost, maxTotalCost);
    updateProgressBar(document.querySelector('.progress-bar-3'), totalPriority, maxTotalPriority);
    villain = [];
    container2.innerHTML = "";

    if (inputgoodradio.checked) {

        goodHeroes.forEach(hero => {
            createHeroCard(hero);
        });

    } else {
        let randomNumber = Math.floor(Math.random() * 11);
        villain = goodHeroes.slice(randomNumber, randomNumber + 5);
    }
    if (inputbadradio.checked) {

        badHeroes.forEach(hero => {
            createHeroCard(hero);
        });

    } else {
        let randomNumber2 = Math.floor(Math.random() * 11);
        villain = badHeroes.slice(randomNumber2, randomNumber2 + 5);
    }
    goodHeroes = [];
    badHeroes = [];
});

let container2 = document.querySelector(".container2");

const maxDraftedHeroes = 5;
const maxTotalCost = 90;
const maxTotalPriority = 30;

let draftedHeroesCount = 0;
let totalCost = 0;
let totalPriority = 0;

const updateProgressBar = (progressElement, value, maxValue) => {
    const bar = progressElement.querySelector('.bar');
    const text = progressElement.querySelector('.progress-text');
    const percentage = (value / maxValue) * 100;
    bar.style.width = percentage + '%';
    text.textContent = `${value} / ${maxValue}`;
};

const showAlert = (message) => {
    alert(message);
};

const createHeroCard = (hero) => {
    let card = document.createElement("div");
    card.classList.add("card");
    const attack = Math.floor((hero.powerstats.combat + hero.powerstats.strength + hero.powerstats.power) / 30);
    const defense = Math.floor((hero.powerstats.intelligence + hero.powerstats.durability + hero.powerstats.speed) / 30);
    const priority = Math.floor((hero.appearance.height + hero.appearance.weight) / 50);
    const cost = Math.floor(attack + defense + priority);
    card.innerHTML = `
        <div class="item top ">
            <span class="gold">${hero.name}</span> <span class="circle">${cost}</span>
        </div>
        <div class="itemc">
            <img src="${hero.image.url}" alt="">
            <span>${hero.biography.alignment} ${hero.appearance.race}</span>
        </div>
        <div class="itemc bg-change">
            <div class="item">
                <span>intelligance</span><span>${hero.powerstats.intelligence}</span>
            </div>
            <div class="item">
                <span>durability</span><span>${hero.powerstats.durability}</span>
            </div>
            <div class="item">
                <span>speed</span><span>${hero.powerstats.speed}</span>
            </div>
            <div class="item">
                <span>Strenth</span><span>${hero.powerstats.strength}</span>
            </div>
            <div class="item">
                <span>Combat</span><span>${hero.powerstats.combat}</span>
            </div>
            <div class="item">
                <span>power</span><span>${hero.powerstats.power}</span>
            </div>
        </div>
        <div class="item top">
            <span>${priority}</span> <span class="tickmark">&#10003;</span> <span>${attack}/${defense}</span>
        </div>
    `;

    card.addEventListener('click', () => {
        const tickmark = card.querySelector('.tickmark');
        if (card.classList.contains('selected')) {
            // Deselect the card
            card.classList.remove('selected');
            tickmark.classList.remove("checkmark");
            draftedHeroesCount--;
            totalCost -= cost;
            totalPriority -= priority;

            selectedHeroes = selectedHeroes.filter(selectedHero => selectedHero !== hero);
        } else {
            // Check if limits are exceeded
            if (draftedHeroesCount >= maxDraftedHeroes) {
                showAlert('You can only draft up to 5 heroes.');
                return;
            }
            if (totalCost + cost > maxTotalCost) {
                showAlert('Total cost cannot exceed 90.');
                return;
            }
            if (totalPriority + priority > maxTotalPriority) {
                showAlert('Total priority cannot exceed 30.');
                return;
            }

            // Select the card
            card.classList.add('selected');
            tickmark.classList.add("checkmark");
            draftedHeroesCount++;
            totalCost += cost;
            totalPriority += priority;

            selectedHeroes.push(hero);
        }

        // Update progress bars
        updateProgressBar(document.querySelector('.progress-bar-1'), draftedHeroesCount, maxDraftedHeroes);
        updateProgressBar(document.querySelector('.progress-bar-2'), totalCost, maxTotalCost);
        updateProgressBar(document.querySelector('.progress-bar-3'), totalPriority, maxTotalPriority);
    });

    container2.appendChild(card);
};

// Example hero data

// Create hero cards
goodHeroes.forEach(hero => createHeroCard(hero));

let container3 = document.querySelector(".container3");
let container4 = document.querySelector(".container4");

function createCard(hero) {
    let card = document.createElement("div");
    card.classList.add("card");
    const attack = Math.floor((hero.powerstats.combat + hero.powerstats.strength + hero.powerstats.power) / 30);
    const defense = Math.floor((hero.powerstats.intelligence + hero.powerstats.durability + hero.powerstats.speed) / 30);
    const priority = Math.floor((hero.appearance.height + hero.appearance.weight) / 50);
    const cost = Math.floor(attack + defense + priority);
    card.innerHTML = `
        <div class="item top ">
            <span class="gold">${hero.name}</span> <span class="circle">${cost}</span>
        </div>
        <div class="itemc">
            <img src="${hero.image.url}" alt="">
            <span>${hero.biography.alignment} ${hero.appearance.race}</span>
        </div>
        <div class="itemc bg-change">
            <div class="item">
                <span>intelligance</span><span>${hero.powerstats.intelligence}</span>
            </div>
            <div class="item">
                <span>durability</span><span>${hero.powerstats.durability}</span>
            </div>
            <div class="item">
                <span>speed</span><span>${hero.powerstats.speed}</span>
            </div>
            <div class="item">
                <span>Strenth</span><span>${hero.powerstats.strength}</span>
            </div>
            <div class="item">
                <span>Combat</span><span>${hero.powerstats.combat}</span>
            </div>
            <div class="item">
                <span>power</span><span>${hero.powerstats.power}</span>
            </div>
        </div>
        <div class="item top">
            <span>${priority}</span> <span>${attack}/${defense}</span>
        </div>
    `;
    container3.appendChild(card);
}

function Card(hero) {
    let card = document.createElement("div");
    card.classList.add("card");
    const attack = Math.floor((hero.powerstats.combat + hero.powerstats.strength + hero.powerstats.power) / 30);
    const defense = Math.floor((hero.powerstats.intelligence + hero.powerstats.durability + hero.powerstats.speed) / 30);
    const priority = Math.floor((hero.appearance.height + hero.appearance.weight) / 50);
    const cost = Math.floor(attack + defense + priority);
    card.innerHTML = `
        <div class="item top ">
            <span class="gold">${hero.name}</span> <span class="circle">${cost}</span>
        </div>
        <div class="itemc">
            <img src="${hero.image.url}" alt="">
            <span>${hero.biography.alignment} ${hero.appearance.race}</span>
        </div>
        <div class="itemc bg-change">
            <div class="item">
                <span>intelligance</span><span>${hero.powerstats.intelligence}</span>
            </div>
            <div class="item">
                <span>durability</span><span>${hero.powerstats.durability}</span>
            </div>
            <div class="item">
                <span>speed</span><span>${hero.powerstats.speed}</span>
            </div>
            <div class="item">
                <span>Strenth</span><span>${hero.powerstats.strength}</span>
            </div>
            <div class="item">
                <span>Combat</span><span>${hero.powerstats.combat}</span>
            </div>
            <div class="item">
                <span>power</span><span>${hero.powerstats.power}</span>
            </div>
        </div>
        <div class="item top">
            <span>${priority}</span> <span>${attack}/${defense}</span>
        </div>
    `;
    container4.appendChild(card);
}

document.querySelector(".battle-btn").addEventListener("click", function () {

    document.querySelector(".open-a-booster-pack").style.display = "none";
    document.querySelector(".progress").style.display = "none";
    document.querySelector(".container2").style.display = "none";
    document.querySelector(".start-battle").style.display = "flex";
    document.querySelector(".hero-section").style.display = "flex";
    document.querySelector(".villain-section").style.display = "flex";
    document.querySelector(".fight").style.display = "none";

    selectedHeroes.forEach(hero => {
        createCard(hero);
    });

    villain.forEach(hero => {

        Card(hero);
    });

});
// hall of fame
let halloffame = [];
let checkhall = [];
let container5 = document.querySelector(".container5");
function HalloffameCard(hero) {
    let card = document.createElement("div");
    card.classList.add("card");
    const attack = Math.floor((hero.powerstats.combat + hero.powerstats.strength + hero.powerstats.power) / 30);
    const defense = Math.floor((hero.powerstats.intelligence + hero.powerstats.durability + hero.powerstats.speed) / 30);
    const priority = Math.floor((hero.appearance.height + hero.appearance.weight) / 50);
    const cost = Math.floor(attack + defense + priority);
    card.innerHTML = `
            <div class="item top ">
                <span class="gold">${hero.name}</span> <span class="circle">${cost}</span>
            </div>
            <div class="itemc">
                <img src="${hero.image.url}" alt="">
                <p class="align-center">${hero.wins}</p>
                <span>${hero.biography.alignment} ${hero.appearance.race}</span>
            </div>
            <div class="itemc bg-change">
                <div class="item">
                    <span>intelligance</span><span>${hero.powerstats.intelligence}</span>
                </div>
                <div class="item">
                    <span>durability</span><span>${hero.powerstats.durability}</span>
                </div>
                <div class="item">
                    <span>speed</span><span>${hero.powerstats.speed}</span>
                </div>
                <div class="item">
                    <span>Strenth</span><span>${hero.powerstats.strength}</span>
                </div>
                <div class="item">
                    <span>Combat</span><span>${hero.powerstats.combat}</span>
                </div>
                <div class="item">
                    <span>power</span><span>${hero.powerstats.power}</span>
                </div>
            </div>
            <div class="item top">
                <span>${priority}</span> <span>${attack}/${defense}</span>
            </div>
        `;
    container5.appendChild(card);

}




document.querySelector(".fight-btn").addEventListener("click", function () {


    for (let i = 0; i < 5; i++) {
        let [heroattack, herodefence] = herodata(selectedHeroes[i]);
        let [villainattack, villaindefence] = herodata(villain[i]);
        let heroCard = container3.children[i];
        let villainCard = container4.children[i];

        if (heroattack > villaindefence && villainattack < herodefence) {
            addToHallOfFame(selectedHeroes[i]);
            villainCard.classList.add("bullar");
        } else if (heroattack < villaindefence && villainattack > herodefence) {
            addToHallOfFame(villain[i]);
            heroCard.classList.add("bullar");
        }
        else if (heroattack == villaindefence || villainattack == herodefence) {
            heroCard.classList.add("bullar");
            villainCard.classList.add("bullar");
        } else if (heroattack > villaindefence && villainattack > herodefence) {
            addToHallOfFame(selectedHeroes[i]);
            addToHallOfFame(villain[i]);   
        } else if (heroattack < villaindefence && villainattack < herodefence) {
            addToHallOfFame(selectedHeroes[i]);
            addToHallOfFame(villain[i]);
        } else {

        }

    }
})


function herodata(hero) {

    const attack = Math.floor((hero.powerstats.combat + hero.powerstats.strength + hero.powerstats.power) / 30)
    const defense = Math.floor((hero.powerstats.intelligence + hero.powerstats.durability + hero.powerstats.speed) / 30)
    const priority = Math.floor((hero.appearance.height + hero.appearance.weight) / 50);
    const cost = Math.floor(attack + defense + priority);
    return [attack, defense];
}


document.querySelector("#halloffame").addEventListener("click", function () {
    document.querySelector(".open-a-booster-pack").style.display = "none";
    document.querySelector(".progress").style.display = "none";
    document.querySelector(".container2").style.display = "none";
    document.querySelector(".start-battle").style.display = "none";
    document.querySelector(".hero-section").style.display = "none";
    document.querySelector(".villain-section").style.display = "none";
    document.querySelector(".fight").style.display = "flex";

    halloffame.sort((a, b) => b.wins - a.wins);
    halloffame.forEach(hero => {
        HalloffameCard(hero);
    })

})

function addToHallOfFame(hero) {
    const heroExists = halloffame.some(h => h.name === hero.name);
    if (!heroExists) {
        halloffame.push(hero);
       
    }
    else {
        hero.wins += 1;  
    }
}