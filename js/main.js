const contagem = document.querySelector('h2');
const iniciarBt = document.getElementById('iniciar');
const resetarBt = document.getElementById('resetar');
const adicionarBt = document.getElementById('adicionar');
const diminuirBt = document.getElementById('diminuir');
const darkELighBt = document.getElementById('tema');

const body = document.querySelector('body');

let tempoACorrer = 1500;
let contagemAtiva = null;

iniciarBt.addEventListener('click', iniciarOuPausar);
resetarBt.addEventListener('click', eventoBotao);
adicionarBt.addEventListener('click', eventoBotao);
diminuirBt.addEventListener('click', eventoBotao);
darkELighBt.addEventListener('click', inverterCores);

mostrarContagem();

function inverterCores(evento) {
    switch (evento.target.className) {
        case 'fa-solid fa-sun':
            body.style.background = "#141414";
            contagem.style.color = "#ececec";
            iniciarBt.style.color = "#ececec";
            resetarBt.style.color = "#ececec";
            adicionarBt.style.color = "#ececec";
            diminuirBt.style.color = "#ececec";
            darkELighBt.setAttribute('class', 'fa-solid fa-moon');
            darkELighBt.style.color = "#141414";
            darkELighBt.style.backgroundColor = "#ccc";
            break;
        case 'fa-solid fa-moon':
            body.style.background = "linear-gradient(0deg, rgba(104, 104, 104, 1) 0%, rgba(149, 149, 149, 1) 0%, rgba(223, 223, 223, 1) 100%)";
            body.style.fill = 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#686868", endColorstr="#dfdfdf", GradientType=1);';
            contagem.style.color = "#141414";
            iniciarBt.style.color = "#141414";
            resetarBt.style.color = "#141414";
            adicionarBt.style.color = "#141414";
            diminuirBt.style.color = "#141414";
            darkELighBt.setAttribute('class', 'fa-solid fa-sun');
            darkELighBt.style.color = "#ececec";
            darkELighBt.style.backgroundColor = "#ccc";
            break;
        default:
            alert('Erro!');
            break;
    }
}

function eventoBotao() {
    switch (this.id) {
        case 'resetar':
            resetarTempo();
            break;
        case 'adicionar':
            adicionarTempo();
            break;
        case 'diminuir':
            diminuirTempo();
            break;
        default:
            console.log('não entrou');
            break;
    }
}

function resetarTempo() {
    if (tempoACorrer == 0) {
        alert('A contagem já está resetada!')
        return;
    }

    tempoACorrer = 0;
    zerar();
}

function adicionarTempo() {
    if (tempoACorrer < 3300) {
        tempoACorrer += 300;
        mostrarContagem();
    } else {
        alert('O sistema vai até 55 minutos apenas!');
    }
}

function diminuirTempo() {
    if (tempoACorrer > 300) {
        tempoACorrer -= 300;
        mostrarContagem();
    } else {
        alert('Se você tirar 5 minutos irá dar erro, é melhor zerar!');
    }
}

function iniciarOuPausar() {
    if (tempoACorrer == 0) {
        alert('O tempo está zerado! Acrescente minutos ou escolha uma das opções');

        return;
    }

    if (contagemAtiva) {
        zerar();
        return;
    }

    iniciarBt.setAttribute('class', 'fa-solid fa-pause');
    contagemAtiva = setInterval(contagemRegressiva, 1000);

    mostrarContagem();
}

function contagemRegressiva() {
    if (tempoACorrer <= 0) {
        alert('Zerou!');
        zerar();
        return;
    }

    tempoACorrer--;

    mostrarContagem()
}

function zerar() {
    iniciarBt.setAttribute('class', 'fa-solid fa-play');

    if (tempoACorrer > 0) {
        clearInterval(contagemAtiva);
        contagemAtiva = null;

        return;
    }

    clearInterval(contagemAtiva);
    contagemAtiva = null;

    mostrarContagem();
}

function mostrarContagem() {
    // To dizendo que do Date quero os segundos
    let tempo = new Date(tempoACorrer * 1000);
    let tempoFormatado = tempo.toLocaleString('pt-br', { minute: '2-digit', second: '2-digit' });

    contagem.innerHTML = tempoFormatado;
}