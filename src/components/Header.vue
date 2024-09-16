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
    if (!this.user || !this.user.id) {
      console.error("User ID not found for logout");
      return;
    }

    const userId = this.user.id;
    const token = localStorage.getItem(`token_${userId}`);
    console.log(userId, token);

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    console.log(`Logging out user ID: ${userId} with token: ${token}`);

    // 서버 로그아웃 처리
    axios.post('http://localhost:8080/api/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      localStorage.clear(); // 모든 데이터 삭제
      // 로그아웃 후 Vuex 스토어에서 사용자 데이터 삭제
      this.$store.commit('clearAuthData', userId); // Vuex commit 호출
      this.$router.push('/login'); // 로그아웃 후 로그인 페이지로 리다이렉트
    })
    .catch(error => {
      console.error('Logout failed:', error);
    });
  }
}

  ,
  name: 'Header',
};
</script>

<style scoped>
header {
  background-color: #f8f9fa;
  padding: 10px;
}
</style>
