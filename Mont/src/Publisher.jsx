////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
export { Publisher }
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
