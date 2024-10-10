<template>
  <header class="bg-gradient-to-r from-orange-100 to-yellow-100 shadow-md">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <router-link to="/" class="text-3xl font-bold text-orange-600 hover:text-orange-700 transition duration-300">
          맛있는 레시피
        </router-link>
        
        <div class="w-full md:w-1/3 mx-4">
          <RecipeSearch />
        </div>
        
        <nav>
          <ul class="flex space-x-6 items-center">
            <li>
              <router-link to="/" class="text-orange-600 hover:text-orange-800 transition duration-300">홈</router-link>
            </li>
            <li>
              <a @click="goToMyPage" class="text-orange-600 hover:text-orange-800 transition duration-300 cursor-pointer">마이페이지</a>
            </li>
            <li v-if="userDisplayName" class="text-gray-600">
              {{ userDisplayName }}님 환영합니다!
            </li>
            <li v-if="isAuthenticated">
              <button @click="logout" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                로그아웃
              </button>
            </li>
            <li v-else>
              <router-link to="/login" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                로그인
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import RecipeSearch from './RecipeSearch.vue';
import axios from 'axios';

export default {
  components: {
    RecipeSearch,
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
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

      try {
        await axios.post('http://localhost:8080/api/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        localStorage.clear(); // 모든 데이터 삭제
        // 로그아웃 후 Vuex 스토어에서 사용자 데이터 삭제
        this.$store.commit('clearAuthData', userId); // Vuex commit 호출
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
    
    goToMyPage() {
      if (this.isAuthenticated) {
        this.$router.push('/mypage');
      } else {
        this.$router.push('/login');
      }
    }
  },
  name: 'Header',
};
</script>