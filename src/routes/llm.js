const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const rateLimit = require('express-rate-limit');

const llmLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { msg: 'Too many requests, please try again after a minute.' }
});

// Initialize the client pointing to Groq
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

router.post('/summarize', llmLimiter, async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '')
    return res.status(400).json({ msg: 'text is required and cannot be empty.' });
  if (text.length < 50)
    return res.status(400).json({ msg: 'text is too short. Minimum 50 characters.' });
  if (text.length > 10000)
    return res.status(413).json({ msg: 'text is too large. Maximum 10,000 characters.' });

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { 
          role: "system", 
          content: "Summarize the following text in 3 to 6 concise bullet points.\nReturn only the bullet points, no intro or extra commentary." 
        },
        { 
          role: "user", 
          content: `Text:\n${text}` 
        }
      ],
    });

    const summary = response.choices[0].message.content;

res.json({ summary, model: 'llama-3.1-8b-instant (via Groq)' });  } catch (err) {
    console.error('Groq error:', err);
    res.status(502).json({ msg: 'LLM service failed. Please try again later.' });
  }
});

module.exports = router;