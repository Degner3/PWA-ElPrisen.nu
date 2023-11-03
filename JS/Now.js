


// variabler
//  const apiUrl = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${priceClass}.json`
// const urlTest = 'https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK1.json'





let apiUrl = "";

// Section - Lige nu
const myApp = document.getElementById("ligenu")

// Vent på, at siden er fuldt indlæst, og kald initApp-funktionen
window.addEventListener("load", initApp);

function initApp() {
  // Kald funktionen for at hente dagens data fra API'en
  fetchDataToday();
  // Kald funktionen for at oprette HTML-elementer og siden
  nowpage();

  // Opdater dataen med det samme
  updateData();

  // Indstil interval for at opdatere data
  setInterval(updateData, updateInterval)
}

// Hent det aktuelle år, måned og dag
let currentYear = new Date().getFullYear();
let currentMonth = new Date().toLocaleDateString(undefined, {
    month: "2-digit"
})
let currentDay  = new Date().toLocaleDateString(undefined, {
  day: "2-digit",
}).replace(".", "")

// console.log(currentDay, currentMonth);



// Hent data for i dag fra API'en
const fetchDataToday = () => {
  let apiUrl = `https://www.elprisenligenu.dk/api/v1/prices/${currentYear}/${currentMonth}-${currentDay}_DK2.json`

  fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    showToday(data);
  })
  .catch((err) => {
    console.error("Error", err.message);
  })
}



// Vis dataen for i dag
function showToday(data) {
  const priscontent = document.getElementById("priscontent");
  const currenttime = document.getElementById("currenttime");

  let currentHours = new Date().getHours();
  let currentSecendHours = new Date().getHours() + 1;
  console.log("Todays Data", data);

  // Opdater prisindhold med aktuel pris og tidspunkt
  priscontent.innerHTML += `<h4>${Math.round(data[currentHours].DKK_per_kWh * 1000) / 1000}<p>KR</p></h4>
    <h5>PR. KWH</h5>`;
  
  console.log(currenttime);

  // Opdater tidspunktet
  currenttime.innerHTML += `
    ${new Date(data[currentHours].time_start).toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit"
    }).replace(".", ":")} - ${new Date(data[currentHours].time_end).toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit"
    }).replace(".", ":")}
  `;
  
}

// Indstil intervallet for opdatering til 10 minutter
const updateInterval = 10 * 60 * 1000;

// Funktion til at opdatere data
const updateData = () => {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      showToday(data);
    })
    .catch((err) => {
      console.log("Error", err.message);
    });
};



// HTML-oprettelse
const nowpage = () => {

  let gearLink = document.createElement('a');
  gearLink.classList.add('settinglink');
  gearLink.href = "/settings.html";

  let gearIcon = document.createElement("i");
  gearIcon.className = "fa-solid fa-gear";

  let h1 = document.createElement("h1");
  h1.textContent = "Elprisen lige nu";

  let bigcircle = document.createElement('div');
  bigcircle.classList.add('bigcircle');

  let midcircle = document.createElement('div');
  midcircle.classList.add('midcircle');

  let priscontent = document.createElement('div');
  priscontent.id = "priscontent";
  // priscontent.classList.add('priscontent');

  let currenttime = document.createElement('p');
  currenttime.id = "currenttime";
  // currenttime.classList.add('currenttime');


  myApp.appendChild(gearLink);
  gearLink.appendChild(gearIcon);
  myApp.appendChild(h1);
  myApp.appendChild(bigcircle);
  bigcircle.appendChild(midcircle);
  midcircle.appendChild(priscontent);
  myApp.appendChild(currenttime);

}


