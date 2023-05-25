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
    // str = str.trim().split( /\s+/ ).join( " " );
    const n = str.length;
    let ls = [];
    let i = 0;
    let j = -1; // str.substring( i, j )
    for( let k = 0; k < n; ++k ){
        if( str[ k ] == ' ' ){
            j = k;
        }   
        if( k - i >= nfChar ){
            ls.push( str.substring( i, j ));
            i = j + 1;
        }
    }
    if( i < n ){
        ls.push( str.substring( i ));
    }
    return ls;
}
///////////////////////////////////////////////////////////////
function Align( ls, nfChar ){
    return ls.map( s => s + ' '.repeat( nfChar - s.length ));
}
//////////////////////////////////////////////////////////-/`=_
// Return the maximum length word in txt.
function MaxLenWord( txt ){
    return Math.max( ...txt.split( /\s+/ ).map( w => w.length ));
}
//////////////////////////////////////////////////////////////_
class Automat {
    constructor({ font, 
                  ctx,
                  offset,
                  nfFrames,
                  delay,      
                  fgr, 
                  bgr, 
                  txt, 
                  nfChar }){
        ctx.font = font;
        ctx.textBaseline = "top";
        ctx.strokeStyle = fgr;
        ctx.fillStyle = bgr;
        ctx.fillRect( 0, 0, 
                      ctx.canvas.width,
                      ctx.canvas.height );
        this.ctx = ctx;
        offset = Point.from( offset );
        this.nfFrames = nfFrames;
        this.delay = delay;
        this.fgr = fgr;
        this.bgr = bgr;
        nfChar = Math.max( MaxLenWord( txt ), nfChar );
        this.txt = Split( txt, nfChar );
        this.txt = Align( this.txt, nfChar );
        const metrics = ctx.measureText( "M" );
        this.inc = new Point( Math.ceil( metrics.width ), 0 );
        this.render({
            stringFrom: this.txt[ 0 ],
            stringTo: this.txt[ 0 ],
            offset: offset.clone(),
        });
        this.j = 0;
        window.addEventListener( "keydown", e => {
            if( e.key == "ArrowUp" ){
                if( this.j == 0 ){
                    return;
                }
                this.render({
                    stringFrom: this.txt[ this.j ],
                    stringTo: this.txt[ --this.j ],
                    offset: offset.clone(),
                });
            }
            if( e.key == "ArrowDown" ){
                if( this.j == this.txt.length - 1 ){
                    return;
                }
                this.render({
                    stringFrom: this.txt[ this.j ],
                    stringTo: this.txt[ ++this.j ],
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
///////////////////////////////////////////////////////////////-
// DOTO: ` ~ @ # $  DONE: ` ~ @ # $
//       ^ & { } [        ^ & { } [ 
//       ] / \ | _        ] / \ | _ 
// - Add substitude if input char is not in the alphabet.
// - Figure what to do next, b4 taking another font, preferably
//   not mono space type of font.
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////