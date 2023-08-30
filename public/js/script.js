// variables declaration
var hamburger = document.querySelector('.fa-bars')
var hamburger1 = document.querySelector('.fa-xmark')
var myNav = document.querySelector('.myNav')


const reveal = () =>{
    myNav.classList.add('revealer');
    myNav.classList.remove('myNav');
    hamburger1.style.display = 'contents'
    hamburger.style.display = 'none'
}

const unreveal = () =>{
    myNav.classList.add('myNav');
    myNav.classList.remove('revealer');
    hamburger1.style.display = 'none'
    hamburger.style.display = 'contents'
}

hamburger.addEventListener('click', reveal)
hamburger1.addEventListener('click', unreveal)




