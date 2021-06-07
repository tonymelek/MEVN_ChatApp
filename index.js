const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 5000;
//Setup for Socket IO
const http = require('http').Server(app)
global.io = require('socket.io')(http)


const dbUrl = `mongodb+srv://chatsAdmin:chatsAdmin@cluster0.yjwh0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, err => {
    console.log('connected to db', err);
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
// routes
app.use(require("./routes/api.js"));

require('./routes/socket')
const server = http.listen(PORT, () => console.log(`Server is now up on port ${server.address().port}`))