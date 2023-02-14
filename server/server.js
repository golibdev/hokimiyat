const express = require('express');
const dotenv = require('dotenv');
const ngrok = require('ngrok')
const path = require('path')
const expressFileUpload = require('express-fileupload')
const cors = require('cors');
dotenv.config();
const { PORT } = require('./src/config');
const { connectedDB } = require('./src/config/db');
const errorHandler = require('./src/middlewares/error.middleware')
const app = express();

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressFileUpload())
app.use(express.static(path.join(__dirname, 'public')))

// Routing middleware
app.use('/api/v1', require('./src/routes'));

// error middleware
app.use(errorHandler);

app.listen(PORT, () => {
   connectedDB();
   console.log(`Server running on port: ${PORT}`);
})

ngrok.connect({
   proto: 'http',
   addr: process.env.PORT
}, (err, url) => {
   if (err) {
      console.error('Error while connecting Ngrok',err);
      return new Error('Ngrok Failed');
   }
})