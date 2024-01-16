////////////////////////////////////////////////////////////////
import { X, Y } from "./Polygon.jsx";
import { StrShape } from "./Radar.jsx";
////////////////////////////////////////////////////////////////
const LOUNGE = 0,
      ACTION = 1;
/////////////////////////////////////////////////////[ Charmat ]
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
class Charmat {
    constructor({ alphabet, 
                  charFrom,
                  charTo,
                  offset, // Point
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
        const shapeFrom = StrShape( ctx, charFrom );
        const shapeTo = StrShape( ctx, charTo );
        this.width  = Math.max( shapeFrom[ X ], shapeTo[ X ]);
        this.height = Math.max( shapeFrom[ Y ], shapeTo[ Y ]);
        // 56 is the width of 100px monospace
        this.ctx.lineWidth = Math.min( 1, 1.0 * this.width / 56 );
    }
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    async render(){
        await this.RenderChar( this.charFrom );
        await this.RenderPolygons( this.nfFrames );
        await this.RenderChar( this.charTo );
    }
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
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
    RenderChar( char ){
        return new Promise( resolve => {
            this.clear();
            this.fillChar( char, this.fgr );
            setTimeout(() => {
                resolve( 'Ok' );
            }, this.delay[ LOUNGE ]);
        });
    }
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
export { Charmat };
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
