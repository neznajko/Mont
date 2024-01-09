////////////////////////////////////////////////////////////////
import React, { useEffect, useRef } from 'react';
import { Charmat } from './Charmat';
import { Alphabet } from './Automat';
import { Point } from './Polygon';
////////////////////////////////////////////////////////////////
class Toyota {
    constructor( ctx ){
        ctx.fillStyle = "#500";
        this.ctx = ctx;
    }
    async animate( j, x, y ){
        if( j < 0 ){
            return;
        }
        await this.render( x, y );
        await this.animate( j - 1, x + 15, y + 8 );
    }
    render( x, y ){
        return new Promise( resolve => {
            console.log( x, y );
            this.ctx.fillRect( x, y, 20, 20 );
            setTimeout(() => {
                resolve( 'Ok' );
            }, 1000 );
        });
    }
}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function Mont() {
    const canvasRef = useRef(null);
    var canvas;
    var ctx;
    useEffect(() => {
        canvas = canvasRef.current;
        ctx = canvas.getContext( "2d" );
        canvas.addEventListener( 'click', handleClick );
        return () => {
            canvas.removeEventListener( 'click', handleClick );
        };
    }, []);
    const handleClick = e => {
        const font = "200px monospace";
        ctx.font = font;
        ctx.textBaseline = "top";
        const alphabet = Alphabet.getAlphabet( font );
        const charFrom = 'f';
        const charTo = 'g';
        const charmat = new Charmat({ 
            "alphabet": alphabet, 
            "charFrom": charFrom, 
            "charTo": charTo, 
            "offset": new Point( 50, 50 ), 
            "nfFrames": 5,
            "ctx": ctx,
            "delay": [ 150, 150 ],
            "fgr": "#a00",
            "bgr": "#500",
        });
        charmat.render(); 
    }
    return (
        <canvas className="Mont"
            ref={ canvasRef }
            width="250" height="400">
        </canvas>
    );
}
////////////////////////////////////////////////////////////////
export default Mont
////////////////////////////////////////////////////////////////
// log: 