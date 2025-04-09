let listaDeNumerosSorteados = [];
let númeroLimite = 5;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
document.getElementById('chutar').getAttribute("disabled");

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1","Jogo do número secreto");
    exibirTextoNaTela("p",`Escolha um número entre 1 e ${númeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    if (chute == ""){
        exibirTextoNaTela("p","Você precisa digitar algum número!")
    }
    else if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", 'Acertou!')
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p",mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute("disabled");
        document.getElementById("chutar").disabled = true
        
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", `O número secreto é menor do que ${chute}.`);
        } else {
            exibirTextoNaTela("p", `O número secreto é maior do que ${chute}.`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * númeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == númeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input")
    chute.value = ""
}

function reiniciarJogo() { 
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true)
    document.getElementById("chutar").disabled = false
}