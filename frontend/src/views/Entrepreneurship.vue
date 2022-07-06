<template>
    <div class="entrepreneurship">
        <div class="mb-5 mx-auto" style="max-width: 800px">
            <h2>Entrepreneurship</h2>
            <p>Do you want to share your start up ideas to others? Do you want to give other women help for their innovative ideas? Do you want to support women's business? Here is the place you're looking for!</p>
        </div>
        <EntrepreneurDisplay v-for="(entrepreneur, key) in entrepreneurs" :entrepreneurData="entrepreneur" :key="key"/>
    </div>
</template>

<script>
import EntrepreneurDisplay from '../components/EntrepreneurDisplay.vue'
import EntrepreneurshipDataService from '../services/EntrepreneurshipDataService'

export default {
    name: 'Entrepreneurship',
    components: {
        EntrepreneurDisplay
    },
    data() {
        return {
           entrepreneurs: []
        }
    },
    methods: {
        loadEntrepreneurships() {
          EntrepreneurshipDataService.getAll().then(response => {
            this.entrepreneurs = response.data
          }).catch( error => {
            console.log("Error", error.response.data)
        })
        }
    },
    created() {
        this.loadEntrepreneurships()

        // if(this.$store.state.loginSession.userID === -1){
        //   this.$router.push({ path: '/login' })
        // }
    }
}
</script>
