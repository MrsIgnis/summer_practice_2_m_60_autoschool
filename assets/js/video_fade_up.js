document.addEventListener('DOMContentLoaded', function () {
    // ... ваш остальной код ...
    
    // --- Анимация для блока видео (один раз, без возврата) ---

    // Находим ОДИН общий контейнер
    const videoGridContainer = document.querySelector('.video-reveal-grid');

    if (!videoGridContainer) {
        return; 
    }

    // Устанавливаем начальное состояние. Все так же.
    gsap.set(videoGridContainer, {
        opacity: 0,
        y: 150,
    });

    // Создаем ЕДИНУЮ анимацию для ОДНОГО контейнера.
    gsap.to(videoGridContainer, {
        opacity: 1,
        y: 0,
        
        duration: 6.5, // Теперь триггер просто запускает анимацию, поэтому длительность важна
        ease: 'power4.out', // Красивая плавная функция для одиночной анимации
        
        scrollTrigger: {
            trigger: videoGridContainer,
            start: 'top 85%',
            
            // --- КЛЮЧЕВЫЕ ИЗМЕНЕНИЯ ---
            
            // 1. УБИРАЕМ scrub, чтобы отвязать анимацию от скролла
            // scrub: true,  <-- УДАЛЕНО

            // 2. ДОБАВЛЯЕМ toggleActions, чтобы указать поведение
            // "play" - запустить при входе
            // "none" - ничего не делать при выходе
            // "none" - ничего не делать при возвращении сверху
            // "none" - ничего не делать при уходе обратно наверх
            toggleActions: 'play none none none',
        }
    });
});