<template>
    <div class="mypage">
      <h1>My Page</h1>
  
      <!-- 개인 정보 관리 -->
      <section>
        <h2>개인 정보 관리</h2>
        <div class="profile-picture">
          <label>프로필 사진:</label>
          <input type="file" @change="uploadProfilePicture" />
        </div>
        <div class="profile-info">
          <label>이름/별명:</label>
          <input v-model="name" placeholder="이름/별명 입력" />
        </div>
        <div class="email">
          <label>이메일 주소:</label>
          <input v-model="email" placeholder="이메일 입력" />
        </div>
        <div class="phone-number">
          <label>전화번호:</label>
          <input v-model="phone" placeholder="전화번호 입력" />
        </div>
        <div class="password">
          <label>비밀번호 변경:</label>
          <input type="password" v-model="password" placeholder="새 비밀번호 입력" />
        </div>
        <button @click="savePersonalInfo">저장</button>
      </section>
  
      <!-- 알림 설정 -->
      <section>
        <h2>알림 확인</h2>
        <div>
          <label>
            <input type="checkbox" v-model="emailNotifications" />
            이메일 알림
          </label>
          <label>
            <input type="checkbox" v-model="smsNotifications" />
            SMS 알림
          </label>
        </div>
        <button @click="saveNotificationSettings">저장</button>
      </section>
  
      <!-- 활동 내역 -->
      <section>
        <h2>활동 내역</h2>
        <div>
          <h3>이용 기록</h3>
          <ul>
            <li v-for="record in activityRecords" :key="record.id">{{ record }}</li>
          </ul>
        </div>
      </section>
  
      <!-- 팔로잉/팔로워 -->
      <section>
        <h2>팔로잉 / 팔로워</h2>
        <div class="following-followers">
          <div class="following">
            <h3>팔로잉</h3>
            <ul>
              <li v-for="user in following" :key="user.id">{{ user.name }}</li>
            </ul>
          </div>
          <div class="followers">
            <h3>팔로워</h3>
            <ul>
              <li v-for="user in followers" :key="user.id">{{ user.name }}</li>
            </ul>
          </div>
        </div>
      </section>
  
      <!-- 기타 옵션 -->
      <section>
        <h2>기타 옵션</h2>
        <div class="address-management">
          <label>주소 관리:</label>
          <input v-model="address" placeholder="주소 입력" />
        </div>
        <div class="coupons">
          <h3>쿠폰/프로모션 코드</h3>
          <ul>
            <li v-for="coupon in coupons" :key="coupon.code">{{ coupon.code }} - {{ coupon.discount }}%</li>
          </ul>
        </div>
        <button @click="saveOtherSettings">저장</button>
      </section>
  
      <!-- 고객 지원 -->
      <section>
        <h2>고객 지원</h2>
        <div class="faq">
          <h3>FAQ</h3>
          <ul>
            <li v-for="faq in faqs" :key="faq.id">{{ faq.question }}</li>
          </ul>
        </div>
        <div class="contact-support">
          <h3>1:1 문의</h3>
          <textarea v-model="supportMessage" placeholder="문의 내용을 작성하세요"></textarea>
          <button @click="sendSupportMessage">문의 보내기</button>
        </div>
      </section>
  
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 개인 정보 관리
        name: '',
        email: '',
        phone: '',
        password: '',
  
        // 알림 설정
        emailNotifications: false,
        smsNotifications: false,
  
        // 활동 내역
        activityRecords: [],
  
        // 팔로잉 / 팔로워
        following: [],
        followers: [],
  
        // 기타 옵션
        address: '',
        coupons: [],
        faqs: [],
        supportMessage: ''
      };
    },
    methods: {
      // 프로필 사진 업로드 처리
      uploadProfilePicture(event) {
        const file = event.target.files[0];
        // 파일 업로드 처리 로직 추가
      },
      savePersonalInfo() {
        // 개인 정보 저장 처리 로직
        console.log("개인 정보 저장:", this.name, this.email, this.phone);
      },
      saveNotificationSettings() {
        // 알림 설정 저장 처리 로직
        console.log("알림 설정 저장:", this.emailNotifications, this.smsNotifications);
      },
      saveOtherSettings() {
        // 기타 옵션 저장 처리 로직
        console.log("기타 옵션 저장:", this.address, this.coupons);
      },
      sendSupportMessage() {
        // 1:1 문의 보내기 처리 로직
        console.log("문의 내용:", this.supportMessage);
      }
    }
  };
  </script>
  
  <style scoped>
  .mypage {
    padding: 20px;
  }
  
  section {
    margin-bottom: 20px;
  }
  
  h2 {
    margin-bottom: 10px;
  }
  
  input, textarea {
    display: block;
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
    max-width: 400px;
  }
  
  button {
    margin-top: 10px;
  }
  </style>
  