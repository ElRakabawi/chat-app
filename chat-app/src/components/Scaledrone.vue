<template>
  <div>
    <h3 id="hiddenName">{{ this.$store.state.currentUser }}</h3>
    <div class="members-count">
      {{ onlinePeople(members) }}
    </div>
    <div class="members-list">
      <ul id="example-1">
        <li v-for="(member, i) in members" :key="i">
          {{ displayMember(member) }}
        </li>
      </ul>
    </div>
    <div class="messages">
      <ul id="example-1">
        <li v-for="(message, i) in messages" :key="i">
          {{ message }}
        </li>
      </ul>
    </div>
    <form class="message-form" onsubmit="return false;">
      <input v-model="msg" class="message-form__input" placeholder="Type a message.." type="text"/>
      <input @click="sendMessage(msg)" class="message-form__button" value="Send" type="submit"/>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      client_id: 'ye83bXDLnHbIiwRc',
      members: [],
      msg: '',
      messages: [],
      drone: new ScaleDrone('ye83bXDLnHbIiwRc', {
      data: { // Will be sent out as clientData via events
        name: this.$store.state.currentUser,
        color: "#000000",
      },
    })
    }
  },
  methods: {
    sendMessage (value) {
      this.drone.publish({
        room: 'observable-instadiet-room',
        message: value,
      });
    },
    updateMembers (member) {
      this.members.push(member)
    },
    displayMember (member) {
      if (typeof member != 'undefined') {
        return member.clientData.name
      }   
    },
    onlinePeople (members) {
      if (members.length != 0) {
        return members.length - 1
      }
      else {
        return members.length
      }
    },
    addMsgToHistory (msg, sender) {
      this.messages.push([msg, sender])
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
      this.members = m;
      this.updateMembers(this.member) 
    });

    room.on('member_join', member => {
      this.updateMembers(this.member) 
    });

    room.on('member_leave', ({id}) => {
      const index = members.findIndex(member => member.id === id);
      members.splice(index, 1);
      this.updateMembers(this.member)
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


<style>
    body {
      box-sizing: border-box;
      margin: 0;
      padding: 13px;
      display: flex;
      flex-direction: column;
      max-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .members-count,
    .members-list,
    .messages {
      border: 1px solid #e4e4e4;
      padding: 15px;
      margin-bottom: 15px;
    }

    .messages {
      flex-shrink: 1;
      overflow: auto;
    }

    .message {
      padding: 5px 0;
    }
    .message .member {
      display: inline-block;
    }

    .member {
      padding-right: 10px;
      position: relative;
    }

    .message-form {
      display: flex;
      flex-shrink: 0;
    }
    .message-form__input {
      flex-grow: 1;
      border: 1px solid #dfdfdf;
      padding: 10px 15px;
      font-size: 16px;
    }
    .message-form__button {
      margin: 10px;
    }
</style>


