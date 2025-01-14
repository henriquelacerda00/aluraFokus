const html = document.querySelector('html');
const btFoco = document.querySelector('.app__card-button--foco');
const btCurto = document.querySelector('.app__card-button--curto');
const btLongo = document.querySelector('.app__card-button--longo');
const img = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaInput = document.getElementById('alternar-musica');
const botaoStartPause = document.getElementById('start-pause');
const tempoNaTela = document.getElementById('timer');
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null ; 
const audioBeep = new Audio('/sons/beep.mp3');
const audioPause = new Audio('/sons/pause.mp3');
const audioPlay = new Audio('/sons/play.wav');
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true;
musica.currentTime = 8;
audioBeep.currentTime = 3;

musicaInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

btFoco.addEventListener('click' , () =>{
    tempoDecorridoEmSegundos = 1500 ;
    mudarContexto('foco');
    btFoco.classList.add('active');
    
})

btCurto.addEventListener('click' , () =>{
    tempoDecorridoEmSegundos = 300
    mudarContexto('descanso-curto');
    btCurto.classList.add('active');
    
})

btLongo.addEventListener('click' , () =>{
    tempoDecorridoEmSegundos = 900;
    mudarContexto('descanso-longo');
    btLongo.classList.add('active');
    
})

function mudarContexto(contexto){
    mostrarTempoNaTela();
    botoes.forEach(function(botão){
        botão.classList.remove('active');
    })
    html.setAttribute('data-contexto' , contexto);
    img.setAttribute('src' , `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco' :
            texto.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto' :
            texto.innerHTML = `Que tal dar uma respirada?<strong class="app__title-strong"> Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo' : 
            texto.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`;
        default:
            break;
    }
}

const contagemRegressiva = () =>{
    mostrarTempoNaTela();
    if(tempoDecorridoEmSegundos <= 0){
        zerar();
        audioBeep.play();
        alert('tempo esgotado');
        return;
    }
    tempoDecorridoEmSegundos -= 1
    console.log('contador:' + tempoDecorridoEmSegundos);
}

botaoStartPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        zerar();
        audioPause.play();
        botaoStartPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
                        <span>começar</span>`;
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    audioPlay.play();
    botaoStartPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt="">
                        <span>Pausar</span>`;
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null;
}

function mostrarTempoNaTela(){
    const tempo = new Date(tempoDecorridoEmSegundos*1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br' , {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}
mostrarTempoNaTela();