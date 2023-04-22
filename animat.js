////////////////////////////////////////////////////////////////
const X = 0;
const Y = 1;
const PROLOGUE = 0;
const ACTION = 1;
const EPILOGUE = 2;
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
        "monospace": {
            "C": [[  49,  21 ], // 0 
                  [  49,  13 ], // 1 
                  [  38,  10 ], // 2
                  [  25,  11 ], // 3
                  [  13,  18 ], // 4
                  [   7,  31 ], // 5
                  [   5,  42 ], // 6
                  [   7,  58 ], // 7
                  [  15,  70 ], // 8
                  [  26,  75 ], // 9
                  [  40,  75 ], // 10
                  [  49,  72 ], // 11
                  [  49,  63 ], // 12
                  [  40,  67 ], // 13
                  [  28,  67 ], // 14
                  [  20,  63 ], // 15
                  [  16,  55 ], // 16
                  [  14,  43 ], // 17
                  [  15,  33 ], // 18
                  [  20,  23 ], // 19
                  [  29,  17 ], // 20
                  [  40,  17 ], // 21
                 ],
            "M": [[  46,  74 ], // 0 
                  [  53,  74 ], // 1
                  [  52,  49 ], // 2
                  [  51,  22 ], // 3
                  [  50,  11 ], // 4
                  [  39,  11 ], // 5
                  [  32,  30 ], // 6
                  [  28,  42 ], // 7
                  [  16,  11 ], // 8
                  [   6,  11 ], // 9
                  [   5,  21 ], // 10
                  [   4,  48 ], // 11
                  [   3,  74 ], // 12
                  [   11, 74 ], // 13
                  [   12, 48 ], // 14
                  [   13, 21 ], // 15
                  [   21, 44 ], // 16
                  [   24, 53 ], // 17
                  [   31, 53 ], // 18
                  [   38, 32 ], // 19
                  [   42, 21 ], // 20
                  [   44, 49 ], // 21
                 ],
            "O": [[  43,  43 ], // 0
                  [  53,  41 ], // 1
                  [  48,  20 ], // 2
                  [  37,  11 ], // 3
                  [  21,  10 ], // 4
                  [   8,  21 ], // 5
                  [   3,  44 ], // 6
                  [   9,  66 ], // 7
                  [  19,  75 ], // 8
                  [  35,  75 ], // 9
                  [  49,  63 ], // 10
                  [  53,  41 ], // 11
                  [  43,  43 ], // 12
                  [  42,  58 ], // 13
                  [  33,  67 ], // 14
                  [  23,  67 ], // 15
                  [  16,  61 ], // 16
                  [  12,  45 ], // 17
                  [  15,  27 ], // 18
                  [  23,  18 ], // 19
                  [  34,  18 ], // 20
                  [  41,  26 ], // 21
                 ],
            " ": [[ 53, 76 ], // 0
                  [ 53, 76 ], // 1
                  [ 48, 76 ], // 2
                  [ 43, 76 ], // 3
                  [ 38, 76 ], // 4
                  [ 33, 76 ], // 5
                  [ 28, 76 ], // 6
                  [ 23, 76 ], // 7
                  [ 18, 76 ], // 8
                  [ 13, 76 ], // 9
                  [  8, 76 ], // 10
                  [  3, 76 ], // 11
                  [  3, 76 ], // 12
                  [  8, 76 ], // 13
                  [ 13, 76 ], // 14
                  [ 18, 76 ], // 15
                  [ 23, 76 ], // 16
                  [ 28, 76 ], // 17
                  [ 33, 76 ], // 18
                  [ 38, 76 ], // 19
                  [ 43, 76 ], // 20
                  [ 48, 76 ], // 21
                 ],
            "B": [[ 32, 38 ], // 0
                  [ 38, 42 ], // 1
                  [ 47, 32 ], // 2
                  [ 46, 19 ], // 3
                  [ 37, 12 ], // 4
                  [  8, 11 ], // 5
                  [  8, 74 ], // 6
                  [ 37, 74 ], // 7
                  [ 50, 61 ], // 8
                  [ 48, 48 ], // 9
                  [ 34, 39 ], // 10
                  [ 17, 39 ], // 11
                  [ 17, 45 ], // 12
                  [ 32, 45 ], // 13
                  [ 41, 51 ], // 14
                  [ 41, 62 ], // 15
                  [ 34, 68 ], // 16
                  [ 17, 68 ], // 17
                  [ 17, 17 ], // 18
                  [ 36, 18 ], // 19
                  [ 39, 23 ], // 20
                  [ 39, 33 ], // 21
                 ],
            "A": [[46,74],//0
                  [56,74],//1
                  [49,56],//2
                  [22,56],//3
                  [22,56],//4
                  [49,56],//5
                  [43,37],//6
                  [34,11],//7
                  [22,11],//8
                  [13,37],//9
                  [7,56],//a
                  [2,74],//b
                  [10,74],//c
                  [16,57],//d
                  [22,38],//e
                  [28,19],//f
                  [28,19],//10
                  [35,40],//11
                  [39,53],//12
                  [16,53],//13
                  [14,60],//14
                  [41,60],//15
                 ],
            "T": [[51,14],//0
                  [51,11],//1
                  [41,11],//2
                  [16,11],//3
                  [5,11],//4
                  [5,17],//5
                  [16,17],//6
                  [24,17],//7
                  [24,44],//8
                  [24,74],//9
                  [32,74],//0
                  [32,44],//1
                  [32,17],//2
                  [41,17],//3
                  [51,17],//4
                  [51,14],//5
                  [28,14],//6
                  [28,69],//7
                  [28,69],//8
                  [28,14],//9
                  [9,14],//0
                  [9,14],//1
                 ],
            "Z": [[  7, 18 ], // 0
                  [  7, 11 ], // 1 
                  [ 28, 11 ], // 2 
                  [ 49, 11 ], // 3
                  [ 49, 18 ], // 4
                  [ 43, 27 ], // 5
                  [ 33, 42 ], // 6
                  [ 25, 54 ], // 7
                  [ 21, 60 ], // 8
                  [ 17, 66 ], // 9
                  [ 33, 67 ], // 10
                  [ 50, 67 ], // 11
                  [ 50, 74 ], // 12
                  [ 32, 74 ], // 13
                  [  6, 74 ], // 14
                  [  6, 67 ], // 15
                  [ 13, 57 ], // 16
                  [ 20, 47 ], // 17
                  [ 26, 37 ], // 18
                  [ 32, 28 ], // 19
                  [ 38, 19 ], // 20
                  [ 24, 18 ], // 21
                 ],
            "J": [[ 10, 18 ], // 0
                  [ 10, 11 ], // 1 
                  [ 25, 11 ], // 2 
                  [ 43, 11 ], // 3
                  [ 43, 25 ], // 4
                  [ 43, 38 ], // 5
                  [ 43, 60 ], // 6
                  [ 38, 70 ], // 7
                  [ 29, 75 ], // 8
                  [ 18, 75 ], // 9
                  [ 14, 74 ], // 10
                  [  9, 71 ], // 11
                  [  9, 63 ], // 12
                  [ 14, 66 ], // 13
                  [ 19, 68 ], // 14
                  [ 28, 68 ], // 15
                  [ 32, 65 ], // 16
                  [ 35, 59 ], // 17
                  [ 35, 38 ], // 18
                  [ 36, 27 ], // 19
                  [ 35, 18 ], // 20
                  [ 25, 18 ], // 21
                 ],
            "L": [[ 21, 11 ], // 0
                  [ 12, 11 ], // 1 
                  [ 12, 19 ], // 2 
                  [ 12, 28 ], // 3
                  [ 12, 42 ], // 4
                  [ 12, 54 ], // 5
                  [ 12, 67 ], // 6
                  [ 12, 74 ], // 7
                  [ 22, 74 ], // 8
                  [ 32, 74 ], // 9
                  [ 41, 74 ], // 10
                  [ 49, 74 ], // 11
                  [ 49, 67 ], // 12
                  [ 42, 67 ], // 13
                  [ 35, 67 ], // 14
                  [ 28, 67 ], // 15
                  [ 21, 67 ], // 16
                  [ 21, 59 ], // 17
                  [ 21, 50 ], // 18
                  [ 21, 40 ], // 19
                  [ 21, 25 ], // 20
                  [ 21, 18 ], // 21
                 ],
            "F": [[ 46, 11 ], // 0
                  [ 31, 11 ], // 1 
                  [ 11, 11 ], // 2 
                  [ 11, 28 ], // 3
                  [ 11, 42 ], // 4
                  [ 41, 42 ], // 5
                  [ 41, 42 ], // 6
                  [ 11, 42 ], // 7
                  [ 11, 58 ], // 8
                  [ 11, 74 ], // 9
                  [ 19, 74 ], // 10
                  [ 19, 58 ], // 11
                  [ 19, 45 ], // 12
                  [ 31, 45 ], // 13
                  [ 45, 45 ], // 14
                  [ 45, 39 ], // 15
                  [ 31, 39 ], // 16
                  [ 19, 39 ], // 17
                  [ 19, 28 ], // 18
                  [ 19, 18 ], // 19
                  [ 31, 18 ], // 20
                  [ 46, 18 ], // 21
                 ],
            "I": [[ 32, 18 ], // 0
                  [ 47, 18 ], // 1 
                  [ 47, 11 ], // 2 
                  [  9, 11 ], // 3
                  [  9, 18 ], // 4
                  [ 24, 18 ], // 5
                  [ 24, 43 ], // 6
                  [ 24, 67 ], // 7
                  [  9, 67 ], // 8
                  [  9, 74 ], // 9
                  [ 47, 74 ], // 10
                  [ 47, 67 ], // 11
                  [ 32, 67 ], // 12
                  [ 32, 71 ], // 13
                  [ 24, 71 ], // 14
                  [ 32, 71 ], // 15
                  [ 32, 67 ], // 16
                  [ 32, 43 ], // 17
                  [ 32, 18 ], // 18
                  [ 32, 14 ], // 19
                  [ 24, 14 ], // 20
                  [ 32, 14 ], // 21
                 ],
            "U": [[ 14, 11 ], // 0
                  [  6, 11 ], // 1 
                  [  6, 58 ], // 2 
                  [  9, 67 ], // 3
                  [ 14, 72 ], // 4
                  [ 22, 75 ], // 5
                  [ 28, 75 ], // 6
                  [ 36, 74 ], // 7
                  [ 42, 71 ], // 8
                  [ 47, 65 ], // 9
                  [ 50, 57 ], // 10
                  [ 50, 11 ], // 11
                  [ 42, 11 ], // 12
                  [ 42, 57 ], // 13
                  [ 41, 62 ], // 14
                  [ 38, 65 ], // 15
                  [ 34, 68 ], // 16
                  [ 29, 69 ], // 17
                  [ 24, 69 ], // 18
                  [ 20, 67 ], // 19
                  [ 16, 63 ], // 20
                  [ 14, 58 ], // 21
                 ],
            "Q": [[ 55, 88 ], // 0
                  [ 51, 83 ], // 1 
                  [ 38, 85 ], // 2 
                  [ 31, 76 ], // 3
                  [ 47, 67 ], // 4
                  [ 53, 41 ], // 5
                  [ 46, 16 ], // 6
                  [ 29,  9 ], // 7
                  [ 10, 17 ], // 8
                  [  3, 47 ], // 9
                  [ 10, 68 ], // 10
                  [ 23, 76 ], // 11
                  [ 23, 68 ], // 12
                  [ 12, 52 ], // 13
                  [ 15, 24 ], // 14
                  [ 26, 16 ], // 15
                  [ 40, 22 ], // 16
                  [ 44, 47 ], // 17
                  [ 35, 67 ], // 18
                  [ 23, 68 ], // 19
                  [ 26, 85 ], // 20
                  [ 37, 92 ], // 21
                 ],
            "D": [[  6, 18 ], // 0
                  [  6, 11 ], // 1 
                  [ 30, 11 ], // 2 
                  [ 42, 16 ], // 3
                  [ 48, 23 ], // 4
                  [ 51, 36 ], // 5
                  [ 51, 47 ], // 6
                  [ 49, 59 ], // 7
                  [ 40, 70 ], // 8
                  [ 27, 74 ], // 9
                  [  6, 74 ], // 10
                  [  6, 18 ], // 11
                  [ 14, 18 ], // 12
                  [ 29, 18 ], // 13
                  [ 38, 23 ], // 14
                  [ 41, 28 ], // 15
                  [ 43, 35 ], // 16
                  [ 43, 44 ], // 17
                  [ 41, 55 ], // 18
                  [ 36, 63 ], // 19
                  [ 26, 67 ], // 20
                  [ 14, 67 ], // 21
                 ],
            "K": [[ 17, 11 ], // 0
                  [ 12, 39 ], // 1 
                  [ 17, 11 ], // 2 
                  [ 17, 25 ], // 3
                  [ 17, 39 ], // 4
                  [ 29, 25 ], // 5
                  [ 40, 11 ], // 6
                  [ 45, 11 ], // 7
                  [ 50, 11 ], // 8
                  [ 37, 27 ], // 9
                  [ 25, 41 ], // 10
                  [ 25, 41 ], // 11
                  [ 38, 57 ], // 12
                  [ 51, 74 ], // 13
                  [ 46, 74 ], // 14
                  [ 41, 74 ], // 15
                  [ 29, 59 ], // 16
                  [ 17, 44 ], // 17
                  [ 17, 59 ], // 18
                  [ 17, 74 ], // 19
                  [  8, 74 ], // 20
                  [  8, 11 ], // 21
                 ],
            "G": [[ 49, 20 ], // 0
                  [ 49, 13 ], // 1 
                  [ 41, 10 ], // 2 
                  [ 23, 11 ], // 3
                  [  9, 22 ], // 4
                  [  4, 42 ], // 5
                  [  8, 63 ], // 6
                  [ 19, 73 ], // 7
                  [ 35, 75 ], // 8
                  [ 50, 72 ], // 9
                  [ 50, 40 ], // 10
                  [ 29, 40 ], // 11
                  [ 29, 46 ], // 12
                  [ 42, 46 ], // 13
                  [ 42, 67 ], // 14
                  [ 35, 68 ], // 15
                  [ 23, 66 ], // 16
                  [ 15, 57 ], // 17
                  [ 12, 42 ], // 18
                  [ 17, 25 ], // 19
                  [ 28, 18 ], // 20
                  [ 40, 18 ], // 21
                 ],
            "V": [[ 10, 11 ], // 0
                  [  1, 11 ], // 1 
                  [  7, 30 ], // 2 
                  [ 12, 45 ], // 3
                  [ 17, 60 ], // 4
                  [ 22, 74 ], // 5
                  [ 33, 74 ], // 6
                  [ 39, 58 ], // 7
                  [ 44, 44 ], // 8
                  [ 48, 32 ], // 9
                  [ 52, 21 ], // 10
                  [ 55, 11 ], // 11
                  [ 46, 11 ], // 12
                  [ 43, 20 ], // 13
                  [ 40, 29 ], // 14
                  [ 36, 42 ], // 15
                  [ 32, 54 ], // 16
                  [ 28, 65 ], // 17
                  [ 28, 65 ], // 18
                  [ 25, 56 ], // 19
                  [ 21, 43 ], // 20
                  [ 16, 28 ], // 21
                 ],
            "R": [[ 18, 74 ], // 0
                  [  9, 74 ], // 1 
                  [  9, 11 ], // 2 
                  [ 32, 11 ], // 3
                  [ 42, 15 ], // 4
                  [ 46, 21 ], // 5
                  [ 46, 34 ], // 6
                  [ 43, 39 ], // 7
                  [ 35, 44 ], // 8
                  [ 40, 49 ], // 9
                  [ 45, 59 ], // 10
                  [ 52, 74 ], // 11
                  [ 42, 74 ], // 12
                  [ 31, 51 ], // 13
                  [ 25, 45 ], // 14
                  [ 18, 45 ], // 15
                  [ 18, 39 ], // 16
                  [ 29, 39 ], // 17
                  [ 38, 32 ], // 18
                  [ 38, 23 ], // 19
                  [ 31, 18 ], // 20
                  [ 17, 18 ], // 21
                 ],
            "X": [[ 12, 74 ], // 0
                  [  2, 74 ], // 1 
                  [ 13, 57 ], // 2 
                  [ 23, 42 ], // 3
                  [ 13, 27 ], // 4
                  [  3, 11 ], // 5
                  [  9, 11 ], // 6
                  [ 14, 11 ], // 7
                  [ 22, 24 ], // 8
                  [ 28, 34 ], // 9
                  [ 35, 23 ], // 10
                  [ 43, 11 ], // 11
                  [ 52, 11 ], // 12
                  [ 42, 27 ], // 13
                  [ 33, 41 ], // 14
                  [ 44, 58 ], // 15
                  [ 54, 74 ], // 16
                  [ 48, 74 ], // 17
                  [ 43, 74 ], // 18
                  [ 36, 62 ], // 19
                  [ 28, 49 ], // 20
                  [ 20, 61 ], // 21
                 ],
            "P": [[ 17, 74 ], // 0
                  [  8, 74 ], // 1 
                  [  8, 34 ], // 2 
                  [  8, 11 ], // 3
                  [ 33, 11 ], // 4
                  [ 42, 15 ], // 5
                  [ 49, 22 ], // 6
                  [ 50, 30 ], // 7
                  [ 47, 41 ], // 8
                  [ 39, 49 ], // 9
                  [ 30, 51 ], // 10
                  [ 17, 51 ], // 11
                  [ 17, 44 ], // 12
                  [ 31, 44 ], // 13
                  [ 36, 42 ], // 14
                  [ 40, 38 ], // 15
                  [ 41, 30 ], // 16
                  [ 40, 24 ], // 17
                  [ 37, 21 ], // 18
                  [ 32, 18 ], // 19
                  [ 17, 18 ], // 20
                  [ 17, 34 ], // 21
                 ],
            "E": [[ 45, 45 ], // 0
                  [ 45, 38 ], // 1 
                  [ 32, 38 ], // 2 
                  [ 19, 38 ], // 3
                  [ 19, 27 ], // 4
                  [ 19, 18 ], // 5
                  [ 32, 18 ], // 6
                  [ 46, 18 ], // 7
                  [ 46, 11 ], // 8
                  [ 30, 11 ], // 9
                  [ 11, 11 ], // 10
                  [ 11, 33 ], // 11
                  [ 11, 52 ], // 12
                  [ 11, 74 ], // 13
                  [ 31, 74 ], // 14
                  [ 46, 74 ], // 15
                  [ 46, 67 ], // 16
                  [ 33, 67 ], // 17
                  [ 19, 67 ], // 18
                  [ 19, 56 ], // 19
                  [ 19, 45 ], // 20
                  [ 32, 45 ], // 21
                 ],
            "H": [[ 50, 45 ], // 0
                  [ 50, 38 ], // 1 
                  [ 50, 24 ], // 2 
                  [ 50, 11 ], // 3
                  [ 42, 11 ], // 4
                  [ 42, 38 ], // 5
                  [ 29, 38 ], // 6
                  [ 14, 38 ], // 7
                  [ 14, 11 ], // 8
                  [  6, 11 ], // 9
                  [  6, 24 ], // 10
                  [  6, 38 ], // 11
                  [  6, 45 ], // 12
                  [  6, 59 ], // 13
                  [  6, 74 ], // 14
                  [ 14, 74 ], // 15
                  [ 14, 45 ], // 16
                  [ 29, 45 ], // 17
                  [ 42, 45 ], // 18
                  [ 42, 74 ], // 19
                  [ 50, 74 ], // 20
                  [ 50, 59 ], // 21
                 ],
            "N": [[ 38, 74 ], // 0
                  [ 49, 74 ], // 1 
                  [ 49, 55 ], // 2 
                  [ 49, 40 ], // 3
                  [ 49, 11 ], // 4
                  [ 45, 11 ], // 5
                  [ 42, 11 ], // 6
                  [ 42, 38 ], // 7
                  [ 42, 63 ], // 8
                  [ 36, 51 ], // 9
                  [ 30, 38 ], // 10
                  [ 18, 11 ], // 11
                  [  6, 11 ], // 12
                  [  6, 42 ], // 13
                  [  6, 57 ], // 14
                  [  6, 74 ], // 15
                  [ 10, 74 ], // 16
                  [ 14, 74 ], // 17
                  [ 14, 47 ], // 18
                  [ 14, 22 ], // 19
                  [ 25, 46 ], // 20
                  [ 32, 60 ], // 21
                 ],
            "W": [[ 31, 33 ], // 0
                  [ 25, 35 ], // 1 
                  [ 19, 51 ], // 2 
                  [ 14, 65 ], // 3
                  [ 12, 39 ], // 4
                  [ 11, 11 ], // 5
                  [  3, 11 ], // 6
                  [  5, 40 ], // 7
                  [  7, 74 ], // 8
                  [ 18, 74 ], // 9
                  [ 23, 59 ], // 10
                  [ 27, 46 ], // 11
                  [ 28, 46 ], // 12
                  [ 32, 58 ], // 13
                  [ 38, 74 ], // 14
                  [ 49, 74 ], // 15
                  [ 51, 40 ], // 16
                  [ 53, 11 ], // 17
                  [ 46, 11 ], // 18
                  [ 44, 39 ], // 19
                  [ 43, 65 ], // 20
                  [ 37, 50 ], // 21
                 ],
            "S": [[ 45, 19 ], // 0
                  [ 45, 12 ], // 1 
                  [ 25, 10 ], // 2 
                  [ 12, 15 ], // 3
                  [  6, 27 ], // 4
                  [ 12, 39 ], // 5
                  [ 28, 46 ], // 6
                  [ 40, 53 ], // 7
                  [ 40, 63 ], // 8
                  [ 33, 68 ], // 9
                  [ 19, 68 ], // 10
                  [  6, 66 ], // 11
                  [  6, 73 ], // 12
                  [ 25, 75 ], // 13
                  [ 40, 72 ], // 14
                  [ 48, 65 ], // 15
                  [ 48, 51 ], // 16
                  [ 39, 43 ], // 17
                  [ 19, 33 ], // 18
                  [ 15, 27 ], // 19
                  [ 20, 19 ], // 20
                  [ 31, 17 ], // 21
                 ],
            "Y": [[ 24, 74 ], // 0
                  [ 32, 74 ], // 1 
                  [ 32, 63 ], // 2 
                  [ 32, 52 ], // 3
                  [ 39, 40 ], // 4
                  [ 44, 31 ], // 5
                  [ 55, 11 ], // 6
                  [ 50, 11 ], // 7
                  [ 46, 11 ], // 8
                  [ 37, 27 ], // 9
                  [ 33, 35 ], // 10
                  [ 29, 42 ], // 11
                  [ 28, 42 ], // 12
                  [ 20, 27 ], // 13
                  [ 16, 20 ], // 14
                  [ 11, 11 ], // 15
                  [  6, 11 ], // 16
                  [  1, 11 ], // 17
                  [  7, 22 ], // 18
                  [ 12, 31 ], // 19
                  [ 24, 52 ], // 20
                  [ 24, 63 ], // 21
                 ],
            "?": [[ , ], // 0
                  [ , ], // 1 
                  [ , ], // 2 
                  [ , ], // 3
                  [ , ], // 4
                  [ , ], // 5
                  [ , ], // 6
                  [ , ], // 7
                  [ , ], // 8
                  [ , ], // 9
                  [ , ], // 10
                  [ , ], // 11
                  [ , ], // 12
                  [ , ], // 13
                  [ , ], // 14
                  [ , ], // 15
                  [ , ], // 16
                  [ , ], // 17
                  [ , ], // 18
                  [ , ], // 19
                  [ , ], // 20
                  [ , ], // 21
                 ],
        },
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
        hslFrom,
        hslTo,
        nfFrames,
        qq,
    }){
        const HUE = 0,
              SAT = 1,
              VAL = 2;
        const hsl = [ HUE, SAT, VAL ].map( j => {
            return this.constructor.linearStuff({
                nfFrames: nfFrames,
                colorFrom: hslFrom[ j ],
                colorTo: hslTo[ j ],
                qq: qq,
            });
        });
        const hue = hsl[ HUE ];
        const sat = hsl[ SAT ];
        const val = hsl[ VAL ];
        this.color = Array.from({ length: nfFrames }).map(( v, j ) => {
            return `hsl(${hue[ j ]},${sat[ j ]}%,${val[ j ]}%)`;
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
            hslFrom: [ 0, 0, 0 ],
            hslTo: [ 0, 0, 100 ],
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
        this.height = Math.max( heightFrom, heightTo ) + 3;
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
            }, this.delay[ PROLOGUE ]);
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
    }
////////////////////////////////////////////////////////////////
    render({ stringFrom, 
             stringTo, 
            offset, 
            nfFrames=10, 
            delay=[ 500, 200, 0 ],
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
                "delay": charFrom == charTo ? [ -1, -1, -1 ] : delay,
                "fgr": this.fgr,
                "bgr": this.bgr,
            });
            charmat.render();
            offset.add( this.inc );
        }
    }
}
export { Point, Alphabet, Charmat, Automat };
////////////////////////////////////////////////////////////////
// DOTO: - Redefine T points
//       - Go slow from fill to stroke and vice verca