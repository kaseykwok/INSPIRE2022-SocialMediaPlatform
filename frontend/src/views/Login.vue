<template>
  <div class="login-page">
    <h3>Welcome to GirlsOnly! Please sign in or register for an account.</h3>
    <b-form @submit.prevent="loginSubmit">
      <b-input-group class="my-5" style="height:30px">
        <b-input-group-prepend is-text>
          <b-icon icon="person-fill" style="height:30px"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          type="text"
          required
          placeholder="Username"
          v-model="username"
        ></b-form-input>
      </b-input-group>
      <b-input-group class="my-5" style="height:30px">
        <b-input-group-prepend is-text>
          <b-icon icon="lock-fill" style="height:30px"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          type="password"
          required
          placeholder="Password"
          v-model="password"
        >
        </b-form-input>
      </b-input-group>
      <b-button type="submit" variant="primary">Sign in</b-button>
      <b-button variant="secondary" class="mx-3">Register</b-button>
    </b-form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Login',
  components: {
    // HelloWorld
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    loginSubmit(e) {
      console.log(this.username)
      console.log(this.password)
    },
  }
}
</script>
