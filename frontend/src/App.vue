<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <b-navbar type="dark" variant="dark" id="nav" :sticky="true">
      <b-navbar-brand href="/" class="my-1">#GirlsOnly</b-navbar-brand>
      <b-navbar-nav class="my-1" v-if="isLogin">
        <b-nav-item class="me-2" href="/entrepreneurshipList">Entrepreneurships</b-nav-item>
        <b-nav-item class="me-2">Events</b-nav-item>
        <b-nav-item class="me-2">Helping Hand</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ms-auto my-1" v-if="isLogin">
        <SearchBox class="my-1" />
        <span @click="onClickIcon" class="avatar">
          <Avatar :username="$store.state.loginSession.username" :size="40" class="me-3"></Avatar>
        </span>
        <b-nav-item @click="logout">Log out</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view id="router-app"/>
  </div>
</template>

<script>
import SearchBox from './components/SearchBox.vue'

export default {
  components: {
    SearchBox
  },

  computed: {
    isLogin() {
      return this.$store.state.loginSession.userID !== -1
    }
  },

  methods: {
    logout() {
      this.$store.commit('setLoginSession', { 
        id: -1, 
        name: '', 
        username: ''
      })
      this.$router.push('/login')
    },
    onClickIcon() {
      this.$router.push('/profile/' + this.$store.state.loginSession.username)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {
  padding: 10px 20px 10px 20px;
}

#router-app {
  padding: 60px;
}

</style>

<style scoped>
.avatar:hover {
  cursor: pointer
}
</style>
