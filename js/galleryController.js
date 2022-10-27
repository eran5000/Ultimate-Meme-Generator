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