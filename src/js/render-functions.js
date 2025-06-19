import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
let lightbox;

export function createGallery(images) {
    if (!images || images.length === 0) {
        hideLoadMoreButton();
        return;
    }
    const createMarkUp = images.map(image => {
        return `
         <li class="gallery-item">
                <a href="${image.largeImageURL}" class="gallery-link">
                    <img 
                        src="${image.webformatURL}" 
                        alt="${image.tags}"
                        class="gallery-image"

                    />
                </a>
                <ul class="gallery-info">
                    <li class="gallery-info-list-item">
                     <h3>Likes:</h3>
                     <p>${image.likes}</p>
                    </li>
                    <li class="gallery-info-list-item">
                        <h3>Views:</h3>
                        <p>${image.views}</p>
                    </li>
                    <li class="gallery-info-list-item">
                        <h3>Comments:</h3>
                        <p>${image.comments}</p>
                    </li>
                    <li class="gallery-info-list-item">
                        <h3>Downloads:</h3>
                        <p>${image.downloads}</p>
                    </li>
                </ul>
            </li>
        `;
    }).join("");

    gallery.insertAdjacentHTML('beforeend', createMarkUp);

    if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250
        });
    }
    if (images.length >= 15) {
        showLoadMoreButton();
    }
};

export function clearGallery() {
    gallery.innerHTML = "";
    if (lightbox) {
        lightbox.destroy();
        lightbox = null;
    }
    hideLoadMoreButton();
};

const loader = document.querySelector(".loader");
const load = document.querySelector(".load");

export function showLoader() {
    loader.classList.remove("hidden");
 };

export function hideLoader() { 
    loader.classList.add("hidden");
};

export function showLoadMoreButton() {
    load.classList.remove("hidden");
};

export function hideLoadMoreButton() {
    load.classList.add("hidden");
};


