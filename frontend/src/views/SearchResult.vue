<template>
    <div style="max-width: 800px" class="mx-auto">
        <h2>Search Results of "{{ searchWord }}"</h2>
        <p>
            {{ userMatch.length > 0 ? userMatch.length : "No" }} user(s) and
            {{ entrepreneurMatch.length > 0 ? entrepreneurMatch.length : "no" }} entrepreneurship(s) found.
        </p>

        <b-card>
            <b-card-title>Users</b-card-title>
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
    </div>
</template>

<script>
import UsersDataService from '../services/UsersDataService'

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
            console.log("method", this.searchWord)
            UsersDataService.searchAllUsersByKeyword(this.searchWord).then(response => {
                this.userMatch = response.data
                console.log(this.userMatch)
             }).catch( error => {
                console.log("Error in searching user", error.response.data)
            })
        },

        onClickProfile(username) {
            this.$router.push({ path: '/profile/' + username })
        },
    },
    watch: {
        searchWord(){
            this.searchUsers()
        }
    },
    created() {
        this.searchUsers()
    },
    
}
</script> 

<style scoped>
.search-match:hover{
    background-color: #82b2ff;
    cursor: pointer;
}
</style>