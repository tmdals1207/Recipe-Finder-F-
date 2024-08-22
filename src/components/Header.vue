<template>
    <header>
      <h1>Header Component</h1>
      <nav>
    <ul>
      <li><router-link to="/home">Home</router-link></li>
      <li><router-link to="/profile">Profile</router-link></li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
    </header>
  </template>
  
  <script>
import axios from 'axios';


  export default {
    methods: {
    logout() {
      console.log(this.$store.getters.token)
      axios.post('http://localhost:8080/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.token}`
        }
      })
      .then(() => {
        this.$store.dispatch('logout');
        this.$router.push('/login');
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
    }
  },
    name: 'Header',
  };
  </script>
  
  <style scoped>
  header {
    background-color: #f8f9fa;
    padding: 10px;
  }
  </style>
  