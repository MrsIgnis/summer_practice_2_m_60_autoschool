const rev_swiper = new Swiper('.reviews_swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: false,

    navigation: {
        nextEl: '.reviews_button_next',
        prevEl: '.reviews_button_prev',
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