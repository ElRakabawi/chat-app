<template>
  <div class="login">
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <img class="logo" src="./../assets/logo.png" width="150px">
              <h3 class="title has-text-grey">Signup</h3>
              <p class="subtitle has-text-grey">Create a new user</p>
              <div class="box">
                <figure class="avatar">
                    <v-gravatar v-if="nameHash != 'd41d8cd98f00b204e9800998ecf8427e' && nameHash != ''" :hash="nameHash"/>
                    <img v-else src="https://placehold.it/80x80">
                </figure>
                <form>
                  <div class="field">
                    <div class="control">
                      <input v-model="nameField" @input="update" class="input is-large" type="name" placeholder="Choose a new name" autofocus="">
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input v-model="passwordField" class="input is-large" type="password" placeholder="Choose your password wisely">
                    </div>
                  </div>
                  <button type="button" class="button is-block is-info is-large is-fullwidth" @click="auth(nameField, passwordField)">Create User</button>
                </form>
              </div>
              <p class="has-text-grey">
                  <span class="shadow-text">Already a user?</span> <a @click="$store.commit('changeView', 'login')">Login</a>
              </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  data () {
    return {
      nameField: '',
      passwordField: '',
      nameHash: ''
    }
  },
  methods: {
    auth (name, password) {
      if (name in this.$store.state.users) {
        if (this.$store.state.users[name] === password) {
          this.$store.commit('login')
        }
        else {
          this.$notify({ group: 'auth', type: 'error', text: 'Wrong password, please try again.' })
        }
      }
      else {
        this.$notify({ group: 'auth', type: 'error', text: 'User does not exist.' })
      }
    },
    update () {
      this.nameHash = md5(this.nameField)
    }
  },
  computed: {
    state () {
      return this.$store.state.auth
    }
  }
}
</script>

<style scoped>
html,body {
  font-family: 'Open Sans', serif;
  font-size: 14px;
  font-weight: 300;
}
.logo {
  margin-top: -80px;
  margin-bottom: 30px;
}
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
.button.is-large {
  font-size: 17px;
  font-weight: 300;
  height: 50px;
  text-transform: uppercase;
}
.input.is-large, .textarea.is-large {
  font-size: 17px;
  height: 50px;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.shadow-text {
  opacity: 0.9;
  font-weight: 300;
  margin-right: 10px;
}
</style>
