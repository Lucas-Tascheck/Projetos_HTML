const ticTacToe = {
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    whoPlay: -1,
    winner: document.querySelector('.winner'),
    isEnd: false,
    jogada: 0,

    playerX: {
        pontos: 0,
        vitorias: 0,
        empates: 0,
        derrotas: 0
    },

    playerO: {
        pontos: 0,
        vitorias: 0,
        empates: 0,
        derrotas: 0
    },

    setVictory: function(player){
        if(player == 'X'){
            this.playerX.vitorias++
            this.playerX.pontos += 10
            this.playerO.derrotas++
        }else{
            this.playerO.vitorias++
            this.playerO.pontos += 10
            this.playerX.derrotas++
        }
    },

    setDraw: function(){
        this.playerX.empates++
        this.playerX.pontos += 5
        this.playerO.empates++
        this.playerO.pontos += 5
    },

    printStatus: function(){
        const jogadorX = document.querySelector('.statusX')
        const jogadorO = document.querySelector('.statusO')

        jogadorX.querySelectorAll('div').forEach(status => {
            switch (status.className) {
                case 'pontos':
                    status.textContent = `Pontos: ${this.playerX.pontos}`
                    break;
                case 'vitorias':
                    status.textContent = `Vitorias: ${this.playerX.vitorias}`
                    break;
                case 'empates':
                    status.textContent = `Empates: ${this.playerX.empates}`
                    break;
                case 'derrotas':
                    status.textContent = `Derrotas: ${this.playerX.derrotas}`
                    break;
            }
        })

        jogadorO.querySelectorAll('div').forEach(status => {
            switch (status.className) {
                case 'pontos':
                    status.textContent = `Pontos: ${this.playerO.pontos}`
                    break;
                case 'vitorias':
                    status.textContent = `Vitorias: ${this.playerO.vitorias}`
                    break;
                case 'empates':
                    status.textContent = `Empates: ${this.playerO.empates}`
                    break;
                case 'derrotas':
                    status.textContent = `Derrotas: ${this.playerO.derrotas}`
                    break;
            }
        })
    },

    makePlay: function(lin, col){
        const slot = document.querySelector(`.index${lin}${col}`)
        this.jogada++

        if(!this.isEnd){
            if(this.whoPlay == -1 && slot.textContent == ''){
                slot.innerHTML = 'X'
                this.whoPlay = 1
                this.board[lin][col] = -1
                if(this.jogada > 4){this.isEnd = this.isVictory()}
                if(!this.isEnd && this.jogada == 9){
                    this.winner.innerHTML = 'Empate!!!'
                    this.setDraw()
                    this.printStatus()
                }
                return
            }
            if(this.whoPlay == 1 && slot.textContent == ''){
                slot.innerHTML = 'O'
                this.whoPlay = -1
                this.board[lin][col] = 1
                if(this.jogada > 4){this.isEnd = this.isVictory()}
                if(!this.isEnd && this.jogada == 9){
                    this.winner.innerHTML = 'Empate!!!'
                    this.setDraw()
                    this.printStatus()
                }
            }           
        }   
    },

    ocorrencias: function(num){
        let ocorr = []
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(i == 0 && this.board[i][j] == num){
                    ocorr.push(j)
                }
                if(i == 1 && this.board[i][j] == num){
                    ocorr.push(j+3)
                }
                if(i == 2 && this.board[i][j] == num){
                    ocorr.push(j+6)
                }
            }
        }
        return ocorr
    },

    showLine: function(index){
        switch (index){
            case 0:
                document.querySelector('.lineHor1').style.display = 'block'
                break;

            case 1:
                document.querySelector('.lineHor2').style.display = 'block'
                break;

            case 2:
                document.querySelector('.lineHor3').style.display = 'block'
                break;

            case 3:
                document.querySelector('.lineVert1').style.display = 'block'
                break;

            case 4:
                document.querySelector('.lineVert2').style.display = 'block'
                break;
            
            case 5:
                document.querySelector('.lineVert3').style.display = 'block' 
                break;

            case 6:
                document.querySelector('.diag2').style.display = 'block'
                break;

            case 7:
                document.querySelector('.diag1').style.display = 'block' 
        }
    },

    isVictory: function(){
        let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        let ocorr_O = this.ocorrencias(1)
        let ocorr_X = this.ocorrencias(-1)
        let exist_O = false
        let exist_X = false

        for(let i = 0; i < 8; i++){
            exist_O = wins[i].every(value => {return ocorr_O.includes(value)})
            exist_X = wins[i].every(value => {return ocorr_X.includes(value)})

            if(exist_O){
                this.winner.innerHTML = "'O' venceu o jogo!!!"
                this.showLine(i)
                this.setVictory('O')
                this.printStatus()
                return true
            }
            else if(exist_X){
                this.winner.innerHTML = "'X' venceu o jogo!!!"
                this.showLine(i)
                this.setVictory('X')
                this.printStatus()
                return true
            }
        }
        return false
    },

    clearLines: function(){
        document.querySelectorAll('.line').forEach(element => {
            element.style.display = 'none'
        })
    },

    reset: function(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                document.querySelector(`.index${i}${j}`).innerHTML = ''
                this.board[i][j] = 0
            }
        }
        this.whoPlay = -1
        this.isEnd = false
        this.winner.innerHTML = ''
        this.clearLines()
        this.jogada = 0
    }
}