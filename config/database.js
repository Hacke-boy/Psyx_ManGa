const mongoose = require('mongoose');

const dbURI = 'your_mongodb_connection_string'; // Replace with your actual MongoDB connection string

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error: ', err));
