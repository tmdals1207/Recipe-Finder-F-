<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          맛있는 레시피에 로그인
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          또는
          <router-link to="/register" class="font-medium text-orange-600 hover:text-orange-500">
            새 계정 만들기
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">이메일 주소</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required v-model="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              placeholder="이메일 주소" />
          </div>
          <div>
            <label for="password" class="sr-only">비밀번호</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required
              v-model="password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              placeholder="비밀번호" />
          </div>
        </div>

        <div>
          <button type="submit" :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-orange-500 group-hover:text-orange-400" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd" />
              </svg>
            </span>
            {{ loading ? '로그인 중...' : '로그인' }}
          </button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-3">
          <div>
            <button @click="loginWithOAuth('google')"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-150 ease-in-out">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
              </svg>
            </button>
          </div>

          <div>
            <button @click="loginWithOAuth('naver')"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-150 ease-in-out">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.273 12.845L7.376 0H0v24h7.726V11.155L16.624 24H24V0h-7.727v12.845z" />
              </svg>
            </button>
          </div>

          <div>
            <button @click="loginWithOAuth('kakao')"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-150 ease-in-out">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 3c-5.52 0-10 3.53-10 7.88c0 2.94 1.97 5.52 4.96 6.97l-1.07 3.58c-.14.47.29.89.74.72l4.09-1.75C11.14 20.45 11.57 20.5 12 20.5c5.52 0 10-3.53 10-7.88C22 6.53 17.52 3 12 3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <p v-if="loginError" class="mt-2 text-center text-sm text-red-600">
        {{ loginError }}
      </p>
    </div>
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
        this.loading = false;
      }
    }
    ,
    loginWithOAuth(provider) {
      window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    },
  },
};
</script>