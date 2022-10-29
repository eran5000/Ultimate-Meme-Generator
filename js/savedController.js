'use strict'
let gSavedNum = 0
let elCanvas = getElCanvas()

function OnSaveMeme(){
    const strHtml = `<canvas class="saved-meme"
        id="meme${gSavedNum}"
        height="500"
        width="500"
        onclick="drawImg(elCanvas,true,'',addEditor)"
        ></canvas >`
    document.querySelector('.saved-container').innerHTML += strHtml
    const gElSavedCanvas = document.getElementById('meme'+gSavedNum)
    drawImg(gElSavedCanvas,true)
    gSavedNum++
}
function onDownloadCanvas(elLink){
    drawImg(elCanvas,true,elLink,downloadCanvas)
}
