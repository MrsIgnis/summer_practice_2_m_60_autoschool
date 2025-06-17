document.addEventListener('DOMContentLoaded', function () {
    let cards = gsap.utils.toArray(".stackCard");
    let stickDistance = 0;
    let verticalOffset = 30;

    let firstCardST = ScrollTrigger.create({
        trigger: cards[0],
        start: "center center"
    });

    let lastCardST = ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: "center center"
    });

    cards.forEach((card, index) => {
        let offset = index * verticalOffset;
        
        var scale = 1 - (cards.length - index) * 0.025;
        
        let scaleDown = gsap.to(card, { 
            scale: scale, 
            y: offset,
            'transform-origin': 'center center'
        });

        ScrollTrigger.create({
            trigger: card,
            start: "center center+=40px",
            end: () => lastCardST.start + stickDistance,
            pin: true,
            pinSpacing: false,
            ease: "none",
            animation: scaleDown,
            toggleActions: "restart none none reverse"
        });
    });
});