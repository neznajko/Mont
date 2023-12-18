//////////////////////////////////////////////////////////////
import { ChapterOne } from "./TheHobbit.js";
import { X, Y } from "./Polygon.js";
//////////////////////////////////////////////////////////////
function StrShape( ctx, str ){
    const metrics = ctx.measureText( str );
    const width = Math.ceil( metrics.width );
    const height = Math.ceil( 
        metrics.fontBoundingBoxAscent + 
        metrics.fontBoundingBoxDescent 
    );
    return [ width, height ];
}
//////////////////////////////////////////////////////////////
class Layout {
    constructor( ctx, width, height ){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        //
        this.bgr = "#000";
        this.fgr = "#fff";
        this.origX = -1;
        this.origY = -1;
    }
    Bgr( bgr ){
        this.bgr = bgr;
        return this;
    }
    Fgr( fgr ){
        this.fgr = fgr;
        return this;
    }
    Orig( orig ){
        this.origX = orig[ X ];
        this.origY = orig[ Y ];
        return this;
    }
    GetOrigX(){
        if( this.origX == -1 ){
            this.origX = ( this.ctx.canvas.width - 
                           this.width )/ 2; 
        } 
        return this.origX;
    }
    GetOrigY(){
        if( this.origY == -1 ){
            this.origY = ( this.ctx.canvas.height - 
                           this.height )/ 2; 
        }
        return this.origY;
    }
}
//////////////////////////////////////////////////////////////
class Radar {
    constructor( ctx ){
        ctx.font = "20px serif";
        ctx.textBaseline = "top";
        this.ctx = ctx;
        const txt = ChapterOne[ "An Unexpected Party" ];
        const layout = new Layout( ctx, 680, 500 )
                          .Bgr( "#442" )
                          .Fgr( "#ffa")
                          .Orig([ -1, -1 ]);
        this.heightFactor = 1.2; // 
        const [ _, h ] = StrShape( this.ctx, "M" );
        this.gap = Math.floor( 0.2 * h );
        console.log( this.gap, h );
        const chapter = this.CreatePages
        ( txt, layout.width, layout.height );
        this.pageNumber = 0;
        this.ReadPage( layout, chapter[ 0 ]);
        //
        window.addEventListener( "keydown", e => {
            if( e.key == "ArrowUp" ){
                if( this.pageNumber == 0 ){
                    return;
                }
                --this.pageNumber;
            } else if( e.key == "ArrowDown" ){
                if( this.pageNumber == chapter.length - 1 ){
                    return;
                }
                ++this.pageNumber;
            } else {
                return;
            }
            this.ReadPage( layout, chapter[ this.pageNumber ]);
        });
    }
    //////////////////////////////////////////////////////////
    CreatePages( txt, width, height ){
        let y = -this.gap;
        let book = [];
        let page = [];
        for( const p of txt ){
            // Here -2 is added by hand for undercova
            const ls = this.Split( p, width - 2, true );
            for( const line of ls ){
                const [ _, h ] = StrShape( this.ctx, line );
                y += h + this.gap;
                if( y <= height ){
                    page.push( line );
                } else {
                    book.push( page );
                    y = h;
                    page = [ line ];
                }
            }
        }
        book.push( page );
        return book;
    }
    //////////////////////////////////////////////////////////
    ReadPage( layout, pageText ){
        this.ctx.fillStyle = layout.bgr;
        const x = layout.GetOrigX();
        let y = layout.GetOrigY();
        this.ctx.fillRect( x, y, 
                           layout.width, 
                           layout.height );
        this.ctx.fillStyle = layout.fgr;
        for( const line of pageText ){
            this.ctx.fillStyle = "#555";
            const [ w, h ] = StrShape( this.ctx, line );
            this.ctx.fillRect( x, y, w, h );
            this.ctx.fillStyle = layout.fgr;
            this.ctx.fillText( line, x, y );
            y += h + this.gap;
        }
    }
    Split( str, width, trim=false ){
        if( trim ){
            str = str.trim().split( /\s+/ ).join( " " );
        }
        const n = str.length;
        let ls = [];
        let i = 0,
            j = 0; // str.substring[ i, j )
        let copy;
        for( let k = 0; k < n; ++k ){
            if( str[ k ] == ' ' ){
                copy = j;
                j = k;
            }   
            const w = this.ctx
                          .measureText( str.substring( i, k ))
                          .width;
            if( w >= width ){
                if( j == k ){ // bug fix
                    j = copy;
                }
                ls.push( str.substring( i, j ));
                i = j + 1;
            }
        }
        if( i < n ){
            ls.push( str.substring( i ));
        }
        return ls;
    }
}
//////////////////////////////////////////////////////////////
export { Radar };
//////////////////////////////////////////////////////////////
// log: - rename Layout to PageLayout
//      - comment that -1 orig means centering the page
//      - read class Radar
//      - FHINK