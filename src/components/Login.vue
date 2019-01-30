<template>
  <div class="login">
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <img class="logo" src="./../assets/logo.png" width="150px">
              <h3 class="title has-text-grey">Login</h3>
              <div class="box">
                <figure class="avatar">
                    <v-gravatar v-if="nameHash != 'd41d8cd98f00b204e9800998ecf8427e' && nameHash != ''" :hash="nameHash"/>
                    <img v-else src="https://placehold.it/80x80">
                </figure>
                <form>
                  <div class="field">
                    <div class="control">
                      <input v-model="nameField" @input="update" class="input is-large" type="name" placeholder="Your Name" autofocus="">
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input v-model="passwordField" class="input is-large" type="password" placeholder="Your Password">
                    </div>
                  </div>
                  <button type="button" class="button is-block is-primary is-large is-fullwidth" @click="auth(nameField, passwordField)">Login</button>
                </form>
              </div>
              <p class="has-text-grey">
                  <a @click="$store.commit('changeView', 'signup')">Sign Up</a>
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
          this.$store.commit('login', name)
          this.$notify({ group: 'auth', type: 'success', text: 'Logged In successfully. Welcome back ' + name + '!' })
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
.logo {
  margin-top: -100px;
  margin-bottom: 30px;
}
.hero.is-success {
  background: #F2F6FA;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.hero-body {
  padding-top: 0px;
  background: #F2F6FA;
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
</style>
