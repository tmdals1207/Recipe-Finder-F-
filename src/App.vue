<template>
  <div id="app">
    <Header />
    <router-view /> <!-- 현재 활성화된 페이지 컴포넌트가 여기에 렌더링됨 -->
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    Header,
  },
  methods: {
    ...mapActions(['setAuthData']),
    initializeAuth() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        try {
          const parsedUser = JSON.parse(user); // 유효한 JSON인지 확인
          this.setAuthData({ token, user: parsedUser }); // Vuex 스토어에 저장
        } catch (error) {
          console.error('Failed to parse user data from localStorage:', error);
          localStorage.removeItem('user'); // 유효하지 않은 경우 제거
        }
      } else {
        console.log('No token or user data found in localStorage');
      }
    },
  },


  created() {
    // 앱 초기화 시, 로컬 스토리지에서 토큰 및 유저 정보를 로드
    this.initializeAuth();
  },
};
</script>

<style>
/* 전역 스타일 */
</style>
