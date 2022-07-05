<template>
    <div>
        <b-card img-src="https://www.nationsonline.org/gallery/Hong-Kong/Hong-Kong-skyline-at-night.jpg" img-top class="mb-4">
            <b-button 
                style="float: right" 
                v-if="userData.username !== $store.state.loginSession.username && isFollowing !== null"
                :variant="isFollowing ? 'secondary' : 'primary'"
                @click="followOnClick"
            >{{ isFollowing ? 'Unfollow' : 'Follow' }}</b-button>
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
import UserFollowDataService from '../services/UserFollowDataService'

export default {
    name: 'Profile',
    components: {
        Blog
    },
    data() {
        return {
            blogs: [],
            userData: {},
            isFollowing: null,
        }
    },
    methods:{
        updateProfile() {
            BlogsDataService.getAllBlogsByUsername(this.$route.params.username).then(response => {
                this.blogs = response.data
            }).catch( error => {
                console.log("Error", error.response.data)
            })
    
            UsersDataService.getUserByUsername(this.$route.params.username).then(response => {
                this.userData = response.data
                this.getFollowState()
            }).catch(e => {
                console.log("Error", e.response.data)
            })
        },

        getFollowState() {
            UserFollowDataService.getFollowStatus(this.$store.state.loginSession.userID, this.userData.id).then(response => {
                this.isFollowing = response.data.following
            }).catch(e => {
                console.log("Error", e.response.data)
            })
        },

        followOnClick() {
            if (this.isFollowing) {
                UserFollowDataService.unfollow({
                    userId: this.$store.state.loginSession.userID,
                    followUserId: this.userData.id
                }).then(response => {
                    console.log("Unfollowed")
                    this.isFollowing = false
                }).catch(e => {
                    console.log(e)
                })
            } else {    
                UserFollowDataService.follow({
                    userId: this.$store.state.loginSession.userID,
                    followUserId: this.userData.id
                }).then(response => {
                    console.log("Followed")
                    this.isFollowing = true
                }).catch(e => {
                    console.log(e)
                })
            }
        }
    },
    created() {
        this.updateProfile()
    },
    computed: {
        username: function() {
            return this.$route.params.username
        }
    },
    watch: {
        username: function() {
            this.updateProfile()
        }
    }
}
</script>
