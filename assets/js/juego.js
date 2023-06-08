(()=>{

    'use strict';
        
    let   deck       = [];
    const tipos      =['C','D','H','S'],
          especiales =['A','J','Q','K'];

    let puntosJugadores = [];


    //REFERENCIAS HTML

    const btnNuevo = document.querySelector("#btnNuevo"),
          btnPedir = document.querySelector("#btnPedir"),
          btnDetener = document.querySelector("#btnDetener");

    const puntosHtml = document.querySelectorAll("small"),
          divCartasJugador = document.querySelector("#jugador-cartas"), 
          divCartasComputador = document.querySelector("#computadora-cartas");

    //Esta funcion inicializa el juego
    const iniciarlizarJuego = (numJugadores = 1) =>{
         deck = crearDeck();
         for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
         }
    }

    const crearDeck = ()=>{
        deck = [];
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
        return _.shuffle(deck);
    }

    // esta funcion me permite tomar una carta

    const pedirCarta = ()=>{
        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }

        return carta=deck.pop();
    }

    const valorCarta = (carta)=>{
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor ==='A')  ? 11 : 10
            :  valor * 1;
    }

    const acumularPuntos = (carta,turno) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    //turno computadora
    const turnoComputadora = (puntosMinimos)=>{
        do{
            const carta = pedirCarta();
            const puntosJugador = acumularPuntos(carta, puntosJugadores.length - 1);
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
        const puntosJugador = acumularPuntos(carta, puntosJugadores.length - 1);
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
        iniciarlizarJuego();
        console.clear();
        deck = [];
        deck = crearDeck();
        // puntosComputadora = 0;
        // puntosJugador     = 0;
        puntosHtml[0].innerText     = 0;
        puntosHtml[1].innerText     = 0;
        divCartasComputador.innerHTML =" ";
        divCartasJugador.innerHTML    =" ";
        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    })

})();
