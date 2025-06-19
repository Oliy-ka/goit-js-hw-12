import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const API_KEY = '50843154-75a8c51af40c5c9efbd704511' ;

export async function getImagesByQuery(query, page = 499) {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        page
    });

    const { data } = await axios(`https://pixabay.com/api/?${searchParams}`);

    if (!data.hits || data.hits.length === 0) {
        return [];
    }

    return data;
};