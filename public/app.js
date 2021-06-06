const socket = io()
const app = {
    data() {
        return {
            stock: [],
            messages: [],
            name: '',
            message: '',
            index: 0
        }
    },
    created() {
        axios('http://localhost:5000/messages')
            // .then(res => res.json())
            .then(res => this.messages = res.data)
            .catch(err => console.log(err))

        socket.on('message', message => this.messages.push(message))

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
            this.name = ''
            this.message = ''
        }

    },
    calculated: {

    }
}

Vue.createApp(app).mount('#app')