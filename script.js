let turn = 0
let numMoves = 0

let rowTally = [
    [0, 0],
    [0, 0],
    [0, 0]
]
let colTally = [
    [0, 0],
    [0, 0],
    [0, 0]
]
let diagTally = [
    [0, 0],
    [0, 0]
]
let clicked = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
]

const boxes = Array.from(document.getElementsByClassName('box'))
const turnDiv = document.getElementById('turn')

boxes.forEach(box => box.addEventListener('click', boxSelect))

document.getElementById('reset').addEventListener('click', resetGame)

function togglePlayer() {
    turn = turn === 0 ? 1 : 0
    turnDiv.innerHTML = `Player ${currentChip()} it's your turn!`
}


function currentChip() {
    return turn === 0 ? 'O' : 'X'
}


function incrementDiagonals(x, y) {
    if (y === x) diagTally[0][turn]++
        if ((y === 2 && x === 0) ||
            (y === 1 && x === 1) ||
            (y === 0 && x === 2)) diagTally[1][turn]++
}


function incrementChecks(x, y) {
    numMoves++

    rowTally[x][turn]++
        colTally[y][turn]++

        incrementDiagonals(x, y)
}


function checkWin(x, y) {
    return (rowTally[x][turn] === 3 ||
        colTally[y][turn] === 3 ||
        diagTally[0][turn] === 3 ||
        diagTally[1][turn] === 3)
}


function resetBox(box) {
    box.innerHTML = ''
    box.setAttribute('data-clicked', 'false')
}


function resetGame() {
    rowTally = [
        [0, 0],
        [0, 0],
        [0, 0]
    ]
    colTally = [
        [0, 0],
        [0, 0],
        [0, 0]
    ]
    diagTally = [
        [0, 0],
        [0, 0]
    ]
    clicked = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ]
    numMoves = 0
    boxes.forEach(box => resetBox(box))
}


function checkReset(x, y) {
    const winner = checkWin(x, y)
    if (winner || numMoves >= 9) {
        const message = winner ? `Congrats ${currentChip()} you win!` : `No winner!`
        turnDiv.innerHTML = message
        return true
    }
}


function editHTML(el) {
    el.innerHTML = currentChip()
}


function updateGame(x, y) {
    clicked[x][y] = true
    incrementChecks(x, y)
    let win = checkReset(x, y)

    if (!win) togglePlayer()
}


function boxSelect(e) {
    const x = parseInt(this.dataset.x)
    const y = parseInt(this.dataset.y)
    if (clicked[x][y]) return

    editHTML(this)
    updateGame(x, y)
}