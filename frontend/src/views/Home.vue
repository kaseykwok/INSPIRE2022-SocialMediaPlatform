<template>
  <div class="home">
    <Blog v-for="(blog, key) in blogs" :key="key" :blogData="blog"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Blog from '../components/Blog.vue'
import BlogsDataService from '../services/BlogsDataService'

export default {
  name: 'Home',
  components: {
    Blog
  },
  data() {
    return {
      blogs: []
    }
  },
  beforeCreate() {
    this.blogs = BlogsDataService.getAllBlogsByUserId(this.$store.state.loginSession.userID).then(response => {
      this.blogs = response.data
    }).catch( error => {
      console.log("Error", error.response.data)
    })
  },
  created() {
    if(this.$store.state.loginSession.userID === -1){
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
