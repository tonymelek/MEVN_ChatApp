<template>

  <div class="mt-3">
    <div class="d-flex justify-content-center align-items-center mb-3">
      <div class="me-5">
   <input type="radio" id="light" name="operator" value="light" class="me-2" v-model="operator">
    <label for="light">Light</label>
    </div>
    <div >
    <input type="radio" id="sound" name="operator" value="sound" class="me-2" v-model="operator">
    <label for="sound">Sound</label>
    </div>
    </div>
 <div v-if="!!operator">
  <div  v-for="event in events" :key="event.id" class="row max-width-500" >
      <div class="col-6">
         <button 
         class="btn my-1 w-100"
         :class="event.triggered?'btn-success':'btn-outline-danger'"
         >{{event.eventName}}</button>
      </div>
      <div class="col-6 d-flex justify-content-around align-items-center">
        <div :class="operator==='sound'?event.soundAck&&'clicked':event.lightAck&&'clicked'">
            {{operator==='sound'?event.soundAction:event.lightAction}}
        </div>
       <button class="btn btn-sm small btn-primary" @click="ackEvent(event)" :disabled="operator==='sound'?event.soundAck:event.lightAck">
         Acknowledge
       </button>
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
    name: "Operator",
    data(){
      return{
          events:[],
          operator:''
      }
    },
    mounted(){
    const getEvents=async()=>{
      const {data}=await axios.get(`${serverUrl}events`);
      this.events=data;
    }
    getEvents();
    socket.on('eventTriggered',event=>{
      this.events[event.id]=event;
    })
      socket.on('eventAcknowledged',event=>{
      this.events[event.id]=event;
    })


    },
    methods:{
      ackEvent(event){
        const ack=this.operator==='sound'?'soundAck':'lightAck';
        event[ack]=true;
        this.events[event.id]=event;
        socket.emit('acknowledgeEvent',event);
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