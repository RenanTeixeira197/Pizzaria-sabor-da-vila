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
    });
});

let carrinho = []

const listaCarrinho = document.getElementById('lista-carrinho');
const totalEl = document.getElementById('total');
const toggleCarrinho = document.getElementById('toggle-carrinho');
const carrinhoDiv = document.getElementById('carrinho');

toggleCarrinho.addEventListener('click', () => {
    carrinhoDiv.classList.toggle('aberto');
});

document.querySelectorAll('.add-carrinho').forEach(botao => {
    botao.addEventListener('click', (e) => {
        e.stopPropagation();
        const nome = botao.getAttribute('data-pizza');
        const preco = parseFloat(botao.getAttribute('data-preco'));

        carrinho.push({ nome, preco });
        atualizarCarrinho();
    });
});

// Atualiza a lista e total
function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;

        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}
            <button onclick="removerItem(${index})">❌</button>
        `;
        listaCarrinho.appendChild(li);
    });

    totalEl.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Remove item do carrinho
function removerItem(indice) {
    carrinho.splice(indice, 1);
    atualizarCarrinho();
}

// Finalizar pedido
document.getElementById('finalizar-pedido').addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    alert('Pedido finalizado! Obrigado 😋🍕');
    carrinho = [];
    atualizarCarrinho();
});

// Finalizar pedido via WhatsApp
document.getElementById('finalizar-pedido').addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    let mensagem = '🍕 *Pedido de Pizza*%0A%0A';
    carrinho.forEach(item => {
        mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}%0A`;
    });

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    mensagem += `%0A*Total:* R$ ${total.toFixed(2).replace('.', ',')}`;

    const telefone = '5599999999999'; // coloque aqui o número com DDI + DDD
    const url = `https://wa.me/${telefone}?text=${mensagem}`;

    window.open(url, '_blank');
});
