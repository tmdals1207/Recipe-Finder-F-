<template>
  <header>
    <h1>개발중..!</h1>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><a @click="goToMyPage">MyPage</a></li> <!-- 프로필 링크 클릭시 메서드 호출 -->
        <li v-if="userDisplayName">Logged in as: {{ userDisplayName }}</li>
        <li v-if="isAuthenticated">
          <button @click="logout">Logout</button>
        </li>
        <li v-else>
          <router-link to="/login">Login</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
    userDisplayName() {
      return this.user ? (this.user.username || this.user.email) : null;
    }
  },
  methods: {
    // 로그아웃 처리
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
    },
    
    // 프로필로 이동
    goToMyPage() {
      if (this.isAuthenticated) {
        // 로그인된 경우 프로필 페이지로 이동
        this.$router.push('/mypage');
      } else {
        // 로그인되지 않은 경우 로그인 페이지로 이동
        this.$router.push('/login');
      }
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
