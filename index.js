const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000;
//Setup for Socket IO
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
// const messages = [{ name: "Tony", message: "trying static" }, { name: "Magy", message: "messge 2" }]
const messages = []
app.get('/messages', (req, res) => {
    res.json(messages)
})
app.post('/messages', (req, res) => {
    const message = req.body
    messages.push(message)
    io.emit('message', message)
    res.status(200).send({ message: "success" })
})
io.on('connection', socket => {
    console.log(`${socket.id} has been connected`)
    socket.on('disconnect', () => {
        console.log(`${socket.id} has been disconnected`);
    });
})
const server = http.listen(PORT, () => console.log(`Server is now up on port ${server.address().port}`))