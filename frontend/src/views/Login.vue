<template>
  <div style="padding: 100px">
    <h3>Welcome to #GirlsOnly! Please sign in or register for an account.</h3>
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
          autocomplete="off"
          @input="submitted = false"
          autofocus
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
          @input="submitted = false"
        >
        </b-form-input>
      </b-input-group>
      <b-form-invalid-feedback :state="!submitted || userExist" v-if="submitted && !userExist">
        User record not found. Please check your input carefully.
      </b-form-invalid-feedback>
      <b-form-invalid-feedback :state="!submitted || passwordCorrect" v-else>
        Wrong password.
      </b-form-invalid-feedback>
      <div class="my-5">
        <b-button type="submit" variant="primary">Sign in</b-button>
        <b-button variant="secondary" class="mx-3" @click="onRegister">Register</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService"

export default {
  name: 'Login',
  components: {
    // HelloWorld
  },
  data() {
    return {
      username: '',
      password: '',
      userExist: false,
      passwordCorrect: false,
      submitted: false
    }
  },
  methods: {
    async loginSubmit(e) {
      console.log(this.username)
      await UsersDataService.getUserByUsername(this.username).then(response => {
        if(this.password === response.data.password) {
          this.$store.commit('setLoginSession', { 
            id: response.data.id, 
            name: response.data.name,
            username: response.data.username
          })
          console.log("Login successful")
          this.userExist = true;
          this.passwordCorrect = true;
          this.$router.push({ path: '/' })
        }
        else {
          console.log("Wrong password")
          this.userExist = true;
          this.passwordCorrect = false;
        }
      }).catch(e => {
        console.log("Error", e.response.data)
        this.userExist = false;
        this.passwordCorrect = false;
      })

      this.submitted = true
    },

    onRegister() {
      this.$router.push({ path: '/register'})
    },

  },
  created() {
    if(this.$store.state.loginSession.userID !== -1){
      this.$router.push({ path: '/' })
    }
  }
}
</script>


