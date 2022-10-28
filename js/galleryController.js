'use strict'

renderGallery()

function renderGallery(){
    let imgs = getImgs()

    const strHtml = imgs.map(img => {
        return `<div class="imgs img${img.id}" onclick="onImgSelect(${img.id})">
            <img src=${img.url}>
            </div>`
    }).join('')

    document.querySelector('.gallery-container').innerHTML = strHtml
}

function onImgSelect(id){
    setImg(id)
    renderMeme()
    toggleEditor()
}

function onSetFilterByTxt(txt) {
    console.log('Filtering by txt', txt)
    setFilterByTxt(txt)
    renderGallery()
}

function onToggleSearch(){
    document.querySelector('.gallery-search').classList.toggle('open')
}