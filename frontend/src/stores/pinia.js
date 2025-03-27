import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import apiClient from '@/api/axios.js';

export const usePiniaStore = defineStore('auth', () => {

    //MainComponent.vue 에서 사용
    const categories = ref([]);

    const getCategory = async (txtMemberId) => {
    try{
        const response = await apiClient.get(`/categories/${txtMemberId}`);

        if (response.status === 200) {
            categories.value = response.data;
        } else {
            console.error('API 요청 실패:', response.status);
        }
    }catch(error)
    {
        console.error('API 요청 실패:', error);
        alert('검색 실패. 다시 시도해주세요.');
    }
    };

    const getMyCategories = async() => {
        try {
            const response = await apiClient.get('/categories');

            console.log(response.data);

            if (response.status === 200) {
              categories.value = response.data;
            } else {
              console.error('API 요청 실패:', response.status);
            }
          } catch (error) {
            console.error('API 요청 실패:', error);
            alert('검색 실패. 다시 시도해주세요.');
          }
    }

    // newPlaceComponent.vue 에서 사용
    const latitude = ref('');
    const longitude = ref('');
    const categoryId = ref('');

    const getLatitude = (latitudeData) => {
        latitude.value = latitudeData;
    };

    const getLongitude = (longitudeData) => {
        longitude.value = longitudeData;
    };

    const getCategoryId = (categoryIdData) => {
        categoryId.value = categoryIdData;
    };

    // MyCategoryComponent.vue 에서 사용
    const myCategoryName = ref([]);

    const getMyCategoryName = async (categoryName) => {
    try{
        const response = await apiClient.get(`/categories/findCategory/${categoryName}`);

        if (response.status === 200) {

            myCategoryName.value = response.data;

        } else {
            console.error('API 요청 실패:', response.status);
        }
    }catch(error)
    {
        console.error('API 요청 실패:', error);
        alert('검색 실패. 다시 시도해주세요.');
    }
    };

    return { categories, getCategory, latitude, getLatitude, longitude, getLongitude
        , categoryId, getCategoryId, getMyCategories, myCategoryName, getMyCategoryName};
});