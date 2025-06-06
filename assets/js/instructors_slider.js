const swiper = new Swiper('.instructors_swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: false,

    navigation: {
        nextEl: '.instructions_button_next',
        prevEl: '.instructions_button_prev',
    },
})