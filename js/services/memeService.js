'use strict'

const STORAGE_KEY = 'memeDB'

let gCurrLine = 0
let gPositions = []
let gMemes =[]
let gElCanvas = document.getElementById('img-to-meme')
let gCtx = gElCanvas.getContext('2d')
let gMeme ={ 
    selectedImgId: 1, 
    selectedLineIdx: 0, 
    lines: 
    [ { txt: 'I sometimes eat Falafel', 
        size: 30, font:'Impact',align:'center', 
        color: '#FFFFFF',isDrag: false, pos:{x:gElCanvas.width/2,y:null}},
        { txt: 'I always eat Nuggets', 
        size: 20, font:'Impact',align:'center',
        color: '#FFFFFF',isDrag: false, pos:{x:gElCanvas.width/2 + 20*2,y:null}} ] 
    }
    
let gCurrAlign = '.text-center'
    
document.querySelector('.txt-change').placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
// resizeCanvas()

function getMeme(){
    return gMeme
}

function getElCanvas(){
    return gElCanvas
}


function drawMeme(isBorder = false){
    let img = makeImg()
    gMeme.selectedLineIdx = 0
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach(line => {
            gCtx.font = line.size + 'px '+line.font
            gCtx.fillStyle = line.color
            line.width = gCtx.measureText(line.txt).width
            line.height = gCtx.measureText(line.txt).fontBoundingBoxAscent
            gCtx.textAlign = line.align
            if(line.pos.y === null) line.pos.y = textPlaceOnCanvas()
            gCtx.strokeStyle= 'black'
            gCtx.lineWidth = 1;
            gCtx.fillText(line.txt,line.pos.x,line.pos.y)
            gCtx.strokeText(line.txt,line.pos.x,line.pos.y)

            gMeme.selectedLineIdx++
        })
        gMeme.selectedLineIdx = gCurrLine
        if(gMeme.lines.length > 0){
            if(!isBorder)drawBoard()
            else setTimeout(drawBoard,2000)
            changeLineUsed()
        }
    }
    
}

function makeImg(){
    let imgs = getImgs()
    let objWithIdIndex = imgs.findIndex(ele => ele.id === gMeme.selectedImgId)
    const img = new Image()
    img.src = imgs[objWithIdIndex].url
    return img
}



function setLineTxt(){
    gMeme.lines[gMeme.selectedLineIdx].txt = document.querySelector('.txt-change').value
}

function setTxtColor(){
    gMeme.lines[gMeme.selectedLineIdx].color = document.querySelector('.colors').value
}

function switchLines(num = gCurrLine + 1){
    document.querySelector('.txt-change').value = ''
    gCurrLine = num
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
    switch (align) {
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = gMeme.lines[gMeme.selectedLineIdx].width/2 
            break;

        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width/2
            break;
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width - gMeme.lines[gMeme.selectedLineIdx].width/2
             break;
    }

    document.querySelector(gCurrAlign).style.backgroundColor = "var(--clr3)"
    gCurrAlign = '.text-' + align
}

function addLine(){
    gMeme.lines.push(
        { 
        txt: 'new line', 
        size: 20,  
        color: '#FFFFFF',
        align:'center',
        font:'Impact',
        isDrag: false, 
        pos:{x:gElCanvas.width/2,y:null}},
    )
    gCurrLine = gMeme.lines.length -1
    gMeme.selectedLineIdx = gCurrLine
}

function changeLineUsed(){
    if(gMeme.lines.length > 0){
        document.querySelector('.txt-change').placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
        document.querySelector('.fonts').value = gMeme.lines[gMeme.selectedLineIdx].font
        document.querySelector(gCurrAlign).style.backgroundColor = "var(--clr2)"
    }else{
        document.querySelector('.txt-change').value = ''
        document.querySelector('.txt-change').placeholder = 'No line found' 
        document.querySelector(gCurrAlign).style.backgroundColor = "var(--clr3)"
        document.querySelector('.fonts').value = 'Impact'
    }

}

function deleteLine(){
    gMeme.lines.splice(gCurrLine,1)
    gCurrLine = 0
    gMeme.selectedLineIdx =gCurrLine
}

function changeFont(font){
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

/* function moveLine(diraction){
    gMeme.lines[gMeme.selectedLineIdx].pos.y += diraction
    // gPositions[gMeme.selectedLineIdx] += diraction
} */

function addEmoji(emoji){
    gMeme.lines.push(
        { 
        txt: emoji, 
        size: 30, 
        color: '#FFFFFF',
        align:'center',
        font:'Impact',
        isDrag: false, 
        pos:{x:gElCanvas.width/2,y:null}},
    )
    gCurrLine = gMeme.lines.length -1
    gMeme.selectedLineIdx = gCurrLine
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = elContainer.offsetWidth -10
    // Unless needed, better keep height fixed.
    // gElCanvas.height = elContainer.offsetHeight
}

function drawBoard(){
    const line = gMeme.lines[gMeme.selectedLineIdx]
    let postionX
    const gradient = gCtx.createLinearGradient(0, 0, gElCanvas.width, gElCanvas.height)
    gradient.addColorStop('0', '#00FFFF')
    gradient.addColorStop('.5', '#7FFFD4')
    gradient.addColorStop('1', '#76EEC6')
        
    gCtx.lineWidth = 5
    gCtx.strokeStyle = gradient
    gCtx.strokeRect(line.pos.x - line.width/2 , line.pos.y - line.size, line.width, line.height + 10)
}

function onDownloadCanvas(){
    drawMeme(true)
    setTimeout(function(){
        document.querySelector('.a-download').click()
    },1000)

}

function downloadCanvas(elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = gElCanvas.toDataURL("image/png") // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    elLink.href = data // Put it on the link
}

function OnSaveMeme(){
    drawMeme(true)
    setTimeout(function(){
        document.querySelector('.btn-save').click()
    },2000)
}

function saveMeme(){
    let img = gElCanvas.toDataURL("image/png")
    console.log(img);
    gMeme.imgSrc = img
    gMeme.saved = gMemes.length
    gMemes.push(structuredClone(gMeme))
    console.log(gMemes);
    console.log('done');
}

function textMoveOnCanvas(){

    if(gMeme.lines[gMeme.selectedLineIdx].pos.x  < 0){
        gMeme.lines[gMeme.selectedLineIdx].pos.x =gMeme.lines[gMeme.selectedLineIdx].width/2
    }    
    else if(gMeme.lines[gMeme.selectedLineIdx].pos.x >= gElCanvas.width){
        gMeme.lines[gMeme.selectedLineIdx].pos.x =gElCanvas.width
    }

    if(gMeme.lines[gMeme.selectedLineIdx].pos.y - gMeme.lines[gMeme.selectedLineIdx].height < 0){
        gMeme.lines[gMeme.selectedLineIdx].pos.y = gMeme.lines[gMeme.selectedLineIdx].height
    }else if(gMeme.lines[gMeme.selectedLineIdx].pos.y + gMeme.lines[gMeme.selectedLineIdx].height > gElCanvas.height + 50){
        gMeme.lines[gMeme.selectedLineIdx].pos.y = gElCanvas.height - gMeme.lines[gMeme.selectedLineIdx].height/2
    }
}

function textPlaceOnCanvas(){
    if(gMeme.selectedLineIdx === 0){ 
        return gMeme.lines[gMeme.selectedLineIdx].size
    }
    else if(gMeme.selectedLineIdx === 1){
        return gElCanvas.height - gMeme.lines[gMeme.selectedLineIdx].size
    } 
    else if(gMeme.selectedLineIdx > 1) {
        return gElCanvas.height/2
    }
}

function renderSaves(){
    document.querySelector('.saved-container').innerHTML = ''
    const strHtml = gMemes.map(meme =>{
        return `<img class="meme-saved meme"
            src="${meme.imgSrc}"
            onclick="memeEditor(${gMeme.saved})">`
    }).join('')
    document.querySelector('.saved-container').innerHTML = strHtml 
}

function memeEditor(save){
    gMeme = gMemes[save]
    addEditor()
    drawMeme()
}

//Check if the click is inside the circle 
function isLineClicked(clickedPos) {
    let line = gMeme.lines[gMeme.selectedLineIdx]
    const { pos } = line
    const lineWidth = gCtx.measureText(line.txt).width
    const lineHeight = gCtx.measureText(line.txt).fontBoundingBoxAscent + 10
    console.log('pos.y', pos.y,'pos.y - lineHeight',pos.y - lineHeight,'clickedPos.y',clickedPos.y);
    console.log('pos.start',pos.start,'pos.start + lineWidth',pos.start + lineWidth,'clickedPos.x',clickedPos.x);
    // Calc the distance between two dots
    let distance = (clickedPos.x < pos.x + lineWidth/1.5 &&
        clickedPos.x > pos.x/5 &&
        clickedPos.y < pos.y &&
        clickedPos.y > pos.y - lineHeight)
    if(!distance) distance = isOtherLineClicked(clickedPos)
    console.log(distance);
    //If its smaller then the radius of the circle we are inside
    return distance 
}

function isOtherLineClicked(clickedPos){
    var lineNum = 0
    gMeme.lines.forEach(line =>{
        const lineWidth = gCtx.measureText(line.txt).width
        const lineHeight = gCtx.measureText(line.txt).fontBoundingBoxAscent + 10
        const{pos} = line
        if(clickedPos.x < pos.x + lineWidth/1.5 &&
        clickedPos.x > pos.x/5 &&
        clickedPos.y < pos.y &&
        clickedPos.y > pos.y - lineHeight) {
            switchLines(lineNum)
            drawMeme()
            return true
        }
        else lineNum++
    })
    return false
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    console.log('dx',dx,'dy',dy);
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx/6
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy/6
    textMoveOnCanvas()
    console.log('x',gMeme.lines[gMeme.selectedLineIdx].pos.x += dx,'y',gMeme.lines[gMeme.selectedLineIdx].pos.y += dy);
  
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

