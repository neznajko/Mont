//////////////////////////////////////////////////////////////
console.log( "scrip4ing .." );
//////////////////////////////////////////////////////////////
const div = document.querySelector( ".text-cont" );
//////////////////////////////////////////////////////////////
const box = div.getBoundingClientRect();
const canvas = document.querySelector( "canvas" );
const ctx = canvas.getContext( "2d" );
canvas.width = box.width;
canvas.height = box.height;
canvas.style.left = box.x + "px";
canvas.style.top = box.y + "px";
//////////////////////////////////////////////////////////////
const div_style = getComputedStyle( div );
const font_size = parseFloat( div_style.fontSize );
const y = canvas.height - font_size;
const text = div.textContent.trim();
ctx.font = div_style.getPropertyValue( "font" );
ctx.fillStyle = "#f00";
ctx.textBaseline = "top";
ctx.fillText( text, 0, y + 10 );
//////////////////////////////////////////////////////////////
// log:
