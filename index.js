const mineflayer = require('mineflayer');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const bot = mineflayer.createBot({
  host: 'KRATOS_SMP.aternos.me',
  port: 25124,
  username: 'AgentTon'
});

bot.on('spawn', () => {
  console.log('Agent Ton spawn ho gaya hai!');
  setTimeout(() => {
    bot.chat('Hello everyone! Main aa gaya hoon.');
  }, 3000);
});

bot.on('chat', async (username, message) => {
  if (username === bot.username) return;
  
  console.log(`Chat aayi ${username} se: ${message}`);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Tum Minecraft mein ek player ho. Koi player agar kuch kahe toh uska chota aur mazedaar Roman Urdu mein jawab do. Player ka naam ${username} hai aur usne kaha: "${message}"`
    });

    const reply = response.text.trim().replace(/\n/g, ' ');
    bot.chat(reply);

  } catch (err) {
    console.error('AI Error Details:', err);
    bot.chat('Yar meri taraf se net ya AI ka masla ho gaya hai.');
  }
});
