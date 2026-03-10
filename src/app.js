const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();  
connectDB();

const app = express();
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/students', require('./routes/students'));
app.use('/lessons', require('./routes/lessons'));
app.use('/bookings', require('./routes/bookings'));
app.use('/sessions', require('./routes/sessions'));
app.use('/llm', require('./routes/llm'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));