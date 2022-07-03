<template>
    <div>
        PROFILE
        <Blog v-for="(blog, key) in blogs" :key="key" :blogData="blog"/>
    </div>
</template>

<script>
// @ is an alias to /src
import Blog from '../components/Blog.vue'
import BlogsDataService from '../services/BlogsDataService'

export default {
    name: 'Profile',
    components: {
        Blog
    },
    data() {
        return {
            blogs: []
        }
    },
    beforeCreate() {
        this.blogs = BlogsDataService.getAllBlogsByUsername(this.$route.params.username).then(response => {
            this.blogs = response.data
        }).catch( error => {
            console.log("Error", error.response.data)
        })
    },
}
</script>
