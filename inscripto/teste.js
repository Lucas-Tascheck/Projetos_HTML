const a = [{nome: 'sergio'}, {nome: 'sacanni'}, {nome: 'santos'}]
const b = [6, 7, 8]
console.log(a)
console.log(b)

a.forEach(term => {
    b.push(term)
})

function removeSacanni(nome, array){
    array.forEach(term => {
        if(term.nome == nome){
            array.splice(array.indexOf(term), 1)
        }
    })
}

removeSacanni(6, b)

console.log(a.length)
console.log(b.length)