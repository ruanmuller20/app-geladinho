//RECUPERAR O ID DETALHE NO LOCALSTORAGE
var id = parseInt(localStorage.getItem('detalhe'));

//PEGAR OS PRODUTOS DO LOCALSTORAGE
var produtos = JSON.parse(localStorage.getItem('produtos'));




if (typeof token === 'undefined') {
    var token = localStorage.getItem('token');
}

if (!token) {
    alert('Usuário não autenticado. Por favor, faça login.');
    window.location.href = "./login.html";
}


var item = produtos.find(produto => produto.id === id);

if(item){
    console.log('Produto encontrado: ', item);

    $("#imagem-detalhe").attr('src', item.image);
    $("#nome-detalhe").html(item.name);
    $("#rating-detalhe").html(item.rating);
    $("#like-detalhe").html(item.likes);
    $("#reviews-detalhe").html(item.reviews + ' reviews');
    $("#descricao-detalhe").html(item.description);
    $("#preco-detalhe").html(item.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}));
    $("#precopromo-detalhe").html(item.price_promo.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}));

    // var tabeladetalhes = $('#tabdetalhes');
    
    // item.items.forEach(item =>{
    //     var linha = `
    //     <tr>
    //         <td>${item.caracteristic}</td>
    //         <td>${item.description}</td>
    //     </tr>
    //     `;

    //     tabeladetalhes.append(linha);

    // });
    
} else {
    console.log('Produto não encontrado: ');
}

var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];


function adicionarAoCarrinho(item, quantidade){
    var itemNoCarrinho = carrinho.find(c=> c.item.id === item.id);
    
    if(itemNoCarrinho){
        itemNoCarrinho.quantidade += quantidade;
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional;

    } else {
        carrinho.push({
            item: item,
            quantidade: quantidade,
            total_item: quantidade * item.preco_promocional
        });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

}

// Adicionar evento de clique ao botão "Adicionar ao Carrinho"
$(".add-cart").on('click', function() {
    adicionarAoCarrinho(item, 1); // Adiciona 1 unidade do item ao carrinho
    var toastCenter = app.toast.create({
        text: `${item.nome} adicionado ao carrinho`,
        position: 'center',
        closeTimeout: 2000,
    });
    toastCenter.open();
});

var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];


function carregarFavoritosDoBackend() {
    fetch('http://localhost:3333/favoritos2', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar favoritos: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log("Favoritos carregados do backend:", data);

        // Atualizar o estado do botão de favoritos com base nos dados do backend
        var itemNoFavoritos = data.find(fav => fav.itemId === item.id);
        if (itemNoFavoritos) {
            $(".btn-favoritos").addClass('favoritado'); // Mudar a aparência do botão
            console.log("Item já está nos favoritos:", itemNoFavoritos);
        } else {
            console.log("Item não está nos favoritos.");
        }
    })
    .catch(error => {
        console.error('Erro ao carregar favoritos do backend:', error);
    });
}

// Chamar a função para carregar os favoritos ao carregar a página
if (item) {
    console.log("Produto encontrado:", item);

    // Renderizar os detalhes do produto
    $("#imagem-detalhe").attr('src', item.image);
    $("#nome-detalhe").html(item.name);

    // Buscar os favoritos do backend
    carregarFavoritosDoBackend();
} else {
    console.log("Produto não encontrado.");
}
// function toggleFavoritos(item) {
//     var itemNoFavoritos = favoritos.find(fav => fav.item.id === item.id);
    
//     if (itemNoFavoritos) {
//         app.dialog.confirm(
//             "Deseja remover este item dos favoritos?", 
//             '<strong>REMOVER DOS FAVORITOS</strong>',
//             function () {
//                 // Se o usuário clicar em "Sim"
//                 favoritos = favoritos.filter(fav => fav.item.id !== item.id); // Remover dos favoritos
//                 $(".btn-favoritos").removeClass('favoritado');
//                 localStorage.setItem('favoritos', JSON.stringify(favoritos)); 

//                 // Exibir mensagem de "removido dos favoritos"
//                 var toastCenter = app.toast.create({
//                     text: `${item.nome} removido dos favoritos`,
//                     position: 'center',
//                     closeTimeout: 2000,
//                 });
//                 toastCenter.open();
//             },
//             function () {
//                 // Se o usuário clicar em "Não", nada acontece
//             }
//         );
//     } else {
//         favoritos.push({
//             item: item,
//             quantidade: 1,
//             total_item: item.preco_promocional
//         });
//         $(".btn-favoritos").addClass('favoritado');
//         localStorage.setItem('favoritos', JSON.stringify(favoritos));

//         var toastCenter = app.toast.create({
//             text: `${item.nome} adicionado aos favoritos`,
//             position: 'center',
//             closeTimeout: 2000,
//         });
//         toastCenter.open();
//     }
// }

function adicionarAosFavoritos(itemId){
    
    fetch('http://localhost:3333/createfav', {
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            itemId: itemId,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao adicionar aos favoritos: " + response.status);
        }
        return response.json();
    })
    .then(() => {
        var toastCenter = app.toast.create({
            text: `Item adicionado aos favoritos`,
            position: 'center',
            closeTimeout: 2000,
        });
        toastCenter.open();
        $(".btn-favoritos").addClass('favoritado'); // Atualiza a aparência do botão
    })
    .catch(error => {
        console.error('Erro ao adicionar aos favoritos:', error);
        alert('Erro ao adicionar o item aos favoritos.');
    });

 

}

$(".btn-favoritos").on('click', function() {
    adicionarAosFavoritos(id);
    
    
});