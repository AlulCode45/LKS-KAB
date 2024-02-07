const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
document.getElementById('player').innerHTML = 'Player : ' + sessionStorage.getItem('username')

const viruses = []
const hits = []

let sec = 0
let min = 0
let score = 0
let fail = 0
let frame = 0
let startTime = 3
let paused = false

countdownGame = setInterval(() => {
    startTime -= 1
    if (startTime == 0) {
        animate()
        gameTimer = setInterval(() => {
            sec += 1
            if (sec == 60) {
                min += 1
                sec = 0
            }
            document.getElementById('time').innerHTML = 'Time : ' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
        }, 1000)
        document.querySelector('.start-game').style.display = 'none'
    } else {
        // clearInterval(gameTimer)
        document.getElementById('countdown').innerHTML = startTime
        if (startTime == 1) {
            document.getElementById('countdown').innerHTML = 'GO'
        }
    }
}, 1000);


canvas.width = canvas.scrollWidth
canvas.height = canvas.scrollHeight

const controlD = new Image()
const controlF = new Image()
const controlJ = new Image()
const controlK = new Image()

controlD.src = '/assets/D.jpg'
controlF.src = '/assets/F.jpg'
controlJ.src = '/assets/J.jpg'
controlK.src = '/assets/K.jpg'

var opacityControl = {
    d: 0.7,
    f: 0.7,
    j: 0.7,
    k: 0.7,
}

const arenaWidth = canvas.width / 4
const controlHeight = 100
const attackArena = {
    width: canvas.width,
    height: 150,
    x: 0,
    y: canvas.height - (150 + controlHeight)
}

function drawArena() {
    ctx.globalAlpha = 1
    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.moveTo(arenaWidth, 0)
    ctx.lineTo(arenaWidth, canvas.height)
    ctx.stroke()

    ctx.strokeStyle = 'white'
    ctx.moveTo(arenaWidth * 2, 0)
    ctx.lineTo(arenaWidth * 2, canvas.height)
    ctx.stroke()

    ctx.strokeStyle = 'white'
    ctx.moveTo(arenaWidth * 3, 0)
    ctx.lineTo(arenaWidth * 3, canvas.height)
    ctx.stroke()

    ctx.fillStyle = 'rgba(255,0,0,0.5)'
    ctx.fillRect(attackArena.x, attackArena.y, attackArena.width, attackArena.height)

    ctx.globalAlpha = opacityControl.d
    ctx.drawImage(controlD, 0, canvas.height - controlHeight, arenaWidth, controlHeight)
    ctx.globalAlpha = opacityControl.f
    ctx.drawImage(controlF, arenaWidth, canvas.height - controlHeight, arenaWidth, controlHeight)
    ctx.globalAlpha = opacityControl.j
    ctx.drawImage(controlJ, arenaWidth * 2, canvas.height - controlHeight, arenaWidth, controlHeight)
    ctx.globalAlpha = opacityControl.k
    ctx.drawImage(controlK, arenaWidth * 3, canvas.height - controlHeight, arenaWidth, controlHeight)
}
document.getElementById('continue').addEventListener('click', e => {
    animate()
    document.querySelector('.pause-game').style.display = 'none'
    paused = false
    gameTimer = setInterval(() => {
        sec += 1
        if (sec == 60) {
            min += 1
            sec = 0
        }
        document.getElementById('time').innerHTML = 'Time : ' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
    }, 1000)
})
window.addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 27:
            if (!paused) {
                document.querySelector('.pause-game').style.display = 'grid'
                paused = true
                cancelAnimationFrame(animation)
                clearInterval(gameTimer)
            } else {
                animate()
                document.querySelector('.pause-game').style.display = 'none'
                paused = false
                gameTimer = setInterval(() => {
                    sec += 1
                    if (sec == 60) {
                        min += 1
                        sec = 0
                    }
                    document.getElementById('time').innerHTML = 'Time : ' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
                }, 1000)
            }
            break;
        case 68:
            opacityControl.d = 1
            hits.push(0)
            break;

        case 70:
            opacityControl.f = 1
            hits.push(arenaWidth)
            break;

        case 74:
            opacityControl.j = 1
            hits.push(arenaWidth * 2)
            break;

        case 75:
            opacityControl.k = 1
            hits.push(arenaWidth * 3)
            break;

        default:
            break;
    }


    for (let i = 0; i < viruses.length; i++) {
        const virus = viruses[i];
        for (let j = 0; j < hits.length; j++) {
            const hit = hits[j];
            if ((virus.x - 25) == hit && (virus.y + virus.height) >= attackArena.y + 10) {
                viruses.splice(i, 1)
                i--
                score += 1
            }
        }
    }
})
window.addEventListener('keyup', e => {
    hits.splice(0, 1)
    switch (e.keyCode) {
        case 68:
            opacityControl.d = 0.7
            break;

        case 70:
            opacityControl.f = 0.7
            break;

        case 74:
            opacityControl.j = 0.7
            break;

        case 75:
            opacityControl.k = 0.7
            break;

        default:
            break;
    }
})

const virusImage = new Image()
virusImage.src = '/assets/virus.png'

class Virus {
    constructor(x) {
        this.width = 50
        this.height = 50
        this.x = x
        this.y = -this.height
        this.speed = 2
    }
    draw() {
        ctx.globalAlpha = 1
        ctx.drawImage(virusImage, this.x, this.y, this.width, this.height)
    }
    update() {
        this.y += this.speed
    }
}

function generateViruses() {
    if (frame % 200 == 0) {
        const randomX = Math.floor(Math.random() * 4) * arenaWidth + 25
        viruses.push(new Virus(randomX))
    }
}

function handleViruses() {
    for (let i = 0; i < viruses.length; i++) {
        const virus = viruses[i];
        virus.update()
        virus.draw()

        if (virus.y + virus.height > canvas.height - controlHeight) {
            viruses.splice(i, 1)
            fail += 1
            i--
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    document.getElementById('score').innerHTML = 'Score : ' + score
    document.getElementById('fail').innerHTML = 'Fail : ' + fail
    generateViruses()
    handleViruses()

    drawArena()
    if (fail >= 10) {
        clearInterval(gameTimer)
        document.querySelector('.game-over').style.display = 'grid'
        document.getElementById('end-time').innerHTML = 'Time : ' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
        document.getElementById('end-score').innerHTML = 'Score : ' + score
        document.getElementById('end-fail').innerHTML = 'Fail : ' + fail
        document.getElementById('end-player').innerHTML = 'Player : ' + sessionStorage.getItem('username')
    } else {
        frame++
        animation = requestAnimationFrame(animate)
    }
}