$(document).ready(function() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Usuário não autenticado. Por favor, faça login.');
        return;
    }

    // Buscar os itens do backend
    fetch('http://localhost:3333/items', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Salvar os dados dos produtos no localStorage
        localStorage.setItem('produtos', JSON.stringify(data));
        console.log('Dados dos produtos salvos no localStorage');

        // Esvaziar a área de produtos
        $("#produtos").empty();

        // Renderizar os itens na página
        data.forEach(produto => {
            let produtoHTML = `
            <!--ITEM CARD-->
               <div class="item-card">
                     <a data-id="${produto.id}" href='#' class="item">
                         <div class="img-container">
                             <img src="${produto.image}">
                         </div>
                         <div class="nome-rating">
                             <span class="color-gray">${produto.name}</span>
                             <span class="bold margin-right">
                             <i class="mdi mdi-star"></i>
                             ${produto.description}
                             </span>
                         </div>
                         <div class="price">${produto.price_promo.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</div>
                         
                     </a>
                 </div>
            `;

            $("#produtos").append(produtoHTML);
        });

        // Adicionar evento de clique ao coração de detalhes
        $('.heart-icon').on('click', function() {
            const itemId = $(this).data('item-id');
            adicionarAosFavoritos(itemId, token);
        });

        // Adicionar evento de clique aos itens para navegar para os detalhes
        $('.item').on('click', function() {
            var id = $(this).attr('data-id');
            localStorage.setItem('detalhe', id);
            app.views.main.router.navigate('/detalhes/');
        });
    })
    .catch(error => console.log('Erro ao fazer fetch dos dados: ' + error));
});
//quantidade de items no carrinho

setTimeout(() => {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    $('.btn-card').attr('data-count', carrinho.length);

}, 300);