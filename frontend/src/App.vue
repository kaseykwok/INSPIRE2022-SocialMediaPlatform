<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <b-navbar type="dark" variant="dark" id="nav">
      <b-navbar-brand href="/">GirlsOnly</b-navbar-brand>
      <b-navbar-nav class="ms-auto">
        <b-nav-item @click="logout" v-if="$store.state.loginUserID !== -1">Log out</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view id="router-app"/>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('setLoginSession', -1)
      this.$router.push('/login')
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
  padding: 100px;
}

</style>
