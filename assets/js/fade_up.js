document.addEventListener('DOMContentLoaded', function () {
    const revealContainers = gsap.utils.toArray(".fade-up-container");

    revealContainers.forEach(container => {
        const revealElements = container.querySelectorAll(".fade-up-element");
        
        gsap.from(revealElements, {
            y: 100,
            opacity: 0,
            
            ease: "power2.out",
            duration: 1.5,
            stagger: 0.2,
            
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                // markers: true,   // Раскомментируйте для отладки
                toggleActions: "play none none none"
            }
        });
    });
});