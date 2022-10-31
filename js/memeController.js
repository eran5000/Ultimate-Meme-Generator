'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gStartPos
let elCanvas = getElCanvas()

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', () => {
      resizeCanvas()
      drawMeme()
    })
}

function addMouseListeners() {
    elCanvas.addEventListener('mousemove', onMove)
    elCanvas.addEventListener('mousedown', onDown)
    elCanvas.addEventListener('mouseup', onUp)
}
  
function addTouchListeners() {
    elCanvas.addEventListener('touchmove', onMove)
    elCanvas.addEventListener('touchstart', onDown)
    elCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    console.log('Im from onDown')
    setLineDrag(true)
    //Save the pos we start from 
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
  
}
  
function onMove(ev) {
    var gline = getMeme()
    const { isDrag } = gline.lines[gline.selectedLineIdx]
    if (!isDrag) return
    console.log('Im from onMove')
    const pos = getEvPos(ev)
    //Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    //Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    //The canvas is render again after every move
    drawMeme()
}
  
function onUp() {
    console.log('Im from onUp')
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {

    //Gets the offset pos , the default pos
    let pos = {
      x: ev.offsetX,
      y: ev.offsetY
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
      //soo we will not trigger the mouse ev
      ev.preventDefault()
      //Gets the first touch point
      ev = ev.changedTouches[0]
      //Calc the right pos according to the touch screen
      pos = {
        x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
      }
    }
    return pos
}



function renderMeme(){
    resizeCanvas()
    addListeners()
    drawMeme()
}

function onChangeText(){
    setLineTxt()
    drawMeme()
}

function onChangeColor(){
    setTxtColor()
    drawMeme()
}

function onSwitchLines(){
    switchLines()
    drawMeme()
}

function onFontSize(size){
    fontSize(size)
    drawMeme()
}

function onAlignText(align){
    alignText(align)
    drawMeme()
}

function onAddLine(){
    addLine()
    drawMeme()
}

function onDeleteLine(){
    deleteLine()
    drawMeme()
}

function onChangeFont(){
    let elFont = document.querySelector('.fonts').value
    changeFont(elFont)
    drawMeme()
}

function onMoveText(diraction){
    moveText(diraction)
    drawMeme()
}

function onAddEmoji(emoji){
    addEmoji(emoji)
    drawMeme()
}