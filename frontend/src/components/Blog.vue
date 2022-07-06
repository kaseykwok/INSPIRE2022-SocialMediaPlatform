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
                        <b-button class="me-2" variant="outlined-secondary">
                            <b-icon icon="chat-right" class="me-2"></b-icon>
                            Comment
                        </b-button>
                        <b-button variant="outlined-secondary">
                            <b-icon icon="hand-thumbs-up" class="me-2"></b-icon>
                            Like
                        </b-button> <!--hand-thumbs-up-fill-->
                    </div>
                </div>
            </b-card>
        </b-card-group>
        
    </div>
</template>

<script>
export default {
    name: "Blog",
    props: {
        blogData: Object,
    },
    computed: {
        userData() {
            return this.blogData.user
        }
    },
    methods: {
        onClickProfile() {
            this.$router.push({ path: '/profile/' + this.userData.username })
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
