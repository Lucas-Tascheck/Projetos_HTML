// const cards = require('cards')
const game = {
    // id | Name | Life | Attack | Cost 
    baseLevels: [[0, 'Squirrel', 1, 0, 0], [1, 'Wolf', 3, 2, 2], [2, 'Sapo', 2, 1, 1], [3, 'Mantis', 6, 4, 1]],
    initialDeck: [0, 1, 2],
    balance: [1, 1, 1, 1, 1],
    isGameEnd: false,
    cardPicked: false,
    cardPlayed: false,
    current_level: 0,

    Card: function(elemen){
        this.id = elemen[0],
        this.name = elemen[1],
        this.life = elemen[2],
        this.attack = elemen[3],
        this.cost = elemen[4]
    },

    levels: [
        [0, 1, 2, 3, 1],
        [[]]
    ],

    level_cards: [],

    deck: [],
    hand: [0, 0, 0, 0, 0, 0],
    sleep: [],
    cardSelected: -1,
    temp: [],

    board: [[-1, -1, -1, -1], [-1, -1 ,-1, -1], [-1, -1, -1, -1]],

    putCard: function(carta, row, col){
        this.board[row][col] = carta
        document.querySelector(`.slot${row}${col}`).innerHTML = `<div class="card">
                                                                    <img class="card-background" src="./img/carta.jpg" width="144px" height="256px" style="position: absolute;" alt="">
                                                                    <p class="cardName">${carta.name}</p>
                                                                    <img class="heart" src="./img/life.png" width="50px" height="50px" style="position: absolute;" alt="">
                                                                    <img src="./img/claw.png" width="50px" height="50px" style="position: absolute;" alt="" class="claw">
                                                                    <div class="life">${carta.life}</div>
                                                                    <div class="attack">${carta.attack}</div>
                                                                    <div class="cost">${carta.cost}</div>
                                                                </div>`
    },

    putCardOnHand: function(carta, position){
        this.hand[position] = carta
        document.querySelector(`.hand${position}`).innerHTML = `<div class="card">
                                                                    <img class="card-background" src="./img/carta.jpg" width="144px" height="256px" style="position: absolute;" alt="">
                                                                    <p class="cardName">${carta.name}</p>
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

    init: function(){
        for(let i = 1; i < this.baseLevels.length; i++){
            const card = new this.Card(this.baseLevels[i])
            this.sleep.push(card)
        }

        for(let i = 0; i < this.balance.length; i++){
            document.querySelector(`.balance .weigth${i}`).classList.add('weigth-color')
        }

        for(let i = 0; i < this.initialDeck.length; i++){
            const carta = new this.Card(this.baseLevels[this.initialDeck[i]])
            this.putCardOnHand(carta, i)
        }

        this.levels[this.current_level].forEach(elem => {
            this.level_cards.push(elem)
        })

        this.fillBackline()
    },

    initEnemy: function(){
        for(let i = 0; i < this.baseLevels.length; i++){
            const card = new this.Card(this.baseLevels[1])
            this.temp.push(card)
        }
    },

    nextZero: function(array){
        for(let i = 0; i < array.length; i++){
            if(array[i] == 0){return i}
        }
        return -1
    },

    pickNewCard: function(){
        if(this.cardPicked == true || this.isGameEnd == true){return}
        nearPos = this.nextZero(this.hand)
        if(nearPos != -1 && this.sleep.length > 0){
            const index = Math.floor(Math.random() * this.sleep.length)
            const carta = this.sleep[index]
            this.hand[nearPos] = carta
            this.putCardOnHand(carta, nearPos)
            this.deleteFromSleep(carta)
            this.cardPicked = true
        }
    },

    pickSquirrel: function(){
        if(this.cardPicked == true || this.isGameEnd == true){return}
        nearPos = this.nextZero(this.hand)
        if(nearPos != -1){
            const carta = new this.Card(this.baseLevels[0])
            this.hand[nearPos] = carta
            this.putCardOnHand(carta, nearPos)
            this.deleteFromSleep(carta)
            this.cardPicked = true
        }
    },

    selectCard: function(handPosition){
        if(this.hand[handPosition] == 0 || this.isGameEnd == true || this.cardPicked == false){return}
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
        if(this.board[0][index] == -1 && this.isGameEnd == false){
            const elem = this.hand[this.cardSelected]

            this.putCard(elem, 0, index)

            document.querySelectorAll('.player-row').forEach(slot => {
                slot.classList.remove('selectSlot')
            })
            document.querySelector(`.hand .hand${this.cardSelected}`).style.border = 'none'

            this.hand[this.cardSelected] = 0
            document.querySelector(`.hand .hand${this.cardSelected}`).innerHTML = ''
            this.cardSelected = -1
            this.deleteFromHand(elem)
            this.cardPlayed = true
        }
    },

    attackAnimation: function(i){
        document.querySelector(`.slot0${i} .card`).classList.add('attackAnime')
        setTimeout(() => {
            document.querySelector(`.slot0${i} .card`).classList.remove('attackAnime')
        }, 500)
    },

    attackAnimationEnemy: function(i){
        document.querySelector(`.slot1${i} .card`).classList.add('attackAnimeEnemy')
        setTimeout(() => {
            document.querySelector(`.slot1${i} .card`).classList.remove('attackAnimeEnemy')
        }, 500)
    },


    passTurn: function(){
        if(this.isGameEnd == true || this.cardPicked == false){return}
        const attackDamage = 0
        for(let i = 0; i < 4; i++){
            if(this.board[1][i] != -1 && this.board[0][i] != -1 && this.board[0][i].attack != 0){
                this.board[1][i].life -= this.board[0][i].attack
                this.attackAnimation(i)
                if(this.board[1][i].life <= 0){
                    this.board[1][i].life = 0
                    this.putCard(this.board[1][i], 1, i)  
                    setTimeout(() => {
                        this.board[1][i] = -1
                        document.querySelector(`.slot1${i}`).innerHTML = ''
                    }, 1000)
                }else{
                    this.putCard(this.board[1][i], 1, i)
                }
            }
            if(this.board[1][i] == -1 && this.board[0][i] != -1 && this.board[0][i].attack != 0){
                this.attackAnimation(i)
                this.addBalance(this.board[0][i].attack)
                if(this.isVictory() != 0){return}
            }
        }
        if(this.isVictory() != 0){return}
        setTimeout(()=>{
            for(let i = 0; i < 4; i++){
                if(this.board[1][i] != -1 && this.board[0][i] != -1 && this.board[1][i].attack != 0){
                    this.board[0][i].life -= this.board[1][i].attack
                    this.attackAnimationEnemy(i)
                    if(this.board[0][i].life <= 0){
                        this.board[0][i].life = 0
                        this.putCard(this.board[0][i], 0, i)  
                        setTimeout(() => {
                            this.board[0][i] = -1
                            document.querySelector(`.slot0${i}`).innerHTML = ''
                        }, 1000)
                    }else{
                        this.putCard(this.board[0][i], 0, i)  
                    }
                }
                if(this.board[0][i] == -1 && this.board[1][i] != -1 && this.board[1][i].attack != 0){
                    this.attackAnimationEnemy(i)
                    this.removeBalance(this.board[1][i].attack)
                    if(this.isVictory() != 0){return}
                }
            }
            
        }, 2000)
        if(this.isVictory() != 0){return}
        this.nextRow()
        setTimeout(()=>{
            this.fillBackline()
        }, 1800)
        this.cardPicked = false
    },

    clearBalance: function(){
        for(let i = 0; i < 10; i++){
            document.querySelector(`.balance .weigth${i}`).classList.remove('weigth-color')
        }
    },  

    addBalance: function(num){
        if((this.balance.length + num) >= 10){
            for(let i = 0; i < 10; i++){
                document.querySelector(`.balance .weigth${i}`).classList.add('weigth-color')
            }
            this.balance = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            return
        }
        for(let i = 0; i < num; i++){
            this.balance.push(1)
        }
        this.clearBalance()
        for(let i = 0; i < this.balance.length; i++){
            document.querySelector(`.balance .weigth${i}`).classList.add('weigth-color')
        }
    },

    removeBalance: function(num){
        if((this.balance.length - num) <= 0){
            this.clearBalance()
            this.balance = []
            return
        }
        for(let i = 0; i < num; i++){
            this.balance.pop()
        }
        this.clearBalance()
        for(let i = 0; i < this.balance.length; i++){
            document.querySelector(`.balance .weigth${i}`).classList.add('weigth-color')
        }
    },

    isVictory: function(){
        if(this.balance.length == 0){
            this.isGameEnd = true
            const endMenu = document.querySelector('.endGame')
            document.querySelector('.game').style.opacity = '50%'
            endMenu.style.display = 'flex'
            endMenu.querySelector('p').innerHTML = 'Derrota!'
            endMenu.querySelector('.restartButton').innerHTML = 'Restart Game'
            return -1
        }
        if(this.balance.length == 10){
            this.isGameEnd = true
            const endMenu = document.querySelector('.endGame')
            document.querySelector('.game').style.opacity = '50%'
            endMenu.style.display = 'flex'
            endMenu.querySelector('p').innerHTML = 'Vitoria!'
            endMenu.querySelector('.restartButton').innerHTML = 'Restart Game'
            return 1
        }
        return 0
    },

    possibleSlotsBackline: function(){
        const cont = []
        for(let i = 0; i < 4; i++){
            if(this.board[2][i] == -1){
                cont.push(i)
            }
        }
        return cont
    },

    fillBackline: function(){
        const freeSlots = this.possibleSlotsBackline()
        
        if(this.levels[this.current_level].length == 0 || freeSlots.length == 0){return}
        const howManyCards = Math.floor(Math.random() * (freeSlots.length - 1) + 1)
        let cardsToPlay = []
        
        for(let i = 0; i < howManyCards; i++){
            const card = new this.Card(this.baseLevels[this.level_cards.pop()])
            cardsToPlay.push(card)
        }
        console.log(cardsToPlay)
        for(let i = 0; i < howManyCards; i++){
            if(this.board[2][i] == -1){
                // let element = freeSlots[Math.floor(Math.random() * freeSlots.length)]
                this.putCard(cardsToPlay.pop(), 2, freeSlots.splice(Math.floor(Math.random() * freeSlots.length), 1))

            }
        }
    },

    nextRow: function(){
        setTimeout(() => {
            for(let i = 0; i < 4; i++){
                if(this.board[1][i] == -1 && this.board[2][i] != -1){
                    this.board[1][i] = this.board[2][i]
                    this.board[2][i] = -1
                    document.querySelector(`.slot${2}${i}`).innerHTML = ''
                    this.putCard(this.board[1][i], 1, i)
                }
            }
        }, 1500)
    },

    restartGame: function(){
        this.isGameEnd = false
        document.querySelector('.game').style.opacity = '100%'
        document.querySelector('.endGame').style.display = 'none'

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 4; j++){
                this.board[i][j] = -1
                document.querySelector(`.slot${i}${j}`).innerHTML = ''
            }
        }
        this.cardPicked = false
        this.cardPlayed = false
        if(this.balance.length == 10){
            this.removeBalance(5)
        }else{
            this.addBalance(5)
        }
        for(let i = 0; i < 6; i++){
            this.hand[i] = 0
            document.querySelector(`.hand${i}`).innerHTML = ''
        }

        this.init()
    },
}