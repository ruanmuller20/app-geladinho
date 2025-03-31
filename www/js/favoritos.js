$(document).ready(function(){
    const token = localStorage.getItem('token');
    if(!token){
        alert('Usuário não autenticado. Por favor, faça login.');
        return;
    }

    fetch('http://localhost:3333/favoritos2', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.length > 0) {
            renderizarFavoritos(data);
        } else {
            favoritosVazio();
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        favoritosVazio();
    });




});

function renderizarFavoritos(favoritos){
    $("#listaFavoritos").empty();

    $.each(favoritos, function(index, itemFavoritos){
        var itemDiv = `
            <div class="item-carrinho" data-index="${index}">
                <div class="area-img">
                    <img src="${itemFavoritos.item.image}">

                </div>
                <div class="area-details">
                    <div class="sup">
                        <span class="name-prod">
                        ${itemFavoritos.item.name}
                        </span>
                        <a data-index="${index}" class="delete-item" href="#">
                            <i class="ri-close-line"></i>
                        </a>
                    </div>
                    <div class="middle">
                        <span>${itemFavoritos.item.description}</span>
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

