function formatTime(time: number): string {
  let date = new Date(time);
  let years = date.getFullYear();
  let months = date.getMonth() + 1;
  let days = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let formatTime = `${years}-${addZero(months)}-${addZero(days)} ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;

  return formatTime;
}

function addZero(num: number): string {
  return num < 10 ? '0' + num : num.toString();
}

function getTime(time: { value: number, type: string}): number {
    let { value, type } = time;
    let timeValue = 0;
    switch (type) {
        case 'day':
            timeValue = value * 24 * 60 * 60 * 1000;
            break;
        case 'hour':
            timeValue = value * 60 * 60 * 1000;
            break;
        case 'minute':
            timeValue = value * 60 * 1000;
            break;
    }
    
    return timeValue;
}

function setLevel(level, experience, value) {
    let levelValue = level;
    let experienceValue = experience + value;
    let levelExperience = {
        1: 100,
        2: 300,
        3: 900,
        4: 2700,
        5: 2700,
        6: 2700,
        7: 2700,
        8: 2700,
        9: 2700,
    }
    let nExperience = levelExperience[levelValue];
    if (experienceValue >= nExperience) {
        levelValue += 1;
        experienceValue = experienceValue - nExperience;
    }

    return {
        level: levelValue,
        experience: experienceValue
    }
}

function randomBoolean(level: number = 1) {
    let num = Math.random() * 10;
    return level > num;
}

function randomValue(quota: number = 10) {
    let num = Math.round(Math.random() * 10);
    return num * quota;
}

function setPersonalData(personalData, params) {
    let { price = 0, food = 0, mood = 0, satiation = 0, num = 0, time = 0 } = params;

    personalData.liabilities.money -= price * num;
    personalData.time += getTime(time);
    personalData.food += food * num;
    personalData.mood += mood * num;
    personalData.satiation += satiation * num;
    
    return personalData
}

function enoughMoney(personalData, params) {
    let { price = 0, num = 0 } = params;
    return personalData.liabilities.money >= price * num;
}

export {
    formatTime,
    getTime,
    setLevel,
    randomBoolean,
    randomValue,
    setPersonalData,
    enoughMoney
}