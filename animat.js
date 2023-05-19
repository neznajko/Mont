////////////////////////////////////////////////////////////////
import { monospace } from "./monospace.js";
import { Charmat } from "./Charmat.js";
////////////////////////////////////////////////////////////////
const X = 0;
const Y = 1;
////////////////////////////////////////////////////////////////
class Point extends Array {
    clone() {
        return this.slice();
    }
    add( point ){
        this.map(( value, j ) => {
            this[ j ] += point[ j ];
        });
        return this;
    }
    sub( point ){
        this.map(( value, j ) => {
            this[ j ] -= point[ j ];
        });
        return this;
    }
    mul( n ){
        this.map(( value, j ) => {
            this[ j ] *= n; 
        });
        return this;
    }
    div( n ){
        return this.mul( 1/ n );
    }
}
////////////////////////////////////////////////////////////////
class Polygon extends Array {
    clone() {
        return this.map( point => {
            return point.clone();
        });
    }
    add( polygon ){
        this.map(( point, j ) => {
            point.add( polygon[ j ]);
        });
        return this;
    }
    sub( polygon ){
        this.map(( point, j ) => {
            point.sub( polygon[ j ]);
        });
        return this;
    }
    mul( n ){
        this.map( point => {
            point.mul( n );
        });
        return this;
    }
    div( n ){
        return this.mul( 1/ n );
    }
    translate( offset ){
        this.map( point => {
            point.add( offset );
        });
        return this;
    }
    createPath( ctx ){
        ctx.beginPath();
        ctx.moveTo( this[ 0 ][ X ], this[ 0 ][ Y ]);
        for( let j = 1, n = this.length; j < n; j++ ){
            ctx.lineTo( this[ j ][ X ], this[ j ][ Y ]);
        }
        ctx.closePath();
    }
}
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
// #abc => [ 10, 11, 12 ]
function hexStringToArray( hexString ){
    return [...hexString.slice( 1 )].map( v => {
        return +( "0x" + v );
    });
}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
class Gradient {
    static linearFactory( x, y, qq ){
    // y = Ax + B
    // y1 = Ax1 + B
    // y2 = Ax2 + B
    // A = (y2 - y1)/(x2 - x1)
    // B = (x2y1 - x1y2)/(x2 - x1)
        const dX = x[ 1 ] - x[ 0 ];
        const A = (y[ 1 ] - y[ 0 ])/ dX;
        const B = (x[ 1 ] * y[ 0 ] - x[ 0 ] * y[ 1 ])/ dX;
        const m = Math.min( y[ 0 ], y[ 1 ]);
        return u => {
            let v = A * u + B;
            if( u > x[ 0 ] && u < x[ 1 ]){
                v = m + qq * ( v - m ); // <1>
            }
            return Math.round( v );
        }
    }
    static linearStuff({
        nfFrames,
        colorFrom,
        colorTo,
        qq,
    }){
        // <
        const color = Array.from({ length: nfFrames });
        const y = Gradient.linearFactory([ 0, nfFrames - 1 ], 
                                         [ colorFrom, colorTo ],
                                         qq );
        for( let frame = 0; frame < nfFrames; frame++ ){
            color[ frame ] = y( frame );
        }
        return color;
    }
    constructor({
        hexString,
        nfFrames,
        qq,
    }){
        const FROM = 0,
              TO = 1;
        const hexArrayFrom = hexStringToArray( hexString[ FROM ]);
        const hexArrayTo = hexStringToArray( hexString[ TO ]);
        const R = 0, 
              G = 1, 
              B = 2;
        const rgb = [ R, G, B ].map( j => {
            return this.constructor.linearStuff({
                nfFrames: nfFrames,
                colorFrom: hexArrayFrom[ j ],
                colorTo: hexArrayTo[ j ],
                qq: qq,
            }).map( v => {
                return v.toString( 16 );
            });
        });
        const r = rgb[ R ];
        const g = rgb[ G ];
        const b = rgb[ B ];
        this.color = Array.from({ length: nfFrames }).map(( v, j ) => {
            return `#${r[ j ]}${g[ j ]}${b[ j ]}`;
        });
        this.nfFrames = nfFrames;
    }
}
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
function getRandomInt( min, max ){ // [ min, max ]
    return Math.floor( Math.random() *( max - min + 1 )) + min;
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
export { X, Y, Point, Automat };
////////////////////////////////////////////////////////////////
// DOTO: - ` ~ @ # $  
//         ^ & { } [  
//         ] / \ | _  
//
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////