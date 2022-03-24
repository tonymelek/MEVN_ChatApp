const router = require("express").Router();


router.get('/events', (req, res) => {
    const events=require('./json/events.json');
    res.send(events);
})
router.post('/messages', (req, res) => {
    // const message = new Message(req.body)
    // message.save(err => {
    //     if (err) return res.status(500).send({ message: "error" })
    //     // messages.push(message)
    //     io.emit('message', message)
    //     res.status(200).send({ message: "success" })
    // })

})


module.exports = router;