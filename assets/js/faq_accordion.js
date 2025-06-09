document.addEventListener('DOMContentLoaded', () => {
    const accordion = document.querySelector('.faq_accordion');
    const columns = accordion.querySelectorAll('.faq_accordion_column');
    const headers = accordion.querySelectorAll('.accordion-header');

    function getContentHeight(element) {
        const style = window.getComputedStyle(element);
        return element.scrollHeight +
            parseInt(style.paddingTop) +
            parseInt(style.paddingBottom);
    }

    function updateSpacing() {
        const itemCount = Math.max(...Array.from(columns).map(col => col.children.length));

        for (let i = 0; i < itemCount; i++) {
            const items = Array.from(columns).map(col => col.children[i]).filter(Boolean);
            if (items.length < 2) continue;

            const openItem = items.find(item => item.querySelector('.accordion-content.show'));
            const openContent = openItem?.querySelector('.accordion-content.show');

            items.forEach(item => {
                if (openItem && item !== openItem) {
                    const contentHeight = getContentHeight(openContent);
                    item.style.transition = 'margin-bottom 0.3s ease-out';
                    item.style.marginBottom = `${contentHeight - 16}px`;
                } else {
                    item.style.marginBottom = '';
                }
            });
        }
    }

    function handleHeaderClick(header) {
        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');
        const isOpen = content.classList.contains('show');

        const currentColumn = item.parentElement;
        currentColumn.querySelectorAll('.accordion-content.show').forEach(openContent => {
            if (openContent !== content) {
                openContent.style.maxHeight = '0';
                openContent.style.opacity = '0';
                openContent.classList.remove('show');
                openContent.closest('.accordion-item')
                    .querySelector('.accordion-header')
                    .classList.remove('rotated');
            }
        });

        if (isOpen) {
            content.style.maxHeight = '0';
            content.style.opacity = '0';
            content.classList.remove('show');
            header.classList.remove('rotated');
        } else {
            const contentHeight = getContentHeight(content);
            content.style.maxHeight = contentHeight + 'px';
            content.style.opacity = '1';
            content.classList.add('show');
            header.classList.add('rotated');
        }

        updateSpacing();
    }

    headers.forEach(header => {
        header.addEventListener('click', () => handleHeaderClick(header));
    });

    updateSpacing();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateSpacing, 100);
    });
});