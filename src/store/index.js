import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearAuthData(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  actions: {
    setAuthData({ commit }, authData) {
      commit('setToken', authData.token);
      commit('setUser', authData.user);
    },
    logout({ commit }) {
      commit('clearAuthData');
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
