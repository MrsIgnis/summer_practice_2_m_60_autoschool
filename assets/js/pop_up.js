document.addEventListener('DOMContentLoaded', function () {

    // =======================================================
    //
    //                        РАЗДЕЛ 1:
    //          ПОИСК ВСЕХ НЕОБХОДИМЫХ ЭЛЕМЕНТОВ
    //
    // =======================================================

    // --- Элементы POP-UP окон ---
    const popupDetailsOverlay = document.getElementById('popup-details');
    const popupFormOverlay = document.getElementById('popup-form');
    const popupSuccessOverlay = document.getElementById('popup-success');
    const allPopups = [popupDetailsOverlay, popupFormOverlay, popupSuccessOverlay];

    // --- Элементы для управления POP-UP окнами ---
    const openDetailsButtons = document.querySelectorAll('.js-open-details');
    const openFormButtons = document.querySelectorAll('.js-open-popup');
    const requestFromDetailsButton = document.querySelector('.js-request-from-details');

    // --- Элементы форм ---
    const formInPopup = document.getElementById('main-popup-form');
    const formOnPage = document.getElementById('form_contacts');

    // --- Элементы для кастомных выпадающих списков ---
    const allSelectWrappers = document.querySelectorAll('.custom-select-wrapper');


    // =======================================================
    //
    //                        РАЗДЕЛ 2:
    //          УНИВЕРСАЛЬНЫЕ ФУНКЦИИ ДЛЯ POP-UP
    //
    // =======================================================

    const toggleBodyScroll = (lock) => {
        document.body.classList.toggle('body-no-scroll', lock);
    };

    const openPopup = (overlay) => {
        if (!overlay) return;
        overlay.classList.add('is-open');
        toggleBodyScroll(true);
    };

    const closePopup = (overlay) => {
        if (!overlay) return;
        overlay.classList.remove('is-open');
        if (!document.querySelector('.popup-overlay.is-open')) {
            toggleBodyScroll(false);
        }
    };

    const closeAllPopups = () => {
        allPopups.forEach(popup => closePopup(popup));
    };


    // =======================================================
    //
    //                        РАЗДЕЛ 3:
    //                 ЛОГИКА РАБОТЫ POP-UP
    //
    // =======================================================

    // --- 1. Открытие поп-апа "ДЕТАЛИ УСЛУГИ" с заполнением данных ---
    openDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceData = e.currentTarget.dataset;

            const titleEl = popupDetailsOverlay.querySelector('.popup-details-title');
            const subheadingEl = popupDetailsOverlay.querySelector('.popup-details-subheading'); // НОВАЯ СТРОКА
            const descriptionEl = popupDetailsOverlay.querySelector('.popup-details-description');
            const priceEl = popupDetailsOverlay.querySelector('.popup-details-price');
            const oldPriceEl = popupDetailsOverlay.querySelector('.popup-details-old-price');

            titleEl.textContent = serviceData.serviceTitle || '';
            subheadingEl.textContent = serviceData.serviceSubheading || ''; // НОВАЯ СТРОКА
            descriptionEl.innerHTML = serviceData.serviceDescription || 'Описание отсутствует.';
            priceEl.textContent = serviceData.servicePrice || '';
            oldPriceEl.textContent = serviceData.serviceOldPrice || '';

            openPopup(popupDetailsOverlay);
        });
    });

    // --- 2. Переход из "ДЕТАЛИ" -> "ФОРМА ЗАЯВКИ" ---
    if (requestFromDetailsButton) {
        requestFromDetailsButton.addEventListener('click', () => {
            closePopup(popupDetailsOverlay);
            openPopup(popupFormOverlay);
        });
    }

    // --- 3. Открытие "ФОРМЫ ЗАЯВКИ" напрямую ---
    openFormButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openPopup(popupFormOverlay);
        });
    });

    // --- 4. Универсальный обработчик отправки форм ---
    const handleFormSubmit = (formElement) => {
        if (!formElement) return;

        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(`Отправка данных из формы: #${formElement.id}`);

            closeAllPopups();
            openPopup(popupSuccessOverlay);
            formElement.reset();
        });
    };

    handleFormSubmit(formInPopup);
    handleFormSubmit(formOnPage);


    // =======================================================
    //
    //                        РАЗДЕЛ 4:
    //       ЛОГИКА КАСТОМНОГО ВЫПАДАЮЩЕГО СПИСКА
    //      (Работает для всех списков на странице)
    //
    // =======================================================

    allSelectWrappers.forEach(selectWrapper => {
        const selectTrigger = selectWrapper.querySelector('.form_dropdown');
        const optionsList = selectWrapper.querySelector('.select-options-list');
        const options = optionsList.querySelectorAll('li');
        const selectedDisplay = selectTrigger.querySelector('p');
        const hiddenInput = selectWrapper.querySelector('input[type="hidden"]');

        if (!selectTrigger || !optionsList || !hiddenInput) return;

        selectTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            allSelectWrappers.forEach(otherWrapper => {
                if (otherWrapper !== selectWrapper) {
                    otherWrapper.classList.remove('is-open');
                }
            });
            selectWrapper.classList.toggle('is-open');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                selectedDisplay.textContent = option.textContent;
                hiddenInput.value = option.getAttribute('data-value');
                selectWrapper.classList.remove('is-open');
            });
        });
    });


    // =======================================================
    //
    //                        РАЗДЕЛ 5:
    //       ГЛОБАЛЬНОЕ ЗАКРЫТИЕ POP-UP И СПИСКОВ
    //
    // =======================================================

    // --- 1. Закрытие POP-UP по крестику или фону ---
    allPopups.forEach(overlay => {
        if (!overlay) return;
        overlay.querySelector('.popup-close')?.addEventListener('click', () => closePopup(overlay));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePopup(overlay);
            }
        });
    });

    // --- 2. Закрытие POP-UP "Успешно" по кнопке ---
    popupSuccessOverlay.querySelector('.popup-success-btn')?.addEventListener('click', () => closePopup(popupSuccessOverlay));

    // --- 3. Закрытие любого выпадающего списка по клику ВНЕ его области ---
    document.addEventListener('click', () => {
        allSelectWrappers.forEach(wrapper => {
            wrapper.classList.remove('is-open');
        });
    });

    // --- 4. Закрытие всего по клавише Escape ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openedPopup = document.querySelector('.popup-overlay.is-open');
            if (openedPopup) {
                closePopup(openedPopup);
            }
            allSelectWrappers.forEach(wrapper => {
                wrapper.classList.remove('is-open');
            });
        }
    });

});