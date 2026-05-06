let leadFormShown = false;

function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const message = input.value.toLowerCase().trim();

  if (!message) return;

  addUserMessage(input.value);

  if (message.includes("prijs")) {
    addBotMessage("Onze interventies starten vanaf €90. Voor een exacte prijs maken we graag een offerte.");
  } else if (message.includes("open") || message.includes("uren")) {
    addBotMessage("Wij zijn bereikbaar van maandag tot vrijdag van 8u tot 18u.");
  } else if (message.includes("regio") || message.includes("brussel") || message.includes("antwerpen")) {
    addBotMessage("Wij werken in Brussel, Antwerpen en omliggende gemeenten.");
  } else if (message.includes("offerte")) {
    addBotMessage("Prima, vul hieronder je gegevens in voor een offerte.");
    showLeadForm("offerte");
  } else if (message.includes("lek") || message.includes("dringend")) {
    addBotMessage("Dat klinkt dringend. Vul hieronder je gegevens in en we contacteren je zo snel mogelijk.");
    showLeadForm("dringend");
  } else {
    addBotMessage("Sorry, ik begrijp je nog niet helemaal. Vraag gerust naar prijs, openingsuren, regio, offerte of een dringend lek.");
  }

  input.value = "";
}

function addUserMessage(text) {
  const chatbox = document.getElementById("chatbox");
  const userDiv = document.createElement("div");
  userDiv.className = "user";
  userDiv.textContent = text;
  chatbox.appendChild(userDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function addBotMessage(text) {
  const chatbox = document.getElementById("chatbox");
  const botDiv = document.createElement("div");
  botDiv.className = "bot";
  botDiv.textContent = text;
  chatbox.appendChild(botDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function showLeadForm(type) {
  const chatbox = document.getElementById("chatbox");

  if (leadFormShown) return;
  leadFormShown = true;

  const formWrapper = document.createElement("div");
  formWrapper.className = "lead-form";
  formWrapper.innerHTML = `
    <input type="text" id="leadName" placeholder="Je naam">
    <input type="email" id="leadEmail" placeholder="Je e-mail">
    <input type="text" id="leadPhone" placeholder="Je telefoonnummer">
    <input type="text" id="leadPostcode" placeholder="Je postcode">
    <textarea id="leadMessage" placeholder="Korte beschrijving" rows="3"></textarea>
    <button onclick="submitLeadForm('${type}')">Verzend aanvraag</button>
  `;

  chatbox.appendChild(formWrapper);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function submitLeadForm(type) {
  const name = document.getElementById("leadName").value.trim();
  const email = document.getElementById("leadEmail").value.trim();
  const phone = document.getElementById("leadPhone").value.trim();
  const postcode = document.getElementById("leadPostcode").value.trim();
  const message = document.getElementById("leadMessage").value.trim();
  const chatbox = document.getElementById("chatbox");

  if (!name || !email || !phone) {
    addBotMessage("Vul minstens je naam, e-mail en telefoonnummer in.");
    return;
  }

  const leadData = {
    type,
    name,
    email,
    phone,
    postcode,
    message,
    date: new Date().toLocaleString()
  };

  let leads = JSON.parse(localStorage.getItem("chatbot_leads")) || [];
  leads.push(leadData);
  localStorage.setItem("chatbot_leads", JSON.stringify(leads));

  const success = document.createElement("div");
  success.className = "success-box";
  success.textContent = `Bedankt ${name}, je aanvraag is goed ontvangen. We nemen snel contact met je op.`;

  chatbox.appendChild(success);
  chatbox.scrollTop = chatbox.scrollHeight;

  leadFormShown = false;
}
