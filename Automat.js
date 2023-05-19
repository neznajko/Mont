////////////////////////////////////////////////////////////////
import { monospace      } from "./monospace.js";
import { Charmat        } from "./Charmat.js";
import { Point, Polygon } from "./Polygon.js";
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
function Split( str, nfChar ){
    const n = str.length;
    let lst = [];
    let i = 0;
    let j = -1; // str.substring( i, j )
    for( let k = 0; k < n; ++k ){
        if( str[ k ] == ' '){
            j = k;
        }   
        if( k - i >= nfChar ){
            lst.push( str.substring( i, j ));
            i = j + 1;
        }
    }
    if( i < n ){
        lst.push( str.substring( i ));
    }
    return lst;
}
///////////////////////////////////////////////////////////////
function Align( lst, nfChar ){
    return lst.map( s => s + ' '.repeat( nfChar - s.length ));
}
///////////////////////////////////////////////////////////////
class Automat {
    constructor({ font, 
                  ctx,
                  offset,
                  nfFrames,
                  delay,      
                  fgr, 
                  bgr, 
                  text, 
                  nfChar }){
        ctx.font = font;
        ctx.textBaseline = "top";
        ctx.strokeStyle = fgr;
        ctx.fillStyle = bgr;
        ctx.fillRect( 0, 
                      0, 
                      ctx.canvas.width,
                      ctx.canvas.height );
        const metrics = ctx.measureText( "M" );
        this.ctx = ctx;
        this.nfFrames = nfFrames;
        this.delay = delay;
        this.inc = new Point( Math.ceil( metrics.width ), 0 );
        this.fgr = fgr;
        this.bgr = bgr;
        this.text = Split( text, nfChar );
        this.text = Align( this.text, nfChar );
        this.render({
            stringFrom: this.text[ 0 ],
            stringTo: this.text[ 0 ],
            offset: offset.clone(),
        });
        this.j = 0;
        window.addEventListener( "keydown", e => {
            if( e.key == "ArrowUp" ){
                if( this.j == 0 ){
                    return;
                }
                this.render({
                    stringFrom: this.text[ this.j ],
                    stringTo: this.text[ --this.j ],
                    offset: offset.clone(),
                });
            }
            if( e.key == "ArrowDown" ){
                if( this.j == this.text.length - 1 ){
                    return;
                }
                this.render({
                    stringFrom: this.text[ this.j ],
                    stringTo: this.text[ ++this.j ],
                    offset: offset.clone(),
                });
            }
        })
    }
////////////////////////////////////////////////////////////////
    render({ stringFrom, stringTo, offset }){
        const alphabet = Alphabet.getAlphabet( this.ctx.font );
        for( let j = 0, n = stringFrom.length; j < n; j++ ){
            const charFrom = stringFrom[ j ];
            const charTo = stringTo[ j ];
            const charmat = new Charmat({ 
                "alphabet": alphabet, 
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
            offset.add( this.inc );
        }
    }
}
export { Automat };
////////////////////////////////////////////////////////////////
// DOTO: - ` ~ @ # $  
//         ^ & { } [  
//         ] / \ | _  
//
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////