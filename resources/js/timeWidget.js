const endOfSem = new Date("12/22/2022");
const endTime = endOfSem.getTime();


function timeUntil(currTime) {

    // Convert milliseonds to seconds
    let timeDiff = (endTime - currTime) / 1000;

    // Calculate days, hours, minutes, seconds
    let days = Math.floor(timeDiff / 86400);
    timeDiff -= (86400 * days);

    let hours = Math.floor(timeDiff / 3600) % 24;
    timeDiff -= (3600 * hours);

    let mins = Math.floor(timeDiff / 60) % 60;
    timeDiff -= (60 * mins);

    let seconds = Math.floor(timeDiff % 60);

    return {
        days: days,
        hours: hours,
        minutes: mins,
        seconds: seconds
    };
}

function main() {
    
    // Get current time in milliseconds
    const today = new Date();
    const currTime = today.getTime();

    // Get time difference in correct format
    const { days, hours, minutes, seconds } = timeUntil(currTime);

    // Find element we will populate
    const timeRemaining = document.getElementById("timeResult");

    timeRemaining.innerText = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}

// Set an interval so that the time remaining is updated every second
const myInterval = setInterval(main, 1000);