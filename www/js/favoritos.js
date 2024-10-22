var localFavoritos = localStorage.getItem('favoritos');

if(localFavoritos){
    var favoritos = JSON.parse(localFavoritos);
    if(favoritos.length > 0){
        //tem items no favoritos
        //renderizar o favoritos
        renderizarFavoritos();
        //somar totais dos produtos

    } else {
        //carrinho vazio
        favoritosVazio();

    }
} else {
    //carrinho vazio
    favoritosVazio();
    
};

function renderizarFavoritos(){
    $("#listaFavoritos").empty();

    $.each(favoritos, function(index, itemFavoritos){
        var itemDiv = `
            <div class="item-carrinho" data-index="${index}">
                <div class="area-img">
                    <img src="${itemFavoritos.item.imagem}">

                </div>
                <div class="area-details">
                    <div class="sup">
                        <span class="name-prod">
                        ${itemFavoritos.item.nome}
                        </span>
                        <a data-index="${index}" class="delete-item" href="#">
                            <i class="ri-close-line"></i>
                        </a>
                    </div>
                    <div class="middle">
                        <span>${itemFavoritos.item.principal_caracteristica}</span>
                    </div>

                    </div>
                </div>

            </div>                

        `;

        $("#listaFavoritos").append(itemDiv);

    });

    $(".delete-item").on('click', function(){
        var index = $(this).data('index');
        app.dialog.confirm('Tem certeza que quer remover este item!?', 'Remover', function(){  
            favoritos.splice(index, 1);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            app.views.main.router.refreshPage();
    
        });
    });


   
};



function favoritosVazio(){
    console.log('Favoritos está vazio');
    $("#listaFavoritos").empty();

    $("#toolbarTotais").addClass('display-none');
    $("#toolbar-Checkout").addClass('display-none');

    //gift
    $("#listaFavoritos").html(`
        <div class="text-align-center">
            <img width="300" src="img/empty.gif">
            <br><span class="color-gray">Nenhum item nos favoritos...</span>
        
        </div>
    `);
    

    
}

$("#esvaziarFav").on('click', function(){
   app.dialog.confirm('Tem certeza que quer esvaziar os Favoritos?', '<strong>ESVAZiAR FAVORITOS</strong>', function(){
        localStorage.removeItem('favoritos');
        app.views.main.router.refreshPage();
   });
});

