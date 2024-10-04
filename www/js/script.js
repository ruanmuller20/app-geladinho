fetch('js/backend.json')
.then(response => response.json())
.then(data => {
    //SALVAR OS DADOS VINDOS DO BACK-END LOCALMENTE
    //UTILIZAR LOCALSTORAGE
    localStorage.setItem('produtos', JSON.stringify(data));
    console.log('Dados dos produtos salvos no localStorage');
    
  

    setTimeout(() => {

        //ESVAZIAR A AREA DE PRODUTOS
        $("#produtos").empty();

        data.forEach(produto =>{
            let produtoHTML = `
            <!--ITEM CARD-->
               <div class="item-card">
                     <a data-id="${produto.id}" href='#' class="item">
                         <div class="img-container">
                             <img src="${produto.imagem}">
                         </div>
                         <div class="nome-rating">
                             <span class="color-gray">${produto.nome}</span>
                             <span class="bold margin-right">
                             <i class="mdi mdi-star"></i>
                             ${produto.rating}
                             </span>
                         </div>
                                 <div class="price">${produto.preco_promocional.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</div>
                         </a>
                 </div>
                 
         `;
     
         $("#produtos").append(produtoHTML)
         });


         $('.item').on('click', function (){
            var id = $(this).attr('data-id');
            localStorage.setItem('detalhe', id);
            app.views.main.router.navigate('/detalhes/');
         });
     
    }, 1000);

   

})
.catch(error => console.log('Erro ao fazer fetch dos dados: '+ error));