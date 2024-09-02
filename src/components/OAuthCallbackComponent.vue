<template>
    <div>
        <h2>OAuth 로그인 중...</h2>
        <p v-if="loginError" style="color: red;">{{ loginError }}</p>
    </div>
    <div>
        <p v-if="isAuthenticated">Token: {{ token }}</p>
        <p v-else>No token available</p>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            loginError: null,
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'token', 'user']),
    },
    methods: {
        ...mapActions(['setAuthData']),
        async fetchOAuthUserInfo() {
            try {
                // 현재 URL에서 쿼리 파라미터로부터 토큰 추출
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get('token');

                if (token) {
                    // 토큰을 로컬 스토리지에 저장
                    localStorage.setItem('token', token);

                    // Vuex 스토어에 저장
                    this.setAuthData({
                        token: token
                    });

                    // 사용자 정보를 백엔드에서 가져올 경우
                    const response = await axios.get('http://localhost:8080/oauth2/getUser', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }); console.log('Response from getUser API:', response);

                    const user = response.data;
                    if (user) {
                        this.setAuthData({
                            token: token,
                            user: user, // user 객체를 Vuex에 저장
                        });
                        console.log('User set in Vuex:', user);  // Vuex에 저장된 user 데이터 확인
                    } else {
                        throw new Error('User data not found in response');
                    }
                    this.$router.push('/'); // 홈으로 리디렉션
                } else {
                    throw new Error('Token not found in URL');
                }
            } catch (error) {
                console.error('OAuth2 사용자 정보 가져오기 실패:', error);
                this.loginError = 'OAuth2 로그인 실패: 사용자 정보를 가져오는 데 실패했습니다.';
            } finally {
                this.loading = false;
            }
        }

    },
    mounted() {
        // 컴포넌트가 로드될 때 사용자 정보를 가져옴
        this.fetchOAuthUserInfo();
    },
};
</script>

