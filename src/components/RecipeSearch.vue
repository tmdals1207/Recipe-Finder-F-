<template>
  <div>
    <h1>Recipe Search</h1>
    <input v-model="query" placeholder="Enter recipe name" />
    <button @click="searchRecipes">Search</button>

    <div v-if="recipes.length">
      <h2>Results:</h2>
      <ul>
        <li v-for="recipe in recipes" :key="recipe.url">
          <img :src="recipe.image" alt="Recipe Image" width="100" />
          <a @click.prevent="openNutritionInfo(recipe.url)" href="#">{{ recipe.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      query: '',
      recipes: [],
    };
  },
  methods: {
    async searchRecipes() {
      try {
        const response = await axios.get('http://localhost:8080/api/edamam/search', {
          params: { query: this.query },
        });
        this.recipes = response.data;
      } catch (error) {
        console.error('Error searching recipes:', error);
      }
    },
    ...mapActions(['setRecipeUrl']),
    openNutritionInfo(url) {
      this.setRecipeUrl(url); // Vuex로 URL 저장
      this.$router.push('/nutrition'); // NutritionInfo 페이지로 이동
    },
  },
};
</script>
