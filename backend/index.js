require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8000;
const cors = require("cors");
const db = require('./config/mongoose');
const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'], forceNER: true });



app.use(cors());
const corsOptions = {
    origin: "*", // Allow only requests from this domain
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// Middleware to parse JSON request bodies
app.use(express.json());

// Set routes
app.use('/', require('./router'));
app.use('/todo', require('./router/todo'));
app.use('/alarm', require('./router/alarm'));

//SetIp Exprees server
app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});
