<template>
    <div>
        <EntrepreneurDisplay :entrepreneurData="entrepreneur"/>
    </div>
</template>

<script>
import EntrepreneurDisplay from '../components/EntrepreneurDisplay.vue'
import EntrepreneurshipDataService from '../services/EntrepreneurshipDataService.js'

export default {
    name: 'EntrepreneurshipList',
    components: {
        EntrepreneurDisplay
    },
    data() {
        return {
            entrepreneur: {}
        }
    },
    computed: {
        entrepreneurId() {
            return this.$route.params.id
        }
    },
    methods: {
        loadEntrepreneur() {
            EntrepreneurshipDataService.getEntrepreneurById(this.entrepreneurId).then(response => {
                this.entrepreneur = response.data
                console.log(this.entrepreneur)
             }).catch( error => {
                console.log("Error in retrieving entrepreneurship", error.response.data)
            })
        }
    },
    watch: {
        entrepreneurId() {
            this.loadEntrepreneur()
        }
    },
    created() {
        this.loadEntrepreneur()
    }
}
</script>