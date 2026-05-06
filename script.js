let leadFormShown = false;

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();

  if (!message) return;

  addUserMessage(message);

  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("offerte")) {
    addBotMessage("Prima, vul hieronder je gegevens in voor een offerte.");
    showLeadForm("offerte");
  } else if (lowerMessage.includes("lek") || lowerMessage.includes("dringend")) {
    addBotMessage("Dat klinkt dringend. Vul hieronder je gegevens in en we contacteren je zo snel mogelijk.");
    showLeadForm("dringend");
  } else {
    addBotMessage("Even nadenken...");

    const reply = await getAIReply(message);
    replaceLastBotMessage(reply);
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

function replaceLastBotMessage(text) {
  const botMessages = document.querySelectorAll(".bot");
  if (botMessages.length > 0) {
    botMessages[botMessages.length - 1].textContent = text;
  }
}

async function getAIReply(message) {
  try {
    const response = await fetch("JOUW_WORKER_URL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    return data.reply || "Geen antwoord ontvangen van de AI.";
  } catch (error) {
    return "Er ging iets mis bij het verbinden met de AI.";
  }
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
