import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    token: null,
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
  },
});
