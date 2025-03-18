<template>
  <div class="my-8">
    <h1 class="text-3xl font-bold text-orange-600 mb-6">레시피 목록</h1>
    <div v-if="recipes.length" class="relative">
      <div ref="recipeList" class="recipe-list flex overflow-x-auto pb-4 space-x-4 snap-x snap-mandatory" v-drag-scroll>

        <div v-for="recipe in recipes" :key="recipe.id"
          class="recipe-card flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden snap-start"
          @click="goToRecipeDetail(recipe.id)">
          <img :src="recipe.profileImageUrl" :alt="recipe.title" class="w-full h-40 object-cover" />

          <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ recipe.title }}</h2>
            <p class="text-sm text-gray-600 mb-2"><strong>작성자:</strong> {{ recipe.authorProfile }}</p>
            <p class="text-sm text-gray-700">{{ recipe.summation }}</p>
          </div>
        </div>
      </div>
      <div class="scrollbar mt-2 h-1 bg-gray-300 rounded-full">
        <div class="scrollbar-thumb h-full bg-orange-600 rounded-full" :style="{ width: scrollProgress + '%' }"></div>
      </div>
    </div>
    <p v-else class="text-gray-600">레시피를 찾을 수 없습니다.</p>
  </div>
</template>

<script>
import axios from 'axios';
import { nextTick } from 'vue';

export default {
  data() {
    return {
      recipes: [],
      scrollProgress: 0
    };
  },
  async created() {
    await this.fetchRecipes();
  },
  mounted() {
    this.initializeScrollListener();
  },
  methods: {
    async fetchRecipes() {
      try {
        const url = '/api/recipes/all';
        const response = await axios.get(url);

        const fetchedRecipes = response.data;
        
        const updatedRecipes = await Promise.all(
          fetchedRecipes.map(async (recipe) => {
            const imageUrl = await this.getProfileImage(recipe.profileImage);
            return { ...recipe, profileImageUrl: imageUrl };
          })
        );

        this.recipes = updatedRecipes;
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    },
    async getProfileImage(profileImagePath) {
      if (!profileImagePath) {
        return '/placeholder.svg'; // 기본 이미지
      }

      try {
        const response = await axios.get(`/api/recipes/images/get`, {
          params: { path: profileImagePath },
          responseType: 'blob', // 이미지를 Blob 형식으로 받아옴
        });

        // Blob 데이터를 Object URL로 변환하여 반환
        return URL.createObjectURL(response.data);
      } catch (error) {
        console.error('Error fetching profile image:', error);
        return '/placeholder.svg'; // 오류 시 기본 이미지 반환
      }
    },
    async fetchProfileImages() {
      for (const recipe of this.recipes) {
        recipe.profileImageUrl = await this.getProfileImage(recipe.image);
      }
    },
    initializeScrollListener() {
      nextTick(() => {
        const container = this.$refs.recipeList;
        if (container) {
          container.addEventListener('scroll', this.handleScroll);
        }
      });
    },
    handleScroll(event) {
      const container = event.target;
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      this.scrollProgress = (scrollLeft / scrollWidth) * 100;
    },
    goToRecipeDetail(recipeId) {
      this.$router.push({ name: 'RecipeDetail', params: { id: recipeId } }); // 레시피 ID를 포함하여 라우팅
    }
  },
  directives: {
    dragScroll: {
      mounted(el) {
        let isDown = false;
        let startX;
        let scrollLeft;

        el.addEventListener('mousedown', (e) => {
          isDown = true;
          el.classList.add('active');
          startX = e.pageX - el.offsetLeft;
          scrollLeft = el.scrollLeft;
        });

        el.addEventListener('mouseleave', () => {
          isDown = false;
          el.classList.remove('active');
        });

        el.addEventListener('mouseup', () => {
          isDown = false;
          el.classList.remove('active');
        });

        el.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - el.offsetLeft;
          const walk = (x - startX) * 2;
          el.scrollLeft = scrollLeft - walk;
        });
      }
    }
  },
  beforeUnmount() {
    // 컴포넌트가 제거될 때 이벤트 리스너 제거
    const container = this.$refs.recipeList;
    if (container) {
      container.removeEventListener('scroll', this.handleScroll);
    }
  }
};
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.recipe-list {
  cursor: grab;
}

.recipe-list:active {
  cursor: grabbing;
}

.recipe-card {
  transition: transform 0.3s ease;
}

.recipe-card:hover {
  transform: translateY(-5px);
}
</style>