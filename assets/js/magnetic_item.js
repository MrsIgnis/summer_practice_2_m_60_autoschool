document.addEventListener('DOMContentLoaded', function () {
    // ... ваш код для других анимаций ...


    // --- Код для анимации "прилипания" блоков к курсору ---

    const magneticItems = gsap.utils.toArray('.magnetic-item');
    const magneticForce = 0.1; // Сила притяжения (от 0 до 1)

    magneticItems.forEach(item => {
        // Слушаем движение мыши НАД элементом
        item.addEventListener('mousemove', function(e) {
            const rect = item.getBoundingClientRect(); // Получаем размеры и позицию элемента
            
            // Находим центр элемента
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Находим позицию курсора
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Вычисляем расстояние от центра до курсора
            const deltaX = mouseX - centerX;
            const deltaY = mouseY - centerY;
            
            // Анимируем элемент в сторону курсора с учетом силы притяжения
            gsap.to(item, {
                x: deltaX * magneticForce,
                y: deltaY * magneticForce,
                duration: 0.6, // Делает движение плавным
                ease: 'power3.out'
            });
        });

        // Слушаем, когда мышь УХОДИТ с элемента
        item.addEventListener('mouseleave', function() {
            // Плавно возвращаем элемент в исходное положение
            gsap.to(item, {
                x: 0,
                y: 0,
                duration: 0.6, // Длительность возврата
                // 'elastic.out' создает красивый "пружинящий" эффект
                ease: 'elastic.out(1, 0.3)' 
            });
        });
    });

});