<template>
    <div class="mb-4">
        <b-card-group>
            <b-card class="p-2">
                <span style="float: right; color: #898989">{{blogData.createdAt}}</span>
                <b-card-title @click="onClickProfile"> 
                    <Avatar :username="blogData.user.name" style="display: inline-block" class="me-2"></Avatar>
                    {{blogData.user.name}} @{{ blogData.user.username }} 
                </b-card-title>
                <b-card-text class="mt-4" style="white-space: pre-wrap">{{ blogData.description }}</b-card-text>
        
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
    methods: {
        onClickProfile() {
            console.log(this.blogData.user.name)
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
