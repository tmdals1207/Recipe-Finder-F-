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
      return this.user ? (this.user.username || this.user.email) : null;
    }
  },
  methods: {
    async logout() {
      const token = this.$store.getters.token;
      console.log(token);

      // OAuth 제공자가 Kakao인 경우 카카오 로그아웃 처리
      if (this.user.provider === 'kakao') {
        try {
          await axios.post('https://kapi.kakao.com/v1/user/logout', {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('Kakao logout successful');
        } catch (error) {
          console.error('Kakao logout failed:', error);
        }
      }

      // 서버 로그아웃 처리
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
