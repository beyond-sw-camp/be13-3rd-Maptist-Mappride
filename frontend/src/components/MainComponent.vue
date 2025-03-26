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
import apiClient from '@/api/axios.js';

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

// watch로 address 값 변경을 감지하여 실시간으로 지도에 반영
watch(() => props.address, (newAddress) => {
    if (newAddress && map.value) {
      searchAddressToCoordinate(newAddress, map.value);
    }
});

// 주소로 좌표를 찾고 지도의 중심을 해당 좌표로 이동하는 함수
const searchAddressToCoordinate = (address, map) => {
    window.naver.maps.Service.geocode({
      query: encodeURIComponent(address) // 주소를 인코딩하여 전송
    }, function(status, response) {
      console.log(status);
      console.log(response);

      // API 호출 상태 확인
      if (status === window.naver.maps.Service.Status.ERROR) {
        alert('Something went wrong! Server error');
        return;
      }

      if (response.v2.meta.totalCount === 0) {
        alert('No results found for the address');
        return;
      }

      const item = response.v2.addresses[0];
      const point = new window.naver.maps.Point(item.x, item.y);

      // 지도 중심을 좌표로 이동
      map.setCenter(point);

      // // 주소 정보 표시
      // const infoWindow = new window.naver.maps.InfoWindow({
      //   content: [
      //     '<div style="padding:10px;min-width:200px;line-height:150%;">',
      //     <h4 style="margin-top:5px;">검색 주소 : ${address}</h4><br />,
      //     [도로명 주소] ${item.roadAddress || ''}<br />,
      //     [지번 주소] ${item.jibunAddress || ''}<br />,
      //     [영문명 주소] ${item.englishAddress || ''},
      //     '</div>'
      //   ].join('\n')
      // });
      infoWindow.open(map, point);
    });
  };

// 마커와 관련된 정보창을 저장할 배열
let markers = [];

// 카테고리가 바뀔 때마다 실행되는 watch
watch(() => props.categories, (newCategories) => {
  if (!map.value) return;

  // 기존 마커들과 정보창 삭제
  markers.forEach(markerData => {
    markerData.marker.setMap(null);  // 마커 삭제
    if (markerData.infowindow.getMap()) {
      markerData.infowindow.close();  // 열린 정보창 닫기
    }
  });
  markers = [];  // 배열 초기화

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

const onCategoryButtonClick = async (category) => {
  try {
    const response = await apiClient.get(`/categories/${category.categoryId}/places`);

    if (response.status === 200) {
      const places = response.data;

      // 기존 마커들과 정보창 삭제
      markers.forEach(markerData => {
        markerData.marker.setMap(null);  // 마커 삭제
        if (markerData.infowindow.getMap()) {
          markerData.infowindow.close();  // 열린 정보창 닫기
        }
      });
      markers = [];  // 배열 초기화

      // places가 비어있으면 알림 메시지 표시
      if (places.length === 0) {
        return; // 함수 종료
      }

      // 각 place에 대해 마커를 생성하고 배열에 저장
      places.forEach(place => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(place.latitude, place.longitude),
          map: map.value,
          title: place.name,
          icon: {
            url: "http://static.naver.com/maps2/icon/marker/marker_blue.png",  // 기본 마커 아이콘
            size: new naver.maps.Size(40, 60),  // 아이콘 크기 (너비: 40px, 높이: 60px)
            anchor: new naver.maps.Point(20, 60)  // 마커의 중심을 아이콘의 하단으로 맞추기
          }
        });


        console.log(place);



        // 정보 창 내용 구성
        const contentString = [
          '<div class="iw_inner">',
          `   <h3>${place.name}</h3>`,
          `   <p>${place.address}<br />`,
          `       <img src="${place.image || './img/example/hi-seoul.jpg'}" width="55" height="55" alt="${place.name}" class="thumb" /><br />`,
          `       ${place.phone || ''}<br />`,
          `       <a href="${place.website || '#'}" target="_blank">${place.website || '웹사이트 없음'}</a>`,
          '   </p>',
          '</div>'
        ].join('');

        const infowindow = new naver.maps.InfoWindow({
          content: contentString,
        });

        // 마커 클릭 시 정보 창을 띄우도록 이벤트 추가
        naver.maps.Event.addListener(marker, 'click', () => {
          // 이미 정보 창이 열려있으면 닫고, 그렇지 않으면 열도록 처리
          if (infowindow.getMap()) {
            infowindow.close();
          } else {
            infowindow.open(map.value, marker);
          }

          const point = new naver.maps.LatLng(place.latitude, place.longitude);
            map.value.setCenter(point);  // 해당 위치로 지도 중심 이동
            map.value.setZoom(15);
        });

        // 생성한 마커와 정보창을 markers 배열에 저장
        markers.push({
          marker: marker,
          infowindow: infowindow
        });
      });

    } else {
      console.error('API 요청 실패:', response.status);
    }
  } catch (error) {
    console.error('API 요청 실패:', error);
    alert('검색 실패. 다시 시도해주세요.');
  }
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
  z-index: 1;
}
</style>
