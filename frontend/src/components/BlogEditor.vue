<template>
    <div class="mb-4">
        <b-card-group>
            <b-card class="p-2 mx-auto" style="max-width: 800px">
                <!-- <span style="float: right; color: #898989">{{blogData.createdAt}}</span> -->
                <b-card-text> 
                    <b-form @submit.prevent="onPost"> 
                        <b-textarea rows="5" max-rows="5" v-model="blogDescription"
                            placeholder="Share your experience here!"
                        ></b-textarea>
                        <b-button type="submit" class="mt-4" variant="primary" style="float:right">Post</b-button>
                    </b-form>
                </b-card-text>
                <!-- <b-card-text class="mt-4" style="white-space: pre-wrap">{{ blogData.description }}</b-card-text> -->
        
            </b-card>
        </b-card-group>
        
    </div>
</template>

<script>
import BlogsDataService from '../services/BlogsDataService'

export default {
    name: "BlogEditor",
    props: {
        // blogData: Object,
    },
    data() {
        return {
            blogDescription: ''
        }
    },
    computed: {
        // userData() {
        //     return this.blogData.user
        // }
    },
    methods: {
        async onPost() {
            await BlogsDataService.create({
                userId: this.$store.state.loginSession.userID,
                description: this.blogDescription
            }).then(response => {
                console.log("Blog Posted")
                this.$emit('reload')
                this.blogDescription = ''
            }).catch(e => {
                console.log(e)
            })
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .username:hover{
    text-decoration: underline;
    cursor: pointer;
} */
</style>
