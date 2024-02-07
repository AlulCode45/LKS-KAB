const secDOM = document.getElementById('sec')
const milsecDOM = document.getElementById('milsec')

let sec = 0
let milsec = 0
let start = false

document.getElementById('start').addEventListener('click', e => {
    if (!start) {
        start = true
        timer = setInterval(() => {
            milsec += 1
            if (milsec == 60) {
                sec += 1
                milsec = 0
            }
            milsecDOM.innerHTML = milsec < 10 ? '0' + milsec : milsec
            secDOM.innerHTML = sec < 10 ? '00' + sec : sec < 100 ? '0' + sec : sec
        }, 1000 / 60)
    }
})

document.getElementById('stop').addEventListener('click', e => {
    start = false
    clearInterval(timer)
})

document.getElementById('reset').addEventListener('click', e => {
    sec = 0
    milsec = 0
    start = false
    milsecDOM.innerHTML = '00'
    secDOM.innerHTML = '000'
    clearInterval(timer)
})