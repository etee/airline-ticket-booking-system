import { createRouter, createWebHistory } from 'vue-router'
import SearchPage from '../views/SearchPage.vue'
import SignupView from '@/views/auth/SignupView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import Booking from '@/views/Booking.vue'
import Confirmation from '@/views/Confirmation.vue'

const routes = [
  {
    path: '/',
    name: 'SearchPage',
    component: SearchPage
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },  
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/booking/:id',
    name: 'Booking',
    component: Booking,
    props: true
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: Confirmation
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
