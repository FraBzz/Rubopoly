/*
in questo file comando dei test per testare le funzionalità del codice nel file rub.js
*/

var assert = require('assert');
var rub = require('../rub/rub.js');
const { expect } = require('chai');

describe('position board test', function(){
    it (
        'Player on beginning location (numbered 0), rolls 7, ends up on location 7', function() {
            assert.equal(rub.roundPlayerPosition1(4, 3), 7);
        }
    )

    it (
        'Player on location numbered 39, rolls 6, ends up on location 5', function() {
            assert.equal(rub.roundPlayerPosition1(39, 6), 5);
        }
    )
});

describe('players test', function(){
    it (
        'Create a game with two players Horse and Car', function() {
            var numberPlayer = rub.numberPlayer;
            expect(numberPlayer).to.include('horse', 'car');
        }
    )

    it (
        'Try to create a game with < 2 or > 8 players. When attempting to play the game, it will fail', function() {
            const players = rub.players();
            expect(players).to.have.property('message','Attenzione!! Il numero dei giocatori deve essere 2-8');
        }
    )
    /*
    it (
        'Create a game with two players named Horse and car. Within creating 100 games, both orders [Horse, Car] and [Car, Horse] occur', function() {
            const order = rub.shuff;
            
            expect(order).to.include(['horse, car'] && ['car, horse']);
        }
    )*/
})

describe('round test', function(){
    it (
        'Create a game and play, verify that the total rounds was 20 and that each player played 20 rounds', function() {
            const round = rub.numberRoundCeil;
            const firstPlayerRound = rub.firstPlayerRound;
            const secondPlayerRound = rub.secondPlayerRound;
            expect(round).to.equal(40);
            expect(firstPlayerRound).to.equal(20);
            expect(secondPlayerRound).to.equal(20);
        }
    )
    it (
        'Create a game and play, verify that in every round the order of the players remained the same', function() {
            const number9round = rub.number9Round;
            const firstplayer = rub.firstplayer;
            expect(number9round).to.equal(firstplayer);
        }
    )
})

describe('money lands on go test', function(){
    it (
        'During a turn a Player lands on Go and their balance incrases by $200', function() {
            const position0 = rub.roundPlayerPosition1(33, 7);
            const money1 = 200;
            const moneyNow = 400;
            const incMoney = rub.incMoney(33, 7, money1);
            expect(position0).to.equal(0);
            expect(incMoney).to.equal(moneyNow);
        }
    )
    it (
        'During a turn a Player lands on same "normal" location and their balance does not change', function() {
            const positionFree = rub.roundPlayerPosition1(13, 7);
            const money1 = 200;
            const moneyNow = 200;
            const incMoney = rub.incMoney(13, 7, money1);
            expect(positionFree).to.equal(20);
            expect(incMoney).to.equal(moneyNow);
        }
    )
})

describe('money pass over Go', function(){
    it(
        'Player starts before Go near the end of the Board, rolls enough to pass Go. The Players balance increases by $200', function() {
            const positionOverGo = rub.roundPlayerPosition1(37, 10);
            const money1 = 200;
            const moneyNow = 400;
            const incMoney = rub.incMoney(37, 7,money1);
            expect(positionOverGo).to.equal(7);
            expect(incMoney).to.equal(moneyNow);
        }
    )

    it(
        'Player passes over go twice during a turn. Their balance increases by $200 each time for a total change of $400', function() {
            const positionOverGo = rub.roundPlayerPosition1(79, 8);
            const money1 = 200;
            const moneyNow = 600;
            const incMoney = rub.incMoney(79, 8, money1);
            expect(positionOverGo).to.equal(7);
            expect(incMoney).to.equal(moneyNow);
        }
    )
})

describe('Go To Jail test', function(){
    it(
        'Players starts before Go To Jail, lands on Go To Jail, ends up on Just Visiting and their balance is unchanged', function() {
            const position1 = 30;
            const position2 = 30;
            const actPosition1 = rub.roundPlayerPosition1(20,10);
            const money1 = 300;
            const moneyNow = 300;
            const incMoney = rub.incMoney(20, 10, money1);
            expect(incMoney).to.equal(moneyNow);
        }
    )

    it(
        'Players starts before Go To Jail, rolls enough to pass over Go To Jail but not enough to land on or pass over go.' +
        'Their balance is unchanged and they end up where the should based on what they rolled.', function() {
            assert.equal(rub.roundPlayerPosition1(28, 6), 34);
            const position1 = 26;
            const position2 = 29;
            const money1 = 800;
            const roundPlayerPosition1Money = rub.roundPlayerPosition1Money(position1,6,money1);
            expect(roundPlayerPosition1Money).to.equal(money1);
            
        }
    )
})

describe('Income Tax test', function(){
    it(
        'During a turn, a Player with an initial total worth of $1800 lands on Income Tax. The balance decreases by $180.', function() {
            const position1 = 25;
            const money1 = 1800;
            const moneyNow1 = 1620;
            const income1 = rub.income1(position1, money1);
            expect(income1).to.equal(moneyNow1);  
        }
    )

    it(
        'During a turn, a Player with an initial total worth of $2200 lands on Income Tax. The balance decreases by $200.', function() {
            const position1 = 25;
            const money1 = 2200;
            const moneyNow1 = 2000;
            const income1 = rub.income1(position1, money1);
            expect(income1).to.equal(moneyNow1);  
        }
    )

    it(
        'During a turn, a Player with an initial total worth of $0 lands on Income Tax. The balance decreases by $0.', function() {
            const position1 = 25;
            const money1 = 0;
            const moneyNow1 = 0;
            const income1 = rub.income1(position1, money1);
            expect(income1).to.equal(moneyNow1);   
        }
    )

    it(
        'During a turn, a Player with an initial total worth of $2000 lands on Income Tax. The balance decreases by $200.', function() {
            const position1 = 25;
            const money1 = 2000;
            const moneyNow1 = 1800;
            const income1 = rub.income1(position1, money1);
            expect(income1).to.equal(moneyNow1);
            
        }
    )

    it(
        'During a turn, a Player passes over Income Tax. Nothing happens', function() {
            const position1 = 7;
            const money1 = 1600;
            const moneyNow1 = 1600;
            const income1 = rub.income1(position1, money1);
            expect(income1).to.equal(moneyNow1);
        }
    )
})

describe('Luxory Tax test', function(){
    it(
        'Player takes a turn and lands on Luxory tax. Their balance decreases by $75', function() {
            const luxoryTaxPosition = 15;
            const position1 = 15;
            const money1 = 200;
            const luxory = rub.luxory1(position1, luxoryTaxPosition, money1);
            const moneyNow = 125;
            expect(luxory).to.equal(moneyNow);
        }
    )

    it(
        'Player passes Luxory Tax during a turn. Their balance is unchained', function() {
            const luxoryTaxPosition = 15;
            const position1 = 21;
            const money1 = 200;
            const luxory = rub.luxory1(position1, luxoryTaxPosition, money1);
            const moneyNow = 200;
            expect(luxory).to.equal(moneyNow);
        }
    )
})