const mongoose = require('mongoose')


module.exports =mongoose.connect('mongodb://localhost:27017/Collage-ERP', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server
    })
    .catch((err) => console.error('Error connecting to MongoDB:', err));