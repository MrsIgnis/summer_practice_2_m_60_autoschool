const rev_swiper = new Swiper('.reviews_swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: false,

    navigation: {
        nextEl: '.reviews_button_next',
        prevEl: '.reviews_button_prev',
    },
})