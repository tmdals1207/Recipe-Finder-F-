import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    token: null,
    recipeUrl: null,
  },
  mutations: {
    setUser(state, user) {
      console.log('User set in mutation:', user);
      state.user = user;
      localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
    },
    setToken(state, { id, token }) {
      state.token = token;
      localStorage.setItem(`token_${id}`, token);
    },
    clearAuthData(state, id) {
      console.log(`Clearing auth data for user id: ${id}`);
      state.user = null;
      state.token = null;
      localStorage.removeItem(`token_${id}`);
      localStorage.removeItem(`user_${id}`);
    },
    initializeAuth(state) {
      const userId = Object.keys(localStorage).find(key => key.startsWith('user_'));
      if (userId) {
        const user = JSON.parse(localStorage.getItem(userId));
        const token = localStorage.getItem(`token_${user.id}`);
        if (user && token) {
          state.user = user;
          state.token = token;
        }
      }
    },
    setRecipeUrl(state, url) {
      state.recipeUrl = url;
    },
  },
  actions: {
    setAuthData({ commit }, authData) {
      console.log('AuthData received in action:', authData);
      commit('setToken', { id: authData.user.id, token: authData.token });
      commit('setUser', authData.user);
    },
    logout({ commit, state }) {
      const userId = state.user ? state.user.id : null;
      if (userId) {
        commit('clearAuthData', userId);
      }
    
      // 로그아웃 후 리다이렉트 처리
      this.$router.push('/login');
    },
    initializeAuth({ commit }) {
      commit('initializeAuth'); // 로컬 스토리지에서 사용자 정보를 초기화
    },
    setRecipeUrl({ commit }, url) {
      commit('setRecipeUrl', url);
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    user(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    },
    recipeUrl: (state) => state.recipeUrl,
  },
});
