<template>
  <div class="mt-3">
    <div v-for="event in events" :key="event.id" class="row max-width-500" >
      <div class="col-6">
         <button @click="triggerEvent(event)"  
         class="btn my-1 w-100"
         :class="event.triggered?'btn-success':'btn-outline-danger'"
         >{{event.eventName}}</button>
      </div>
      <div class="col-6 d-flex justify-content-around align-items-center">
        <div :class="event.soundAck&&'clicked'">
            {{event.soundAction}}
        </div>
        <div :class="event.lightAck&&'clicked'">
            {{event.lightAction}}
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
  import {io} from 'socket.io-client';
  import axios from'axios';
  const serverUrl=window.location.origin.replace(':3000',':5000/');
  const socket = io(serverUrl);

  export default {
    name: "Director",
    data(){
      return{
          events:[]
      }
    },
    mounted(){
    const getEvents=async()=>{
      const {data}=await axios.get(`${serverUrl}events`);
      this.events=data;
    }
    getEvents();
    socket.on('eventAcknowledged',event=>{
      this.events[event.id]=event;
    })

    },
    methods:{
      triggerEvent(event){
        if(event.triggered) return
        event.triggered=true;
        this.events[event.id]=event;
        socket.emit('triggerEvent',event)
      }
    }
  }
</script>

<style scoped>
.max-width-500{
  padding: 0 1rem ;
  width: 100%;
  max-width: 500px;
  margin:0 auto;
}
</style>