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
                    <div style="float:right" class="mb-2">
                        <b-button :variant="liked ? 'outline-primary' : 'outline-secondary'" 
                            @click="onLikeClick"
                            class="me-2 align-middle"
                        >
                            <b-icon :icon="liked ? 'hand-thumbs-up-fill' : 'hand-thumbs-up'"></b-icon>
                            {{ likeCount }}
                        </b-button> 
                        <b-button :variant="showComment ? 'outline-primary' : 'outline-secondary'" @click="toggleShowComment">
                            <b-icon :icon="showComment ? 'chat-right-fill' : 'chat-right'" class="me-2"></b-icon>
                            {{ commentCount }}
                        </b-button>
                    </div>
                </div>
                <div v-if="showComment">
                    <b-form @submit.prevent="onComment">
                        <b-form-textarea max-rows="3" rows="3"
                            v-model="newComment"
                        ></b-form-textarea>
                        <div class="d-flex justify-content-end">
                            <b-button type="submit" class="my-2">Comment</b-button>
                        </div>
                    </b-form>
                    <CommentDisplay v-for="(comment, key) in comments" :key="key"
                        :commentData="comment"
                        commentType="blog"
                    />
                </div>
            </b-card>
        </b-card-group>
        
    </div>
</template>

<script>
import UserLikeDataService from '../services/UserLikeDataService'
import UserCommentBlogDataService from '../services/UserCommentBlogDataService'
import CommentDisplay from '../components/CommentDisplay.vue'

export default {
    name: "Blog",
    props: {
        blogData: Object,
    },
    components: {
        CommentDisplay
    },
    data() {
        return {
            liked: null,
            likeCount: 0,
            showComment: false,
            comments: [],
            commentCount: 0,
            newComment: ""
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
        },

        toggleShowComment(){
            this.showComment = !this.showComment
        },

        getComments() {
            UserCommentBlogDataService.getAllCommentsByBlogId(this.blogData.id).then(response => {
                this.comments = response.data;
                console.log(this.comments)
            }).catch(e => {
                console.log("Error", e.response.data)
            })
        },

        getCommentCount() {
            UserCommentBlogDataService.getCommentCount(this.blogData.id).then(response => {
                this.commentCount = response.data.commentCount;
                
                if(this.commentCount > 0){
                    this.getComments()
                }
            }).catch(e => {
                console.log("Error", e.response.data)
            })
        },

        onComment() {
            UserCommentBlogDataService.comment({
                userId: this.$store.state.loginSession.userID,
                blogId: this.blogData.id,
                comment: this.newComment
            }).then(response => {
                this.newComment = ""
                this.getCommentCount()
            }).catch(e => {
                console.log("Error", e.response.data)
            })
        }
    },
    created() {
        this.getLikeStatus()
        this.getLikeCount()
        this.getCommentCount()
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
