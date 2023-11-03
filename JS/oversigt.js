

// Section - Lige nu
const myApp = document.getElementById("oversigt")


// Funktion til at bestemme farver baseret på prisen
const getColor = (number) => {

  if (number <= 0.2) {
    return 'color: #68CC31;'; // Lime Green
  } else if (number <= 0.4) {
    return 'color: #FFC400;'; // Mikado Yellow
  } else if (number <= 0.6) {
    return 'color: #FF8A00;'; // Dark Orange (Web)
  } else if (number > 0.8) {
    return 'color: #FF1900;'; // Candy Apple Red 
  } else {
    return 'color: #CC1400;'; // Engineering Orange
  }
}


// Hent aktuelt år, måned og dag
let currentYear = new Date().getFullYear();
let currentMonth = new Date().toLocaleDateString(undefined, {
    month: "2-digit"
})
let currentDay  = new Date().toLocaleDateString(undefined, {
  day: "2-digit",
}).replace(".", "")


// Funktion til at hente elpriser fra en ekstern kilde
function fetchOverviewPrices() {

    const URL = `https://www.elprisenligenu.dk/api/v1/prices/${currentYear}/${currentMonth}-${currentDay}_DK1.json`;
  
  
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        lowHighData(data);
        OverviewListPrice(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error", err);
      });
}

// Kald funktionen til at hente elpriser
fetchOverviewPrices()


// Funktion til at finde og vise laveste og højeste priser
const lowHighData = (data) => {
  const lowPrice = document.getElementById("lowcontent");
  const highPrice = document.getElementById("highcontent");

  console.log("Todays Data", data)
  console.log(lowPrice, highPrice);

  let minPrice = Number.MAX_VALUE;
  let maxPrice = -1;

  console.log(minPrice, maxPrice);

  data.forEach((hour) => {
    const price = hour.DKK_per_kWh;

    if (price < minPrice) {
      minPrice = price;
    }

    if (price > maxPrice) {
      maxPrice = price;
    }
  });

  // Vis de laveste og højeste priser i HTML-elementerne
  lowPrice.innerHTML += `<h4 id="h4">${minPrice.toFixed(3)}<p>KR</p></h4>
    <h5>PR. KWH</h5>`;
  
  highPrice.innerHTML += `<h4 id="h4">${maxPrice.toFixed(3)}<p>KR</p></h4>
    <h5>PR. KWH</h5>`;

 
  console.log(highPrice.innerHTML);

}

// Funktion til at oprette en liste over elpriser
const OverviewListPrice = (data) => {
  const ListPrices = document.getElementById('prices')

  let priceHTML = "";

  for (let hour = 0; hour < data.length; hour++) {
    const price = Math.round(data[hour].DKK_per_kWh * 1000) / 1000;
    const currentHour = hour < 10 ? `0${hour}` : `${hour}`;
    const priceColorStyle = getColor(price);

    // Opret HTML for hver time og pris og tilføj til priceHTML
    priceHTML += `<li>
        <p class="time">kl. ${currentHour}:00</p>
        <p class="price" style="${priceColorStyle}">kl ${price} kr</p>
      </li><br>`;
    }

    // Opdater listen over priser i HTML
    ListPrices.innerHTML = priceHTML

} 