<template>
    <div class="mb-4">
        <b-card-group>
            <b-card class="p-2 mx-auto" style="max-width: 800px">
                <div>
                    <span style="float: right; color: #898989">{{blogData.createdAt}}</span>
                    <b-card-title> 
                        <Avatar :username="userData.name" style="display: inline-block" class="me-3"></Avatar>
                        <span class="username" @click="onClickProfile">{{userData.name}} @{{ userData.username }} </span>
                    </b-card-title>
                    <b-card-text class="mt-4" style="white-space: pre-wrap">{{ blogData.description }}</b-card-text>
                    <div style="float:right">
                        <b-button :variant="liked ? 'outline-primary' : 'outline-secondary'" 
                            @click="onLikeClick"
                            class="me-2 align-middle"
                        >
                            <b-icon :icon="liked ? 'hand-thumbs-up-fill' : 'hand-thumbs-up'"></b-icon>
                            {{ likeCount }}
                        </b-button> 
                        <b-button variant="outline-secondary">
                            <b-icon icon="chat-right" class="me-2"></b-icon>
                            Comment
                        </b-button>
                    </div>
                </div>
            </b-card>
        </b-card-group>
        
    </div>
</template>

<script>
import UserLikeDataService from '../services/UserLikeDataService'

export default {
    name: "Blog",
    props: {
        blogData: Object,
    },
    data() {
        return {
            liked: null,
            likeCount: 0,
        }
    },
    computed: {
        userData() {
            return this.blogData.user
        },
    },
    methods: {
        onClickProfile() {
            this.$router.push({ path: '/profile/' + this.userData.username })
        },

        getLikeStatus(){
            UserLikeDataService.getLikeStatus(this.$store.state.loginSession.userID, this.blogData.id).then(response => {
                this.liked = response.data.liked;
            }).catch(e => {
                console.log("Error", e.response.data)
            })
        },
        
        getLikeCount() {
            UserLikeDataService.getLikeCount(this.blogData.id).then(response => {
                this.likeCount = response.data.likeCount
            }).catch(e => {
                console.log("Error", e.response.data)
            })
        },

        onLikeClick() {
            if (this.liked) {
                UserLikeDataService.unlike(this.$store.state.loginSession.userID, this.blogData.id).then(response => {
                    this.liked = false
                    console.log('Unliked')
                }).catch(e => {
                    console.log("Error", e.response.data)
                })
            } else {
                UserLikeDataService.like({
                    userId: this.$store.state.loginSession.userID,
                    blogId: this.blogData.id
                }).then(response => {
                    this.liked = true
                    console.log('Liked')
                }).catch(e => {
                    console.log("Error", e.response.data)
                })
            }
        }
    },
    created() {
        this.getLikeStatus()
        this.getLikeCount()
    },
    watch: {
        liked() {
            this.getLikeCount()
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.username:hover{
    text-decoration: underline;
    cursor: pointer;
}
</style>
