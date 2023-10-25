// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")
const envPath = path.resolve(__dirname, '..','config', 'dev.env');
const result = dotenv.config({path : envPath})
if (result.error) {
    throw result.error;
  }

module.exports =mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server
    })
    .catch((err) => console.error('Error connecting to MongoDB:', err));