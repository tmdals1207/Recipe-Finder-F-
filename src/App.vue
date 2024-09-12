<template>
  <div id="app">
    <Header />
    <router-view /> <!-- 현재 활성화된 페이지 컴포넌트가 여기에 렌더링됨 -->
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },
  methods: {
    // 사용자 정보 및 토큰을 localStorage에서 삭제
    clearLocalStorage() {
      const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
      
      if (userId) {
        localStorage.removeItem(`user_${userId}`); // 특정 user_id로 저장된 정보 삭제
        localStorage.removeItem(`token_${userId}`); // 토큰 삭제
      }
      localStorage.removeItem('user'); // 기본적으로 저장된 user 정보 삭제
      localStorage.removeItem('token'); // 기본적으로 저장된 token 삭제

      console.log('Local storage cleared on app initialization');
    },
  },
  created() {
    // 앱이 초기화될 때 localStorage 초기화
    this.clearLocalStorage();
  },
};
</script>

<style>
/* 전역 스타일 */
</style>
