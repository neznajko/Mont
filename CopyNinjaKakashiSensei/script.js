//////////////////////////////////////////////////////////////
console.log( "scrip4ing .." );
//////////////////////////////////////////////////////////////
const div = document.querySelector( "div" );
const box = div.getBoundingClientRect();
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
ctx.fillStyle = "#a20";
ctx.textBaseline = "top";
ctx.font = div_style.getPropertyValue( "font" );
ctx.fillText( "That's some text here.", 0, y );
//////////////////////////////////////////////////////////////
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Computed Text Position</title>
//   <style>
//     #myContainer {
//       position: relative;
//       left: 30px;      /* Set any desired left position */
//     }
// 
//     #myText {
//       font-family: Arial, sans-serif;
//       font-size: 16px; /* Set the desired font size */
//     }
//   </style>
// </head>
// <body>
// 
// <div id="myContainer">
//   <div id="myText">This is some text in the div.</div>
// </div>
// 
// <script>
//   document.addEventListener("DOMContentLoaded", function () {
//     var myText = document.getElementById("myText");
// 
//     // Get the computed position and dimensions of the text container
//     var rect = myText.getBoundingClientRect();
// 
//     console.log("Computed Left (within container):", rect.left);
//     console.log("Computed Top (within container):", rect.top);
//   });
// </script>
// 
// </body>
// </html>
// 
