const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// config env variables
dotenv.config();

//middleware    
app.use(express.json());

// Route middleware
app.use('/api/user/', authRoute);
app.use('/api/posts', postRoute);
// run the server
const port = process.env.SERVER_PORT
app.listen(port, () => console.log('Server is running ...at ' + port));



// connect MongoDb
const connectionString = process.env.MONGO_DB_URL;
const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0,
    useNewUrlParser: true
}

const connectWithRetry = () => {
    console.log('Connection MongoDB... ');
    console.log('connectionString ' + connectionString);
    mongoose.connect(connectionString, options).then(() => {
        console.log('MongoDB is connected.')
    }).catch(err => {
        console.log('Connection unsuccessful, will retry after 5 seconds...')
        setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry();
// end of Mongo DB connection settings