// script.js
const API_URL = "https://api.thecatapi.com/v1/images/search?limit=3"; // Fetch 3 images

async function fetchRandomCats() {
    try {
        const response = await fetch(API_URL);
        console.log("Cat API Response:", response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const cats = await response.json();
        console.log("Cat API Data:", cats);

        const swiperWrapper = document.querySelector('.swiper-wrapper');
        if (!swiperWrapper) {
            console.error("Could not find .swiper-wrapper element");
            return;
        }
        swiperWrapper.innerHTML = "";

        cats.forEach(cat => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');

            const img = document.createElement("img");
            img.src = cat.url;
            img.alt = "Cat Image";
            img.style.borderRadius = '15px';

            slide.appendChild(img);
            swiperWrapper.appendChild(slide);
        });

        initSwiper();

    } catch (error) {
        console.error("Error fetching cat images:", error);
    }
}

function initSwiper() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 3,  // Display 3 images at once
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchRandomCats();
});