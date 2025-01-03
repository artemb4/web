(function () {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        const footer = document.querySelector('.footer');
        const loadTimeElement = document.createElement('p');
        loadTimeElement.textContent = `Страница загружена за ${loadTime.toFixed(2)} мс.`;
        footer.appendChild(loadTimeElement);
    });
})();

document.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.color = '#ff0';
    });
    link.addEventListener('mouseout', () => {
        link.style.color = '#fff';
    });
});
