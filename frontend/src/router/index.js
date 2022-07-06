import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Entrepreneurship from '../views/Entrepreneurship.vue'
import EntrepreneurshipList from '../views/EntrepreneurshipList.vue'
import SearchResult from '../views/SearchResult.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/entrepreneurship/:id',
    name: 'Entrepreneurship',
    component: Entrepreneurship
  },
  {
    path: '/entrepreneurshipList',
    name: 'EntrepreneurshipList',
    component: EntrepreneurshipList
  },
  {
    path: '/searchResult',
    name: 'SearchResult',
    component: SearchResult,
    props: route => ({ query: route.query.text })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
