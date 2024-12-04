document.addEventListener('DOMContentLoaded', () => {
    // Получаем форму и элементы для отображения расписания
    const form = document.querySelector('#schedule-form');

    // Добавляем обработчик события на отправку формы
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)
        
        const selectedModel = form.querySelector('#model').value; // Получаем выбранную модель
        const clientName = form.querySelector('#name').value; // Получаем имя клиента
        const date = form.querySelector('#date').value; // Получаем дату
        const time = form.querySelector('#time').value; // Получаем время
        const service = form.querySelector('#service').value; // Получаем услугу

        console.log(`Выбрана модель: ${selectedModel}`);
        console.log(`Имя клиента: ${clientName}`);
        console.log(`Дата: ${date}`);
        console.log(`Время: ${time}`);
        console.log(`Услуга: ${service}`);

        // Генерируем расписание для выбранной модели
        addScheduleEntry(selectedModel, clientName, date, time, service);
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

        // Очистим форму после добавления записи
        form.reset();
    }
});
