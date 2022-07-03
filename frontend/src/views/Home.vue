<template>
  <div class="home">
    <Blog v-for="(blog, key) in blogs" :key="key" :blogData="blog"/>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Blog from '../components/Blog.vue'
import BlogsDataService from '../services/BlogsDataService'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Blog
  },
  data() {
    return {
      blogs: []
    }
  },
  beforeCreate() {
    this.blogs = BlogsDataService.getAllBlogsByUserId(this.$store.state.loginUserID).then(response => {
      this.blogs = response.data
    }).catch( error => {
      console.log("Error", error.response.data)
    })
  },
  created() {
    if(this.$store.state.loginUserID === -1){
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
