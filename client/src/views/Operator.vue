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
         :class="buttonColour(event)"
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

  import axios from'axios';

  export default {
    name: "Operator",
    props:['serverUrl','socket'],
    data(){
      return{
          events:[],
          operator:''
      }
    },
    mounted(){
    const audio = new Audio('./notification.wav');
   
    const getEvents=async()=>{
      const {data}=await axios.get(`${this.serverUrl}events`);
      this.events=data;
    }
    getEvents();
    this.socket.on('eventTriggered',event=>{
      this.events[event.id]=event;
      audio.play(); 
    })
      this.socket.on('eventAcknowledged',event=>{
      this.events[event.id]=event;
    })


    },
    methods:{
      ackEvent(event){
        const ack=this.operator==='sound'?'soundAck':'lightAck';
        event[ack]=true;
        this.events[event.id]=event;
        this.socket.emit('acknowledgeEvent',event);
      },
        buttonColour(event){
        let colour='btn-outline-danger';
        if(event.finished){
          colour='btn-success';
        }else if(event.triggered){
          colour='btn-warning'
        }
        return colour;
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