<template>
  <div class="login">
    <!-- navbar -->
    <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="./../assets/borderless_logo.png" width="130px" >
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
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
    <section class="main-content columns is-fullheight">
      <aside class="people column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile">
        <p class="menu-label is-hidden-touch online-text">Online people</p>
        <ul class="menu-list">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <v-gravatar class="gravatar-icon" :hash="nameHash('John')"/>
                  </figure>
                </div>
                <div class="media-content">
                  <p class="user-name is-4">John</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <v-gravatar class="gravatar-icon" :hash="nameHash('Smith')"/>
                  </figure>
                </div>
                <div class="media-content">
                  <p class="user-name is-4">Smith</p>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </aside>

      <div class="container column is-9">
        <section class="hero is-success is-fullheight">
          <div class="section is-grey">

            <div class="card">
              <div class="card-header"><p class="card-header-title">Header</p></div>
              <div class="card-content"><div class="content">Content</div></div>
            </div>
            <br />
            
            <div class="card is-hidden1">
              <div class="card-header"><p class="card-header-title">Header</p></div>
              <div class="card-content"><div class="content">Content</div></div>
            </div>
            <br />
            
          </div>
        </section>
      </div>
    </section>
    
    <!-- <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  data () {
    return {
      
    }
  },
  methods: {
    deauth () {
      this.$store.commit('logout')
    },
    nameHash (value) {
      return md5(value)
    }
  },
  computed: {

  }
}
</script>

<style scoped>
html,body {
  font-family: 'Open Sans', serif;
  font-size: 14px;
  font-weight: 300;
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
.navbar {
  height: 70px;
}
.column {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
}
.gravatar-icon {
  border-radius: 5px;
  margin-right: 10px;
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
.card:hover {
  background-color: rgba(0,0,0,0.01)
}
.card-content {
  padding-top: 15px;
}
.user-name {
  margin-top: 13px; 
}
.is-grey {
  background-color: #f6f6f6;
}
</style>
