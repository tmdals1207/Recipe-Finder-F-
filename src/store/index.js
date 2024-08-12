import { createStore } from 'vuex';

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
    login({ commit }, authData) {
      // 로그인 처리 및 토큰 설정
      return axios.post('http://localhost:8080/api/auth/login', authData)
        .then(response => {
          commit('setToken', response.data.token);
          commit('setUser', response.data.user);
        });
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
  },
});
