<template>
    <div style="max-width: 800px" class="mx-auto">
        <h2>Search Results of "{{ searchWord }}"</h2>
        <p>
            {{ userMatch.length > 0 ? userMatch.length : "No" }} user(s) and
            {{ entrepreneurMatch.length > 0 ? entrepreneurMatch.length : "no" }} entrepreneurship(s) found.
        </p>

        <b-card v-if="userMatch.length > 0" class="my-4">
            <b-card-title class="mb-3">Users</b-card-title>
            <b-card v-for="(user, key) in userMatch" :key="key" class="search-match"
                @click="onClickProfile(user.username)">
                <b-card-text>
                    <Avatar :username="user.name" style="display: inline-block" class="me-3"></Avatar>
                    <span class="username">
                        <span class="fw-bold fs-5">{{ user.name }}</span>
                        @{{user.username}}
                    </span>
                    <span class="float-end py-3" style="color: #666666;">
                        {{user.occupation}}
                    </span>
                </b-card-text>
            </b-card>
        </b-card>

        <b-card v-if="entrepreneurMatch.length > 0">
            <b-card-title class="mb-3">Entrepreneurships</b-card-title>
            <b-card v-for="(entrepreneur, key) in entrepreneurMatch" :key="key" class="search-match"
                :img-src="entrepreneur.imageURL"
                @click="onClickEntrepreneur(entrepreneur.id)">
                <b-card-title>
                    {{entrepreneur.title}}
                </b-card-title>
                <b-card-text>
                    {{entrepreneur.description}}
                </b-card-text>
            </b-card>
        </b-card>
    </div>
</template>

<script>
import UsersDataService from '../services/UsersDataService'
import EntrepreneurshipDataService from '../services/EntrepreneurshipDataService'

export default {
    name: 'SearchResult',
    data() {
        return {
            userMatch: [],
            entrepreneurMatch: [],
        }
    },
    computed: {
        searchWord() {
            return this.$route.query.text
        }
    },
    methods: {
        searchUsers() {
            UsersDataService.searchAllUsersByKeyword(this.searchWord).then(response => {
                this.userMatch = response.data
                console.log(this.userMatch)
             }).catch( error => {
                console.log("Error in searching user", error.response.data)
            })
        },

        searchEntrepreneurship() {
            EntrepreneurshipDataService.searchEntrepreneurshipsByKeyword(this.searchWord).then(response => {
                this.entrepreneurMatch = response.data
                console.log(this.entrepreneurMatch)
             }).catch( error => {
                console.log("Error in searching entrepreneurship", error.response.data)
            })
        },

        onClickProfile(username) {
            this.$router.push({ path: '/profile/' + username })
        },

        onClickEntrepreneur(entreId) {
            this.$router.push({ path: '/entrepreneurship/' + entreId })
        },
    },
    watch: {
        searchWord(){
            this.searchUsers()
            this.searchEntrepreneurship()
        }
    },
    created() {
        this.searchUsers()
        this.searchEntrepreneurship()
    },
    
}
</script> 

<style scoped>
.search-match:hover{
    background-color: #82b2ff;
    cursor: pointer;
}
</style>