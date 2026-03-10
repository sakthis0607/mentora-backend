const rateLimit = require('express-rate-limit');

const llmLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,              // 5 requests per minute
  message: { msg: 'Too many requests, please try again after a minute.' }
});

module.exports = { llmLimiter };