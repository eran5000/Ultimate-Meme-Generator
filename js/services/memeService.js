'use strict'

const STORAGE_KEY = 'memeDB'

let gCurrLine = 0
let gPositions
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
        size: 20, align: 'right', 
        color: '#FFFFFF', line: 0, position:''},
        { txt: 'I always eat Nuggets', 
        size: 30, align: 'center', 
        color: '#FFFFFF', line: 7, position:''} ] 
    }

let gCurrAlign = '.text-' + gMeme.lines[gCurrLine].align

document.querySelector('.color-change').value = gMeme.lines[gCurrLine].color
document.querySelector('.txt-change').placeholder = gMeme.lines[gCurrLine].txt
document.querySelector(gCurrAlign).style.backgroundColor = "var(--clr-4)"

function getMeme(){
    return gMeme
}

function drawImg(){
    gPositions = []
    let txtLine = 0
    let objWithIdIndex = gImgs.findIndex(ele => ele.id === gMeme.selectedImgId)
    const img = new Image()
    img.src = gImgs[objWithIdIndex].url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach(line => {
            gCtx.font = line.size + 'px Arial'
            gCtx.fillStyle = line.color
            gCtx.textAlign = line.align;
            let xPosition = gCtx.measureText(line.txt)
            if(line.line < txtLine) line.line = txtLine
            switch (line.align) {
                case 'right':
                    line.position = {x:xPosition.width,y:40+(line.line/8)*(gElCanvas.height)}
                    break;
            
                case 'center': 
                    line.position = {x:gElCanvas.width/2,y:40+(line.line/8)*(gElCanvas.height)}
                    break;

                case 'left':
                    line.position = {x:gElCanvas.width - xPosition.width,y:40+(line.line/8)*(gElCanvas.height)}
                    break
            }
            gPositions.push(line.position)
            gCtx.fillText(line.txt,line.position.x,line.position.y) 
            txtLine++
        })
        gCtx.strokeStyle = 'white'
        gCtx.strokeRect(0, gPositions[gCurrLine].y, gElCanvas.width, -40)
    }
    return gPositions
}

function setLineTxt(){
    gMeme.lines[gCurrLine].txt = document.querySelector('.txt-change').value
}

function setTxtColor(){
    gMeme.lines[gCurrLine].color = document.querySelector('.color-change').value
}

function switchLines(){
    gCurrLine++
    if(gCurrLine >= gMeme.lines.length) gCurrLine = 0
    changeLineUsed()
    console.log(gPositions);
}

function _savMemesToStorage(key = STORAGE_KEY, val = gMemes){
    saveToStorage(key, val)
}

function fontSize(size){
    size === 'plus'? gMeme.lines[gCurrLine].size +=1 : gMeme.lines[gCurrLine].size -=1
}

function alignText(align){
    gMeme.lines[gCurrLine].align = align
    changeLineUsed()
}

function addLine(){
    gMeme.lines.unshift(
        { 
        txt: 'New line', 
        size: 20, align: 'center', 
        color: '#FFFFFF', line: 0, position:''
        }
    )
    console.log(gMeme.lines);
    gCurrLine = 0
    changeLineUsed()
}

function changeLineUsed(){
    document.querySelector('.color-change').value = gMeme.lines[gCurrLine].color
    document.querySelector('.txt-change').placeholder = gMeme.lines[gCurrLine].txt
    document.querySelector(gCurrAlign).style.backgroundColor = "var(--clr3)"
    gCurrAlign = '.text-' + gMeme.lines[gCurrLine].align
    document.querySelector(gCurrAlign).style.backgroundColor = "var(--clr-4)"

}



