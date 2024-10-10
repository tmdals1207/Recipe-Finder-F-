<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-orange-600 mb-8">새로운 레시피 등록</h1>
    <form @submit.prevent="submitRecipe" class="space-y-6" enctype="multipart/form-data">
      <!-- 레시피 제목 및 요약 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">레시피 제목</label>
          <input type="text" v-model="recipe.title" id="title" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
        </div>
        <div>
          <label for="summation" class="block text-sm font-medium text-gray-700 mb-1">레시피 요약</label>
          <input type="text" v-model="recipe.summation" id="summation" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
        </div>
      </div>

      <!-- 프로필 사진 -->
      <div>
        <label for="profileImage" class="block text-sm font-medium text-gray-700 mb-1">프로필 사진</label>
        <input type="file" @change="handleProfileImageUpload" id="profileImage" accept="image/*"
               class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
      </div>

      <!-- 레시피 내용 및 인분 수, 조리 시간, 난이도 -->
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 mb-1">레시피 내용</label>
        <textarea v-model="recipe.content" id="content" required rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"></textarea>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label for="servings" class="block text-sm font-medium text-gray-700 mb-1">몇인분</label>
          <input type="number" v-model.number="recipe.servings" id="servings" required min="1"
                 class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
        </div>
        <div>
          <label for="cookingTime" class="block text-sm font-medium text-gray-700 mb-1">조리 시간 (분)</label>
          <input type="number" v-model.number="recipe.cookingTime" id="cookingTime" required min="1"
                 class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
        </div>
        <div>
          <label for="difficulty" class="block text-sm font-medium text-gray-700 mb-1">난이도</label>
          <select v-model="recipe.difficulty" id="difficulty" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500">
            <option>쉬움</option>
            <option>중간</option>
            <option>어려움</option>
          </select>
        </div>
      </div>

      <!-- 재료 및 양념 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">재료</label>
          <div class="flex">
            <input type="text" v-model="newIngredient" @keyup.enter="addIngredient" placeholder="재료 입력 후 Enter"
                   class="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
            <button type="button" @click="addIngredient"
                    class="px-4 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              추가
            </button>
          </div>
          <ul class="mt-2 space-y-1">
            <li v-for="(ingredient, index) in recipe.ingredients" :key="index"
                class="flex justify-between items-center bg-orange-100 px-3 py-2 rounded-md">
              <span>{{ ingredient }}</span>
              <button type="button" @click="removeIngredient(index)"
                      class="text-red-600 hover:text-red-800 focus:outline-none">
                삭제
              </button>
            </li>
          </ul>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">양념</label>
          <div class="flex">
            <input type="text" v-model="newSeasoning" @keyup.enter="addSeasoning" placeholder="양념 입력 후 Enter"
                   class="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
            <button type="button" @click="addSeasoning"
                    class="px-4 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              추가
            </button>
          </div>
          <ul class="mt-2 space-y-1">
            <li v-for="(seasoning, index) in recipe.seasonings" :key="index"
                class="flex justify-between items-center bg-orange-100 px-3 py-2 rounded-md">
              <span>{{ seasoning }}</span>
              <button type="button" @click="removeSeasoning(index)"
                      class="text-red-600 hover:text-red-800 focus:outline-none">
                삭제
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- 태그 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">태그</label>
        <div class="flex">
          <input type="text" v-model="newTag" @keyup.enter="addTag" placeholder="태그 입력 후 Enter"
                 class="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
          <button type="button" @click="addTag"
                  class="px-4 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
            추가
          </button>
        </div>
        <div class="mt-2 flex flex-wrap gap-2">
          <span v-for="(tag, index) in recipe.tags" :key="index"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
            {{ tag }}
            <button type="button" @click="removeTag(index)" class="ml-2 text-orange-600 hover:text-orange-800 focus:outline-none">
              &times;
            </button>
          </span>
        </div>
      </div>

      <!-- 조리 순서 -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">조리 순서</h2>
        <div v-for="(step, index) in recipe.cookingSteps" :key="index" class="mb-4 p-4 bg-orange-50 rounded-lg">
          <h3 class="text-lg font-medium text-orange-600 mb-2">Step {{ index + 1 }}</h3>
          <textarea v-model="step.description" placeholder="조리 설명" rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 mb-2"></textarea>
          <div class="flex items-center space-x-4">
            <input type="file" @change="handleStepImageUpload(index, $event)"
                   accept="image/*"
                   class="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
            <button type="button" @click="removeCookingStep(index)"
                    class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              순서 제거
            </button>
          </div>
        </div>
        <button type="button" @click="addCookingStep"
                class="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          조리 순서 추가
        </button>
      </div>

      <!-- 팁과 주의사항 -->
      <div>
        <label for="tips" class="block text-sm font-medium text-gray-700 mb-1">팁과 주의사항</label>
        <textarea v-model="recipe.tips" id="tips" rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"></textarea>
      </div>

      <button type="submit"
              class="w-full px-6 py-3 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-300">
        레시피 등록
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      recipe: {
        title: '',
        summation: '',
        profileImage: null, // File
        content: '',
        servings: 1,
        cookingTime: 30,
        difficulty: '쉬움',
        ingredients: [],
        seasonings: [],
        tips: '',
        tags: [],
        cookingSteps: []
      },
      newIngredient: '',
      newSeasoning: '',
      newTag: ''
    };
  },
  methods: {
    submitRecipe() {
      const formData = new FormData();
      formData.append('title', this.recipe.title);
      formData.append('summation', this.recipe.summation);
      if (this.recipe.profileImage) {
        formData.append('profileImage', this.recipe.profileImage);
      }
      formData.append('content', this.recipe.content);
      formData.append('servings', this.recipe.servings);
      formData.append('cookingTime', this.recipe.cookingTime);
      formData.append('difficulty', this.recipe.difficulty);
      formData.append('ingredients', JSON.stringify(this.recipe.ingredients));
      formData.append('seasonings', JSON.stringify(this.recipe.seasonings));
      formData.append('tips', this.recipe.tips);
      formData.append('tags', JSON.stringify(this.recipe.tags));

      // Prepare cookingSteps without imageUrl
      const cookingStepsData = this.recipe.cookingSteps.map((step, index) => ({
        description: step.description,
        stepNumber: step.stepNumber
      }));
      formData.append('cookingSteps', JSON.stringify(cookingStepsData));

      // Append cookingSteps images separately
      this.recipe.cookingSteps.forEach((step, index) => {
        if (step.imageUrl) {
          formData.append(`cookingSteps[${index}].imageUrl`, step.imageUrl);
        }
      });

      axios.post('http://localhost:8080/api/recipes/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          alert('레시피가 성공적으로 등록되었습니다!');
          this.$router.push('/');
        })
        .catch(error => {
          console.error(error);
          if (error.response && error.response.data && error.response.data.message) {
            alert(`레시피 등록에 실패했습니다: ${error.response.data.message}`);
          } else {
            alert('레시피 등록에 실패했습니다.');
          }
        });
    },
    addIngredient() {
      if (this.newIngredient.trim()) {
        this.recipe.ingredients.push(this.newIngredient.trim());
        this.newIngredient = '';
      }
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    addSeasoning() {
      if (this.newSeasoning.trim()) {
        this.recipe.seasonings.push(this.newSeasoning.trim());
        this.newSeasoning = '';
      }
    },
    removeSeasoning(index) {
      this.recipe.seasonings.splice(index, 1);
    },
    addTag() {
      if (this.newTag.trim()) {
        this.recipe.tags.push(this.newTag.trim());
        this.newTag = '';
      }
    },
    removeTag(index) {
      this.recipe.tags.splice(index, 1);
    },
    addCookingStep() {
      this.recipe.cookingSteps.push({ description: '', imageUrl: null, stepNumber: this.recipe.cookingSteps.length + 1 });
    },
    removeCookingStep(index) {
      this.recipe.cookingSteps.splice(index, 1);
      // Update step numbers
      this.recipe.cookingSteps.forEach((step, idx) => {
        step.stepNumber = idx + 1;
      });
    },
    handleProfileImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.recipe.profileImage = file;
      }
    },
    handleStepImageUpload(index, event) {
      const file = event.target.files[0];
      if (file) {
        this.recipe.cookingSteps[index].imageUrl = file;
      }
    }
  }
};
</script>

<style scoped>
/* 기존 스타일 유지 */
</style>
