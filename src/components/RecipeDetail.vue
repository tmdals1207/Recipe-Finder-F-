<template>
  <div v-if="recipe">
    <h1 class="text-4xl font-bold text-orange-600 mb-4">{{ recipe.title }}</h1>
    <img :src="recipe.profileImage" alt="Recipe Image" class="w-full h-64 object-cover mb-4" />
    <p><strong>작성자:</strong> {{ recipe.authorProfile }}</p>
    <p><strong>요약:</strong> {{ recipe.summation }}</p>
    <p><strong>난이도:</strong> {{ recipe.difficulty }}</p>
    <p><strong>조리 시간:</strong> {{ recipe.cookingTime }} 분</p>
    <p><strong>재료:</strong></p>
    <ul>
      <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">{{ ingredient.name }}: {{ ingredient.amount }}</li>
    </ul>
    <p><strong>조리법:</strong></p>
    <ol>
      <li v-for="(step, index) in recipe.cookingSteps" :key="index">{{ index + 1 }}. {{ step.description }}</li>
    </ol>
    <p><strong>팁:</strong> {{ recipe.tips }}</p>
  </div>
  <p v-else>Loading...</p>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'], // 라우터에서 받은 id props
  data() {
    return {
      recipe: null,
    };
  },
  created() {
    this.fetchRecipe();
  },
  methods: {
    async fetchRecipe() {
      try {
        const response = await axios.get(`/api/recipes/${this.id}`);
        this.recipe = response.data;
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    }
  }
};
</script>
