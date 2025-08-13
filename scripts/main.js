const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const pizzaCards = document.querySelectorAll('.menu-item');

pizzaCards.forEach(card => {
    if (isTouchDevice) {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    } else {
        card.addEventListener('mouseenter', () => {
            card.classList.add('active');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('active');
        });
    }
});

let carrinho = [];

function atualizarCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    const totalSpan = document.getElementById('total');
    lista.innerHTML = '';

    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.preco;
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;

        const btnRemover = document.createElement('button');
        btnRemover.textContent = '❌';
        btnRemover.style.marginLeft = '10px';
        btnRemover.onclick = () => {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        };

        li.appendChild(btnRemover);
        lista.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);

    // Criar link do WhatsApp com o pedido
    const mensagem = carrinho.map(p => `- ${p.nome} (R$ ${p.preco.toFixed(2)})`).join('\n');
    const numero = "5599999999999"; // Troque pelo número real
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(`Olá, gostaria de pedir:\n${mensagem}\n\nTotal: R$ ${total.toFixed(2)}`)}`;
    document.getElementById('finalizar-pedido').href = link;
}

// Evento único para adicionar ao carrinho
document.querySelectorAll('.add-carrinho').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation(); // Evita abrir o card

        const pizza = this.closest('.menu-item'); // garante que pega o card certo
        const nome = pizza.querySelector('.pizza-nome').textContent;
        const preco = parseFloat(pizza.querySelector('.pizza-preco').textContent);

        carrinho.push({ nome, preco });
        atualizarCarrinho();

        alert(`🍕 ${nome} adicionada ao carrinho por R$ ${preco.toFixed(2)}`);
    });
});
