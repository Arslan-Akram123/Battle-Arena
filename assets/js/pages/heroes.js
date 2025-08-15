
import _heroData from "../data/heroes.js";

let container = document.querySelector(".container");

function initHeroesSection() {
    _heroData.forEach(hero => {
        createHeroCard(hero);
    });
}

function createHeroCard(hero) {
    hero.wins=1;
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
    container.appendChild(card);
}

function filterAndSortHeroes() {
    let inputdata = document.getElementById("inputdata").value.toLowerCase();
    let race = document.getElementById("selectracedata").value;
    let gooddata = document.getElementById("gooddata");
    let baddata = document.getElementById("baddata");
    let neutraldata = document.getElementById("neutraldata");
    let orderby = document.getElementById("oderbydata").value;
    let sortorder = document.getElementById("sortdata").value;

    let filteredData = _heroData.filter(hero => {
        return hero.name.toLowerCase().includes(inputdata) &&
            (race === "" || hero.appearance.race.includes(race)) &&
            ((gooddata.checked && hero.biography.alignment.includes(gooddata.value)) ||
            (baddata.checked && hero.biography.alignment.includes(baddata.value)) ||
            (neutraldata.checked && hero.biography.alignment.includes(neutraldata.value)) ||
            (!gooddata.checked && !baddata.checked && !neutraldata.checked));
    });

    function sortHeroes(a, b) {
        if (orderby === "id") {
            return sortorder === "asc" ? a.id - b.id : b.id - a.id;
        } else if (orderby === "name") {
            return sortorder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (orderby === "race") {
            return sortorder === "asc" ? a.appearance.race.localeCompare(b.appearance.race) : b.appearance.race.localeCompare(a.appearance.race);
        } else if (orderby === "alignment") {
            return sortorder === "asc" ? a.biography.alignment.localeCompare(b.biography.alignment) : b.biography.alignment.localeCompare(a.biography.alignment);
        } else if (orderby === "cost") {
            const costA = Math.floor((a.powerstats.combat + a.powerstats.strength + a.powerstats.power) / 30) +
                          Math.floor((a.powerstats.intelligence + a.powerstats.durability + a.powerstats.speed) / 30) +
                          Math.floor((a.appearance.height + a.appearance.weight) / 50);
            const costB = Math.floor((b.powerstats.combat + b.powerstats.strength + b.powerstats.power) / 30) +
                          Math.floor((b.powerstats.intelligence + b.powerstats.durability + b.powerstats.speed) / 30) +
                          Math.floor((b.appearance.height + b.appearance.weight) / 50);
            return sortorder === "asc" ? costA - costB : costB - costA;
        } else if (orderby === "priority") {
            const priorityA = Math.floor((a.appearance.height + a.appearance.weight) / 50);
            const priorityB = Math.floor((b.appearance.height + b.appearance.weight) / 50);
            return sortorder === "asc" ? priorityA - priorityB : priorityB - priorityA;
        }
        return 0;
    }

    filteredData.sort(sortHeroes);

    container.innerHTML = "";
    filteredData.forEach(hero => createHeroCard(hero));
}

document.getElementById("inputdata").addEventListener("input", filterAndSortHeroes);
document.getElementById("btnsubmit").addEventListener("click", function(e) {
    e.preventDefault();
    filterAndSortHeroes();
});
initHeroesSection();

 
 function filterHeroes(e) {
     
     
 }


//  your functions
document.getElementById("heroes").addEventListener("click",function(){
    location.reload();
    document.querySelector(".heroes").style.display="flex";
    document.querySelector(".Go-to-arena").style.display = "none";
})