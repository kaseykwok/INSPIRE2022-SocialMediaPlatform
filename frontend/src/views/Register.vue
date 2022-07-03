<template>
  <div>
    <h3>Register to GirlsOnly now!</h3>
    <validation-observer v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(registerSubmit)">

        <b-form-group class="mt-4">
          <template #label>
            Username
            <span class="required-label">*</span>
          </template>
          <validation-provider v-slot="validationContext"
            :rules="{ required: true, uniqueUsername: [usernameIsUnique] }"
            name="Username"
          >
            <b-form-input
              type="text"
              v-model="username"
              autocomplete="off"
              @input="checkUsername()"
              :state="getValidationState(validationContext)"
              autofocus
              style="height:30px"
            ></b-form-input>
            <b-form-invalid-feedback>
              {{validationContext.errors[0]}}
            </b-form-invalid-feedback>
          </validation-provider>
        </b-form-group>

        <b-form-group class="mt-4">
          <template #label>
            Password
            <span class="required-label">*</span>
          </template>
          <validation-provider v-slot="validationContext"
            :rules="{ required: true, regex: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/ }"
            name="Password"
          >
            <b-form-input
              type="password"
              v-model="password"
              style="height:30px"
              :state="getValidationState(validationContext)"
            >
            </b-form-input>
            <b-form-text>Your password must be at least 8 characters long, includes at least 1 number, 1 uppercase, 1 lowercase letter and 1 special character (#?!@$%^&*-).</b-form-text>
            <b-form-invalid-feedback>
                {{validationContext.errors[0]}}
            </b-form-invalid-feedback>
          </validation-provider>
        </b-form-group>

        <b-form-group class="mt-4">
          <template #label>
            Confirm Password
            <span class="required-label">*</span>
          </template>
          <validation-provider v-slot="validationContext"
            :rules="{ required: true, equalTo: [password] }"
            name="Confirm Password"
          >
            <b-form-input
              type="password"
              v-model="repeatPassword"
              style="height:30px"
              :state="getValidationState(validationContext)"
            >
            </b-form-input>
            <b-form-invalid-feedback>
                {{validationContext.errors[0]}}
            </b-form-invalid-feedback>
          </validation-provider>
        </b-form-group>

        <b-form-group class="mt-4">
          <template #label>
            Date of Birth
            <span class="required-label">*</span>
          </template>
          <validation-provider v-slot="validationContext"
            :rules="{ required: true }"
            name="Date of Birth"
          >
            <date-picker v-model="dob" style="height:30px; width: 100%"
              valueType="format" :disabled-date="afterToday"
            ></date-picker>
            <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{validationContext.errors[0]}}
            </b-form-invalid-feedback>
          </validation-provider>
        </b-form-group>

        <b-form-group class="mt-4">
          <template #label>
            Occupation
          </template>
          <b-form-select v-model="occupation" :options="occupationOptions"
            style="height:30px; width: 100%"
          ></b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary" class="my-4">Register</b-button>
      </b-form>
    </validation-observer>
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
      occupation: '',
      passwordValid: false,
      usernameIsUnique: true,
      occupationOptions: [
        { value: null, text: '-' },
        { value: 'Student', text: 'Student'},
        { value: 'Entertainer', text: 'Entertainer' },
        { value: 'Office Worker', text: 'Office Worker' },
        { value: 'Freelancer', text: 'Freelancer' },
        { value: 'Software Developer', text: 'Software Developer' },
      ]
    }
  },
  methods: {
    async registerSubmit(e) {
      await UsersDataService.create({
        username: this.username,
        password: this.password,
        dob: this.dob,
        occupation: this.occupation
      }).then(response => {
        console.log("User created")
        this.$store.commit('setLoginSession', response.data.id)
        this.$router.push({ path: '/' })
      }).catch(e => {
        console.log(e)
      })
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    async checkUsername() {
      await UsersDataService.getUserByUsername(this.username).then(response => {
        this.usernameIsUnique = false;
      }).catch(e => {
        this.usernameIsUnique = true;
      })
    },
    afterToday(date) {
      return date > new Date(new Date().setHours(0, 0, 0, 0));
    }
  },
  computed: {
    passwordCorrect() {
      return this.password == this.repeatPassword && this.password != ''
    },
  }
}
</script>

<style scoped>
label {
  display: none
}

.required-label {
  color: red
}
</style>