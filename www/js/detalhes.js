//RECUPERAR O ID DETALHE NO LOCALSTORAGE
var id = parseInt(localStorage.getItem('detalhe'));

//PEGAR OS PRODUTOS DO LOCALSTORAGE
var produtos = JSON.parse(localStorage.getItem('produtos'));

var item = produtos.find(produto => produto.id === id);

if(item){
    console.log('Produto encontrado: ', item);

    $("#imagem-detalhe").attr('src', item.imagem);
    $("#nome-detalhe").html(item.nome);
    $("#rating-detalhe").html(item.rating);
    $("#like-detalhe").html(item.likes);
    $("#reviews-detalhe").html(item.reviews + ' reviews');
    $("#descricao-detalhe").html(item.descricao);
    $("#preco-detalhe").html(item.preco.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}));
    $("#precopromo-detalhe").html(item.preco_promocional.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}));

    var tabelaDetalhes = $('#tabdetalhes');
    
    item.detalhes.forEach(detalhe =>{
        var linha = `
        <tr>
            <td>${detalhe.caracteristica}</td>
            <td>${detalhe.detalhes}</td>
        </tr>
        `;

        tabelaDetalhes.append(linha);

    });
    
} else {
    console.log('Produto não encontrado: ');
}

var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

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


if (item) {
    // Renderizar os detalhes do produto (mantido igual)
    $("#imagem-detalhe").attr('src', item.imagem);
    $("#nome-detalhe").html(item.nome);
    //...outros detalhes...

    // Verificar se o item já está nos favoritos
    var itemNoFavoritos = favoritos.find(fav => fav.item.id === item.id);
    if (itemNoFavoritos) {
        $(".btn-favoritos").addClass('favoritado');  // Mudar a aparência do botão
    }
}

function toggleFavoritos(item) {
    var itemNoFavoritos = favoritos.find(fav => fav.item.id === item.id);
    
    if (itemNoFavoritos) {
        app.dialog.confirm(
            "Deseja remover este item dos favoritos?", 
            '<strong>REMOVER DOS FAVORITOS</strong>',
            function () {
                // Se o usuário clicar em "Sim"
                favoritos = favoritos.filter(fav => fav.item.id !== item.id); // Remover dos favoritos
                $(".btn-favoritos").removeClass('favoritado');
                localStorage.setItem('favoritos', JSON.stringify(favoritos)); 

                // Exibir mensagem de "removido dos favoritos"
                var toastCenter = app.toast.create({
                    text: `${item.nome} removido dos favoritos`,
                    position: 'center',
                    closeTimeout: 2000,
                });
                toastCenter.open();
            },
            function () {
                // Se o usuário clicar em "Não", nada acontece
            }
        );
    } else {
        favoritos.push({
            item: item,
            quantidade: 1,
            total_item: item.preco_promocional
        });
        $(".btn-favoritos").addClass('favoritado');
        localStorage.setItem('favoritos', JSON.stringify(favoritos));

        var toastCenter = app.toast.create({
            text: `${item.nome} adicionado aos favoritos`,
            position: 'center',
            closeTimeout: 2000,
        });
        toastCenter.open();
    }
}

$(".btn-favoritos").on('click', function() {
    toggleFavoritos(item);
});