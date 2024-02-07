const boxs = document.querySelectorAll('.box')

let delay = 0.4

for (let i = 0; i < boxs.length; i++) {
    const box = boxs[i];
    delay += 0.4
    box.style.animation = `hidden 1s ease-in-out ${delay}s forwards`
    setTimeout(() => {
        box.style.background = 'white'
    }, delay * 1000)
}