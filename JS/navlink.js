

// Hent alle links af elementer med klassen "nav"
const links = document.querySelectorAll(".nav a");

// Hent den aktuelle URL fra webbrowseren
const currentURL = window.location.href;

// Gennemgå hver link i NodeListen
links.forEach(link => {
  if (link.href === currentURL) {
    link.style.color = "var(--green)";
  }

});


