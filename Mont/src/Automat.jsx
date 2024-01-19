////////////////////////////////////////////////////////////////
import { monospace      } from "./monospace"
import { Charmat        } from "./Charmat"
import { Point, Polygon } from "./Polygon"
////////////////////////////////////////////////////////////////
class Alphabet {
    static BaseFontsize = 100; // px
    static Coords = {
        "monospace": monospace,
    }
    static Re = /(\d+)px (.+)/; // 50px monospace
    static getAlphabet( font ){
        const match = font.match( Alphabet.Re );
        const fontFamily = match[ 2 ]; 
        const fontSize = +match[ 1 ];
        const scaleFactor = fontSize/ Alphabet.BaseFontsize;
        const fontFamilyCoords = Alphabet.Coords[ fontFamily ];
        const alphabet = {
            "font": font, 
        };
        for( const char in fontFamilyCoords ){
            const charCoords = fontFamilyCoords[ char ];
            const polygon = Polygon.from( charCoords, 
                coords => { 
                    return Point.from( coords ); 
                });
            alphabet[ char ] = polygon.mul( scaleFactor );
        }
        return alphabet;
    }
}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
class Automat {
    constructor({ font, 
                  ctx,
                  offset,
                  nfFrames,
                  delay,      
                  fgr, 
                  bgr,
                }){
        this.ctx = ctx;
        this.offset = Point.from( offset );
        this.nfFrames = nfFrames;
        this.delay = delay;
        this.fgr = fgr;
        this.bgr = bgr;
        //
        this.ctx.font = font;
        this.ctx.textBaseline = "top";
        this.ctx.strokeStyle = this.fgr;
        this.ctx.fillStyle = this.bgr;
        //
        this.copyNinja = this.CopyNinjaKakashiSensei();
        this.alphabet = Alphabet.getAlphabet( ctx.font );
        const chakura = this.copyNinja.innerText;
        this.align( chakura, chakura ); // aka chatora
        this.irender();
        this.onkeydown();
    }
    ////////////////////////////////////////////////////////////
    CopyNinjaKakashiSensei() {
        const copyNinja = document.querySelector( ".CopyNinjaKakashi" );
        const style = getComputedStyle( copyNinja );
        //this.ctx.font = style.getPropertyValue( "font" );
    ////////////////////////////////////////////////////////////
        return copyNinja;
    }
    ////////////////////////////////////////////////////////////
    align( stringFrom, stringTo ) {
        this.stringFrom = stringFrom;
        this.stringTo = stringTo;
        const f = this.stringFrom.length;
        const t = this.stringTo.length;
        const m = Math.max( f, t );
        this.stringFrom += ' '.repeat( m - f );
        this.stringTo += ' '.repeat( m - t );
    }
    ////////////////////////////////////////////////////////////
    onkeydown(){
        window.addEventListener( "keydown", e => {
            if( e.key == "ArrowUp" || e.key == "ArrowDown" ){
                const chakura = this.copyNinja.innerText;
                this.align( this.stringTo, chakura );
                this.render({
                    stringFrom: this.stringFrom,
                    stringTo: this.stringTo,
                    offset: this.offset.clone(),
                });
            }
        });
    }
    ////////////////////////////////////////////////////////////
    irender(){ // initial render
        this.ctx.fillRect( 0, 0, this.ctx.canvas.width,
                                 this.ctx.canvas.height );
        this.render({
            stringFrom: this.stringFrom,
            stringTo: this.stringFrom,
            offset: this.offset.clone(),
        });
    }
    ////////////////////////////////////////////////////////////
    render({ stringFrom, stringTo, offset }){
        for( let j = 0, n = stringFrom.length; j < n; j++ ){
            const charFrom = stringFrom[ j ];
            const charTo = stringTo[ j ];
            const charmat = new Charmat({
                "alphabet": this.alphabet,
                "charFrom": charFrom,
                "charTo": charTo,
                "offset": offset.clone(),
                "nfFrames": charFrom == charTo ? -1 : this.nfFrames,
                "ctx": this.ctx,
                "delay": charFrom == charTo ? [ -1, -1 ] : this.delay,
                "fgr": this.fgr,
                "bgr": this.bgr,
            });
            charmat.render();
            const substr = stringTo.substring( 0, j + 1 );
            const width = this.ctx.measureText( substr ).width; 
            offset[0] = width;
        }
    }
}
export { Alphabet, Automat }
///////////////////////////////////////////////////////////////-
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// log:
