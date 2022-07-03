<template>
    <div>
        <b-card img-src="https://www.nationsonline.org/gallery/Hong-Kong/Hong-Kong-skyline-at-night.jpg" img-top class="mb-4">
            <b-button 
                style="float: right" 
                v-if="userData.username !== $store.state.loginSession.username"
                variant="primary"
            >
                Follow
            </b-button>
            <b-card-title>{{userData.name}}</b-card-title>
            <b-card-sub-title>@{{userData.username}}</b-card-sub-title>
            <b-card-text v-if="userData.occupation">
                Occupation: {{userData.occupation}}
            </b-card-text>
        </b-card>

        <Blog v-for="(blog, key) in blogs" :key="key" :blogData="blog"/>
    </div>
</template>

<script>
// @ is an alias to /src
import Blog from '../components/Blog.vue'
import BlogsDataService from '../services/BlogsDataService'
import UsersDataService from '../services/UsersDataService'

export default {
    name: 'Profile',
    components: {
        Blog
    },
    data() {
        return {
            blogs: [],
            userData: {},
        }
    },
    beforeCreate() {
        this.blogs = BlogsDataService.getAllBlogsByUsername(this.$route.params.username).then(response => {
            this.blogs = response.data
        }).catch( error => {
            console.log("Error", error.response.data)
        })

        this.userData = UsersDataService.getUserByUsername(this.$route.params.username).then(response => {
            this.userData = response.data
        }).catch(e => {
            console.log("Error", e.response.data)
        })
    },
    watch: {
        '$route.params.username': function() {
            this.beforeCreate()
        }
    }
}
</script>
