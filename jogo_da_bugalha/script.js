function novoElemento(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Tabuleiro(){

    this.tabuleiro = [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ]

    this.setValor = (linha, valor) => {
        if(this.tabuleiro[linha][0] == 0){
            this.tabuleiro[linha][0] = valor
            return
        }
        if(this.tabuleiro[linha][1] == 0){
            this.tabuleiro[linha][1] = valor
            return
        }
        if(this.tabuleiro[linha][2] == 0){
            this.tabuleiro[linha][2] = valor
        }
    }

    this.getNum = (lin, index) => {
        return this.tabuleiro[lin][index]
    }

    this.isBalanced = linha => {
        let zero = false
        for(let i = 0; i < 3; i++){
            if(this.tabuleiro[linha][i] == 0){
                zero = true
            }
            else if(this.tabuleiro[linha][i] != 0 && zero == true){
                return false
            }
        }
        return true
    }

    this.balanceLinha = linha => {

        while(!this.isBalanced(linha)){
            for(let i = 0; i < 2; i++){
                if(this.tabuleiro[linha][i] == 0){
                    this.tabuleiro[linha][i] = this.tabuleiro[linha][i+1]
                    this.tabuleiro[linha][i+1] = 0
                }
            }
        }
    }

    this.removeValor = (linha, valor) => {
        for(let i = 0; i < 3; i++){
            if(this.tabuleiro[linha][i] == valor){
                this.tabuleiro[linha][i] = 0
            }
        }
        this.balanceLinha(linha)
    }

    this.printaTabuleiro = () => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                console.log(`[${i}][${j}]: ${this.tabuleiro[i][j]}`)
            }
        }
    }
}

function DadoSortido(){
    this.numero = 0

    this.sorteia = () => {
        this.numero = Math.floor(Math.random() * 6 + 1)
        return this.numero
    }
}


function Player(name, turno){
    this.nome = name
    this.elemento = novoElemento('div', this.nome)
    this.board = new Tabuleiro()
    this.dado = new DadoSortido()
    this.turno = turno

    this.buildSlots = (elem) => {
        for(let i = 1; i < 4; i++){
            let slot = novoElemento('div', `slot${i} slot`)
            elem.appendChild(slot)
        }
    }

    this.buildLinhas = () => {
        for(let i = 1; i < 4; i++){
            let elem = novoElemento('div', `line${i} line`)
            this.buildSlots(elem)
            elem.onclick = () => {this.makePlay(i, this.nome)}
            this.elemento.appendChild(elem)
        }
    }

    this.refreshBoard = (linha) => {
        let slot = ''
        for(let i = 0; i < 3; i++){
            if(this.board.getNum(linha-1, i) != 0){
                slot += `<div class="slot${i+1} slot"><img src="./imgs/dice${this.board.getNum(linha-1, i)}.png" alt="" class="dado" height="136px" width="136px"></div>`
            }else{
                slot += `<div class="slot${i+1} slot"></div>`
            }
        }
        document.querySelector(`.${this.nome} .line${linha}`).innerHTML = slot    
    }

    this.buildLinhas()
}

function Turno(vezDeJogar='player1'){
    this.vezDeJogar = vezDeJogar
    this.dadoSorteado = 0
}


function JogoDaBugalha(){
    this.turno = new Turno()
    this.player1 = new Player('player1', this.turno)
    this.player2 = new Player('player2', this.turno)
    document.querySelector('.game').appendChild(this.player1.elemento)
    document.querySelector('.game').appendChild(this.player2.elemento)

    for(let i = 1; i < 4; i++){
        this.player1.elemento.querySelector(`.line${i}`).onclick = () => {this.makePlay(i)}
    }
    for(let i = 1; i < 4; i++){
        this.player2.elemento.querySelector(`.line${i}`).onclick = () => {this.makePlayOponent(i)}
    }

    this.checkEqual = (main, oponente, linha) => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(main.board.getNum(linha-1, i) == oponente.board.getNum(3-linha, j)){
                    oponente.board.removeValor(3-linha, oponente.board.getNum(3-linha, j))
                    oponente.refreshBoard(4-linha)
                }
            }
        }
        
    }

    this.makePlay = (linha) => {
        if(this.turno.vezDeJogar == this.player1.nome){
            console.log(linha)
            const valor = this.player1.dado.sorteia()
            this.turno.dadoSorteado = valor
            this.player1.board.setValor(linha-1, valor)
            this.player1.refreshBoard(linha)
            this.checkEqual(this.player1, this.player2, linha)
            this.turno.vezDeJogar = 'player2'
        }
    }

    this.makePlayOponent = (linha) => {
        if(this.turno.vezDeJogar == this.player2.nome){
            console.log(linha)
            const valor = this.player2.dado.sorteia()
            this.turno.dadoSorteado = valor
            this.player2.board.setValor(linha-1, valor)
            this.player2.refreshBoard(linha)
            this.checkEqual(this.player2, this.player1, linha)
            this.turno.vezDeJogar = 'player1'
        }
    }
}

new JogoDaBugalha()