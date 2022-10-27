'use strict'
let gElCanvas = document.getElementById('img-to-meme')
let gCtx = gElCanvas.getContext('2d'),
    columns = 5,
    rows = 5
let gImgs =[{id:1, url:'./img/meme-imgs(square)/1.jpg', keywords:['politics','Trump']},{id:2, url:'./img/meme-imgs(square)/2.jpg', keywords:['cute','dog']}]
let gMeme ={ 
    selectedImgId: 1, 
    selectedLineIdx: 0, 
    lines: 
    [ { txt: 'I sometimes eat Falafel', 
        size: 20, align: 'right', 
        color: '#FFFFFF', line: ''},
        { txt: 'I always eat Nuggets', 
        size: 30, align: 'center', 
        color: '#FFFFFF', line: ''} ] 
    }

document.querySelector('.color-change').value = gMeme.lines[0].color

function getMeme(){
    return gMeme
}
function getImgs(){
    return gImgs
}

function drawImg(){
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
            if(line.line !== '') txtLine = line.line
            switch (line.align) {
                case 'right':
                    gCtx.fillText(line.txt,xPosition.width,(line.size + (txtLine/8)*(gElCanvas.height - line.size)))
                    break;
            
                case 'center': 
                    gCtx.fillText(line.txt,gElCanvas.width/2,(line.size + (txtLine/8)*(gElCanvas.height - line.size)))
                    break;

                case 'left':
                    gCtx.fillText(line.txt,gElCanvas.width - xPosition.width,(line.size + (txtLine/8)*(gElCanvas.height - line.size)))
            }
            if(line.line === ''){ 
                line.line = txtLine
                txtLine++
            }
        })
    }
}

function setLineTxt(){
    gMeme.lines[0].txt = document.querySelector('.txt-change').value
}

function setTxtColor(){
    gMeme.lines[0].color = document.querySelector('.color-change').value
}

function switchLines(){
    let line = gMeme.lines[0].line
    gMeme.lines[0].line = gMeme.lines[gMeme.lines.length - 1].line
    gMeme.lines[gMeme.lines.length - 1].line = line
}
