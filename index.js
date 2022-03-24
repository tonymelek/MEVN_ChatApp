const express = require('express')
const path = require('path')
const app = express()
const cors= require('cors');
const PORT = process.env.PORT || 5000;
//Setup for Socket IO
const http = require('http').Server(app);
global.io = require('socket.io')(http,{
    cors:{
        origin:'*'
    }
});
app.use(cors());

app.use(express.json())

// routes
app.use(require("./routes/api.js"));

require('./routes/socket')
const server = http.listen(PORT, () => console.log(`Server is now up on port ${server.address().port}`))