'use strict'

const STORAGE_KEY = 'memeDB'

let gCurrLine = 0
let isBorder = false
let gFonts = []
let gPositions = []
let gMemes =[]
let gElCanvas = document.getElementById('img-to-meme')
let gCtx = gElCanvas.getContext('2d'),
    columns = 5,
    rows = 5
let gMeme ={ 
    selectedImgId: 1, 
    selectedLineIdx: 0, 
    lines: 
    [ { txt: 'I sometimes eat Falafel', 
        size: 40, align: 'right', 
        color: '#FFFFFF'},
        { txt: 'I always eat Nuggets', 
        size: 30, align: 'center', 
        color: '#FFFFFF'} ] 
    }

let gCurrAlign = '.text-' + gMeme.lines[gMeme.selectedLineIdx].align

document.querySelector('.txt-change').placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
document.querySelector(gCurrAlign).style.backgroundColor = "var(--clr-4)"
// resizeCanvas()

function getMeme(){
    return gMeme
}

function drawImg(){
    let positions = []
    let position
    let imgs = getImgs()
    let objWithIdIndex = imgs.findIndex(ele => ele.id === gMeme.selectedImgId)
    const img = new Image()
    if(gFonts.length === 0){
        for(var i = 0; i < gMeme.lines.length; i++){
            gFonts.push('Impact')
        }
    }else if(gFonts.length != gMeme.lines.length){
        gFonts.push('Impact')
    }
    gMeme.selectedLineIdx = 0
    img.src = gImgs[objWithIdIndex].url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach(line => {
            if(gPositions.length != gMeme.lines.length){
                if(gPositions.length === 0) gPositions.push(40)
                else if(gPositions.length === 1) gPositions.push(gElCanvas.height)
                else if(gPositions.length > 1) gPositions.push(gElCanvas.height/2)
            }
            if(gPositions[gMeme.selectedLineIdx] <= 40){
                gPositions[gMeme.selectedLineIdx] = 40
            }
            else if(gPositions[gMeme.selectedLineIdx] >= gElCanvas.height){
                gPositions[gMeme.selectedLineIdx] = gElCanvas.height
            }
            gCtx.font = line.size + 'px '+gFonts[gMeme.selectedLineIdx]
            gCtx.fillStyle = line.color
            gCtx.textAlign = line.align;
            let xPosition = gCtx.measureText(line.txt) 
            switch (line.align) {
                case 'right':
                    position = {x:xPosition.width,y:gPositions[gMeme.selectedLineIdx],start:0,end:xPosition.width}
                    break;
            
                case 'center': 
                    position = {x:gElCanvas.width/2,y:gPositions[gMeme.selectedLineIdx],start:gElCanvas.width/2-xPosition.width/2,end:xPosition.width}
                    break;

                case 'left':
                    position = {x:gElCanvas.width - xPosition.width,y:gPositions[gMeme.selectedLineIdx],start:gElCanvas.width - xPosition.width,end:xPosition.width}
                    break
            }
            positions.push(position)
            gCtx.strokeStyle= 'black'
            gCtx.lineWidth = 1;
            gCtx.fillText(line.txt,position.x,position.y)
            gCtx.strokeText(line.txt,position.x,position.y)

            gMeme.selectedLineIdx++
        })
        if(gMeme.lines.length > 0 && isBorder == false){
            gMeme.selectedLineIdx = gCurrLine
            gCtx.lineWidth = 5;
            gCtx.strokeStyle = 'white'
            gCtx.strokeRect(positions[gMeme.selectedLineIdx].start, (positions[gMeme.selectedLineIdx].y + 10), positions[gMeme.selectedLineIdx].end, (-gMeme.lines[gMeme.selectedLineIdx].size - 10))
        }
        changeLineUsed()
    }
}

function setLineTxt(){
    gMeme.lines[gMeme.selectedLineIdx].txt = document.querySelector('.txt-change').value
}

function setTxtColor(){
    gMeme.lines[gMeme.selectedLineIdx].color = document.querySelector('.colors').value
}

function switchLines(){
    document.querySelector('.txt-change').value = ''
    gCurrLine++
    if(gCurrLine >= gMeme.lines.length) gCurrLine = 0
    gMeme.selectedLineIdx =gCurrLine
}

function _savMemesToStorage(key = STORAGE_KEY, val = gMemes){
    saveToStorage(key, val)
}

function fontSize(size){
    size === 'plus'? gMeme.lines[gMeme.selectedLineIdx].size +=1 : gMeme.lines[gMeme.selectedLineIdx].size -=1
}

function alignText(align){
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function addLine(){
    gMeme.lines.push(
        { 
        txt: 'New line', 
        size: 30, align: 'center', 
        color: '#FFFFFF'
        }
    )
    gCurrLine = gMeme.lines.length -1
    gMeme.selectedLineIdx = gCurrLine
}

function changeLineUsed(){
    if(gMeme.lines.length > 0){
        document.querySelector('.txt-change').placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
        document.querySelector(gCurrAlign).style.backgroundColor = "var(--clr3)"
        gCurrAlign = '.text-' + gMeme.lines[gMeme.selectedLineIdx].align
        document.querySelector(gCurrAlign).style.backgroundColor = "var(--clr2)"
        document.querySelector('.fonts').value = gFonts[gMeme.selectedLineIdx]
    }else{
        document.querySelector('.txt-change').value = ''
        document.querySelector('.txt-change').placeholder = 'No line found' 
        document.querySelector(gCurrAlign).style.backgroundColor = "var(--clr3)"
        document.querySelector('.fonts').value = 'Impact'
    }

}

function deleteLine(){
    gMeme.lines.splice(gCurrLine,1)
    gFonts.splice(gCurrLine,1)
    gPositions.splice(gCurrLine,1)
    gCurrLine = 0
    gMeme.selectedLineIdx =gCurrLine
}

function changeFont(font){
    gFonts[gMeme.selectedLineIdx] = font
}

function moveText(diraction){
    gPositions[gMeme.selectedLineIdx] += diraction
}

function addEmoji(emoji){
    gMeme.lines.push(
        { 
        txt: emoji, 
        size: 30, align: 'center', 
        color: '#FFFFFF'
        }
    )
    gCurrLine = gMeme.lines.length -1
    gMeme.selectedLineIdx = gCurrLine
}

function resizeCanvas() {
    const elContainer = document.querySelector('.meme-canvas')
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = elContainer.offsetWidth -10
    // Unless needed, better keep height fixed.
    // gElCanvas.height = elContainer.offsetHeight
  }




