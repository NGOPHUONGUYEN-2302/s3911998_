// animations.js
document.addEventListener("DOMContentLoaded", () => {
    gsap.from("header h1", { opacity: 0, duration: 1, y: -50 });
    gsap.from("header p", { opacity: 0, duration: 1, delay: 0.5, y: -30 });
    gsap.from(".cat-slider", { opacity: 0, duration: 1, delay: 1, x: -100 });
    gsap.from(".chatbot-container", { opacity: 0, duration: 1, delay: 1.5, x: 100 });
    gsap.from("footer", { opacity: 0, duration: 1, delay: 2, y: 50 });

    const catImages = document.querySelectorAll(".swiper-slide img");
    catImages.forEach((img, index) => {
        gsap.fromTo(img, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, delay: 2.5 + index * 0.1 }); // Adjust delay
    });
});