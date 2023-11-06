


// Section - Historik
const myHistorical = document.getElementById("historik")



// En funktion, der returnerer en farve baseret på et givet tal (number).
const getHistoricalColor = (number) => {
  let color;

  switch (true) {
    case number <= 0.2:
      color = '#00ff6a';
      break;
    case number <= 0.4:
      color = '#68CC31';
      break;
    case number <= 0.6:
      color = '#FFC400';
      break;
    case number <= 0.8:
      color = '#FF8A00';
      break;
      case number > 1.0:
      color = '#FF1900';
      break;
    default:
      color = '#FF1900';
  }

  // Returnerer en CSS-streng med den valgte farve.
  return `color: ${color};`;
};

// En funktion, der henter elprisdata fra en ekstern kilde.
function fetchHistoricalPrices() {

  const dateInput = document.getElementById("pickdate");
  if (!dateInput) {
    console.error("Date input ikke fundet");
    return;
  }
  
  const textdate = dateInput.value;

  const [selectedYear, selectedMonth, selectedDay] = textdate.split("-");
  const URL = `https://www.elprisenligenu.dk/api/v1/prices/${selectedYear}/${selectedMonth}-${selectedDay}_DK1.json`;


  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      displayHistoricalPrices(data);
      console.log(data);
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

// Funktionen pickDate initialiserer datofeltet og henter historiske priser for den aktuelle dato.
function pickDate() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const currentFormattedDate = `${currentYear}-${currentMonth < 10 ? "0" : ""}${currentMonth}-${currentDay < 10 ? "0" : ""}${currentDay}`;

  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    dateInput.value = currentFormattedDate;
    dateInput.max = currentFormattedDate;
  } else {
    console.error("Date input ikke fundet");
  }

  fetchHistoricalPrices(currentFormattedDate);
}

// Funktionen displayHistoricalPrices viser de hentede historiske priser på siden.
function displayHistoricalPrices(data) {
  const ListPrices = document.getElementById("historikprices");
  if (!ListPrices) {
    console.error("ListPrices ikke fundet");
    return;
  }

  let priceHTML = "";

  for (let hour = 0; hour < data.length; hour++) {
    const price = Math.round(data[hour].DKK_per_kWh * 1000) / 1000;
    const currentHour = hour < 10 ? `0${hour}` : `${hour}`;
    const priceColorStyle = getHistoricalColor(price);

    priceHTML += `<li>
      <p class="time">kl. ${currentHour}:00</p>
      <p class="price" style="${priceColorStyle}">${price} kr</p>
    </li><br>`;
  }

  ListPrices.innerHTML = priceHTML;
}


// Funktionen setTodaysDate indstiller teksten til at vise dagens dato i et HTML-element med id "textdate".
function setTodaysDate() {
  const textDate = document.getElementById("textdate");
  if (textDate) {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    textDate.textContent = `Elpriserne d. ${formattedDate}`;
  }
}

// Lytter efter, at siden er fuldt indlæst, og kalder setTodaysDate for at vise dagens dato.
window.addEventListener("load", setTodaysDate)

// Lytter efter, at DOM'en er klar, og udfører initialisering af datovisning og hentning af historiske priser ved interaktion med datofeltet.
document.addEventListener("DOMContentLoaded", function () {
  pickDate();

  const dateInput = document.getElementById("pickdate");
  const textdateDiv = document.getElementById("textdate");

  if (dateInput) {
    dateInput.addEventListener("change", function() {
      const textdate = dateInput.value;
      const [year, month, day] = textdate.split("-");
      const danishDate = `${day}-${month}-${year}`;
      textdateDiv.textContent = `Valgt Dato: ${danishDate}`;
      fetchHistoricalPrices();
    });
  } else {
    console.error("Date input element not found.");
  }
});

