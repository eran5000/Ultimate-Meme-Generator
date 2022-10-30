'use strict'

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function toggleEditor(){
    document.body.classList.toggle('editor-open');
    document.body.classList.remove('saved-open');
}

function addEditor(){
    document.body.classList.add('editor-open');
    document.body.classList.remove('saved-open');
}

function toggleSaved(){
    document.body.classList.add('saved-open');
    renderSaves()
}