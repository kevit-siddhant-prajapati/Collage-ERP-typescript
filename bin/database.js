var mongoose = require('mongoose');
module.exports = mongoose.connect('mongodb://localhost:27017/Collage-ERP', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    console.log('Connected to MongoDB');
    // Start the server
})
    .catch(function (err) { return console.error('Error connecting to MongoDB:', err); });
