// URL для получения данных
const COMMENTS_API = "https://jsonplaceholder.typicode.com/comments";

// Селекторы для работы с DOM
const preloader = document.querySelector('.preloader');
const commentsList = document.querySelector('.comments');
const errorDiv = document.querySelector('.error');

// Функция для отображения комментариев
function renderComments(comments) {
    commentsList.innerHTML = ''; // Очистка списка
    comments.forEach(comment => {
        const li = document.createElement('li');
        li.classList.add('comment');
        li.innerHTML = `
            <h3>${comment.name}</h3>
            <p>${comment.body}</p>
            <small>By: ${comment.email}</small>
        `;
        commentsList.appendChild(li);
    });
}

// Функция для обработки ошибки
function showError(message) {
    errorDiv.textContent = `⚠ ${message}`;
}

// Симуляция случайной фильтрации данных
function filterRandomly(comments) {
    return comments.filter(() => Math.random() > 0.5);
}

// Функция загрузки комментариев
async function loadComments() {
    preloader.classList.add('active'); // Показываем прелоадер
    try {
        const response = await fetch(COMMENTS_API);
        if (!response.ok) {
            throw new Error('Не удалось загрузить данные');
        }
        const comments = await response.json();
        const filteredComments = filterRandomly(comments);
        renderComments(filteredComments);
    } catch (error) {
        showError(error.message);
    } finally {
        preloader.classList.remove('active'); // Скрываем прелоадер
    }
}

// Загружаем данные после загрузки страницы
document.addEventListener('DOMContentLoaded', loadComments);
