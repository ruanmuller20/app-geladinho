
fetch('js/backend.json')
    .then(res => res.json())
    .then((json) => {
        const ul = document.getElementById('listaProdutos');
        json.forEach((item)=> {
            const li = document.createElement('li');
            li.innerHTML = `
             <a data-id="${item.id}" href="#" class="item">
                <img width="50"
                src="${item.imagem}">
                <span class="item-name">${item.nome}</span>
             </a>
            `

            ul.appendChild(li);
        });

        $('.item').on('click', function (){
            var id = $(this).attr('data-id');
            localStorage.setItem('detalhe', id);
            app.views.main.router.navigate('/detalhes/');
         });


         

    });


    function filtrar(){
       let input = document.getElementById('inputBusca');
       let ul = document.getElementById('listaProdutos');
       let filter = input.value.toUpperCase();
       let li = ul.getElementsByTagName('li');
       let count = 0;

         for (i = 0; i < li.length; i++) {
              let a = li[i].getElementsByTagName('a')[0];
              let txtValue = a.textContent || a.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                    count++;
                    span = li[i].querySelector(".item-nome");
                    if(span){
                        span.innerHTML = txtValue.replace(new RegExp(filter,"gi"), (match) =>{
                            return "<strong>" + match + "</strong>";
                        });
                    }
              } else {
                li[i].style.display = "none";
              }
         }

    }