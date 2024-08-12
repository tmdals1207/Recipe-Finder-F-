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
};
</script>

<style>
/* 전역 스타일 */
</style>