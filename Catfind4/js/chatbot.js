// chatbot.js
const GEMINI_API_KEY = "AIzaSyDNqo1YB--9cRnbnIhZdrpjtzExQow8940"; // 🔥 Replace with your Gemini API key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return;

    updateChatbox(`👤 You: ${userInput}`, "user");
    document.getElementById("userInput").value = "";

    try {
        updateChatbox('<img src="assets/loading.gif" alt="Loading..." class="loading">', "bot");

        // Construct the prompt
        const prompt = `${userInput}. Please answer briefly and understandably, focusing on the topic of cats.`;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            }),
        });

        console.log("Gemini API Response:", response);

        if (!response.ok) {
            throw new Error(`Gemini API error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Gemini API Data:", data);

        const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "🐾 Sorry, I don't have information on that.";

        const chatbox = document.getElementById("chatbox");
        if (chatbox && chatbox.lastChild && chatbox.lastChild.innerHTML.includes("loading.gif")) {
            chatbox.removeChild(chatbox.lastChild);
        }

        updateChatbox(`🤖 Chatbot: ${botReply}`, "bot");

    } catch (error) {
        console.error("Chatbot error:", error);
        const chatbox = document.getElementById("chatbox");
        if (chatbox && chatbox.lastChild && chatbox.lastChild.innerHTML.includes("loading.gif")) {
            chatbox.removeChild(chatbox.lastChild);
        }
        updateChatbox("⚠️ Error connecting to AI. Please try again later!", "bot");
    }
}

function updateChatbox(message, sender) {
    const chatbox = document.getElementById("chatbox");
    if (!chatbox) {
        console.error("Could not find #chatbox element");
        return;
    }
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = message;
    messageDiv.classList.add(sender);
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("userInput").addEventListener("keypress", handleKeyPress);
});