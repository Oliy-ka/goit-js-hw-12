import axios from 'axios';
import { getImagesByQuery } from './js/pixabay-api';
import { clearGallery, createGallery, hideLoader, showLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = document.querySelector("input[name='search-text']");
const btn = document.querySelector(".search");
const btnLoadMore = document.querySelector(".load");

let currentQuery = '';
let currentPage = 1;

form.addEventListener("submit", handlesubmit);
btnLoadMore.addEventListener("click", handleClick);

async function handlesubmit(event) {
    event.preventDefault();
    if (!input.value.trim()) {
        return;
    };

    const query = input.value.trim();
    currentQuery = query;
    currentPage = 1;

    clearGallery();
    showLoader();
    hideLoadMoreButton();

    try {

        const data = await getImagesByQuery(currentQuery, currentPage);
        if (data.hits.length === 0) {
            iziToast.info({
                title: 'No results',
                message: 'Sorry, no images found. Try again!',
                position: 'bottomRight'
            });
            return;
        };
        
        createGallery(data.hits);
        if (data.hits.length >= 15 && data.totalHits > data.hits.length) {
            showLoadMoreButton();
        };

    } catch (error) {

        iziToast.error({
            title: 'Error',
            message: error.message,
            position: 'bottomRight',
        });

    } finally {
        hideLoader();
    };
};

async function handleClick() {

    currentPage += 1;
    btnLoadMore.disabled = true;
    showLoader();

    try {

        const data = await getImagesByQuery(currentQuery, currentPage);
        createGallery(data.hits);

        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length > 0) {
            const cardHeight = galleryItems[0].getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth'
            });
        }
        
        if (data.hits.length < 15 || (currentPage * 15) >= data.totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
                position: 'bottomRight'
            });
        }

    } catch (error) {

        iziToast.error({
            title: 'Error',
            message: error.message,
            position: 'bottomRight',
        });

    } finally {

        hideLoader();
        btnLoadMore.disabled = false;

    };
};


