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


    // newPlaceComponent.vue 에서 사용
    let latitude = '';
    let longitude = '';
    let categoryId = '';

    const getLatitude = (latitudeData) => {
        latitude = latitudeData;
    };

    const getLongitude = (longitudeData) => {
        longitude = longitudeData;
    };

    const getCategoryId = (categoryIdData) => {
        categoryId = categoryIdData;
    };

    // MyCategoryComponent.vue 에서 사용
    const myCategories = ref([]);

    const getMyCategories = async (categoryName) => {
    try{
        alert('들어오나용');
        const response = await apiClient.get(`/categories/${categoryName}`);

        if (response.status === 200) {
            myCategories.value = response.data;

            alert(myCategories.value);
            alert(response.data);

        } else {
            console.error('API 요청 실패:', response.status);
        }
    }catch(error)
    {
        console.error('API 요청 실패:', error);
        alert('검색 실패. 다시 시도해주세요.');
    }
    };

    return { categories, getCategory, latitude, getLatitude, longitude, getLongitude, categoryId, getCategoryId, getMyCategories};
});