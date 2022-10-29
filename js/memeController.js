'use strict'
renderMeme()

function renderMeme(){
    drawImg()
}

function onChangeText(){
    setLineTxt()
    renderMeme()
}

function onChangeColor(){
    setTxtColor()
    renderMeme()
}

function onSwitchLines(){
    switchLines()
    renderMeme()
}

function onFontSize(size){
    fontSize(size)
    renderMeme()
}

function onAlignText(align){
    alignText(align)
    renderMeme()
}

function onAddLine(){
    addLine()
    renderMeme()
}

function onDeleteLine(){
    deleteLine()
    renderMeme()
}

function onChangeFont(){
    let elFont = document.querySelector('.fonts').value
    changeFont(elFont)
    renderMeme()
}

function onMoveText(diraction){
    moveText(diraction)
    renderMeme()
}

function onAddEmoji(emoji){
    addEmoji(emoji)
    renderMeme()
}