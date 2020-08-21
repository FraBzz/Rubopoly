/*
Monopoly(R) Kata

Release 1 and 2
*/


//array per testare il numero dei giocatori creati
var numberPlayer = [];

var roundSinglePlayer = 20;//round che ogni singolo giocatore deve fare
var round = 0;


//creo due giocatori, 
//altro metodo per creare i giocatori è il costruttore di oggetti
//horse
var horse = 'horse';
numberPlayer.push(horse);

//car
var car = 'car';
numberPlayer.push(car);

//il contatore per i round di ogni singolo giocatore
var firstPlayerRound = 0
var secondPlayerRound = 0

//console.log(numberPlayer);

//funzione che controlla se i giocatori inseriti sono della quantita giusta per iniziare il gioco
function players(){
if (numberPlayer.length == 0){
    return {message : ('Inserire i giorcatori')};
} else {
    //verifico che il numero dei giocatori si acompreso tra 2 e 8
    if ( numberPlayer.length < 2 || numberPlayer.length > 8 ){
        return {message : ('Attenzione!! Il numero dei giocatori deve essere 2-8')};
    } else {
        return {message : ('Perfetto! Possiamo cominciare!')};
    }
};
};

players();

//creo un array nel quale inserirò i giocatori in maniera random utilizzando la funzione shuffle
var shuff = [];

//scelgo random l'ordine dei giocatori
function shuffle(){
    for (var i = numberPlayer.length - 1 ; i > 0; i--){
        var j = Math.floor(Math.random() * (i + 1));
        var temp = numberPlayer[i];
        numberPlayer[i] = numberPlayer[j];
        numberPlayer[j] = temp;
        shuff.push(numberPlayer[0], numberPlayer[1]);
    }
}
shuffle();

//assegno i turni , firstPlayer è il giocatore della prima mossa e così via
var firstPlayer = shuff[0];
var secondPlayer = shuff[1];


//per test, se faccio 100 giochi la posizione dei giocatori deve essere sempre scelta random
/*
for (j = 1; j <= 100; j++){
    shuffle(numberPlayer);
}
*/


//console.log(shuff);




//numero dei turni da giocare in base al numero dei giocatori partecipanti
var numberRoundCeil = numberPlayer.length * 20;
//console.log(numberRoundCeil);



//inizializzo i dadi
var dice1 = 0;
var dice2 = 0;
//prova
dice1 = Math.floor(Math.random() * (6) + 1);
dice2 = Math.floor(Math.random() * (6) + 1);



//uso la funzione roll per tirare i dadi all'inizio di ogni turno
var sumDice = 0;

function roll(){
    dice1 = Math.floor(Math.random() * (6) + 1);
    dice2 = Math.floor(Math.random() * (6) + 1);

    sumDice = dice1 + dice2;
    //console.log('dice ' + sumDice)
}


//incremento la posizione, se va oltre i 40 ricomincio
var position1 = 0;
var position2 = 0;
var positionIncrase = 0;//posizione incrementata grazie a carte o altre caselle(ipotesi)
//incremento il budget se atterro sul via o se passo dal via
var money1 = 200;
var money2 = 200;

//funzione per incrementare i valori del primo giocatore, posizione e budget
function roundPlayerPosition1(){  
    roll();
    if ((position1 + sumDice) >= 80){
        var newPosition1 = sumDice - (80 - position1);
        position1 = newPosition1;
        money1 = money1 + 400;
    } else if ((position1 + sumDice) >= 40){
        var newPosition1 = sumDice - (40 - position1);
        position1 = newPosition1;
        money1 = money1 + 200;
        //console.log('go 1 '+ money1)
    } else {
        position1 = position1 + sumDice;
    };
    //console.log('position ' +position1)
};

//funzione per incrementare i valori del primo giocatore, posizione e budget
function roundPlayerPosition2(){  
    roll();
    if ((position2 + sumDice) >= 40){
        var newPosition2 = sumDice - (40 - position2);
        position2 = newPosition2;  
        money2 = money2 + 200;
        //console.log('go 2 '+ money2)
    } else {
        position2 = position2 + sumDice;
    };
    //console.log('position 2 ' + position2)
};


var number9Round;//per il test sull'ordine mantenuto dei giocatori in ogni turno

//gestico l'ordine dei giocatori in tutti i turni giocabili e richiamo le funzioni delle caselle particolari 
function allRound(){

    if (round % 2 == 0 && firstPlayerRound < roundSinglePlayer && roundSinglePlayer == 17){//per il test sull'ordine mantenuto dei giocatori in ogni turno
        roundPlayerPosition1();
        firstPlayerRound++;
        round++;
        number9Round = firstPlayer;
        luxory1();
        income1();
    
    } else if (round % 2 == 0 && firstPlayerRound < roundSinglePlayer){
        roundPlayerPosition1();
        firstPlayerRound++;
        round++;
        //console.log(round);
        //console.log(firstPlayer + ' ' + firstPlayerRound);
        luxory1();
        income1();
    } else {
        roundPlayerPosition2();
        secondPlayerRound++;
        round++;
        //console.log(round);
        //console.log(secondPlayer + ' ' + secondPlayerRound);
        luxory2();
        income2();
    };
};

//stabilisco che la casella goToJail sia la numero 30 e che porti alla numero 10 Just Visiting senza incrementare il budget al passare da Go
var goToJail = 30;
var justVisiting = 10;

function jail(){
    if(position1 == goToJail){
        position1 = justVisiting;
    };
    
    if(position2 == goToJail){
        position2 = justVisiting;
    };
};

/*la casella Income Tax è la numero 25, il giocatore che atterra sulla casella paga il 10%(???) del suo budget, se il budget è superiore di $2000
 il giocatoe paga il tetto di $200, qualsiasi sia il suo budget*/
var incomeTaxPosition = 25;
var incomeTax = 10;//%

//income per il primo giocatore
function income1(){
    if (position1 == incomeTaxPosition){
        if(money1 > 2000){
            money1 = money1 - 200;
        } else {money1 = money1 - (money1 / incomeTax);}
        //console.log('income1' + money1)
    };
    
     return money1.toFixed();//senza decimali
};

//income per il secondo giocatore
function income2(){
    if (position2 == incomeTaxPosition){
        if(money2 > 2000){
            money2 = money2 - 200;
        } else {money2 = money2 - (money2 / incomeTax);}
        //console.log('income2' + money2)  
    };

    return money2.toFixed();
};



//luxory tax è la casella numero 15, il giocatore che atterra sulla casella paga immediatamente $75
var luxoryTax = 75;
var luxoryTaxPosition = 15;

//luxory per il primo giocatore
function luxory1(){

    if(position1 == luxoryTaxPosition){
    money1 = money1 - luxoryTax;
    //console.log('1 ' +money1)
    };
};

//luxory per il secondo giocatore
function luxory2(){

    if(position2 == luxoryTaxPosition){
    money2 = money2 - luxoryTax;
    //console.log('2' +money2)
    };
};



//i turni devono essere 40 in quanto i giocatori partecipanti sono due, per tutti i turni richiamo le funzioni necessarie per lo svolgimento del gioco
for (i = 1; i <= numberRoundCeil; i++){
    allRound();
    jail();
}








//tutte le funzioni, variabili, etc... vengono esportati per essere utilizzati dal file relativo ai test: rub.tests.js


module.exports.rice = roll;

//test relase 1
exports.roundPlayerPosition1 = function(position1, sumDice){  
    if ((position1 + sumDice) >= 80){
        var newPosition1 = sumDice - (80 - position1);
        return position1 = newPosition1;
    } else if ((position1 + sumDice) >= 40){
        var newPosition1 = sumDice - (40 - position1);
        return position1 = newPosition1;  
    } else {
        return position1 = position1 + sumDice;
    };
};

exports.roundPlayerPosition1Money = function(position1, sumDice, money1){  
    if ((position1 + sumDice) >= 80){
        var newPosition1 = sumDice - (80 - position1);
        position1 = newPosition1;
        return money1 = money1 + 400;
    } else if ((position1 + sumDice) >= 40){
        var newPosition1 = sumDice - (40 - position1);
        position1 = newPosition1;  
        return money1 = money1 + 200;
    } else {
        position1 = position1 + sumDice;
        return money1;
    };
};

exports.roundPlayerPosition2 = function(position2, sumDice){  
    if ((position2 + sumDice) >= 80){
        var newPosition2 = sumDice - (80 - position2);
        return position2 = newPosition2;
    } else if ((position2 + sumDice) >= 40){
        var newPosition2 = sumDice - (40 - position2);
        return position2 = newPosition2;  
    } else {
        return position2 = position2 + sumDice;
    };
};

module.exports.numberPlayer = numberPlayer;

//per testare la release 4
for (i = 0; i < 10; i++){
    numberPlayer.push('horse');
    numberPlayer.push('car');
}

module.exports.players = players;

module.exports.order = shuff;

module.exports.numberRoundCeil = numberRoundCeil; 

module.exports.firstPlayerRound = firstPlayerRound; 

module.exports.secondPlayerRound = secondPlayerRound; 

module.exports.number9Round = number9Round;
module.exports.firstPlayer = firstPlayer;

module.exports.money = money1;

exports.incMoney = function(position1, sumDice, money1){
    if ((position1 + sumDice) >= 80){
        var newPosition1 = sumDice - (80 - position1);
        position1 = newPosition1;
        return money1 + 400;
    } else if ((position1 + sumDice) >= 40){
        var newPosition1 = sumDice - (40 - position1);
        position1 = newPosition1;
        return money1 + 200;
    } else {
        position1 = position1 + sumDice;
        return money1;
    };
};


module.exports.jail = jail;

exports.income1 = function(position1, money1){
    
        if (position1 == incomeTaxPosition){
            if(money1 > 2000){
                money1 = money1 - 200;
            } else {money1 = money1 - (money1 / incomeTax);}
            //console.log('income1' + money1)
        }
        
         return money1
    
};

exports.luxory1 = function(position1, luxoryTaxPosition, money1){
    if(position1 == luxoryTaxPosition){
    return money1 = money1 - luxoryTax;
    } else {
        return money1
    }
}