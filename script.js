document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-filter .filter-button');
    const employmentTypeButtons = document.querySelectorAll('.employment-type-filter .filter-button');
    const searchButton = document.getElementById('search-button');
    const keywordInput = document.getElementById('keyword-search');
    const locationInput = document.getElementById('location-search');
    const jobCards = document.querySelectorAll('.job-card');
    const applyButtons = document.querySelectorAll('.apply-button'); // Для интерактивности кнопок отклика

    // Функция для применения всех фильтров и поиска
    const applyFiltersAndSearch = () => {
        // Получаем активные значения фильтров
        const activeCategory = document.querySelector('.category-filter .filter-button.active').dataset.filterValue;
        const activeEmploymentType = document.querySelector('.employment-type-filter .filter-button.active').dataset.filterValue;

        // Получаем значения из полей поиска
        const keywordSearchTerm = keywordInput.value.toLowerCase().trim();
        const locationSearchTerm = locationInput.value.toLowerCase().trim();

        jobCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardEmployment = card.dataset.employment;
            const cardTitle = card.querySelector('.job-title').textContent.toLowerCase();
            const cardDescription = card.querySelector('.job-description').textContent.toLowerCase();
            const cardCompany = card.querySelector('.company-name').textContent.toLowerCase();
            const cardLocation = card.querySelector('.location').textContent.toLowerCase();

            // Проверка по категории
            const categoryMatch = (activeCategory === 'all' || cardCategory === activeCategory);

            // Проверка по типу занятости
            const employmentMatch = (activeEmploymentType === 'all' || cardEmployment === activeEmploymentType);

            // Проверка по ключевым словам
            const keywordMatch = (keywordSearchTerm === '' || 
                                  cardTitle.includes(keywordSearchTerm) ||
                                  cardDescription.includes(keywordSearchTerm) ||
                                  cardCompany.includes(keywordSearchTerm));
            
            // Проверка по местоположению            const locationMatch = (locationSearchTerm === '' || cardLocation.includes(locationSearchTerm));

            if (categoryMatch && employmentMatch && keywordMatch && locationMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    };

    // Добавление слушателей для кнопок категорий
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            applyFiltersAndSearch(); // Применяем фильтры после изменения активной категории
        });
    });

    // Добавление слушателей для кнопок типа занятости
    employmentTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            employmentTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            applyFiltersAndSearch(); // Применяем фильтры после изменения активного типа занятости
        });
    });

    // Добавление слушателя для кнопки поиска
    searchButton.addEventListener('click', applyFiltersAndSearch);

    // Добавление слушателей для полей ввода (поиск при нажатии Enter или изменении)
    keywordInput.addEventListener('input', applyFiltersAndSearch);
    locationInput.addEventListener('input', applyFiltersAndSearch);
    
    // Добавление интерактивности для кнопки "Разместить вакансию"
    const promoButton = document.querySelector('.promo-banner .promo-button');
    if (promoButton) {
        promoButton.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Спасибо за интерес! Свяжитесь с нами для размещения вакансии.');
        });
    }

    // Добавление интерактивности для кнопок "Откликнуться"
    applyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const jobTitle = button.closest('.job-card').querySelector('.job-title').textContent;
            const companyName = button.closest('.job-card').querySelector('.company-name').textContent;
            alert(`Вы откликнулись на вакансию "${jobTitle}" в компании "${companyName}".`);
        });
    });

    // Инициализация: применяем фильтры и поиск при загрузке страницы, чтобы показать все вакансии по умолчанию
    applyFiltersAndSearch();
});