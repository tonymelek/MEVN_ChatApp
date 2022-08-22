

<template>
  <router-view :serverUrl="serverUrl" :socket="socket"/>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import client from 'socket.io-client';
const serverUrl=window.location.origin.replace(':3000',':5000/');
export default {
 data(){
   return {
     socket:client.connect(serverUrl,{upgrade:false,transports:['websocket'],forceView:false}),
     serverUrl
   }
 }
}
</script>
<style>

</style>
