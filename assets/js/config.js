const _configSettings = {
    "selection": 70, // max amount random chosen heroes to show on the All heroes page and to choose from to make a booster pack, be sure that the selection is a least 2 times the amount of heroes in a booster pack
    "booster": 15, // amount of random chosen heroes in a booster pack , this value must be less or equal half the size of the selection
    "amount": 5, // amount of heroes that can be chosen from a booster pack, must be less than amount of heroes in the booster setting
    "hallOfFame": 10, // max amount of heroes in the hall of fame,
    "totalCost": 90, // total cost of heroes that can be chosen from a booster pack
    "totalPriority": 30,  // total priority of heroes that can be chosen from a booster pack 
};


function getConfigAmount(){
    return _configSettings.amount;
}

function getConfigTotalCost(){
    return _configSettings.totalCost;
}

function getConfigTotalPriority(){
    return _configSettings.totalPriority;
}


function getConfigSelection(){
    return _configSettings.selection;
}

function getConfigBooster(){
    return _configSettings.booster;
}

function getConfigHallOfFame(){
    return _configSettings.hallOfFame;
}


/* your functions */

export default _configSettings;
