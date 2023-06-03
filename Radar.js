////////////////////////////////////////////////////////////////
import { ChapterOne } from "./TheHobbit.js";
import { X, Y } from "./Polygon.js";
////////////////////////////////////////////////////////////////
function StrShape( ctx, str ){
    const metrics = ctx.measureText( str );
    const width = Math.ceil( metrics.width );
    const height = Math.ceil( 
        metrics.fontBoundingBoxAscent + 
        metrics.fontBoundingBoxDescent 
    );
    return [ width, height ];
}
////////////////////////////////////////////////////////////////
class Radar {
    constructor( ctx ){
        ctx.font = "30px serif";
        ctx.textBaseline = "top";
        this.ctx = ctx;
        const txt = ChapterOne[ "An Unexpected Party" ];
        const pageLayout = {
            width: 800,
            height: 400,
            orig: [ 90, 30 ],
            bgr: "#558",
            fgr: "#abf",
        };
        const chapter = this.CreatePages( txt, pageLayout.width, 
            pageLayout.height );
        this.pageNumber = 0;
        this.ReadPage( pageLayout, chapter[ 0 ]);
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
            this.ReadPage( pageLayout, chapter[ this.pageNumber ]);
        });
    }
    ReadPage( pageLayout, pageText ){
        this.ctx.fillStyle = pageLayout.bgr;
        this.ctx.fillRect( 
            pageLayout.orig[ X ],
            pageLayout.orig[ Y ], 
            pageLayout.width, 
            pageLayout.height );
        let y = pageLayout.orig[ Y ];
        this.ctx.fillStyle = pageLayout.fgr;
        for( const line of pageText ){
            const [ _, h ] = StrShape( this.ctx, line );
            this.ctx.fillText( line, pageLayout.orig[ X ], y );
            y += h;
        }
    }
    CreatePages( txt, width, height ){
        let y = 0;
        let book = [];
        let page = [];
        for( const p of txt ){
            const ls = this.Split( p, width, true );
            for( const line of ls ){
                const [ _, h ] = StrShape( this.ctx, line );
                y += h;
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
////////////////////////////////////////////////////////////////
export { Radar };
////////////////////////////////////////////////////////////////