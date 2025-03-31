const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


const email = document.getElementById('login_email');
const password = document.getElementById('login_password');

document.getElementById('btn_login').addEventListener('click', function(event){
  event.preventDefault();

  const email_log = email.value.trim();
  const password_log = password.value.trim();

  if(email_log == '' || password_log == ''){
    alert('Preencha todos os campos!');
  } else {
    fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: email_log,
          password: password_log
      })
  })
  .then(response => response.json()) 
  .then(data => {
      if (data.error) {
          throw new Error(data.error); 
      }

      alert('Usuário logado com sucesso!');
      localStorage.setItem('token', data.token); // Salva o token para autenticação
      window.location.href = "./index.html"; 
  })
  .catch(error => {
      console.error('Erro na requisição:', error);
      alert("Erro ao fazer login");
  });

}

});
