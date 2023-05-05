////////////////////////////////////////////////////////////////
import { monospace } from "./monospace.js";
////////////////////////////////////////////////////////////////
const X = 0;
const Y = 1;
const LOUNGE = 0;
const ACTION = 1;
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
class Charmat {
    constructor({ alphabet, 
                  charFrom, 
                  charTo, 
                  offset, 
                  nfFrames, 
                  ctx, 
                  delay,
                  fgr,
                  bgr,
                 }){
        this.charFrom = charFrom;
        this.charTo = charTo;
        this.offset = offset;
        this.nfFrames = nfFrames;
        this.ctx = ctx;
        this.delay = delay;
        this.fgr = fgr;
        this.bgr = bgr;
        this.polygon = alphabet[ charFrom ]
                       .clone()
                       .translate( offset );
        this.inc = alphabet[ charTo ]
                   .clone()
                   .translate( offset )
                   .sub( this.polygon )
                   .div( nfFrames );
        this.gradient = new Gradient({
            hexString: [ fgr, bgr ],
            nfFrames: 7,
            qq: 0.8,
        });
        ctx.save();
        ctx.font = alphabet.font;
        const metricsFrom = ctx.measureText( charFrom );
        const widthFrom = Math.ceil( metricsFrom.width );
        const heightFrom = Math.ceil( metricsFrom.actualBoundingBoxDescent );
        const metricsTo = ctx.measureText( charTo );
        const widthTo = Math.ceil( metricsTo.width );
        const heightTo = Math.ceil( metricsTo.actualBoundingBoxDescent );
        this.width = Math.max( widthFrom, widthTo ) + 1;
        this.height = Math.max( heightFrom, heightTo ) + 4;
    }
    async render() {
        await this.RenderChar( this.charFrom, 0 );
        await this.RenderPolygons( this.nfFrames );
        this.gradient.color.reverse();
        await this.RenderChar( this.charTo, 0 );
    }
    clear(){
        this.ctx.fillStyle = this.bgr;
        this.ctx.fillRect( this.offset[ X ], 
                           this.offset[ Y ], 
                           this.width, 
                           this.height ); 
    }
    fillChar( char, fillStyle ){
        this.ctx.fillStyle = fillStyle;
        this.ctx.fillText( char, 
                           this.offset[ X ], 
                           this.offset[ Y ]);
    }
    strokeChar( char ){
        this.ctx.strokeText( char, 
                             this.offset[ X ], 
                             this.offset[ Y ]);
    }
    clckNext() {
        this.polygon.add( this.inc );
    }
    RenderCharFrame( char, j ){
        return new Promise( resolve => {
            this.clear();
            this.fillChar( char, this.gradient.color[ j ]);
            this.strokeChar( char );
            setTimeout(() => {
                resolve( 'Ok' );
            }, this.delay[ LOUNGE ]);
        });
    }
    async RenderChar( char, j ){
        if( j >= this.gradient.nfFrames ){
            return;
        }
        await this.RenderCharFrame( char, j );
        await this.RenderChar( char, j + 1 );
    }
    RenderPolygonFrame(){
        return new Promise( resolve => {
            this.clear();
            this.polygon.createPath( this.ctx );
            this.ctx.fillStyle = this.fgr;
            this.ctx.stroke();
            this.clckNext();
            setTimeout(() => {
                resolve( 'Ok' );
            }, this.delay[ ACTION ]);
        });
    }
    async RenderPolygons( j ){
        if( j < 0 ){
            return;
        }
        await this.RenderPolygonFrame();
        await this.RenderPolygons( j - 1 );
    }
}
///////////////////////////////////////////////////////////////
class Automat {
    constructor({ font, ctx, fgr, bgr }){
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
        this.inc = new Point( Math.ceil( metrics.width ), 0 );
        this.fgr = fgr;
        this.bgr = bgr;
        this.text = [ 
            "Some text here",
            "like reading a",
            "book using the",
            "arrow keys    ", 
        ];
        this.render({
            stringFrom: this.text[ 0 ],
            stringTo: this.text[ 0 ],
            offset: new Point( 100, 100 ),
            nfFrames: 5,
            delay: [200, 100 ],
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
                    offset: new Point( 100, 100 ),
                    nfFrames: 5,
                    delay: [200, 100 ],
                });
            }
            if( e.key == "ArrowDown" ){
                if( this.j == this.text.length - 1 ){
                    return;
                }
                this.render({
                    stringFrom: this.text[ this.j ],
                    stringTo: this.text[ ++this.j ],
                    offset: new Point( 100, 100 ),
                    nfFrames: 5,
                    delay: [200, 100 ],
                });
            }
        })
    }
////////////////////////////////////////////////////////////////
    render({ stringFrom, 
             stringTo, 
             offset, 
             nfFrames=10, 
             delay=[ 500, 200 ],
        }){
        const alphabet = Alphabet.getAlphabet( this.ctx.font );
        for( let j = 0, n = stringFrom.length; j < n; j++ ){
            const charFrom = stringFrom[ j ];
            const charTo = stringTo[ j ];
            const charmat = new Charmat({ 
                "alphabet": alphabet, 
                "charFrom": charFrom, 
                "charTo": charTo, 
                "offset": offset.clone(), 
                "nfFrames": charFrom == charTo ? -1 : nfFrames,
                "ctx": this.ctx,
                "delay": charFrom == charTo ? [ -1, -1 ] : delay,
                "fgr": this.fgr,
                "bgr": this.bgr,
            });
            charmat.render();
            offset.add( this.inc );
        }
    }
}
export { Point, Automat };
////////////////////////////////////////////////////////////////
// DOTO: - eat pizza 
//    