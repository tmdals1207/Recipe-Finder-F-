<template>
    <div class="bg-white h-full w-64 fixed left-0 top-0 overflow-y-auto shadow-lg transition-all duration-300 ease-in-out"
         :class="{ '-translate-x-full': !isOpen }">
      <div class="p-5">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-orange-600">맛있는 레시피</h2>
          <button @click="toggleSidebar" class="text-gray-500 hover:text-gray-700 lg:hidden">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <nav class="mb-8">
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="block py-2 px-4 rounded transition duration-200 hover:bg-orange-100 hover:text-orange-600">
                홈
              </router-link>
            </li>
            <li>
              <router-link to="/recipes" class="block py-2 px-4 rounded transition duration-200 hover:bg-orange-100 hover:text-orange-600">
                레시피 목록
              </router-link>
            </li>
            <li>
              <router-link to="/categories" class="block py-2 px-4 rounded transition duration-200 hover:bg-orange-100 hover:text-orange-600">
                카테고리
              </router-link>
            </li>
            <li>
              <router-link to="/my-recipes" class="block py-2 px-4 rounded transition duration-200 hover:bg-orange-100 hover:text-orange-600">
                내 레시피
              </router-link>
            </li>
            <li>
              <router-link to="/favorites" class="block py-2 px-4 rounded transition duration-200 hover:bg-orange-100 hover:text-orange-600">
                즐겨찾기
              </router-link>
            </li>
          </ul>
        </nav>
        
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-700 mb-3">인기 카테고리</h3>
          <ul class="space-y-2">
            <li v-for="category in popularCategories" :key="category.id">
              <a :href="category.link" class="block py-2 px-4 rounded transition duration-200 hover:bg-orange-100 hover:text-orange-600">
                {{ category.name }}
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">오늘의 레시피</h3>
          <div class="bg-orange-100 rounded-lg p-4">
            <img :src="todayRecipe.image" :alt="todayRecipe.name" class="w-full h-32 object-cover rounded-lg mb-2">
            <h4 class="font-medium text-orange-600">{{ todayRecipe.name }}</h4>
            <p class="text-sm text-gray-600">{{ todayRecipe.description }}</p>
            <a :href="todayRecipe.link" class="mt-2 inline-block text-sm text-orange-600 hover:underline">
              레시피 보기
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Sidebar',
    data() {
      return {
        isOpen: false,
        popularCategories: [
          { id: 1, name: '한식', link: '/category/korean' },
          { id: 2, name: '양식', link: '/category/western' },
          { id: 3, name: '중식', link: '/category/chinese' },
          { id: 4, name: '일식', link: '/category/japanese' },
          { id: 5, name: '베이킹', link: '/category/baking' },
        ],
        todayRecipe: {
          name: '스파게티 카르보나라',
          description: '크리미한 소스와 바삭한 베이컨의 완벽한 조화',
          image: '/placeholder.svg?height=128&width=256',
          link: '/recipe/spaghetti-carbonara'
        }
      }
    },
    methods: {
      toggleSidebar() {
        this.isOpen = !this.isOpen;
      }
    }
  }
  </script>