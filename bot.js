require("dotenv").config();
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

// Load credentials from .env
const apiId = Number(process.env.API_ID);
const apiHash = process.env.API_HASH;
const sessionString = process.env.SESSION_STRING; // Load saved session
const message = process.env.MESSAGE;

const client = new TelegramClient(new StringSession(sessionString), apiId, apiHash, {
    connectionRetries: 5,
});

// List of Telegram channels
const channelUsernames = [
    "@cognizant_exam_accenture_groups",
    "@infosys_cognizant_accenture_exam",
    "@accnture16AugustonCampus"
]; // Replace with actual channel usernames


async function startBot() {
    try {
        console.log("Starting Telegram client...");
        await client.connect(); // Connect without logging in

        if (!client.session) {
            console.log("Session expired or invalid. Please generate a new session string.");
            return;
        }

        console.log("Client connected successfully!");

        while (true) {
            for (const channel of channelUsernames) {
                try {
                    await client.sendMessage(channel, { message: message });
                    console.log(`Message sent to ${channel}`);
                } catch (error) {
                    console.error(`Error sending message to ${channel}:`, error);
                }
                await new Promise((resolve) => setTimeout(resolve, 20000)); // Wait 20 seconds
            }
        }
    } catch (error) {
        console.error("Error starting bot:", error);
    }
}

startBot();
