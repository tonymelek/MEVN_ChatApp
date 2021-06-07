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
const typers = []
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
    io.emit('socketId', socket.id)
    socket.on('typing', (data) => {
        if (data.message > 0) {
            if (typers.indexOf(data.name) === -1) typers.push(data.name)
        } else {
            if (typers.indexOf(data.name) !== -1) {
                let index = typers.indexOf(data.name);
                typers.splice(index, 1)
            }
        }
        socket.broadcast.emit('typingS', typers)
    })
    socket.on('disconnect', () => {
        console.log(`${socket.id} has been disconnected`);
    });
})
const server = http.listen(PORT, () => console.log(`Server is now up on port ${server.address().port}`))