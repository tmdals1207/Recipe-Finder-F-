<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-orange-600 mb-8">마이 페이지</h1>

    <!-- 개인 정보 관리 -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">개인 정보 관리</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col items-center">
          <img :src="profilePicture || defaultProfilePicture" alt="Profile"
            class="w-32 h-32 rounded-full object-cover mb-4" />
          <label
            class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300">
            프로필 사진 변경
            <input type="file" @change="uploadProfilePicture" class="hidden" accept="image/*" />
          </label>
        </div>
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">이름/별명</label>
            <input id="name" v-model="name" placeholder="새 이름/별명 입력"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" />
            <button @click="saveName"
              class="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">이름
              저장</button>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">이메일 주소</label>
            <input id="email" v-model="email" placeholder="새 이메일 입력"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" />
            <button @click="saveEmail"
              class="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">이메일
              저장</button>
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">전화번호</label>
            <input id="phone" v-model="phone" placeholder="새 전화번호 입력"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" />
            <button @click="savePhone"
              class="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">전화번호
              저장</button>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">새 비밀번호</label>
            <input id="password" type="password" v-model="password" placeholder="새 비밀번호 입력"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" />
            <button @click="savePassword"
              class="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">비밀번호
              저장</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 알림 설정 -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">알림 확인</h2>
      <div class="space-y-4">
        <label class="flex items-center space-x-3">
          <input type="checkbox" v-model="emailNotifications"
            class="form-checkbox text-orange-500 rounded focus:ring-orange-500" />
          <span class="text-gray-700">이메일 알림</span>
        </label>
        <label class="flex items-center space-x-3">
          <input type="checkbox" v-model="smsNotifications"
            class="form-checkbox text-orange-500 rounded focus:ring-orange-500" />
          <span class="text-gray-700">SMS 알림</span>
        </label>
      </div>
      <button @click="saveNotificationSettings"
        class="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
        저장
      </button>
    </section>

    <!-- 활동 내역 -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">활동 내역</h2>
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-700">이용 기록</h3>
        <ul class="list-disc list-inside text-gray-600 space-y-2">
          <li v-for="record in activityRecords" :key="record.id">{{ record }}</li>
        </ul>
      </div>
    </section>

    <!-- 팔로잉/팔로워 -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">팔로잉 / 팔로워</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-4">팔로잉</h3>
          <ul class="space-y-2">
            <li v-for="user in following" :key="user.id" class="flex items-center space-x-2">
              <img :src="user.avatar || defaultProfilePicture" alt="User Avatar"
                class="w-8 h-8 rounded-full object-cover" />
              <span class="text-gray-600">{{ user.name }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-4">팔로워</h3>
          <ul class="space-y-2">
            <li v-for="user in followers" :key="user.id" class="flex items-center space-x-2">
              <img :src="user.avatar || defaultProfilePicture" alt="User Avatar"
                class="w-8 h-8 rounded-full object-cover" />
              <span class="text-gray-600">{{ user.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 기타 옵션 -->
    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">기타 옵션</h2>
      <div class="space-y-6">
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700">주소 관리</label>
          <input id="address" v-model="address" placeholder="주소 입력"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50" />
        </div>
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-4">쿠폰/프로모션 코드</h3>
          <ul class="space-y-2">
            <li v-for="coupon in coupons" :key="coupon.code"
              class="flex justify-between items-center bg-orange-100 rounded p-2">
              <span class="font-medium text-orange-600">{{ coupon.code }}</span>
              <span class="text-gray-600">{{ coupon.discount }}% 할인</span>
            </li>
          </ul>
        </div>
      </div>
      <button @click="saveOtherSettings"
        class="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
        저장
      </button>
    </section>

    <!-- 고객 지원 -->
    <section class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">고객 지원</h2>
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-4">FAQ</h3>
          <ul class="space-y-2">
            <li v-for="faq in faqs" :key="faq.id" class="bg-gray-50 rounded p-3">
              <h4 class="font-medium text-gray-800">{{ faq.question }}</h4>
              <p class="text-gray-600 mt-2">{{ faq.answer }}</p>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-4">1:1 문의</h3>
          <textarea v-model="supportMessage" placeholder="문의 내용을 작성하세요" rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"></textarea>
          <button @click="sendSupportMessage"
            class="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            문의 보내기
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      name: '',
      email: '',
      phone: '',
      password: '',
      profilePicture: '',
      defaultProfilePicture: 'https://via.placeholder.com/100',
      emailNotifications: false,
      smsNotifications: false,
      activityRecords: [],
      following: [],
      followers: [],
      address: '',
      coupons: [],
      faqs: [],
      supportMessage: ''
    }
  },
  mounted() {
    const userKey = Object.keys(localStorage).find(key => key.startsWith('user_'));
    const userId = userKey.split('_')[1];
    const user = JSON.parse(localStorage.getItem(userKey));
    if (user) {
      this.id = user.id || '';
      this.name = user.username || '';
      this.email = user.email || '';
      this.phone = user.phone || '';
      this.profilePicture = user.profilePicture || '';
    } else {
      alert("로그인이 필요합니다.!!");
    }
  },
  methods: {
    uploadProfilePicture(event) {
      const file = event.target.files[0];
      // 파일 업로드 처리 로직 추가
    },
    async saveField(field, value) {
      const userKey = Object.keys(localStorage).find(key => key.startsWith('user_'));
      const userId = userKey.split('_')[1];
      const user = JSON.parse(localStorage.getItem(userKey));

      if (!user || !user.id) {
        alert("로그인이 필요합니다.");
        return;
      }

      // 사용자가 현재 자신의 정보와 동일한 값으로 변경하려 할 경우
    if (user[field] === value) {
      switch (field) {
        case 'username':
          alert("현재 사용중인 이름/별명 입니다.");
          break;
        case 'email':
          alert("현재 사용중인 이메일 입니다.");
          break;
        case 'phone':
          alert("현재 사용중인 전화번호 입니다.");
          break;
        default:
          return; // 비밀번호는 제외
      }
      return;
    }

      let endpoint;

      // 필드에 따라 적절한 엔드포인트 설정
      switch (field) {
        case 'username':
          endpoint = '/api/auth/change_username';
          break;
        case 'email':
          endpoint = '/api/auth/change_email';
          break;
        case 'phone':
          endpoint = '/api/auth/change_phone';
          break;
        case 'password':
          endpoint = '/api/auth/change_password';
          break;
        default:
          alert("잘못된 필드입니다.");
          return;
      }

      const updatedUserInfo = {
        id: user.id,
        [field]: value,
      };

      try {
        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`, // 사용자 토큰 추가
          },
          body: JSON.stringify(updatedUserInfo),
        });

        if (response.ok) {
        alert(`${field}가 성공적으로 변경되었습니다.`);
        localStorage.setItem(`user_${userId}`, JSON.stringify({ ...user, [field]: value }));
      } else {
        const errorMessage = await response.text();
        // 서버에서 온 에러 메시지를 기반으로 사용자에게 알림
        if (errorMessage.includes("이미")) {
          alert(`${field === 'username' ? '이름/별명' : field}이(가) 이미 사용 중입니다.`);
        } else {
          alert(`${field} 변경 실패: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert(`${field} 변경 중 에러가 발생했습니다.`);
    }
  },
    async saveName() {
      await this.saveField('username', this.name);
    },
    async saveEmail() {
      await this.saveField('email', this.email);
    },
    async savePhone() {
      await this.saveField('phone', this.phone);
    },
    async savePassword() {
      await this.saveField('password', this.password);
    },
    async saveNotificationSettings() {
      const userKey = Object.keys(localStorage).find(key => key.startsWith('user_'));
      const userId = userKey.split('_')[1];
      const user = JSON.parse(localStorage.getItem(userKey));

      if (!user || !user.id) {
        alert("로그인이 필요합니다.");
        return;
      }

      const notificationSettings = {
        id: user.id,
        emailNotifications: this.emailNotifications,
        smsNotifications: this.smsNotifications
      };

      try {
        const response = await fetch('/api/auth/notification-settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`, // 사용자 토큰 추가
          },
          body: JSON.stringify(notificationSettings)
        });

        if (response.ok) {
          alert("알림 설정이 성공적으로 저장되었습니다.");
          window.location.reload();
        } else {
          const errorMessage = await response.text();
          alert(`알림 설정 저장 실패: ${errorMessage}`);
        }
      } catch (error) {
        console.error("에러 발생:", error);
        alert("알림 설정 저장 중 에러가 발생했습니다.");
      }
    },
    async saveOtherSettings() {
      const userKey = Object.keys(localStorage).find(key => key.startsWith('user_'));
      const userId = userKey.split('_')[1];
      const user = JSON.parse(localStorage.getItem(userKey));

      if (!user || !user.id) {
        alert("로그인이 필요합니다.");
        return;
      }
      
      const otherSettings = {
        id: user.id,
        address: this.address,
        coupons: this.coupons
      };

      try {
        const response = await fetch('/api/auth/other-settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`, // 사용자 토큰 추가
          },
          body: JSON.stringify(otherSettings)
        });

        if (response.ok) {
          alert("기타 설정이 성공적으로 저장되었습니다.");
          window.location.reload();
        } else {
          const errorMessage = await response.text();
          alert(`기타 설정 저장 실패: ${errorMessage}`);
        }
      } catch (error) {
        console.error("에러 발생:", error);
        alert("기타 설정 저장 중 에러가 발생했습니다.");
      }
    },
    sendSupportMessage() {
      console.log("문의 내용:", this.supportMessage);
    }
  }
}
</script>
