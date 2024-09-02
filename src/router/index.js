import { createRouter, createWebHistory } from 'vue-router';
import RecipeList from '@/components/RecipeList.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import RecipeSearch from '@/components/RecipeSearch.vue';
import NutritionInfo from '@/components/NutritionInfo.vue';
import MealPlanner from '@/components/MealPlanner.vue';
import store from '@/store';  // Vuex 스토어를 임포트하여 인증 상태를 확인
import OAuthCallbackComponent from '@/components/OAuthCallbackComponent.vue';


// 라우트 구성
const routes = [
  {
    path: '/',
    name: 'Home',
    component: RecipeList,
    // meta: { requiresAuth: true },  // 인증이 필요한 페이지로 설정
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/oauth2/callback',
    name: 'OAuthCallback',
    component: OAuthCallbackComponent,
  },
  {

    path: '/recipeSearch',
    name: 'RecipeSearch',
    component: RecipeSearch,
    meta: { requiresAuth: true },  // 인증이 필요한 페이지로 설정
  },
  {
    path: '/nutrition',
    name: 'NutritionInfo',
    component: NutritionInfo,
    meta: { requiresAuth: true },  // 인증이 필요한 페이지로 설정
  },
  {
    path: '/meal-planner',
    name: 'MealPlanner',
    component: MealPlanner,
    meta: { requiresAuth: true },  // 인증이 필요한 페이지로 설정
  },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 라우트 진입 전 가드 설정
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated; // Vuex 스토어에서 인증 상태 확인
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) { // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      next('/login');
    }
    else {
      next(); // 인증된 경우 해당 페이지로 이동
    }
  } else {
    next();
  }
});

export default router;