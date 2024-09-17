<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">Login</button>
    </form>
    <button @click="loginWithOAuth('google')">Login with Google</button>
    <button @click="loginWithOAuth('naver')">Login with Naver</button>
    <button @click="loginWithOAuth('kakao')">Login with Kakao</button>
    <button @click="$router.push('/register')">Go to Register</button>
    <p v-if="loginError" style="color: red;">{{ loginError }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      loginError: null,
      loading: false, // 로딩 상태 추가
    };
  },
  methods: {
    ...mapActions(['setAuthData']),
    async onSubmit() {
  this.loading = true; // 로딩 시작
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      email: this.email,
      password: this.password,
    });

    console.log("API 응답:", response.data);

    if (response.data.user) {
      const id = response.data.user.id;

      // 이전 사용자 정보 삭제
      const previousToken = localStorage.getItem(`token_${id}`);
      if (previousToken) {
        localStorage.removeItem(`token_${id}`);
        localStorage.removeItem(`user_${id}`);
      }

      // 새로운 사용자 정보 저장
      localStorage.setItem(`token_${id}`, response.data.token);
      localStorage.setItem(`user_${id}`, JSON.stringify(response.data.user));

      // Vuex에도 저장
      this.setAuthData({
        token: response.data.token,
        user: response.data.user,
      });

      console.log("로그인 성공, 홈 페이지로 리다이렉트합니다.");
      this.$router.push('/');
    } else {
      console.error("사용자 정보가 없습니다.");
    }
  } catch (error) {
    console.error('Login failed:', error);
    this.loginError = '로그인 실패: 이메일 또는 비밀번호를 확인하세요.';
  } finally {
    this.loading = false; // 로딩 종료
  }
}
,
    loginWithOAuth(provider) {
      window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    },
  },
};
</script>
