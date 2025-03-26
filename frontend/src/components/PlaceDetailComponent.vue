<template>
  <div class="full">


    <div class="rectangle-50"></div>

    <!-- 오른쪽 대표사진 버튼 -->
    <!-- <img class="image-46" src="/src/assets/images/placeDetailComponent/image-460.png" /> -->
    
    <!-- 빈 버튼 -->
    <!-- <button v-if="showImage46" @click="rightstarChange">
      <img class="image-46" src="/src/assets/images/placeDetailComponent/image-460.png" />
    </button>
-->


    

    <div class="div2" v-text="place.name" v-if="!isEditing"></div>
    <input  class="div2" v-model="place.name" v-if="isEditing">

    <img class="line-13" src="/src/assets/images/public/line-60.png" />
    <img class="line-14" src="/src/assets/images/public/line-60.png" />

    <!-- myplace name -->
    <!-- <div class="div3">분좋카</div> -->
    <!-- 카테고리 이름-->
    <div class="div3" v-text="category.name"></div>
    <div class="line-16"></div>

    <!-- 카테고리 드롭 다운 -->
    <!-- <img class="group-10" src="/src/assets/images/placeDetailComponent/group-100.png" /> -->
    <!-- <div class="dropdown-group-10">
    <select v-model="selectedColor" @change="onColorChange">
      <option value="red">red</option>
      <option value="blue">blue</option>
      <option value="green">green</option>
      <option value="yellow">yellow</option>
      <option value="purple">purple</option>
    </select>
    </div> -->
    <div :class="place.color" class="place-color" v-if="!isEditing"></div>

    <div :class="place.color" class="place-color" v-if="isEditing">
      <!-- 색상 선택 드롭다운 -->
      <div class="dropdown-container" @click="toggleDropdown">
      <div class="selected-option">
        <div class="color-circle" :class="selectedClass"></div>
      </div>
      <ul v-if="isOpen" class="dropdown-menu">
        <li v-for="(color, index) in colors" :key="index" @click="selectColor(color.className)">
          <div class="color-circle" :class="color.className"></div>
        </li>
      </ul>
    </div>
    </div>
        
    

    <div class="rectangle-23"></div>

    <!-- 카테고리 드롭다운 사진 -->
    <!-- <img class="ellipse-2" src="/src/assets/images/public/ellipse-20.png" /> -->

    <!-- 장소 컨텐츠 수정 입력창 -->
    <div class="div4">

      <template v-if="isEditing">
        <textarea 
          class="textarea-div4" 
          v-model="textContent">
        </textarea>
      </template>
      <template v-else>
        {{ textContent }}
      </template>
      
      
    </div>

    <button @click="image34Click">
      <img class="image-34" src="/src/assets/images/public/image-290.png" />
      </button>

    <!-- 내용 자체 삭제 버튼 -->
    <!-- <img class="image-33" src="/src/assets/images/public/image-230.png" /> -->
    <!-- <button @click="image33Click"> -->
    <button @click.stop="pconfirmDelete">
    <img class="image-33" src="/src/assets/images/public/image-230.png" />
    </button>

    <!-- 내용 수정 버튼 -->
    <!-- <img class="image-34" src="/src/assets/images/public/image-290.png" /> -->

    
    <!-- <div class="thumbnail">
      <p style="font-size: 20px;">대표사진</p>
      <img class="thumbnail-image" :src="place.thumbnail"/>
    </div> -->
    <div class="images">
  사진들
  <ul>
    <li v-for="(photo, index) in photos" :key="index">
      <img :src="photo.photoUrl" class="photo">
      <img class="image-47" src="/src/assets/images/placeDetailComponent/image-470.png" v-if="photo.thumbnail" />
      <img class="image-47" src="/src/assets/images/placeDetailComponent/image-460.png" @click="changeThumbnail(index)" v-if="!photo.thumbnail"/>
      
      <button @click="deletePhoto(index)" style="width: 30px; height: 30px; font-size: 20px; background-color: white; border-color: white; color: red;" v-if="isEditing">X</button>
    </li>
  </ul>
</div>

    <!-- <div>
      <img class="image-35" src="/src/assets/images/placeDetailComponent/image-350.png" />
      <img class="image-39" src="/src/assets/images/placeDetailComponent/image-390.png" />

      <button v-if="showImage44" @click="leftstarChange">
      <img class="image-44" src="/src/assets/images/placeDetailComponent/image-460.png" />
      </button>

  
    <button v-if="showImage45" @click="leftstarChange">
      <img class="image-45" src="/src/assets/images/placeDetailComponent/image-470.png" />
    </button>
    
    </div> -->
    

    <div class="rectangle-51"></div>

    

    <!-- 뉴 comments -->
    <!-- <ul style="list-style-type: none; margin: 0; padding: 0;">  일반적으로 -->
    <div class="rectangle-51">
    <ul style="list-style-type: none;">
      <li v-for="(comment, index) in comments" :key="index" class="comment-item">
        <div class="comment-memberName">{{ comment.memberName }}</div>
        <div class="comment-content">{{ comment.comment }}</div>
        <div class="comment-date">{{ comment.regDate }}</div>

        <!-- 댓글 작성자와 로그인된 사용자 ID 비교 -->
        <div v-if="member.id === comment.memberId" class="comment-actions">
          <!-- 내가 작성한 댓글 텍스트 -->
          <div class="my-comment-text">내가 작성한 댓글</div>
          <!-- 버튼 영역 -->
          <div class="button-container">
            <!-- 수정 버튼 -->
            <button type="button" @click="editComment(index)" class="transparent-button">
              <img src="/src/assets/images/public/image-290.png" />
            </button>
            <!-- 삭제 버튼 -->
            <button @click.stop="cconfirmDelete(index)" class="transparent-button">
              <img src="/src/assets/images/public/image-230.png" />
            </button>
          </div>
        </div>

        <!-- old 댓글 작성자와 로그인된 사용자 ID 비교 -->
        <!-- <div v-if="member.id === comment.memberId" class="comment-actions">
          <div class="my-comment-text">내가 작성한 댓글</div>
          <button type="button" @click="editComment(index)">
            <img class="image-49" src="/src/assets/images/public/image-290.png" />
          </button>
          
          <button @click.stop="cconfirmDelete(index)">
            <img class="image-50" src="/src/assets/images/public/image-230.png" />
          </button>
        </div> -->

        
      </li>
    </ul>
    </div>

    <!-- 구 댓글 수정 버튼 -->
    <!-- <img class="image-49" src="/src/assets/images/public/image-290.png" /> -->
    <!-- <button type = "button" @click="image49Click">
      <img class="image-49" src="/src/assets/images/public/image-290.png" />
    </button> -->
    
    <!-- 구 댓글 삭제 버튼 -->
    <!-- <img class="image-50" src="/src/assets/images/public/image-230.png" /> -->
    <!-- <button @click="image50Click"> -->

    <!-- <button @click.stop="cconfirmDelete">
      <img class="image-50" src="/src/assets/images/public/image-230.png" />
    </button> -->

    <div class="comment2">Comment</div>
    
    <!-- 댓글 입력창 -->
    <!-- <div class="rectangle-5"></div> -->
    <div class="rectangle-5">
      <textarea class="textarea-rectangle-5" placeholder="내용을 입력하세요"></textarea>
    </div>
    
    <!-- 구 댓글창 -->
    
    <!-- <div class="line-18"></div>
    <div class="div5">내가 작성한 댓글</div>
    <div class="line-21"></div>
    <div class="div6">사장님이 친절해요</div>
    <div class="line-19"></div>
    <div class="line-20"></div>
    <div class="div7">권지민</div>
    <div class="div8">내공냠냠</div>
    <div class="_2025-03-18-15-22">2025. 03.18 15:22</div>
    <div class="div9">수연공주</div>
    <div class="div10">웅냥냥</div>
    <div class="_2025-03-18-15-52">2025. 03.18 15:52</div>
    <div class="_2025-03-18-18-01">2025. 03.18 18:01</div>
    <div class="div11">커피러버</div> -->

    <!-- 왼쪽 대표사진 버튼 -->
    <!-- 빈 버튼 -->


    <!-- 사진 추가 버튼 -->
    <!-- <img class="image-48" src="/src/assets/images/placeDetailComponent/image-480.png" /> -->
    <!-- <button @click="image48Click(placeId)">
    <img class="image-48" src="/src/assets/images/placeDetailComponent/image-480.png" v-if="isEditing" />
    </button> -->

    <label for="photosInput" class="image-48" v-if="isEditing">
    + add photos..<br>
    <input id="photosInput" type="file" @change="handleFileChange" multiple />
    <br>
    <img v-for="(item, index) in previewSrc" :key="index" :text="item" />
  </label>
    <button class="modifyBtn" @click="uploadImages" v-if="isEditing">Upload</button>

    <img class="rectangle-42" src="/src/assets/images/placeDetailComponent/rectangle-420.png" />

    <!-- 댓글 작성 완료 버튼 -->
    <!-- <div class="write">Write</div> -->
    <button @click="writeClick">
    <div class="write">Write</div>
    </button>

    <!-- 뒤로 가기 버튼 -->
    <!-- <img class="frame" src="/src/assets/images/placeDetailComponent/Frame.png" /> -->
    <router-link :to="`/api/v1/categories/${placeId}/places`" class="frame">
      <img src="/src/assets/images/placeDetailComponent/Frame.png" />
    </router-link>
    <!-- <button @click="goBack">
    <img class="frame" src="/src/assets/images/placeDetailComponent/Frame.png" />
    </button> -->
  </div>
</template>

<script setup>
import apiClient from '@/api/axios.js';
import { ref, onMounted, ErrorCodes } from 'vue';
import { useRoute } from 'vue-router';
import { errorMessages } from 'vue/compiler-sfc';

const route = useRoute();
const comments = ref([]);
const member = ref([]);
const placeId = ref('');
const place = ref('');
const categoryId = ref('');
const category = ref('');
const selectedColor = ref("red");
const isEditing = ref(false);
const textContent = ref("좌석이 넓어서 수다 떨기 좋아요 메뉴들 퀄리티도 일정하고요~");
const showImage44 = ref(true);
const showImage45 = ref(false);
const showImage46 = ref(true);
const showImage47 = ref(false);
const selectedFiles = ref([]);
const previewSrc = ref([]);
const src = ref([]);
const photos = ref([]);
const modifyPlace = ref({
  name: '',
  color: '',
  content: '',
  placeId: '', // 실제로 placeId는 서버에서 받아온 값
})

onMounted(async () => {
  placeId.value = String(route.params.placeId);
  modifyPlace.value.placeId = placeId.value;
  try {
    const [commentsRes, placeRes, memberRes, photoRes] = await Promise.all([
      apiClient.get(`/comments/${placeId.value}`),
      apiClient.get(`/place/${placeId.value}`),
      apiClient.get('/members'),
      apiClient.get(`/photo/${placeId.value}`),
    ]);

    comments.value = commentsRes.data;
    place.value = placeRes.data;
    console.log(place.value);
    
    categoryId.value = place.value.categoryId;
    member.value = memberRes.data;

    console.log(photoRes.data);
    
    
    photoRes.data.forEach((e) => {
      photos.value.push(e);
    });
  
    if (categoryId.value) {
      const categoryRes = await apiClient.get(`/categories/find-one/${categoryId.value}`);
      category.value = categoryRes.data;
    }
  } catch (error) {
    console.error("데이터 로딩 중 오류 발생", error);
  }
});

const changeThumbnail = async(index) => {
  
  if(confirm('대표사진을 변경하시겠습니까?')){
    await apiClient.get(`photo/thumbnail/${photos.value[index].photoId}`)
    window.location.reload();  // 페이지 새로고침
  }
}

const deletePhoto = async(index) => {
  try{
    await apiClient.delete(`/photo/${photos.value[index].photoId}`)
    window.location.reload();  // 페이지 새로고침
  } catch (error) {
  
    
    
    alert(error.response.data); 
    console.error("삭제 중 오류 발생", error);
    isEditing.value = false;
  }
  
}

const editComment = (index) => {
  const newComment = prompt("댓글을 수정하세요:", comments.value[index].comment);
  if (newComment) {
    comments.value[index].comment = newComment;
  }
};

const deleteComment = (index) => {
  if (confirm('댓글을 삭제하시겠습니까?')) {
    comments.value.splice(index, 1);
  }
};

const pconfirmDelete = () => {
  if (confirm("나만의 장소를 삭제하시겠습니까?")) {
    alert("나만의 장소가 삭제되었습니다.");
  } else {
    alert("삭제를 취소했습니다.");
  }
};

const image34Click = () => {
  isEditing.value = !isEditing.value;
};

const leftstarChange = () => {
  showImage44.value = !showImage44.value;
  showImage45.value = !showImage45.value;
};

const rightstarChange = () => {
  showImage46.value = !showImage46.value;
  showImage47.value = !showImage47.value;
};

const image48Click = () => {
  console.log("image-48 버튼 클릭됨!");
};

const cconfirmDelete = () => {
  if (confirm("댓글을 삭제하시겠습니까?")) {
    alert("댓글이 삭제되었습니다.");
  }
};

const goBack = () => {
  window.history.back();
};

const onColorChange = () => {
  console.log("선택된 색상:", selectedColor.value);
};

const writeClick = () => {
  console.log("write 버튼 클릭됨!");
};

const handleFileChange = (event) => {
  const files = event.target.files;
  selectedFiles.value = Array.from(files);
  previewSrc.value = selectedFiles.value.map(file => URL.createObjectURL(file));
};

const uploadImages = async () => {

  if (!place.photoUrls) {
  place.photoUrls = [];
}

  const formData = new FormData();
  if(selectedFiles.value.length > 0){
    selectedFiles.value.forEach((file, index) => {
    formData.append("multipartFiles", file, `image${index}.jpg`);
  });
  }

  formData.append("placeId", placeId.value);

  try {
    const response = await apiClient.post("/photo/upload-photos", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    
    // 서버에서 반환된 이미지 URL을 받아서 place.photoUrls에 추가
    const uploadedImageUrls = response.data;  // 서버에서 반환된 이미지 URL 배열
    place.photoUrls.push(...uploadedImageUrls);

    // console.log("Uploaded Photo IDs:", uploadedImageUrls);
  } catch (error) {
    console.error("Upload failed:", error);
    alert("업로드 실패!");
  }

  submitModification()

};

const submitModification = async () => {
  const placeRequestDto = {
    placeId: placeId.value,
    name: place.value.name,
    color: place.value.color,
    content: place.value.content,
  };

  console.log(placeRequestDto);
  

  try {
    const response = await apiClient.put('/place', placeRequestDto);
    console.log('업데이트 성공:', response.data);
    alert('장소가 수정되었습니다!');
    isEditing.value = false;  // 편집 모드 종료
    place.value = response.data;  // 수정된 데이터를 받아서 UI 업데이트
    window.location.reload();  // 페이지 새로고침
  } catch (error) {
    console.error('업데이트 실패:', error);
    alert('수정에 실패했습니다. 다시 시도해 주세요.');
  }
};

const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};


</script>

<style scoped>
.div,
.div * {
  box-sizing: border-box;
}
.div {
  background: #ffffff;
  height: 1080px;
  position: relative;
  overflow: hidden;
}

.comment-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-container {
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽 끝으로 정렬 */
  gap: 5px; /* 버튼 간 간격 */
}

.transparent-button {
  background: transparent; /* 투명한 배경 */
  border: none; /* 테두리 제거 */
  width: 27px; /* 고정 너비 */
  height: 27px; /* 고정 높이 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.transparent-button img {
  width: 100%; /* 이미지 크기 버튼에 맞게 조정 */
  height: auto;
}

/* 내가 작성한 댓글 표시 */
.my-comment-text {
  color: #4285f4;
  font-size: 12px;
  margin-bottom: 5px;
}
.rectangle-4 {
  background: #ffffff;
  border-style: solid;
  border-color: #d3d3d3;
  border-width: 0px 0px 1px 0px;
  width: 1583px;
  height: 91px;
  position: absolute;
  left: 337px;
  top: 0px;
}
.image-15 {
  width: 48px;
  height: 61px;
  position: absolute;
  left: 1632px;
  top: 30px;
}
.rectangle-9 {
  width: 125px;
  height: 45px;
  position: absolute;
  left: 1760px;
  top: 23px;
  overflow: visible;
}
.logout {
  color: #000000;
  text-align: left;
  font-family: "Stylish-Regular", sans-serif;
  font-size: 20px;
  font-weight: 400;
  position: absolute;
  left: 1790px;
  top: 32px;
  width: 66px;
  height: 26px;
}
.group-5 {
  position: absolute;
  inset: 0;
}
.mappride {
  color: #000000;
  text-align: left;
  font-family: "Stylish-Regular", sans-serif;
  font-size: 30px;
  font-weight: 400;
  position: absolute;
  left: 77.64px;
  top: 31.64px;
  width: 185.32px;
  height: 40.08px;
  -webkit-text-stroke: 1px #ffffff;
}
.rectangle-6 {
  background: #f7f7f7;
  border-style: solid;
  border-color: #ffffff;
  border-width: 0px 1px 0px 0px;
  width: 335.98px;
  height: 84.38px;
  position: absolute;
  left: 0px;
  top: 505.2px;
}

.map, .my-page, .my-categories {
  color: #000000;
  text-align: center;
  font-family: "Stylish-Regular", sans-serif;
  font-size: 25px;
  font-weight: 400;
  position: absolute;
  width: 318.14px;
  height: 104.41px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-text-stroke: 1px #ffffff;
  background-color: transparent;
  border: none; /* 버튼 테두리 */
  cursor: pointer; /* 클릭 시 손 모양 커서 */
}

.map {
  top: 335.39px;
  left: 20.14px;
}

.my-page {
  top: 439.80px;
  left: 20.14px;
}

.my-categories {
  top:  544.21px;
  left: 20.14px;
}

.rectangle-28 {
  background: rgba(255, 255, 255, 0);
  border-style: solid;
  border-color: #d9d9d9;
  border-width: 1px;
  width: 336.87px;
  height: 1080px;
  position: absolute;
  left: 0px;
  top: 0px;
}
.image-12 {
  width: 43.85px;
  height: 43.85px;
  position: absolute;
  left: 25.34px;
  top: 365.67px;
  object-fit: cover;
  aspect-ratio: 1;
}
.image-13 {
  width: 29.63px;
  height: 29.63px;
  position: absolute;
  left: 32.45px;
  top: 455.05px;
  object-fit: cover;
  aspect-ratio: 1;
}
.image-14 {
  width: 30.81px;
  height: 30.81px;
  position: absolute;
  left: 32.53px;
  top: 531.98px;
  object-fit: cover;
  aspect-ratio: 1;
}


.rectangle-50 {
  background: #ffffff;
  width: 1095px;
  height: 1385px;
  position: absolute;
  left: 338px;
  top: 94px;
}
.image-46 {
  width: 26px;
  height: 26px;
  position: absolute;
  left: 1245px;
  top: 814px;
  object-fit: cover;
  aspect-ratio: 1;
}
.image-47 {
  width: 25px;
  height: 25px;
  object-fit: cover;
  aspect-ratio: 1;
}
.div2 {
  color: #000000;
  text-align: left;
  font-family: "Inter-Regular", sans-serif;
  font-size: 40px;
  font-weight: 400;
  position: absolute;
  left: 800px;
  top: 150px;
  width: 380px; 
  height: 38px;
}
.image-35 {
  width: 300px;
  height: 399px;
  position: absolute;
  left: 491px;
  top: 352px;
  object-fit: cover;
  aspect-ratio: 300/399;
}
.line-13 {
  width: 48px;
  height: 0px;
  position: absolute;
  left: 614px;
  top: 161px;
  transform: translate(-0.5px, 0px);
  overflow: visible;
}
.line-14 {
  width: 48px;
  height: 0px;
  position: absolute;
  left: 1084px;
  top: 162px;
  transform: translate(-0.5px, 0px);
  overflow: visible;
}
.div3 {
  color: #000000;
  text-align: left;
  font-family: "Inter-Regular", sans-serif;
  font-size: 20px;
  font-weight: 400;
  position: absolute;
  left: 461px;
  top: 200px;
  width: 100px;
  height: 43px;
}
.line-16 {
  margin-top: -1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-width: 1px 0 0 0;
  width: 881px;
  height: 0px;
  position: absolute;
  left: 434px;
  top: 260px;
  transform-origin: 0 0;
  transform: rotate(0.065deg) scale(1, 1);
}
/* .group-10 {
  height: auto;
  position: absolute;
  left: 1151px;
  top: 157px;
  overflow: visible;
} */

.dropdown-group-10 {
position: absolute;
left: 1151px;
top: 157px;
}

select {
width: 150px;
height: 40px;
font-size: 16px;
padding: 5px;
}

.group-11 {
  position: absolute;
  inset: 0;
}
.rectangle-23 {
  background: #f7f7f9;
  border-style: solid;
  border-color: #d9d9d9;
  border-width: 1px;
  width: 57px;
  height: 57px;
  position: absolute;
  left: 1366px;
  top: 97px;
}
.ellipse-2 {
  width: 31px;
  height: 31px;
  position: absolute;
  left: 1166px;
  top: 171px;
  overflow: visible;
}
.image-33 {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 450px;
  top: 100px;
  object-fit: cover;
  aspect-ratio: 1;
}
.image-34 {
  width: 42px;
  height: 42px;
  position: absolute;
  left: 400px;
  top: 100px;
  object-fit: cover;
  aspect-ratio: 1;
}
.image-39 {
  width: 447px;
  height: 503px;
  position: absolute;
  left: 856px;
  top: 301px;
  object-fit: cover;
  aspect-ratio: 447/503;
}

.ellipse-2 {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffc1c1;
}
.ellipse-3 {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #c1ffe9;
}
.ellipse-4 {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #4285f4;
}
.ellipse-5 {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fbbc05;
}
.ellipse-6 {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ff0000;
}

/* 구 삭제 버튼 */
/* .image-50 {
width: 18px;
height: 18px;
position: absolute;
left: 1831px;
top: 505px;
object-fit: cover;
aspect-ratio: 1;
} */

/* 구 수정 버튼 */
/* .image-49 {
  width: 18px;
  height: 18px;
  position: absolute;
  left: 1798px;
  top: 505px;
  object-fit: cover;
  aspect-ratio: 1;
} */

/* 구 댓글 영역 */

/* .rectangle-51 {
  background: #ffffff;
  width: 484px;
  height: 1209px;
  position: absolute;
  left: 1433px;
  top: 91px;
} */

.rectangle-51 {
  background: #ffffff;
  width: 484px;
  height: 700px;
  position: absolute;
  left: 1433px;
  top: 170px;
  
  overflow-y: auto;
  overflow: scroll;
}

/* 댓글 양식 */
.comment-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.comment-memberName {
  font-weight: bold;
}

.comment-content {
  margin: 5px 0;
}

.comment-date {
  color: #888;
  font-size: 12px;
}

.comment-actions button {
  margin-right: 5px;
}



.line-21 {
  margin-top: -1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-width: 1px 0 0 0;
  width: 419px;
  height: 0px;
  position: absolute;
  left: 1470px;
  top: 380px;
}
.div5 {
  color: #4285f4;
  text-align: left;
  font-family: "Inter-Regular", sans-serif;
  font-size: 12px;
  font-weight: 400;
  position: absolute;
  left: 1760px;
  top: 200px;
  width: 112px;
  height: 24px;
}
.div6 {
  color: #000000;
  text-align: left;
  font-family: "Inter-Regular", sans-serif;
  font-size: 20px;
  font-weight: 400;
  position: absolute;
  left: 1485px;
  top: 452px;
  width: 207px;
  height: 23px;
}
.comment2 {
  color: #000000;
  text-align: left;
  font-family: "Inter-Regular", sans-serif;
  font-size: 20px;
  font-weight: 400;
  position: absolute;
  left: 1455px;
  top: 128px;
  width: 100px;
  height: 35px;
}
.rectangle-5 {
  background: #ffffff;
  border-style: solid;
  border-color: #d2d2d2;
  border-width: 1px;
  width: 369px;
  height: 130px;
  position: absolute;
  left: 1489px;
  top: 922px;
  
}
.textarea-rectangle-5 {
  width: 100%;
  height: 100%;
  border: none;
  resize: none; /* 크기 조절 비활성화 */
  outline: none; /* 포커스 시 테두리 제거 */
  padding: 10px; /* 내부 여백 추가 */
  font-family: "Inter-Regular", sans-serif;
  font-size: 20px;
  color: #000000;
  background-color: #ffffff;
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
  overflow: scroll;
}

.textarea-rectangle-5::placeholder {
  color: #d9d9d9;  
}

.line-18 {
  margin-top: -1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-width: 1px 0 0 0;
  width: 419px;
  height: 0px;
  position: absolute;
  left: 1470px;
  top: 873px;
}
.line-19 {
  margin-top: -1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-width: 1px 0 0 0;
  width: 419.01px;
  height: 0px;
  position: absolute;
  left: 1465px;
  top: 717.5px;
}
.line-20 {
  margin-top: -1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-width: 1px 0 0 0;
  width: 419px;
  height: 0px;
  position: absolute;
  left: 1465px;
  top: 540px;
}
.div7 {
  color: #000000;
  text-align: left;
  font-family: "Inter-Bold", sans-serif;
  font-size: 25px;
  font-weight: 700;
  position: absolute;
  left: 1485px;
  top: 742.5px;
  width: 101px;
  height: 19px;
}
.div8 {
  color: #000000;
  text-align: left;
  font-family: "Inter-Regular", sans-serif;
  font-size: 20px;
  font-weight: 400;
  position: absolute;
  left: 1485px;
  top: 795.5px;
  width: 207px;
  height: 23px;
}
._2025-03-18-15-22 {
  color: #000000;
  text-align: left;
  font-family: "Inter-Regular", sans-serif;
  font-size: 15px;
  font-weight: 400;
  position: absolute;
  left: 1485px;
  top: 839.5px;
  width: 201px;
  height: 19px;
}
.div9 {
  color: #000000;
  text-align: left;
  font-family: "Inter-Bold", sans-serif;
  font-size: 25px;
  font-weight: 700;
  position: absolute;
  left: 1485px;
  top: 568.5px;
  width: 101px;
  height: 19px;
}
.div10 {
  color: #000000;
  text-align: left;
  font-family: "Inter-Regular", sans-serif;
  font-size: 20px;
  font-weight: 400;
  position: absolute;
  left: 1485px;
  top: 621.5px;
  width: 207px;
  height: 23px;
}
._2025-03-18-15-52 {
  color: #000000;
  text-align: left;
  font-family: "Inter-Regular", sans-serif;
  font-size: 15px;
  font-weight: 400;
  position: absolute;
  left: 1485px;
  top: 665.5px;
  width: 201px;
  height: 19px;
}
.div11 {
  color: #000000;
  text-align: left;
  font-family: "Inter-Bold", sans-serif;
  font-size: 25px;
  font-weight: 700;
  position: absolute;
  left: 1485px;
  top: 403px;
  width: 101px;
  height: 19px;
}
._2025-03-18-18-01 {
  color: #000000;
  text-align: left;
  font-family: "Inter-Regular", sans-serif;
  font-size: 15px;
  font-weight: 400;
  position: absolute;
  left: 1485px;
  top: 500px;
  width: 201px;
  height: 19px;
}

.image-44 {
  width: 26px;
  height: 26px;
  position: absolute;
  left: 725px;
  top: 762px;
  object-fit: cover;
  aspect-ratio: 1;
}
.image-45 {
  width: 25px;
  height: 25px;
  position: absolute;
  left: 758px;
  top: 762px;
  object-fit: cover;
  aspect-ratio: 1;
}
.image-48 {
  width: 37px;
  height: 37px;
  position: absolute;
  left: 438px;
  top: 277px;
  object-fit: cover;
  aspect-ratio: 1;
}
.rectangle-42 {
  width: 51px;
  height: 33px;
  position: absolute;
  left: 1807px;
  top: 881px;
  overflow: visible;
}
.write {
  color: #000000;
  text-align: left;
  font-family: "Inter-Regular", sans-serif;
  font-size: 15px;
  font-weight: 400;
  position: absolute;
  left: 1814px;
  top: 889px;
}
.frame {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 1370px;
  top: 97px;
  overflow: visible;
}
.place-color {
  position: absolute;
  left: 1200px;
  top: 170px;
}

.thumbnail {
  position: absolute;
  left: 550px;
  top: 300px;
  margin-top: 500px;
}
.thumbnail-image {
  width: 100%;
  height: 100%;
}

.images {
  font-size: 30px;
  position: absolute;
  left: 500px;
  top: 650px;
  width: 700px;
  overflow: scroll;
  margin-top: 150px;
}
.photo {
  width: 50%;
  height: 50%;
}

/* 장소 컨텐츠 영역 */
.div4 {
  color: #000000;
  text-align: left;
  font-family: "Inter-Regular", sans-serif;
  font-size: 24px;
  font-weight: 400;
  width: 776px;
  height: 400px;
  position: absolute;
  left: 500px;
  top: 370px;;
  overflow: scroll;
}
.textarea-div4 {
  width: 100%;
  height: 100%;
  border: none;
  resize: none; 
  outline: none; 
  padding: 10px; 
  font-family: "Inter-Regular", sans-serif;
  font-size: 24px;
  color: #000000;
  background-color: #ffffff;
  box-sizing: border-box; 
}
.modifyBtn {
  width: 80px;
  height: 50px;
  font-size: 20px;
  position: absolute;
  left: 1150px;
  top: 280px;
}
</style>
