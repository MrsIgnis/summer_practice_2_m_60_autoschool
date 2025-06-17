document.addEventListener('DOMContentLoaded', function () {

    /*
    =================================================================
      БЛОК 1: АНИМАЦИЯ ИЗОБРАЖЕНИЙ (ФИНАЛЬНЫЙ МЕТОД)
      Используем .fromTo() для полного контроля над анимацией.
    =================================================================
    */
    
    const heroImages = gsap.utils.toArray('.hero-car, .hero-cone');
    if (heroImages.length > 0) {
        
        gsap.fromTo(heroImages, 
            // "FROM" - из какого состояния начинаем
            {
                opacity: 0,
                scale: 0.8,
                y: 100
            },
            // "TO" - в какое состояние приходим
            {
                opacity: 1, // Делаем полностью видимыми
                scale: 1,
                y: 0,
                duration: 1.8,
                ease: 'power4.out',
                stagger: 0.2,
                delay: 0.2
            }
        );
    }

    // Анимация шатания конусов (остается без изменений)
    const cone1 = document.querySelector('#hero-cone-1');
    const cone2 = document.querySelector('#hero-cone-2');
    if (cone1 && cone2) {
        gsap.to(cone1, {
            delay: 2, 
            rotation: -10,
            duration: 2.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            transformOrigin: 'bottom center'
        });

        gsap.to(cone2, {
            delay: 2, 
            rotation: 8,
            duration: 3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            transformOrigin: 'bottom center'
        });
    }

    /*
    =================================================================
      БЛОК 2: АНИМАЦИЯ ПОЯВЛЕНИЯ ТЕКСТА (без изменений)
    =================================================================
    */
    function animateHeroText() {
        if (!document.getElementById('hero')) { return; }

        const heroTextTimeline = gsap.timeline({
            delay: 0.7 
        });

        heroTextTimeline.to('.hero-anim-group-1', {
            opacity: 1, y: 0, duration: 1.2, stagger: 0.1
        });
        
        heroTextTimeline.to('.hero-anim-group-2', {
            opacity: 1, y: 0, duration: 1.2, stagger: 0.1
        }, "-=0.9");
        
        heroTextTimeline.to('.hero-anim-group-3', {
            opacity: 1, y: 0, duration: 1.2
        }, "-=0.9");
    }
    animateHeroText();

});