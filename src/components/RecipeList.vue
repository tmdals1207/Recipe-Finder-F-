<template>
  <div class="my-8">
    <h1 class="text-3xl font-bold text-orange-600 mb-6">레시피 목록</h1>
    <div v-if="recipes.length" class="relative">
      <div
        ref="recipeList"
        class="recipe-list flex overflow-x-auto pb-4 space-x-4 snap-x snap-mandatory scrollbar-hide"
        v-drag-scroll
      >
        <div
          v-for="recipe in recipes"
          :key="recipe.id"
          class="recipe-card flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden snap-start"
        >
          <img :src="recipe.image || '/placeholder.svg?height=150&width=288'" :alt="recipe.title" class="w-full h-40 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ recipe.title }}</h2>
            <p class="text-sm text-gray-600 mb-2"><strong>작성자:</strong> {{ recipe.authorProfile }}</p>
            <p class="text-sm text-gray-700">{{ recipe.summation }}</p>
          </div>
        </div>
      </div>
      <div class="scrollbar mt-2 h-1 bg-gray-200 rounded-full">
        <div class="scrollbar-thumb h-full bg-orange-500 rounded-full" :style="{ width: scrollProgress + '%' }"></div>
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
  created() {
    this.fetchRecipes();
  },
  mounted() {
    this.initializeScrollListener();
  },
  methods: {
    async fetchRecipes() {
      try {
        const url = '/api/recipes/all';
        const response = await axios.get(url);
        this.recipes = response.data;
        // 데이터가 로드된 후 스크롤 리스너 초기화
        await nextTick();
        this.initializeScrollListener();
      } catch (error) {
        console.error('Error fetching recipes:', error);
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