const username = document.getElementById('username');

if (username.value) {
    document.getElementById('play').style.cursor = 'pointer'
} else {
    document.getElementById('play').style.cursor = 'not-allowed'
}

username.addEventListener('keyup', e => {
    if (username.value) {
        document.getElementById('play').style.cursor = 'pointer'
    } else {
        document.getElementById('play').style.cursor = 'not-allowed'
    }
})

document.getElementById('play').addEventListener('click', e => {
    if (username.value) {
        sessionStorage.setItem('username', username.value)
        window.location.href = '/game/index.html'
    } else {
        alert('Silahkan masukan username')
    }
})