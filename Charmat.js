////////////////////////////////////////////////////////////////
import { X, Y } from "./Polygon.js";
////////////////////////////////////////////////////////////////
const LOUNGE = 0,
      ACTION = 1;
///////////////////////////////////////////////////////[Charmat]
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function GetCharShape( ctx, char ){
    const metrics = ctx.measureText( char );
    const width = Math.ceil( metrics.width );
    const height = Math.ceil( metrics.actualBoundingBoxDescent );
    return [ width, height ];
}
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
        ctx.font = alphabet.font;
        const shapeFrom = GetCharShape( ctx, charFrom );
        const shapeTo = GetCharShape( ctx, charTo );
        this.width  = Math.max( shapeFrom[ X ], shapeTo[ X ]);
        this.height = Math.max( shapeFrom[ Y ], shapeTo[ Y ]);
        // 56 is the width of 100px monospace
        this.ctx.lineWidth = Math.min( 1, 1.0 * this.width / 56 );
    }
    async render(){
        await this.RenderChar( this.charFrom, 0 );
        await this.RenderPolygons( this.nfFrames );
        await this.RenderChar( this.charTo, 0 );
    }
    async RenderChar( char, j ){
        if( j > 0 ){// vhitout Gradient's better
            return;
        }
        await this.RenderCharFrame( char );
        await this.RenderChar( char, j + 1 );
    }
    RenderCharFrame( char ){
        return new Promise( resolve => {
            this.clear();
            this.fillChar( char, this.fgr );
            setTimeout(() => {
                resolve( 'Ok' );
            }, this.delay[ LOUNGE ]);
        });
    }
    clear(){
        //this.ctx.fillStyle = this.bgr;
        this.ctx.fillStyle = "#456";
        // This character | is sticking out of the height
        // for whatever reason, 20 should be some persentage of
        // the height 10% or something.
        // There's also problem with the _ characther, adhoc
        // +1, +4 patches were removed from width and height,
        // try figure what's going on here with differetn font
        // sizes.
        this.ctx.fillRect( this.offset[ X ] - 1,
                           this.offset[ Y ] - 20, 
                           this.width + 1, 
                           this.height + 20); 
    }
    fillChar( char, fillStyle ){
        this.ctx.fillStyle = fillStyle;
        this.ctx.fillText( char, 
                           this.offset[ X ], 
                           this.offset[ Y ]);
    }
    async RenderPolygons( j ){
        if( j < 0 ){
            return;
        }
        await this.RenderPolygonFrame();
        await this.RenderPolygons( j - 1 );
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
    clckNext() {
        this.polygon.add( this.inc );
    }
}
////////////////////////////////////////////////////////////////
export { Charmat };
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////