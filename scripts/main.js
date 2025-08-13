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

const botoesCarrinho = document.querySelectorAll('.add-carrinho');

botoesCarrinho.forEach(botao => {
    botao.addEventListener('click', (e) => {
        e.stopPropagation();
        const pizza = botao.getAttribute('data-pizza');
        const preco = botao.getAttribute('data-preco');
        alert(`🍕 ${pizza} adicionada ao carrinho por R$ ${preco}`);
        //Poderá ser enviado a um array ou banco de dados
    })
})