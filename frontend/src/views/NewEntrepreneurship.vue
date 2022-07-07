<template>
  <div style="padding: 100px; max-width: 1100px" class="mx-auto">
    <h3>New Entrepreneurship</h3>
    <validation-observer v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
            <b-form-group class="mt-4">
                <template #label>
                    Title
                    <span class="required-label">*</span>
                </template>
                <validation-provider v-slot="validationContext"
                    :rules="{ required: true }"
                    name="Title"
                >
                <b-form-input
                    type="text"
                    v-model="title"
                    autocomplete="off"
                    :state="getValidationState(validationContext)"
                    autofocus
                    style="height:40px"
                ></b-form-input>
                <b-form-invalid-feedback>
                    {{validationContext.errors[0]}}
                </b-form-invalid-feedback>
                </validation-provider>
            </b-form-group>

            <b-form-group class="mt-4">
                <template #label>
                    Description
                </template>
                <validation-provider v-slot="validationContext"
                    name="Description"
                >
                <b-form-textarea
                    v-model="description"
                    autocomplete="off"
                    :state="getValidationState(validationContext)"
                    max-rows="6"
                    rows="6"
                ></b-form-textarea>
                <b-form-invalid-feedback>
                    {{validationContext.errors[0]}}
                </b-form-invalid-feedback>
                </validation-provider>
            </b-form-group>

            <b-form-group class="mt-4">
                <template #label>
                    Target Amount
                </template>
                <validation-provider v-slot="validationContext"
                    name="Target Amount"
                    rules="min_value:0"
                >
                <b-input-group prepend="$">
                    <b-form-input
                        type="number"
                        v-model="targetAmount"
                        autocomplete="off"
                        :state="getValidationState(validationContext)"
                        style="height:40px"
                    ></b-form-input>
                </b-input-group>
                <b-form-invalid-feedback>
                    {{validationContext.errors[0]}}
                </b-form-invalid-feedback>
                </validation-provider>
            </b-form-group>

            <b-form-group class="mt-4">
                <template #label>
                    Preview Image URL
                </template>
                <validation-provider v-slot="validationContext"
                    name="Preview Image URL"
                >
                <b-form-input
                    type="url"
                    v-model="imageURL"
                    autocomplete="off"
                    :state="getValidationState(validationContext)"
                    style="height:40px"
                ></b-form-input>
                <b-form-invalid-feedback>
                    {{validationContext.errors[0]}}
                </b-form-invalid-feedback>
                </validation-provider>
            </b-form-group>
        <b-button type="submit" variant="primary" class="my-4">Register</b-button>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import EntrepreneurshipDataService from '../services/EntrepreneurshipDataService'

export default {
    name: 'NewEntrepreneurship',
    data() {
        return {
            title: '',
            description: '',
            targetAmount: 0,
            imageURL: ''
        }
    },
    methods: {
        onSubmit() {
            EntrepreneurshipDataService.create({
                userId: this.$store.state.loginSession.userID,
                title: this.title,
                description: this.description,
                targetAmount: this.targetAmount,
                imageURL: this.imageURL
            }).then(response => {
                console.log("Created")
                this.$router.push({ path: '/entrepreneurship/' + response.data.id })
            }).catch( error => {
                console.log("Error", error.response.data)
            })
        },
    
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
  },
  computed: {

  },
  created() {
    
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