'use strict'

let gImgs =[
    {id:1, url:'./img/meme-imgs(square)/1.jpg', 
    keywords:['politics','Trump']},
    {id:2, url:'./img/meme-imgs(square)/2.jpg', 
    keywords:['cute','dog']},
    {id:3, url:'./img/meme-imgs(square)/3.jpg', 
    keywords:['cute','dog','baby']},
    {id:4, url:'./img/meme-imgs(square)/4.jpg', 
    keywords:['cute','cat']},
    {id:5, url:'./img/meme-imgs(square)/5.jpg', 
    keywords:['baby','cute','funny']},
    {id:6, url:'./img/meme-imgs(square)/6.jpg', 
    keywords:['posture','man']},
    {id:7, url:'./img/meme-imgs(square)/7.jpg', 
    keywords:['baby','suprise']},
    {id:8, url:'./img/meme-imgs(square)/8.jpg', 
    keywords:['posture','man']},
    {id:9, url:'./img/meme-imgs(square)/9.jpg', 
    keywords:['baby','funny']},
    {id:10, url:'./img/meme-imgs(square)/10.jpg', 
    keywords:['politics','funny']},
    {id:11, url:'./img/meme-imgs(square)/11.jpg', 
    keywords:['man','kissing']},
    {id:12, url:'./img/meme-imgs(square)/12.jpg', 
    keywords:['man','posture']},
    {id:13, url:'./img/meme-imgs(square)/13.jpg', 
    keywords:['man','posture']},
    {id:14, url:'./img/meme-imgs(square)/14.jpg', 
    keywords:['man','sunglasses']},
    {id:15, url:'./img/meme-imgs(square)/15.jpg', 
    keywords:['man','posture']},
    {id:16, url:'./img/meme-imgs(square)/16.jpg', 
    keywords:['man','posture','funny']},
    {id:17, url:'./img/meme-imgs(square)/17.jpg', 
    keywords:['politics','posture']},
    {id:18, url:'./img/meme-imgs(square)/18.jpg', 
    keywords:['posture','funny']},
]

let keywords = [
    'politics',
    'trump',
    'man',
    'posture',
    'funny',
    'sunglasses',
    'baby',
    'cute',
    'cat',
    'dog',
    'kissing',
    'suprise',
]

let sizes = [
    1.0,
    1.3,
    1.8,
    1.8,
    1.5,
    1.3,
    1.4,
    1.4,
    1.3,
    1.2,
    1.0,
    1.0,
]

var gFilterBy =''

renderSearchWorcds()

function setImg(id){
    let meme = getMeme()
    meme.selectedImgId = id
}

function getImgs(){
    var imgs = gImgs

    imgs = imgs.filter(img => {
        return (img.keywords.toString().toLowerCase().includes(gFilterBy.toLowerCase()))
    })
    return imgs
}

function setFilterByTxt(txt){
    gFilterBy = txt
    if(keywords.indexOf(txt.toLowerCase()) != -1){
        sizes[keywords.indexOf(txt)] += 0.1
        document.querySelector('.search-bar').placeholder = txt
        console.log(sizes[keywords.indexOf(txt)]);
    }
    renderSearchWorcds()
}

function renderSearchWorcds(){
    let strHtml = ''  
    for(var i = 0; i<sizes.length;i++){
        strHtml += `<div class="word ${keywords[i]}" style="font-size:${sizes[i]*10}px;" onclick="onSetFilterByTxt('${keywords[i]}')">${keywords[i]}-</div>`
    }
    document.querySelector('.search-words').innerHTML=strHtml
}