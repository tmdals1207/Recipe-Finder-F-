<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="onSubmit">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <button @click="loginWithOAuth('google')">Login with Google</button>
      <button @click="loginWithOAuth('facebook')">Login with Facebook</button>
      <button @click="$router.push('/register')">Go to Register</button>
    </div>
  </template>
  
  <script>
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
          await this.login({ email: this.email, password: this.password });
          this.$router.push('/');
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
      loginWithOAuth(provider) {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
      },
    },
  };
  </script>
  