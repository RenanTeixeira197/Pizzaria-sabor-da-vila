const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const pizzaCards = document.querySelectorAll('.pizza-card');

pizzaCards.forEach(card => {
    if(isTouchDevice) {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    } else{
        card.addEventListener('mouseenter', () => {
            card.classList.add('active');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('active');
        });
    }
})