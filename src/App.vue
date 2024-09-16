<template>
  <div id="app">
    <Header />
    <router-view />
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
    ...mapActions(['initializeAuth']),
  },
  created() {
    // 앱이 초기화될 때 sessionStorage에서 유저 정보 및 토큰을 가져와 Vuex에 저장
    this.initializeAuth();
  },
};
</script>

<style>
/* 전역 스타일 */
</style>
