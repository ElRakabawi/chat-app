<template>
  <div id="app">
    <Login v-if="this.$store.state.view == 'login'"/>
    <Chat v-else-if="this.$store.state.view == 'chat'"/>
    <CreateUser v-else-if="this.$store.state.view == 'signup'"/>

    <notifications group="auth" position="bottom left"/>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import CreateUser from './components/CreateUser.vue'
import Chat from './components/Chat.vue'


export default {
  name: 'app',
  components: {
    Login,
    Chat,
    CreateUser
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.notification-content {
  font-size: 15px;
  font-weight: 500;
}
</style>
