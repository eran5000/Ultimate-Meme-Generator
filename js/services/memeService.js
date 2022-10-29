'use strict'

const STORAGE_KEY = 'memeDB'

let gCurrLine = 0
let gFonts = []
let gPositions = []
let gMemes =[]
let gElCanvas = document.getElementById('img-to-meme')
let gCtx
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
    
let gBorderPosition = []
document.querySelector('.txt-change').placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
document.querySelector(gCurrAlign).style.backgroundColor = "var(--clr-4)"
// resizeCanvas()

function getMeme(){
    return gMeme
}

function getElCanvas(){
    return gElCanvas
}

function drawImg(canvas = gElCanvas, isBorder = false,elLink='done',cb=console.log){
    gBorderPosition = []
    let position
    let imgs = getImgs()
    let objWithIdIndex = imgs.findIndex(ele => ele.id === gMeme.selectedImgId)
    gCtx = canvas.getContext('2d')
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
        gCtx.drawImage(img, 0, 0, canvas.width, canvas.height)
        gMeme.lines.forEach(line => {
            if(gPositions.length != gMeme.lines.length){
                if(gPositions.length === 0) gPositions.push(40)
                else if(gPositions.length === 1) gPositions.push(canvas.height)
                else if(gPositions.length > 1) gPositions.push(canvas.height/2)
            }
            if(gPositions[gMeme.selectedLineIdx] <= 40){
                gPositions[gMeme.selectedLineIdx] = 40
            }
            else if(gPositions[gMeme.selectedLineIdx] >= canvas.height){
                gPositions[gMeme.selectedLineIdx] = canvas.height
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
                    position = {x:canvas.width/2,y:gPositions[gMeme.selectedLineIdx],start:canvas.width/2-xPosition.width/2,end:xPosition.width}
                    break;

                case 'left':
                    position = {x:canvas.width - xPosition.width,y:gPositions[gMeme.selectedLineIdx],start:canvas.width - xPosition.width,end:xPosition.width}
                    break
            }
            gBorderPosition.push(position)
            gCtx.strokeStyle= 'black'
            gCtx.lineWidth = 1;
            gCtx.fillText(line.txt,position.x,position.y)
            gCtx.strokeText(line.txt,position.x,position.y)

            gMeme.selectedLineIdx++
        })
        gMeme.selectedLineIdx = gCurrLine
        if(!isBorder)drawBoard()
        else cb(elLink)
        console.log(isBorder);
        if(!canvas === gElCanvas)changeLineUsed()
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

function drawBoard(){
    const gradient = gCtx.createLinearGradient(0, 0, gElCanvas.width, gElCanvas.height)
    gradient.addColorStop('0', '#eee')
    gradient.addColorStop('.5', '#999')
    gradient.addColorStop('1', '#333')
        
    gCtx.lineWidth = 5
    gCtx.strokeStyle = gradient
    gCtx.strokeRect(gBorderPosition[gMeme.selectedLineIdx].start, 
        (gBorderPosition[gMeme.selectedLineIdx].y + 10), 
        gBorderPosition[gMeme.selectedLineIdx].end, 
        (-gMeme.lines[gMeme.selectedLineIdx].size - 10))
}

function downloadCanvas(elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = elCanvas.toDataURL(/* DEFAULT: 'image/png'*/) // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    console.log('data', data) // Decoded the image to base64 
    elLink.href = data // Put it on the link
    elLink.download = 'MyMeme' // Can change the name of the file
}




