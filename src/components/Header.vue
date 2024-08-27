<template>
  <header>
    <h1>Header Component</h1>
    <nav>
      <ul>
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li v-if="userDisplayName">Logged in as: {{ userDisplayName }}</li>
        <li><button @click="logout">Logout</button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  computed: {
    ...mapGetters(['user']),
    userDisplayName() {
      // 사용자 객체가 있을 때 username을 우선적으로 확인
      // username이 없으면 email을 표시
      return this.user ? (this.user.username || this.user.email) : null;
    }
  },
  methods: {
    logout() {
      const token = this.$store.getters.token;
      console.log(token);

      axios.post('http://localhost:8080/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
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
