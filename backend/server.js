const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/alumni', require('./routes/alumni'));
app.use('/api/alumni/reviews', require('./routes/reviews'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Backend running on ' + PORT));
