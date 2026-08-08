// assets/js/main.js — minimal interactions
document.addEventListener('DOMContentLoaded', function(){
  const btn = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  if(btn && nav){btn.addEventListener('click', ()=>{nav.classList.toggle('open');btn.setAttribute('aria-expanded',nav.classList.contains('open'))})}
});
