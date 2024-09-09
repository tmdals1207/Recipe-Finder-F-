<template>
    <div>
      <h1>새로운 레시피 등록</h1>
      <form @submit.prevent="submitRecipe">
        <div>
          <label for="title">레시피 제목</label>
          <input type="text" v-model="recipe.title" id="title" required />
        </div>
        <div>
          <label for="title">레시피 요약</label>
          <input type="text" v-model="recipe.title" id="summation" required />
        </div>
        <div>
          <label for="content">레시피 내용</label>
          <textarea v-model="recipe.content" id="content" required></textarea>
        </div>
        <div>
          <label for="servings">몇인분</label>
          <input type="number" v-model="recipe.servings" id="servings" required />
        </div>
        <div>
          <label for="cookingTime">조리 시간 (분)</label>
          <input type="number" v-model="recipe.cookingTime" id="cookingTime" required />
        </div>
        <div>
          <label for="difficulty">난이도</label>
          <select v-model="recipe.difficulty" id="difficulty" required>
            <option>쉬움</option>
            <option>중간</option>
            <option>어려움</option>
          </select>
        </div>
        <div>
          <label for="ingredients">재료</label>
          <input type="text" v-model="newIngredient" @keyup.enter="addIngredient" placeholder="재료 입력 후 Enter" />
          <ul>
            <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
              {{ ingredient }}
              <button type="button" @click="removeIngredient(index)">제거</button>
            </li>
          </ul>
        </div>
        <div>
          <label for="seasonings">양념</label>
          <input type="text" v-model="newSeasoning" @keyup.enter="addSeasoning" placeholder="양념 입력 후 Enter" />
          <ul>
            <li v-for="(seasoning, index) in recipe.seasonings" :key="index">
              {{ seasoning }}
              <button type="button" @click="removeSeasoning(index)">제거</button>
            </li>
          </ul>
        </div>
        <div>
          <label for="tips">팁과 주의사항</label>
          <textarea v-model="recipe.tips" id="tips"></textarea>
        </div>
        <button type="submit">레시피 등록</button>
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
          content: '',
          servings: 1,
          cookingTime: 30,
          difficulty: '쉬움',
          ingredients: [],
          seasonings: [],
          tips: ''
        },
        newIngredient: '',
        newSeasoning: ''
      };
    },
    methods: {
      submitRecipe() {
        axios.post('http://localhost:8080/api/recipes', this.recipe)
          .then(response => {
            alert('레시피가 성공적으로 등록되었습니다!');
            this.$router.push('/recipes');
          })
          .catch(error => {
            console.error(error);
            alert('레시피 등록에 실패했습니다.');
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
      }
    }
  };
  </script>
  