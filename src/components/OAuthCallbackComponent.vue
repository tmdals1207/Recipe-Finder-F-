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
        ...mapGetters(['isAuthenticated', 'token']),
    },
    methods: {
        ...mapActions(['setAuthData']),
        async fetchOAuthUserInfo() {
            try {
                const token = localStorage.getItem('token');  // 또는 다른 저장소에서 토큰을 가져옴


                const response = await axios.get('http://localhost:8080/oauth2/loginInfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.user);

                const { token: newToken, user } = response.data;
                this.setAuthData({
                    token: newToken,
                    user: user,
                });

                this.$router.push('/');
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