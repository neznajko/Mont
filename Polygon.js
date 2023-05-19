////////////////////////////////////////////////////////////////
const X = 0,
      Y = 1;
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
export { X, Y, Point, Polygon };
////////////////////////////////////////////////////////////////