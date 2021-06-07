const socket = io()

const app = {
    data() {
        return {
            stock: [],
            messages: [],
            name: '',
            message: '',
            typingS: '',
            index: 0,
            disable: false
        }
    },
    created() {
        axios('http://localhost:5000/messages')
            // .then(res => res.json())
            .then(res => this.messages = res.data)
            .catch(err => console.log(err))

        socket.on('message', message => this.messages.push(message))
        socket.on('typingS', typers => {
            let index = typers.indexOf(this.name)
            if (index !== -1) {
                typers.splice(index, 1)
            }
            if (typers.length === 0) return this.typingS = ''
            this.typingS = `${typers.join(',')} ${typers.length === 1 ? 'is' : ''}${typers.length > 1 ? 'are' : ''} typing`
        })
    },
    mounted() {

    },
    methods: {
        send() {
            //this.messages.push({ name: this.name, message: this.message })
            axios({
                url: 'http://localhost:5000/messages',
                method: 'post',
                data: { name: this.name, message: this.message }
            })
            this.disable = true;
            this.message = ''
        },
        colourChatter(message) {
            return `${message.name.toLowerCase().trim() === this.name.toLowerCase().trim() ? 'text-primary' : ''}`
        }

    },
    computed: {
        typing() {
            if (this.message.length === 0) {
                this.typingS = ''
            }
            socket.emit('typing', { name: this.name, message: this.message.length })

            return this.message.length > 0
        }
    }
}

Vue.createApp(app).mount('#app')