<template>
  <div class="login">
    <!-- navbar -->
    <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="./../assets/borderless_logo.png" width="130px" >
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item with-sep">
            <v-gravatar class="gravatar-icon" :hash="nameHash(this.$store.state.currentUser)"/>
            <h3 class="name-style">{{ this.$store.state.currentUser }}</h3>
          </div>
          <div class="navbar-item">
            <div @click="deauth()" class="buttons">
              <a class="button is-light logout-btn">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Chat Sidebar for selecting user to chat with -->
    <section class="main-content columns is-fullheight full-with-nav">
      <aside class="people column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile">
        <p class="menu-label is-hidden-touch online-text">Online people ({{ onlinePeople(members) }})</p>
        <ul class="menu-list">
          <div v-for="(member, i) in members" :key="i" class="card">
            <div @click="selectUser(member.clientData.name)">
              <div v-if="selectedUser == member.clientData.name" class="card-content card-selected">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <v-gravatar class="gravatar-icon" :hash="nameHash(displayMember(member))"/>
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="user-name is-4">{{ displayMember(member) }}</p>
                  </div>
                </div>
              </div>
              <div v-else class="card-content card-hoverable">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <v-gravatar class="gravatar-icon" :hash="nameHash(displayMember(member))"/>
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="user-name is-4">{{ displayMember(member) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </aside>

      <div class="container column is-9">
        <section class="hero is-success is-fullheight full-with-nav is-grey">
          <div class="section">
            <div class="new-message" v-for="(message, i) in messages" :key="i">
              <div v-if="message[1] == $store.state.currentUser">
                <v-gravatar class="gravatar mine" :hash="nameHash(message[1])" width="35"/>
                <div  class="card message-card mine">
                    <div v-if="checkEncode(message[0])">
                      <div class="card-content message-content">
                        <div class="content">
                          <img v-bind:src="'data:image/png;base64,'+message[0]" />
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <div class="card-content message-content"><div class="content">{{ message[0] }}</div></div>
                    </div>
                </div>
              </div>
              <div v-else>
                <div v-if="selectedUser != '' && message[1] == selectedUser">
                  <v-gravatar class="gravatar" :hash="nameHash(message[1])" width="35"/>
                  <div class="card message-card">
                    <div v-if="checkEncode(message[0])">
                      <div class="card-content message-content">
                        <div class="content">
                          <img v-bind:src="'data:image/png;base64,'+message[0]" />
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <div class="card-content message-content"><div class="content">{{ message[0] }}</div></div>
                    </div>
                    
                  </div>
                </div>
              </div>
              <br />
            </div>
          </div>
          <form class="control" onsubmit="return false;">
            <div class="file is-boxed">
              <label class="file-label">
                <input @change="onFileChange" class="file-input" accept="image/*" type="file" name="resume">
                <span class="file-cta">
                  <span class="mdi mdi-rotate-45 mdi-36px mdi-paperclip"></span>
                  <span class="file-label">
                    Choose an Image…
                  </span>
                </span>
              </label>
            </div>
            <input v-model="msg" class="input typewrite" type="text" placeholder="Enter your message..">٣
            <a @click="sendMessage(msg)" value="Send" type="submit" class="button send-button">SEND</a>
          </form>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import md5 from 'js-md5'
import image2base64 from 'image-to-base64'
import isBase64 from 'is-base64'

export default {
  data () {
    return {
      client_id: 'ye83bXDLnHbIiwRc',
      members: [],
      msg: '',
      messages: [],
      imgURL: null,
      drone: new ScaleDrone('ye83bXDLnHbIiwRc', {
      data: { // Will be sent out as clientData via events
        name: this.$store.state.currentUser,
        color: "#000000",
      },
    }),
    selectedUser: ''
    }
  },
  methods: {
    deauth () {
      this.$store.commit('logout')
    },
    nameHash (value) {
      return md5(value)
    },
    sendMessage (value) {
      this.drone.publish({
        room: 'observable-instadiet-room',
        message: value,
      })
      this.msg = ''
    },
    updateMembers (memberList) {
      for(var i=0; i<memberList.length; i++) {
        if(typeof memberList[i] != 'undefined') {
          if(memberList[i].clientData.name != this.$store.state.currentUser) {
            this.members.push(memberList[i])
          }
        }
      }
    },
    addMember (member) {
      if(typeof member != 'undefined') {
        if(member.clientData.name != this.$store.state.currentUser) {
          this.members.push(member)
        }
      }
    },
    removeMember (id) {
      const index = this.members.findIndex(member => member.id === id);
      this.members.splice(index, 1);
    },
    displayMember (member) {
      if (typeof member != 'undefined') {
        return member.clientData.name
      }   
    },
    onlinePeople (members) {
      if (members.length != 0) {
        return members.length
      }
      else {
        return members.length
      }
    },
    addMsgToHistory (msg, sender) {
      this.messages.push([msg, sender])
    },
    selectUser (user) {
      this.selectedUser = user
    },
    onFileChange(e) {
      const file = e.target.files[0]
      this.encodeImg(URL.createObjectURL(file))
    },
    encodeImg (file) {
      image2base64(file)
      .then(
          (response) => {
            this.sendMessage(response)
            console.log(response)
          }
      )
      .catch(
          (error) => {
            console.log(error)
          }
      )
    },
    checkEncode(buffer) {
      return isBase64(buffer)
    }
  },
  mounted () {
    var drone = this.drone

    drone.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully connected to Scaledrone');

    const room = drone.subscribe('observable-instadiet-room');
    room.on('open', error => {
      if (error) {
        return console.error(error);
      }
      console.log('Successfully joined room');
    });

    room.on('members', m => {
      var membersList = m;
      this.updateMembers(membersList) 
    });

    room.on('member_join', member => {
      console.log('new')
      this.addMember(member) 
    });

    room.on('member_leave', ({id}) => {
      console.log('ooh')
      this.removeMember(id)
    });

    room.on('data', (text, member) => {
      if (member) {
        this.addMsgToHistory(text, member.clientData.name)
      } else {
        // Message is from server
      }
    });
    });

    drone.on('close', event => {
      console.log('Connection was closed', event);
    });

    drone.on('error', error => {
      console.error(error);
    });
  }
}
</script>

<style scoped>
.hero.is-success {
  background: #F2F6FA;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
.navbar {
  height: 70px;
}
.column {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
}
.gravatar-icon {
  border-radius: 99px;
  margin-right: 10px;
}
.gravatar {
  margin-right: 8px;
  float: left;
  border-radius: 99px;
}
.name-style {
  text-transform: capitalize;
  font-weight: 500;
  font-size: 16px;
  margin-right: 10px;
}
.with-sep {
  border-right: 1px solid rgba(0,0,0,.1);
}
.logout-btn {
  background-color: white;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  color: grey !important;
}
.online-text {
  color: #00d1b2;
  margin-top: 25px;
}
.card {
  height: 80px;
  padding-top: 0px;
  box-shadow: none;
  -webkit-box-shadow: none;
  border-top: 1px solid rgba(0,0,0,.05);
  cursor: pointer;
  transition: background-color ease-in-out 300ms;
}
.section {
  padding-top: 110px;
}
.card-hoverable:hover {
  background-color: rgba(0,0,0,0.01)
}
.card-selected {
  background-color: rgba(0,0,0,0.015)
}
.card-content {
  padding-top: 15px;
}
.user-name {
  margin-top: 13px; 
}
.is-grey {
  background-color: #f6f6f6 !important;
}
.message-card {
  height: auto;
  margin-bottom: 20px;
  float: left;
  border-radius: 99px;
  margin-top: -3px;
  word-break: break-all;
}
.mine {
  float: right;
  margin-right: 20px;
}
.message-content {
  width: fit-content !important;
  padding-top: 8px;
  padding-bottom: 8px;
}
.new-message {
  float: left;
  width: 100%;
}
.full-with-nav {
  margin-top: -36px;
}
.people {
  padding-top: 25px;
}
.typewrite {
  width: 90%;
  box-shadow: none;
  -webkit-box-shadow: none;
  border-radius: 0px;
  height: 80px;
  background-color: #fafafa;
  border-left: 0px;
  border-bottom: 0px;
  border-right: 0px;
  border-top: 1px solid rgba(0,0,0,.1);
  padding-left: 90px !important;
  font-size: 16px;
}
.typewrite:focus {
  box-shadow: none;
  -webkit-box-shadow: none;
  border-color: rgba(0,0,0,.3);
}
.send-button {
  height: 80px !important;
  width: 10%;
  border-radius: 0px;
  background-color: #fafafa;
  border-left: 0px;
  border-bottom: 0px;
  border-right: 0px;
  border-top: 1px solid rgba(0,0,0,.1);
}
.mdi {
  color: rgba(0,0,0,.4)
}
.is-boxed {
  width: 70px;
  height: 80px;
  background-color: #fafafa !important;
  border-color: transparent !important;
  border-radius: 0px !important;
  border-top: 1px solid rgba(0,0,0,.1) !important;
  font-size: 12px;
  padding: 0px;
  margin-bottom: -80px;
  z-index: 999;
}
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>
