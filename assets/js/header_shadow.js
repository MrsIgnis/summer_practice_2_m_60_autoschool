document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('#hero');

    if (!header || !heroSection) {
        console.warn('Не найден элемент <header> или <section id="hero">');
        return;
    }

    const headerHeight = header.offsetHeight;

    const observerCallback = (entries) => {
        const [entry] = entries;
        header.classList.toggle('header--scrolled', !entry.isIntersecting);
    };

    const observerOptions = {
        root: null,
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(heroSection);
});