const urlWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=d4b9e3cf3354c90bf920e2c3dba024bf&units=metric&lang=ca'
const urlJokes = 'https://icanhazdadjoke.com';
const urlJokes2 = 'https://v2.jokeapi.dev/joke/Any?type=single';

const weatherIcon = document.querySelector('.wi')!;
const displayTemp = document.querySelector('.displayTemp')!;
const displayJoke = document.querySelector('.displayJoke')!;
const buttonScore1 = document.querySelector('.score1')!;
const buttonScore2 = document.querySelector('.score2')!;
const buttonScore3 = document.querySelector('.score3')!;
const buttonJoke = document.querySelector('.buttonJoke')!;

let puntuacio: number;
let currentJokeIndex: number;

let reportAcudits: {
    joke: string,
    score: number,
    date: string,
}[] = [];

getJoke();
// Botó obtenir nova broma
buttonJoke.addEventListener('click', function (){
    getJoke();
})
// Mostra l'icona de l'estat del temps i la temperatura
getWeather();

async function getJoke(){
    const request = new Request (Math.random() < 0.5 ? urlJokes : urlJokes2, {
        headers: {
            'Accept': 'application/json'
        }
    })
    const response = await fetch (request);
    const data = await response.json();
    console.log(data.joke);
    displayJoke.textContent = `\"${data.joke}\"`;

    //Guardem la broma en l'array reportAcudits si no hi és
    const jaHies = reportAcudits.findIndex((acudit) => acudit.joke === data.joke)
    if (jaHies != -1) {
        currentJokeIndex = jaHies;
        console.log(`L'acudit ja estava guardat a la array reportAcudits`);
    } else {
        afegirAcudit(data.joke);
    }
    console.log(reportAcudits);
}

// ⚠️ falta generalitzar botons puntuació
buttonScore1.addEventListener('click', function(){
    reportAcudits[currentJokeIndex].score = 1;
    console.log(`S'ha afegit la puntuació a la broma actual: ${reportAcudits[currentJokeIndex].score}`);
    console.log(reportAcudits);
})
buttonScore2.addEventListener('click', function(){
    reportAcudits[currentJokeIndex].score = 2;
    console.log(`S'ha afegit la puntuació a la broma actual: ${reportAcudits[currentJokeIndex].score}`);
    console.log(reportAcudits);
})
buttonScore3.addEventListener('click', function(){
    reportAcudits[currentJokeIndex].score = 3;
    console.log(`S'ha afegit la puntuació a la broma actual: ${reportAcudits[currentJokeIndex].score}`);
    console.log(reportAcudits);
})


// Afegeix un acudit a l'array reportAcudits amb la data actual i puntuació 0 (⚠️0 conta com a no puntuació)
function afegirAcudit(acudit: string): void {
    const date = new Date();
    let dateISO = date.toISOString();
    reportAcudits.push({joke: `${acudit}`,score: 0, date: dateISO});
    currentJokeIndex = reportAcudits.length -1;
    console.log(`Current joke: ${currentJokeIndex}`);
}

async function getWeather(){
    const options = {};
    const request = new Request (urlWeather, options)
    const response = await fetch (request);
    const data = await response.json();
    console.log(data);

    const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconURL);
    displayTemp.textContent = `${Math.round(data.main.temp*10)/10} ºC`;
    // displayWeather.textContent = `Avui: ${data.weather[0].description}`;
}


