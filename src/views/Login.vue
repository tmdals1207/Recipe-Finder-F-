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
      loading: false,
    };
  },
  methods: {
    ...mapActions(['setAuthData']),
    async onSubmit() {
      this.loading = true;
      try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          email: this.email,
          password: this.password,
        });

        if (response.data.user) {
          this.setAuthData({
            token: response.data.token,
            user: response.data.user,
          });
          this.$router.push('/');
        } else {
          console.error("사용자 정보가 없습니다.");
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.loginError = '로그인 실패: 이메일 또는 비밀번호를 확인하세요.';
      } finally {
        this.loading = false;
      }
    },
    loginWithOAuth(provider) {
      console.log("OAuth 로그인 시작");
      window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    },
  },
};
</script>
