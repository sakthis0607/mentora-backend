const OpenAI = require('openai');
require('dotenv').config();

async function test() {
  try {
    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1", 
    });

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // Updated to the newest active model
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Say hello in one sentence" }
      ],
    });

    console.log('SUCCESS:', response.choices[0].message.content);
  } catch (err) {
    console.log('ERROR:', err.message);
  }
}

test();