<template>
  <div class="full">
    <div id="map">
      <div class="buttons">
        <template v-for="(category, index) in categories" :key="index">
          <button @click="onCategoryButtonClick(category)">
            {{ category.name }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, watch, ref } from 'vue';

// 부모 컴포넌트로부터 전달된 주소를 받을 prop
const props = defineProps({
  address: {
    type: String,
    default: ''
  },
  categories: {
    type: Array,  // categoryId, name
    default: () => []
  }
});

// map 객체를 ref로 정의
const map = ref(null);

// 네이버 지도 API 로드 및 지도 생성
onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=p5ju3wcg2n&submodules=geocoder";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  script.onload = () => {
    // 네이버 지도 생성
    map.value = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(37.5112, 127), // 한강 중심으로 하는 지도
      zoom: 13
    });
  };
});

// categories가 바뀔 때마다 실행되는 watch
watch(() => props.categories, (newCategories) => {
  if (!map.value) return;

  // 버튼을 다시 생성하여 위치를 조정
  createCategoryButtons(newCategories);
});

const createCategoryButtons = (categories) => {
  const buttonContainer = document.querySelector('.buttons');
  buttonContainer.innerHTML = ''; // 기존 버튼을 지웁니다

  // 새로운 버튼을 지도 위에 추가
  categories.forEach((category, index) => {
    const button = document.createElement('button');
    button.classList.add('btnCategory');
    button.innerText = category.name;
    button.addEventListener('click', () => onCategoryButtonClick(category));

    button.style.position = 'absolute';

    const buttonWidth = 150;  // 버튼의 고정된 너비 (동적 계산 대신 고정값 사용)
    const buttonHeight = 65;  // 버튼의 고정된 높이
    const horizontalSpacing = 160;  // 버튼 간 수평 간격
    const verticalSpacing = 80;    // 버튼 간 수직 간격
    
    // 버튼의 위치 계산 (5개씩 한 줄에 배치)
    const horizontalOffset = 10 + (index % 5) * horizontalSpacing;
    const verticalOffset = 10 + Math.floor(index / 5) * verticalSpacing;

    button.style.left = `${horizontalOffset}px`;
    button.style.top = `${verticalOffset}px`;
    button.style.height = `${buttonHeight}px`;
    button.style.width = `${buttonWidth}px`;

    // 글자 크기 설정
    button.style.fontSize = '26px';

    buttonContainer.appendChild(button);
    });
  };

const onCategoryButtonClick = (category) => {

  console.log(category);

};

</script>

<style scoped>
.full * {
  box-sizing: border-box;
}

.full {
  position: absolute;
  top: 95px;
  left: 350px;
}

#map {
  width: 1550px;
  height: 990px;
}

.buttons {
  position: absolute;
  z-index: 1000;
}
</style>
