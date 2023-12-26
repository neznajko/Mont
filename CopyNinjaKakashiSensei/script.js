//////////////////////////////////////////////////////////////
console.log( "scrip4ing .." );
//////////////////////////////////////////////////////////////
const div = document.getElementsByClassName( "text-cont" )[0];
const box = div.getBoundingClientRect();
console.log( box );
const canvas = document.querySelector( "canvas" );
canvas.style.display = "block";
canvas.width = box.width;
canvas.height = box.height;
canvas.style.left = box.x + "px";
canvas.style.top = box.y + "px";
//////////////////////////////////////////////////////////////
const div_style = getComputedStyle( div );
const font_size = parseFloat( div_style.fontSize );
const y = canvas.height - font_size;
const ctx = canvas.getContext( "2d" );
ctx.fillStyle = "#fff";
ctx.textBaseline = "top";
ctx.font = div_style.getPropertyValue( "font" );
const text = div.textContent.trim();
ctx.fillText( text, 0, y + 10 );
//////////////////////////////////////////////////////////////
// log: - put text in a div
//      - calculate x and y positions of its bounding box
