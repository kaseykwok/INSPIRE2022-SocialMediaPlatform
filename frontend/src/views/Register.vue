<template>
  <div>
    <h3>Register to GirlsOnly now!</h3>
    <b-form @submit.prevent="registerSubmit">
      <b-form-group class="my-4"
        label="Username"
      >
        <b-form-input
          type="text"
          v-model="username"
          autocomplete="off"
          @input="submitted = false; checkUsername()"
          :state="usernameIsUnique"
          autofocus
          style="height:30px"
        ></b-form-input>
        <b-form-invalid-feedback :state="usernameIsUnique">
          Username has been registered. Please try another one.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group class="my-4"
        label="Password"
      >
        <b-form-input
          type="password"
          v-model="password"
          @input="submitted = false"
          style="height:30px"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group class="my-4" 
        label="Confirm Password"
      >
        <b-form-input
          type="password"
          v-model="repeatPassword"
          @input="submitted = false"
          style="height:30px"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group class="my-4" 
        label="Date of Birth">
        <date-picker v-model="dob" style="height:30px; width: 100%"
          valueType="format"
        ></date-picker>
      </b-form-group>

      <b-button type="submit" variant="primary" class="my-4">Register</b-button>
    </b-form>
  </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService"

export default {
  name: 'Register',
  components: {
    // HelloWorld
  },
  data() {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      dob: null,
      passwordCorrect: false,
      usernameIsUnique: true,
      submitted: false,
      earliestDate: new Date(0),
      today: new Date()
    }
  },
  methods: {
    async registerSubmit(e) {
      console.log(this.dob)

      await UsersDataService.create({
        username: this.username,
        password: this.password,
        dob: this.dob
      }).then(response => {
        console.log("User created")
      }).catch(e => {
        console.log(e)
      })
    },

    async checkUsername() {
      await UsersDataService.getUserByUsername(this.username).then(response => {
        this.usernameIsUnique = false;
      }).catch(e => {
        this.usernameIsUnique = true;
      })
    },
  },
}
</script>

<style scoped>
label {
  display: none
}
</style>