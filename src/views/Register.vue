<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="onSubmit">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
        <button type="submit">Register</button>
      </form>
      <button @click="registerWithOAuth('google')">Register with Google</button>
      <button @click="registerWithOAuth('facebook')">Register with Facebook</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      async onSubmit() {
        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match!');
          return;
        } 
        try {
          await axios.post('http://localhost:8080/api/auth/register', {
            email: this.email,
            password: this.password,
          });
          this.$router.push('/login');
        } catch (error) {
          console.error('Registration failed:', error);
        }
      },
      registerWithOAuth(provider) {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
      },
    },
  };
  </script>
  