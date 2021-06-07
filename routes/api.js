const router = require("express").Router();
const Message = require('../db/model/messages');
const messages = []

router.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) return res.status(500).send({ message: "error" })
        res.json(messages)
    })

})
router.post('/messages', (req, res) => {
    const message = new Message(req.body)
    message.save(err => {
        if (err) return res.status(500).send({ message: "error" })
        // messages.push(message)
        io.emit('message', message)
        res.status(200).send({ message: "success" })
    })

})


module.exports = router;