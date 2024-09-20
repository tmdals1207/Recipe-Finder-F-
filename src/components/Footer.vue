<template>
    <footer class="bg-gradient-to-r from-orange-100 to-yellow-100 shadow-md mt-8">
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-wrap justify-between">
          <div class="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 class="text-xl font-bold text-orange-600 mb-4">맛있는 레시피</h3>
            <p class="text-gray-600">맛있는 요리의 세계로 여러분을 초대합니다. 우리의 레시피로 여러분의 주방을 더욱 특별하게 만들어보세요.</p>
          </div>
          <div class="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 class="text-lg font-semibold text-orange-600 mb-4">빠른 링크</h4>
            <ul class="space-y-2">
              <li><router-link to="/" class="text-gray-600 hover:text-orange-600 transition duration-300">홈</router-link></li>
              <li><router-link to="/recipes" class="text-gray-600 hover:text-orange-600 transition duration-300">레시피 목록</router-link></li>
              <li><router-link to="/about" class="text-gray-600 hover:text-orange-600 transition duration-300">소개</router-link></li>
              <li><router-link to="/contact" class="text-gray-600 hover:text-orange-600 transition duration-300">문의하기</router-link></li>
            </ul>
          </div>
          <div class="w-full md:w-1/3">
            <h4 class="text-lg font-semibold text-orange-600 mb-4">뉴스레터 구독</h4>
            <form @submit.prevent="subscribeNewsletter" class="flex">
              <input 
                type="email" 
                v-model="email" 
                placeholder="이메일 주소" 
                class="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
              <button 
                type="submit" 
                class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md transition duration-300"
              >
                구독
              </button>
            </form>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; 홍승민. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    data() {
      return {
        email: ''
      }
    },
    methods: {
      subscribeNewsletter() {
        // 여기에 뉴스레터 구독 로직을 구현하세요
        console.log('Subscribing:', this.email);
        // 구독 후 이메일 입력 필드 초기화
        this.email = '';
      }
    }
  }
  </script>