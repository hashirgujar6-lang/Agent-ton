const mineflayer = require('mineflayer');
const { GoogleGenAI } = require('@google/genai');

// API key ab Render ke environment variable se uthegi
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const bot = mineflayer.createBot({
  host: 'KRATOS_SMP.aternos.me',
  port: 25124,
  username: 'AgentTon'
});

bot.on('spawn', () => {
  console.log('Agent Ton Kratos SMP mein enter ho gaya hai!');
  bot.chat('Hello everyone! Main Agent Ton hoon.');
});

bot.on('chat', async (username, message) => {
  if (username === bot.username) return;
  
  console.log(`${username}: ${message}`);

  try {
    const prompt = `Tum Minecraft ke andar ek independent player ho jiska naam 'AgentTon' hai. Tumhein ek Aternos SMP server par ek real player ki tarah rehna hai. Tum har language (Roman Urdu, English, Urdu) samajhte ho aur waise hi chote, mazedaar aur natural andaz mein jawab dete ho. Koi lamba bhashan nahi dena, bas ek normal player ki tarah baat karni hai.
    
    Player ${username} ne tumse kaha hai: "${message}"
    
    Tumhara chota aur smart jawab kya hoga?`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let reply = response.text.trim();
    
    if (reply.length > 100) {
      reply = reply.substring(0, 100) + '...';
    }

    bot.chat(reply);

  } catch (error) {
    console.error('AI Error:', error);
    bot.chat(`Acha ${username}, mujhe samajh nahi aaya.`);
  }
});
