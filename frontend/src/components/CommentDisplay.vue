<template>
    <b-card>
        <Avatar :username="userData.username" style="display: inline-block" :size="20" class="me-2"></Avatar>
        <span class="username" @click="onClickProfile">{{userData.name}}</span> : {{commentData.comment}}
    </b-card>
</template>

<script>
export default {
    name: "CommentDisplay",
    props: {
        commentData: Object,
        commentType: String
    },
    computed: {
        userData() {
            return this.commentData.user
        }
    },
    methods: {
        onClickProfile() {
            this.$router.push({ path: '/profile/' + this.userData.username })
        },
    }
}
</script>

<style scoped>
.username:hover{
    text-decoration: underline;
    cursor: pointer;
}
</style>