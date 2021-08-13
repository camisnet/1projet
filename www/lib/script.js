window.onload = function(){
const cadastrar = document.querySelector("#cadastrar");
const nome = document.querySelector("#nome");
const curso = document.querySelector("#curso");
const buscar = document.querySelector("#buscar");
const id = document.querySelector("#id");
const alterar = document.querySelector("#alterar");
const deletar = document.querySelector("#deletar");
const codigo = document.querySelector("#codigo");
const apagar = document.querySelector("#apagar");


//Registrar uma pessoa
cadastrar.addEventListener("click", function(){
  conexao();
  let formdata = new FormData();
formdata.append('nome', `${nome.value}`);
formdata.append('curso', `${curso.value}`);
fetch("https://www.jussimarleal.com.br/exemplo_api/pessoa",
  {
     body: formdata,
     method:"post",
     mode:'cors', 
     cache:'default'
  }).then(()=>{
          alert("Registro efetuado com Sucesso!");
          limparCampos();
               }
    );
  
});
//met listar uma pessoa
buscar.addEventListener("click", function(){
  conexao();
  fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
    method:"get",
    mode:'cors', 
    cache:'default'
  }).then(response=>{
    response.json().then(data => {
      nome.value = data['nome'];
      curso.value = data['curso'];
    })
  })
})
//alterar dados
alterar.addEventListener("click", function(){
  conexao();
  fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
   method:"put",
   mode:'cors', 
  cache:'default',
   headers:{
     'Content-type': 'application/json; charset=UTF-8'
     },
     body:JSON.stringify({
       'nome': `${nome.value}`,
       'curso': `${curso.value}`
    })
  }).then(()=>{
    alert("Registro alterado com sucesso!")
    limparCampos();
  });
});

//metodo deletar registro
deletar.addEventListener("click", function(){
  conexao();
  fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
    method:"delete",
    mode:'cors', 
    cache:'default'
  }).then(alert("Registro deletado com sucesso"));
})

//met limpar campos
function limparCampos(){
  conexao();
  nome.value = "";
  curso.value = "";
  id.value = "";
  }

codigo.addEventListener("click", function(){
  conexao();
   cordova.plugins.barcodeScanner.scan(
      function (result) {
  fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${result.text}`,{
    method:"get",
    mode:'cors', 
    cache:'default'
  }).then(response=>{
    response.json().then(data => {
      id.value = data['id'];
      nome.value = data['nome'];
      curso.value = data['curso'];
    })
  })
},
  function (error) {
          alert("Erro encontrado: " + error);
      },
  {
          preferFrontCamera : false,
          showFlipCameraButton : true, 
          showTorchButton : true, 
          torchOn: true, 
          saveHistory: true, 
          prompt : "Place a barcode inside the scan area",
          resultDisplayDuration: 500, 
          formats : "QR_CODE,PDF_417", 
          orientation : "landscape", 
          disableAnimations : true, 
          disableSuccessBeep: false 
      }
   );
});

apagar.addEventListener("click", function(){
  conexao();
  limparCampos();
})

function conexao() {
    var networkState = navigator.connection.type;

  if (networkState == Connection.NONE){
    function conexao(buttonIndex){
       if(buttonIndex == "2"){
      navigator.app.exitApp();
       }

    }
   navigator.notification.confirm(
    "Por favor, verifique sua conexão com a internet",
     conexao,
    "Conexão de internet indísponivel",
    ['Tentar Novamente','Sair']
     );
  }
}
}



