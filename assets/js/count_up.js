document.addEventListener('DOMContentLoaded', function () {
    // ... ваш код для карточек ...

    // --- Код для анимации чисел ---

    // Находим все элементы, которые нужно анимировать
    const counters = gsap.utils.toArray(".count-up");

    counters.forEach(counter => {
        const targetValue = parseInt(counter.dataset.value); // Конечное число
        const prefix = counter.dataset.prefix || '';       // Префикс (например, "+")
        const suffix = counter.dataset.suffix || '';       // Суффикс (например, "%")

        // Создаем ScrollTrigger для каждого счетчика
        ScrollTrigger.create({
            trigger: counter,
            start: "top 85%", // Анимация начнется, когда верх элемента достигнет 85% высоты экрана
            once: true,       // Анимация сработает только один раз
            
            // Функция, которая запустится при входе в зону видимости
            onEnter: () => {
                // Создаем виртуальный объект для анимации
                let proxy = { value: 0 }; 
                
                // Запускаем анимацию свойства 'value' у нашего объекта
                gsap.to(proxy, {
                    value: targetValue,
                    duration: 3, // Длительность анимации в секундах
                    ease: "power2.out", // Сделает анимацию более плавной и естественной
                    
                    // onUpdate будет вызываться на каждом кадре анимации
                    onUpdate: () => {
                        // Обновляем текст в HTML, округляя значение
                        const currentValue = Math.round(proxy.value);
                        counter.innerText = prefix + currentValue + suffix;
                    }
                });
            }
        });
    });
});