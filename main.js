const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        // tamanhoSenha = tamanhoSenha-1;
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        // tamanhoSenha = tamanhoSenha+1;
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

for (i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

geraSenha();

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);

}

function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) + " dias para descobrir essa senha.";
}



const synth = window.speechSynthesis;
  const mensagem = new SpeechSynthesisUtterance(texto.textContent);
  mensagem.onend = () => {
    clearInterval(intervaloReposicionar);  
  };

  function falarTexto() {
  const synth = window.speechSynthesis;
  const mensagem = new SpeechSynthesisUtterance(texto.textContent);
  
 
  mensagem.volume = 1; 
  mensagem.rate = 1;   
  mensagem.pitch = 1;  

  synth.speak(mensagem);
}





document.getElementById("enviarMensagem").addEventListener("click", function () {
  document.getElementById("mensagemConfirmacao").innerText = "Mensagem enviada!";
});


function iniciarFalaEAnimacao() {
  falarTexto();  
  iniciarAnimacao();  
  

  const intervaloReposicionar = setInterval(() => {
    seguirTexto(); 
  }, 20);


  const synth = window.speechSynthesis;
  const mensagem = new SpeechSynthesisUtterance(texto.textContent);
  mensagem.onend = () => {
    clearInterval(intervaloReposicionar);  
  };
}



 function mostrarSenha() {
      const campo = document.getElementById("senha");
      campo.type = campo.type === "password" ? "text" : "password";
    }

    function avaliarSenha() {
      const senha = document.getElementById("senha").value;
      const barra = document.getElementById("barraForca");
      const textoEntropia = document.getElementById("textoEntropia");

      const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
      const numeros = '0123456789';
      const simbolos = '!@%*?';

      let alfabeto = '';

      if (/[A-Z]/.test(senha)) alfabeto += letrasMaiusculas;
      if (/[a-z]/.test(senha)) alfabeto += letrasMinusculas;
      if (/[0-9]/.test(senha)) alfabeto += numeros;
      if (/[^A-Za-z0-9]/.test(senha)) alfabeto += simbolos;

      const tamanhoSenha = senha.length;
      const tamanhoAlfabeto = alfabeto.length || 1;

      const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
      const dias = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)); 

      // Atualiza barra de força
      barra.classList.remove("fraca", "media", "forte");
      if (entropia > 57) {
        barra.classList.add("forte");
      } else if (entropia > 30) {
        barra.classList.add("media");
      } else {
        barra.classList.add("fraca");
      }

  
  barra.classList.remove("fraca", "media", "forte");

  let comentarioFinal = "";
  if (entropia > 65) {
    barra.classList.add("forte");
    comentarioFinal = "seguro";
  } else if (entropia > 32) {
    barra.classList.add("media");
    comentarioFinal = "bom";
  } else {
    barra.classList.add("fraca");
    comentarioFinal = "cuidado";
  }

  textoEntropia.textContent =
    `Força da senha: ${entropia.toFixed(1)} bits – um computador pode levar até ${dias} dias para descobrir. ${comentarioFinal}`;
}
