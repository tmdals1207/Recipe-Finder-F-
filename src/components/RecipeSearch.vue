<template>
  <div class="relative w-full">
    <div class="flex items-center">
      <input 
        v-model="query" 
        @keyup.enter="searchRecipes"
        placeholder="레시피 검색" 
        class="w-full px-4 py-2 rounded-l-full border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
      <button 
        @click="searchRecipes" 
        class="bg-orange-500 text-white px-6 py-2 rounded-r-full hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        검색
      </button>
    </div>

    <div v-if="recipes.length" class="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <h2 class="sr-only">검색 결과</h2>
      <ul class="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        <li v-for="recipe in recipes" :key="recipe.url" class="hover:bg-orange-50 transition duration-150 ease-in-out">
          <a 
            @click.prevent="openNutritionInfo(recipe.url)" 
            href="#" 
            class="flex items-center p-4 space-x-4"
          >
            <img :src="recipe.image" :alt="`${recipe.title} 이미지`" class="w-16 h-16 object-cover rounded-md" />
            <span class="flex-1 text-gray-800 font-medium">{{ recipe.title }}</span>
          </a>
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
      if (!this.query.trim()) return;

      try {
        const response = await axios.get('http://localhost:8080/api/edamam/search', {
          params: { query: this.query },
        });
        this.recipes = response.data;
        console.log(this.recipes);
      } catch (error) {
        console.error('Error searching recipes:', error);
      }
    },
    ...mapActions(['setRecipeUrl']),
    openNutritionInfo(url) {
      this.setRecipeUrl(url);
      this.$router.push('/nutrition');
      this.recipes = []; // 검색 결과 초기화
      this.query = ''; // 검색어 초기화
    },
  },
};
</script>