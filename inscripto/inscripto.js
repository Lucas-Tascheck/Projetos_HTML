// const cards = require('cards')
const game = {
    table: document.querySelector('.board'),
    cardContent: `<div class="card"><img class="card-background" src="./img/carta.jpg" width="144px" height="256px" style="position: absolute;" alt=""><img class="heart" src="./img/life.png" width="50px" height="50px" style="position: absolute;" alt=""><img src="./img/claw.png" width="50px" height="50px" style="position: absolute;" alt="" class="claw"><div class="life">3</div><div class="attack">2</div><div class="cost">3</div></div>`,
    baseLevels: [
        {id: 0, name:"squirrel", life:1, attack:0, cost:0},
        {id: 1, name:"wolf", life:3, attack:2, cost:3},
        {id: 2, name:"shit", life:0, attack:0, cost:0},
        {id: 3, name:"mantis-god", life:9, attack:9, cost:9}
    ],

    deck: [],
    hand: [0, 0, 0, 0, 0, 0],
    sleep: [],
    cardSelected: -1,

    board: [[-1, -1, -1, -1], [-1, -1 ,-1, -1], [-1, -1, -1, -1]],

    putCard: function(carta, row, col){
        this.board[row][col] = carta
        document.querySelector(`.slot${row}${col}`).innerHTML = `<div class="card">
                                                                    <img class="card-background" src="./img/carta.jpg" width="144px" height="256px" style="position: absolute;" alt="">
                                                                    <img class="heart" src="./img/life.png" width="50px" height="50px" style="position: absolute;" alt="">
                                                                    <img src="./img/claw.png" width="50px" height="50px" style="position: absolute;" alt="" class="claw">
                                                                    <div class="life">${carta.life}</div>
                                                                    <div class="attack">${carta.attack}</div>
                                                                    <div class="cost">${carta.cost}</div>
                                                                </div>`
    },

    putCardOnHand: function(carta, position){
        document.querySelector(`.hand${position}`).innerHTML = `<div class="card">
                                                                    <img class="card-background" src="./img/carta.jpg" width="144px" height="256px" style="position: absolute;" alt="">
                                                                    <img class="heart" src="./img/life.png" width="50px" height="50px" style="position: absolute;" alt="">
                                                                    <img src="./img/claw.png" width="50px" height="50px" style="position: absolute;" alt="" class="claw">
                                                                    <div class="life">${carta.life}</div>
                                                                    <div class="attack">${carta.attack}</div>
                                                                    <div class="cost">${carta.cost}</div>
                                                                </div>`
    },

    deleteFromSleep: function(carta){
        this.sleep.forEach(card => {
            if(carta == card){
                this.sleep.splice(this.sleep.indexOf(card), 1)
            }
        })
    },

    deleteFromHand: function(carta){
        this.hand.forEach(card => {
            if(carta == card){
                this.hand.splice(this.sleep.indexOf(card), 1)
            }
        })
    },

    init: function(position){
        this.baseLevels.forEach(card => {
            this.sleep.push(card)
        })
    },

    nextZero: function(array){
        for(let i = 0; i < array.length; i++){
            if(array[i] == 0){return i}
        }
        return -1
    },

    pickNewCard: function(){
        nearPos = this.nextZero(this.hand)
        if(nearPos != -1 && this.sleep.length > 0){
            const index = Math.floor(Math.random() * this.sleep.length)
            const carta = this.sleep[index]
            this.hand[nearPos] = carta
            this.putCardOnHand(carta, nearPos)
            this.deleteFromSleep(carta)
        }
    },

    selectCard: function(handPosition){
        if(this.cardSelected != -1){
            document.querySelector(`.hand .hand${this.cardSelected}`).style.border = 'none'
        }
        document.querySelector(`.hand .hand${handPosition}`).style.border = 'solid red'
        this.cardSelected = handPosition
        document.querySelectorAll('.player-row').forEach(slot => {
            slot.classList.add('selectSlot')
        })
    },

    makePlay: function(index){
        if(this.board[0][index] == -1){
            const elem = this.hand[this.cardSelected]

            this.putCard(elem, 0, index)
            console.log(this.board)

            document.querySelectorAll('.player-row').forEach(slot => {
                slot.classList.remove('selectSlot')
            })
            document.querySelector(`.hand .hand${this.cardSelected}`).style.border = 'none'

            this.hand[this.cardSelected] = 0
            document.querySelector(`.hand .hand${this.cardSelected}`).innerHTML = ''
            this.cardSelected = -1
            this.deleteFromHand(elem)
        }
    },

    passTurn: function(){
        for(let i = 0; i < 4; i++){
            if(this.board[1][i] != -1 && this.board[0][i] != -1){
                this.board[1][i].life -= this.board[0][i].attack
                this.putCard(this.board[1][i], 1, i)    
            }
        }
    },
}