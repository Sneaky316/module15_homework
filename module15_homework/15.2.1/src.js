const vector = document.querySelector('.vector')
const some = document.querySelector('.some')

const btn = document.querySelector('.btn-container')
let i = 0


btnHandler = () => {
    if (i === 0) {
        some.style.display = 'block'
        vector.style.display = 'none'
        i++
     } else if (i === 1){
        some.style.display = 'none'
        vector.style.display = 'block'
        i--
     }
}
btn.addEventListener('click', btnHandler)