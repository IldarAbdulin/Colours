const cols = document.querySelectorAll('.col');

document.addEventListener('keydown' , event => {
    event.preventDefault();
    if(event.code.toLowerCase() === 'space') {
        setRandomColors()
    }   
})

document.addEventListener('click' , (event) => {
    const type = event.target.dataset.type

    if(type ==='lock') {
        const node = 
        event.target.tagName.toLowerCase() === 'i'
            ? event.target 
            : event.target.children[0]
        node.classList.toggle('bxs-lock-open')
        node.classList.toggle('bx-lock-alt')
    }
})

function generateRandomColor() {
    const hexCodes = '0123456789ABCDEF'
    let color = '#';
    for( i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return color;
}

function copyToClickBoard(text) {
    return navigator.clipboard.writeText(text)
}

function setRandomColors() {

    const colors = [];

    cols.forEach((col) => {
        const isLocked = col.querySelector('i').classList.contains('bx-lock-alt')
        const color = generateRandomColor();
        const text = col.querySelector('h2');
        const button = col.querySelector('button');

        if(isLocked) {
            colors.push(text.textContent)
            return
        }
        colors.push(color)

        text.textContent = color;
        col.style.background = color;

        setTextColor(text , color)
        setTextColor(button , color)
    })
    uptadeColorsHash(colors)
}

function setTextColor(text , color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function uptadeColorsHash(colors = []) {
    document.location.hash = colors.map(col => {
        return col.toString( ).substring(1)
    }).join('-')
}

function getColorsFromHash() {
    if(document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map(color => '#' + color)
    }
    return []
}

setRandomColors()