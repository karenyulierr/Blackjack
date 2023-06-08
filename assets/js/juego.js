/**
 * 
 * 2C = TWO OF CLUBS    (TRÉBOLES)
 * 2D = TWO OF DIAMIONS (DIAMANTES)
 * 2H = TWO OF HEARTS   (CORAZONES)
 * 2S = TWO OF SPADES   (ESPADAS)
 * 
 */

let   deck       = [];
const tipos      =['C','D','H','S'];
const especiales =['A','J','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0;


//REFERENCIAS HTML

const btnNuevo = document.querySelector("#btnNuevo");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const puntosHtml = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputador = document.querySelector("#computadora-cartas");

const crearDeck = ()=>{
    for(let i = 2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    // console.log(deck);
    deck=_.shuffle(deck)
    console.log(deck);

    return deck;
}

crearDeck();

// esta funcion me permite tomar una carta

const pedirCarta = ()=>{
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    const carta=deck.pop();
    return carta;
}
// pedirCarta();

const valorCarta = (carta)=>{
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
           (valor ==='A')  ? 11 : 10
           :  valor * 1;
}

//turno computadora
const turnoComputadora = (puntosMinimos)=>{
    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHtml[1].innerText=puntosComputadora;
    
        const imgCarta = document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputador.append(imgCarta);
        if(puntosMinimos > 21){
            break;
        }
    }while((puntosComputadora < puntosMinimos) && (puntosMinimos <=21));

    setTimeout(() => {
        if(puntosComputadora === puntosMinimos){
            alert("Nadie gana :'( ");
        }else if( puntosMinimos > 21){
            alert("Computadora gana");
        }else if(puntosComputadora >21){
            alert("Jugador gana");
        }else{
            alert("Computadora gana");
        }
    }, 100);

}

//eventos btnPedir
btnPedir.addEventListener('click',()=>{
    
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHtml[0].innerText=puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src=`assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador >21){
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);
    }else if( puntosJugador === 21){
        btnPedir.disabled=true;
        btnDetener.disabled=true;
    }
});

btnDetener.addEventListener('click',()=>{
    btnPedir.disabled=true;
    btnDetener.disabled=true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click',()=>{
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosComputadora = 0;
    puntosJugador     = 0;
    puntosHtml[0].innerText     = 0;
    puntosHtml[1].innerText     = 0;
    divCartasComputador.innerHTML =" ";
    divCartasJugador.innerHTML    =" ";
    btnPedir.disabled   = false;
    btnDetener.disabled = false;
})