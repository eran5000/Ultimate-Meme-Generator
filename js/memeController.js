'use strict'
renderMeme()

function renderMeme(){
    drawImg()
    const strHtml = ``
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