<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <b-navbar type="dark" variant="dark" id="nav">
      <b-navbar-brand>GirlsOnly</b-navbar-brand>
    </b-navbar>
    <router-view id="router-app"/>
  </div>
</template>

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
