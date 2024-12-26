document.addEventListener('DOMContentLoaded', () => {
    // Получаем форму и элементы для отображения расписания
    const form = document.querySelector('#schedule-form');

    // Загружаем сохраненные данные из LocalStorage при загрузке страницы
    loadSchedules();

    // Добавляем обработчик события на отправку формы
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)
        
        const selectedModel = form.querySelector('#model').value; // Получаем выбранную модель
        const clientName = form.querySelector('#name').value; // Получаем имя клиента
        const date = form.querySelector('#date').value; // Получаем дату
        const time = form.querySelector('#time').value; // Получаем время
        const service = form.querySelector('#service').value; // Получаем услугу

        // Генерируем расписание для выбранной модели
        addScheduleEntry(selectedModel, clientName, date, time, service);

        // Сохраняем данные в LocalStorage
        saveSchedules();
    });

    // Функция добавления записи в расписание
    function addScheduleEntry(model, clientName, date, time, service) {
        const table = document.querySelector(`#${model}`);
        if (!table) {
            console.error(`Таблица для модели "${model}" не найдена.`);
            return;
        }

        const scheduleBody = table.querySelector('.schedule-body');
        if (!scheduleBody) {
            console.error(`Тело расписания для модели "${model}" не найдено.`);
            return;
        }

        // Создаем строку с новой записью
        const row = document.createElement('tr');

        const clientCell = document.createElement('td');
        clientCell.textContent = clientName;

        const dateCell = document.createElement('td');
        dateCell.textContent = date;

        const timeCell = document.createElement('td');
        timeCell.textContent = time;

        const serviceCell = document.createElement('td');
        serviceCell.textContent = service;

        row.appendChild(clientCell);
        row.appendChild(dateCell);
        row.appendChild(timeCell);
        row.appendChild(serviceCell);

        // Добавляем строку в таблицу
        scheduleBody.appendChild(row);
    }

    // Функция сохранения расписаний в LocalStorage
    function saveSchedules() {
        const schedules = {};

        // Проходим по всем таблицам и собираем данные
        document.querySelectorAll('.model').forEach(modelDiv => {
            const modelId = modelDiv.id;
            const scheduleBody = modelDiv.querySelector('.schedule-body');
            const rows = scheduleBody.querySelectorAll('tr');

            schedules[modelId] = Array.from(rows).map(row => {
                const cells = row.querySelectorAll('td');
                return {
                    clientName: cells[0].textContent,
                    date: cells[1].textContent,
                    time: cells[2].textContent,
                    service: cells[3].textContent
                };
            });
        });

        localStorage.setItem('schedules', JSON.stringify(schedules));
    }

    // Функция загрузки расписаний из LocalStorage
    function loadSchedules() {
        const savedSchedules = localStorage.getItem('schedules');
        if (!savedSchedules) return;

        const schedules = JSON.parse(savedSchedules);

        for (const [modelId, entries] of Object.entries(schedules)) {
            const table = document.querySelector(`#${modelId}`);
            if (!table) continue;

            const scheduleBody = table.querySelector('.schedule-body');
            entries.forEach(entry => {
                addScheduleEntry(modelId, entry.clientName, entry.date, entry.time, entry.service);
            });
        }
    }
});
