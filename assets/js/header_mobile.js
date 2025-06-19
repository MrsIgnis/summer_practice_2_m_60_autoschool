document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.querySelector('.burger-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    const header = document.querySelector('header');

    // Функция для открытия/закрытия мобильного меню
    const toggleMobileMenu = () => {
        burgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll'); // Блокировка скролла страницы
    };

    // Обработчики событий
    if (burgerBtn) {
        burgerBtn.addEventListener('click', toggleMobileMenu);
    }
    if (overlay) {
        overlay.addEventListener('click', toggleMobileMenu); // Закрываем меню по клику на оверлей
    }

    // Закрываем меню при ресайзе, если оно открыто и экран стал шире мобильного
    window.addEventListener('resize', () => {
        // Использовать тот же брейкпоинт, что и в CSS
        if (window.innerWidth > 767 && mobileMenu.classList.contains('active')) { // Значение 992px прописано напрямую
            toggleMobileMenu(); // Закрыть меню
        }
    });

    // Обработка скролла для добавления тени к шапке
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    // Проверяем состояние при загрузке страницы (если пользователь обновил страницу не в самом верху)
    if (window.scrollY > 0) {
        header.classList.add('header--scrolled');
    }
});