const events=require('./json/events.json');

io.on('connection', socket => {
    console.log(`${socket.id} has been connected`)
    io.emit('socketId', socket.id)
    socket.on('triggerEvent', event => {
        events[event.id]=event;
        socket.broadcast.emit('eventTriggered', event)
        console.log(socket.id);
    })
    socket.on('acknowledgeEvent',event=>{
        events[event.id]=event;
        socket.broadcast.emit('eventAcknowledged', event)
    })
    socket.on('disconnect', () => {
        console.log(`${socket.id} has been disconnected`);
    });
})