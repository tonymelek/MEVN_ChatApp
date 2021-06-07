const typers = []
io.on('connection', socket => {
    console.log(`${socket.id} has been connected`)
    io.emit('socketId', socket.id)
    socket.on('typing', (data) => {
        let index = typers.indexOf(data.name)
        if (data.message > 0) {
            if (index === -1) typers.push(data.name)
        } else {
            if (index !== -1) typers.splice(index, 1)
        }
        socket.broadcast.emit('typingS', typers)
    })
    socket.on('disconnect', () => {
        console.log(`${socket.id} has been disconnected`);
    });
})