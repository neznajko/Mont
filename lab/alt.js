////////////////////////////////////////////////////////////////
console.log( "alt" );
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
class Publisher {
    constructor( txt, id ){
        this.words = txt.split( /\s+/ );
        this.cruiser = document.getElementById( id );
        this.get_dimentions();
    }
    get_dimentions() {
        const box = this.cruiser.getBoundingClientRect();
        this.width = box.width;
        this.height = box.height;
        const check = this.consdeck();
        check.innerText = "booM";
        const checkbox = check.getBoundingClientRect();
        this.deckheight = checkbox.height;
        check.remove();
    }
    consdeck() {
        const div = document.createElement( "div" );
        div.classList.add( "deck" );
        this.cruiser.appendChild( div );
        return div;
    }
    clean() {
        this.cruiser.replaceChildren();
    }
    fillpage( j ){
        let currheight = 0;
        const page = []; 
        while( j < this.words.length ){
            const div = this.consdeck();
            currheight += this.deckheight;
            if( currheight > this.height ) break;
            j = this.filldiv( j, div );
            page.push( div.innerText );
        }
        this.clean();
        return [ j, page ];
    }
    filldiv( j, div ){
        let n = j + 1;
        while( true ){
            const txt = this.words.slice( j, n++ ).join(' ');
            div.innerText = txt;
            const divbox = div.getBoundingClientRect();
            if( divbox.width >= this.width ) break;
            if( n > this.words.length ){
                n += 1;
                break;
            }
        }
        n -= 2;
        const txt = this.words.slice( j, n ).join( ' ' );
        div.innerText = txt;
        return n;
    }
    getbook() {
        let j = 0;
        let page;
        const logbook = [];
        while( j < this.words.length ){
            [ j, page ] = this.fillpage( j );
            logbook.push( page );
        }
        return logbook;
    }
}
////////////////////////////////////////////////////////////////
const logbook = new Publisher( txt, "cruiser" ).getbook();
console.log( logbook );
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
