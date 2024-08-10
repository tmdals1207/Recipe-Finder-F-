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
    // 프록시를 통해 백엔드로 요청
    const url = '/api/recipes/all';
    console.log('Requesting URL:', url);
    const response = await axios.get(url);
    this.recipes = response.data;
    console.log("Recipes fetched successfully");
    console.log('Recipes data:', this.recipes);
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
        {{ recipe.name }}
      </li>
    </ul>
    <p v-else>No recipes found.</p>
  </div>
</template>

  
  <style scoped>
  /* 스타일 설정 */
  </style>
  