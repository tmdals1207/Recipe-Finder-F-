<template>
    <div>
      <h1>Recipe List</h1>
      <ul>
        <li v-for="recipe in recipes" :key="recipe.id">
          {{ recipe.name }}
        </li>
      </ul>
    </div>
  </template>
  
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
          const response = await axios.get('/api/recipes');
          this.recipes = response.data;
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* 스타일 설정 */
  </style>
  