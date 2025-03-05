<template>
    <div class="navbar">
        <nav>
            <img src="../assets/logo.png" alt="Vue logo" />
            <h1>
                <router-link to="/">IG Airways</router-link>
            </h1>
            <div class="links">
                <div v-if="!user">
                    <span>Hi there, Display name...</span>
                    <button @click="handleSubmit">Logout</button>
                    <button v-if="isPending" disabled>Waiting...</button>
                </div>
                <div v-if="user">
                    <router-link class="btn" :to="{name: 'Signup'}">Signup</router-link>
                    <router-link class="btn" :to="{name: 'Login'}">Log in</router-link>
                </div>
            </div>
        </nav>
    </div>  
</template>

<script>
import getUser from '../composables/getUser';
import useLogout from '@/composables/useLogout';

export default {
    setup() {
        const { user } = getUser() 
        const { logout, isPending } = useLogout()    

        user.value = true

        const handleSubmit = async () => {
          await logout()
        }

        return { 
            user,
            isPending,
            handleSubmit
        }
    }
}
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: #fff;
}

nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

nav img {
  max-height: 60px;
}

nav h1 {
  margin-left: 20px;
}

nav .links {
  margin-left: auto;
}

nav .links a, button {
  margin-left: 16px;
  font-size: 14px;
}
span {
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
}
</style>