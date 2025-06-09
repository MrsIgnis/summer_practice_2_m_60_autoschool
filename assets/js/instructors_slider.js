const swiper = new Swiper('.instructors_swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: false,

    navigation: {
        nextEl: '.instructions_button_next',
        prevEl: '.instructions_button_prev',
    },

    on: {
        init: function () {
            updateSlidesVisibility(this);
        },
        slideChange: function () {
            updateSlidesVisibility(this);
        },
    },
});

function updateSlidesVisibility(swiperInstance) {
    const slides = swiperInstance.slides;
    const activeIndex = swiperInstance.activeIndex;

    slides.forEach((slide, index) => {
        if (index < activeIndex) {
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
        } else {
            slide.style.opacity = '1';
            slide.style.visibility = 'visible';
        }
    });
}