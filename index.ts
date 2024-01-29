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
const blobSecundari = document.querySelector('.blobSecundari')!;
const blobSecundari2 = document.querySelector('.blobSecundari2')!;

let puntuacio: number;
let currentJokeIndex: number;

let reportAcudits: {
    joke: string,
    score: number,
    date: string,
}[] = [];

setBlob();
getWeather();
getJoke();
// Botó obtenir nova broma
buttonJoke.addEventListener('click', function (){
    getJoke();
})

async function getJoke(){
    // Cridem un dels dos APIS de bromes de manera aleatoria
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
// Defineix el 'blob' del fons seleccionnant dels 6 disponibles
//⚠️ falta refactoritzar i simplificar
function setBlob(){
    let blobs = [1,2,3,4,5,6];
    let blobPrimari = blobs[Math.floor(Math.random()*6)];
    console.log(blobPrimari);
    let urlBlob = `./images/blob${blobPrimari}.png`
    document.body.style.backgroundImage = `url(${urlBlob})`;
    //Eliminem de l'array d'opcions el blob primari perquè no es repeteixin
    blobs.splice(blobPrimari-1, 1);
    console.log(`Array blobs: ${blobs}`);
    let blobSec = blobs[Math.floor(Math.random()*6)];
    blobSecundari.setAttribute('src', `./images/blob${blobSec}.png`);
    //Eliminem de l'array d'opcions el blob 2 i generem el 3
    blobs.splice(blobPrimari-1, 1);
    console.log(`Array blobs: ${blobs}`);
    let blobSec2 = blobs[Math.floor(Math.random()*6)];
    blobSecundari2.setAttribute('src', `./images/blob${blobSec2}.png`);
}

// Mostra l'icona de l'estat del temps i la temperatura
async function getWeather(){
    const options = {};
    const request = new Request (urlWeather, options)
    const response = await fetch (request);
    const data = await response.json();
    console.log(data);
    
    const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('alt', data.weather[0].description);
    weatherIcon.setAttribute('src', iconURL);
    displayTemp.textContent = `${Math.round(data.main.temp*10)/10} ºC`;
}


