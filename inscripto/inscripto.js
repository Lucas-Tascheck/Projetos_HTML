// const cards = require('cards')
const game = {
    table: document.querySelector('.board'),
    cardContent: `<div class="card"><div class="life">3</div><div class="attack">2</div><div class="cost">3</div></div>`,
    baseLevels: {
        wolf: [3, 2, 3],
        squirrel: [0, 1, 0],
        bostinha: [0, 0, 0],
        mantis_god: [9, 9, 9]
    },

    putCard: function(type, position){
        document.querySelector(`.slot${position}`).innerHTML = `<div class="card"><div class="life">${this.baseLevels[type][1]}</div><div class="attack">${this.baseLevels[type][0]}</div><div class="cost">${this.baseLevels[type][2]}</div></div>`
    }
}