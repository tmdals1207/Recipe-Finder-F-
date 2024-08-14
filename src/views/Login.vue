<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="onSubmit">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <button @click="loginWithOAuth('google')">Login with Google</button>
      <button @click="loginWithOAuth('naver')">Login with Naver</button>
      <button @click="loginWithOAuth('kakao')">Login with Kakao</button>
      <button @click="$router.push('/register')">Go to Register</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      ...mapActions(['login']),
      async onSubmit() {
        try {
          await axios.post('http://localhost:8080/api/auth/login',{
            email: this.email, 
            password: this.password 
          });
          this.$router.push('/');
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
      loginWithOAuth(provider) {
        console.log(provider+"로 로그인 시작!")
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
      },
    },
  };
  </script>
  