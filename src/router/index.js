import { createRouter, createWebHistory } from 'vue-router';
import RecipeList from '../components/RecipeList.vue';

const routes = [
  {
    path: '/',
    name: 'RecipeList',
    component: RecipeList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
