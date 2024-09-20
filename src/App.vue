<template>
  <div id="app">
    <Header />
    <div class="main-layout">
      <Sidebar />
      <div class="content">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    Header,
    Sidebar,
    Footer
  },
  methods: {
    ...mapActions(['initializeAuth']),
  },
  created() {
    // 앱이 초기화될 때 localStorage에서 유저 정보 및 토큰을 가져와 Vuex에 저장
    this.initializeAuth();
  },
};
</script>

<style>
/* 전역 스타일 */
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-layout {
  display: flex;
  flex: 1;
}

.content {
  margin-left: 200px; /* Sidebar가 차지하는 너비 */
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
}
</style>