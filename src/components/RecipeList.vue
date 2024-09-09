<script>
import axios from 'axios';

export default {
  data() {
    return {
      recipes: [],
    };
  },
  created() {
    this.fetchRecipes();
  },
  methods: {
    async fetchRecipes() {
      try {
        // 백엔드에서 레시피 데이터 가져오기
        const url = '/api/recipes/all';
        const response = await axios.get(url);
        this.recipes = response.data;
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>Recipe List</h1>
    <ul v-if="recipes.length">
      <li v-for="recipe in recipes" :key="recipe.id">
        <h2>{{ recipe.title }}</h2> <!-- 레시피 제목 표시 -->
        <p><strong>작성자:</strong> {{ recipe.authorProfile }}</p> <!-- 작성자 표시 -->
        <p><strong>요약:</strong> {{ recipe.summation }}</p> <!-- 요약 표시 -->
      </li>
    </ul>
    <p v-else>No recipes found.</p>
  </div>
</template>

<style scoped>
/* 스타일 설정 */
h2 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

p {
  margin: 0.5em 0;
}
</style>
