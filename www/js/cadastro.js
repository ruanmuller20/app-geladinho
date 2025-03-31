const nome = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const telefone = document.getElementById('telefone');


document.getElementById('criar_conta').addEventListener('click', function(event){
    event.preventDefault();

    const nomeValor = nome.value.trim();
    const emailValor = emailInput.value.trim();
    const passwordValor = passwordInput.value.trim();
    const telefoneValor = telefone.value.trim();

    if(nomeValor == '' || emailValor == '' || passwordValor == '' || telefoneValor == ''){
        alert('Preencha todos os campos!');
    } else {
        fetch('http://localhost:3333/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nomeValor,
                email: emailValor,
                password: passwordValor,
                telefone: telefoneValor
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro na requisição: " + response.status);
                }
                return response.json();
                
            })
            .then(data => alert('Usuário criado com sucesso!', data))
            .catch(error => console.error('Erro na requisição:', error));
    }

  
    
});





