////////////////////////////////////////////////////////////////
console.log( "scrip4ing" );
////////////////////////////////////////////////////////////////
const txt = `In a hole in the ground there lived a hobbit. Not a 
nasty, dirty, wet hole, filled with the ends of worms and an 
oozy smell, nor yet a dry, bare, sandy hole with nothing in it 
to sit down on or to eat: it was a hobbit-hole, and that means
comfort.
It had a perfectly round door like a porthole, painted green,
with a shiny yellow brass knob in the exact middle. The door
opened on to a tubeshaped hall like a tunnel: a very comfortable
tunnel without smoke, with panelled walls, and floors tiled and
carpeted, provided with polished chairs, and lots and lots of
pegs for hats and coats - the hobbit was fond of visitors. The
tunnel wound on and on, going fairly but not quite straight into
the side of the hill - The Hill, as all the people for many
miles round called it - and many little round doors opened out
of it, first on one side and then on another. No going upstairs
for the hobbit: bedrooms, bathrooms, cellars, pantries (lots of
these), wardrobes (he had whole rooms devoted to clothes),
kitchens, dining-rooms, all were on the same floor, and indeed
on the same passage. The best rooms were all on the left-hand
side (going in), for these were the only ones to have windows,
deep-set round windows looking over his garden and meadows
beyond, sloping down to the river.`
////////////////////////////////////////////////////////////////
console.log( txt );
////////////////////////////////////////////////////////////////
const cruiser = document.getElementById( "cruiser" );
const box = cruiser.getBoundingClientRect();
const height = box.height;
const width = box.width;
////////////////////////////////////////////////////////////////
function consdeck() {
    const div = document.createElement( "div" );
    div.classList.add( "deck" );
    cruiser.appendChild( div );
    return div;
}
////////////////////////////////////////////////////////////////
const check = consdeck();
check.innerText = "booM";
const checkbox = check.getBoundingClientRect();
const deckheight = checkbox.height;
check.remove();
////////////////////////////////////////////////////////////////
console.log( deckheight );
console.log( height );
console.log( width );
////////////////////////////////////////////////////////////////
const words = txt.split( /\s+/ );
////////////////////////////////////////////////////////////////
console.log( words );
////////////////////////////////////////////////////////////////
function clean() {
    cruiser.replaceChildren();
}
////////////////////////////////////////////////////////////////
function fillpage( j ){
    let currheight = 0;
    const page = []; 
    while( j < words.length ){
        const div = consdeck();
        currheight += deckheight;
        if( currheight > height ) break;
        j = filldiv( j, div );
        page.push( div.innerText );
        console.log( j, currheight, height );
    }
    clean();
    return [ j, page ];
}
////////////////////////////////////////////////////////////////
let j = 0;
let page;
const logbook = [];
while( j < words.length ){
    [ j, page ] = fillpage( j );
    logbook.push( page );
}
console.log( logbook );
////////////////////////////////////////////////////////////////
function filldiv( j, div ) {
    let n = j + 1;
    console.log( n, words.length );
    while( true ){
        const txt = words.slice( j, n++ ).join( ' ' );
        div.innerText = txt;
        const divbox = div.getBoundingClientRect();
        if( divbox.width >= width ) break;
        if( n > words.length ){
            n += 1;
            break;
        }
    }
    n -= 2;
    const txt = words.slice( j, n ).join( ' ' );
    div.innerText = txt;
    return n;
}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// log: make this to a class or smth
//      identyfy copy canvas with the react key
//      pass this logbook as cruiser props
//      test the fyorst page
//      try adding a second canvas
