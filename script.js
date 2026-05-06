function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const message = input.value.toLowerCase().trim();

  if (!message) return;

  const userDiv = document.createElement("div");
  userDiv.className = "user";
  userDiv.textContent = input.value;
  chatbox.appendChild(userDiv);

  const botDiv = document.createElement("div");
  botDiv.className = "bot";

  if (message.includes("prijs")) {
    botDiv.textContent = "Onze interventies starten vanaf €90. Voor een exacte prijs maken we graag een offerte.";
  } else if (message.includes("open") || message.includes("uren")) {
    botDiv.textContent = "Wij zijn bereikbaar van maandag tot vrijdag van 8u tot 18u.";
  } else if (message.includes("regio") || message.includes("brussel") || message.includes("antwerpen")) {
    botDiv.textContent = "Wij werken in Brussel, Antwerpen en omliggende gemeenten.";
  } else if (message.includes("offerte")) {
    botDiv.textContent = "Natuurlijk. Stuur ons je naam, telefoonnummer en een korte beschrijving van de werken.";
  } else if (message.includes("lek") || message.includes("dringend")) {
    botDiv.textContent = "Bij een dringend lek noteer ik best je telefoonnummer en postcode zodat we je snel kunnen contacteren.";
  } else {
    botDiv.textContent = "Sorry, ik begrijp je nog niet helemaal. Vraag gerust naar prijs, openingsuren, regio, offerte of een dringend lek.";
  }

  chatbox.appendChild(botDiv);
  input.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;
}
