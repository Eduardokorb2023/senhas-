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
const barraForcaGerada = document.getElementById('barraForca');

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

    barraForcaGerada.classList.remove('fraca', 'media', 'forte');

    if (entropia > 57) {
        barraForcaGerada.classList.add('forte');
    } else if (entropia > 30 && entropia <= 57) {
        barraForcaGerada.classList.add('media');
    } else {
        barraForcaGerada.classList.add('fraca');
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



const campoSenhasua = document.getElementById('senhaUsuario');
const barraForca = document.getElementById('barraForca');
const textoForca = document.getElementById('textoForca');

campoSenhasua.addEventListener('input', function () {
  const senha = campoSenhasua.value;
  verificaForca(senha);
});

function verificaForca(senha) {
  let pontuacao = 0;
  if (senha.length >= 8) pontuacao++;
  if (/[A-Z]/.test(senha)) pontuacao++;
  if (/[a-z]/.test(senha)) pontuacao++;
  if (/[0-9]/.test(senha)) pontuacao++;
  if (/[^A-Za-z0-9]/.test(senha)) pontuacao++;

  // Remove todas as classes
  barraForca.classList.remove('fraca', 'media', 'forte');

  if (pontuacao <= 2) {
    barraForca.classList.add('fraca');
    textoForca.textContent = 'Força da senha: Fraca';
  } else if (pontuacao <= 4) {
    barraForca.classList.add('media');
    textoForca.textContent = 'Força da senha: Média';
  } else {
    barraForca.classList.add('forte');
    textoForca.textContent = 'Força da senha: Forte';
  }
}
