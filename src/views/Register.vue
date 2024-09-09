<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="username" placeholder="Username" required />
      <button @click.prevent="checkUsername">Check Availability</button>
      <span v-if="isUsernameAvailable" style="color: green;">✔ Available</span>
      <span v-if="!isUsernameAvailable && isUsernameChecked" style="color: red;">✖ Not Available</span>
      
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
      <button type="submit">Register</button>
    </form>
    <button @click="registerWithOAuth('google')">Register with Google</button>
    <button @click="registerWithOAuth('naver')">Register with Naver</button>
    <button @click="registerWithOAuth('kakao')">Register with Kakao</button>
  </div>
</template>

  
  <script>
 import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      isUsernameAvailable: false,
      isUsernameChecked: false,
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    async checkUsername() {
      try {
        const response = await axios.get(`http://localhost:8080/api/auth/check-username`, {
          params: { username: this.username }
        });
        this.isUsernameAvailable = response.data;
        this.isUsernameChecked = true;
      } catch (error) {
        console.error('Username check failed:', error);
      }
    },
    async onSubmit() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      if (!this.isUsernameAvailable) {
        alert('Username is not available!');
        return;
      }

      try {
        await axios.post('http://localhost:8080/api/auth/register', {
          username: this.username,
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
  