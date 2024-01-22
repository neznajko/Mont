////////////////////////////////////////////////////////////////
import React, { useLayoutEffect, useRef } from 'react'
import { Automat } from './Automat'
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function CopyNinjaKakashiSensei( ctx, copySelector ){
    const copyNinja = document.querySelector( copySelector );
    const box = copyNinja.getBoundingClientRect();
    const canvas = ctx.canvas;
    canvas.width = box.width;
    canvas.height = box.height;
    console.log( box );
    canvas.style.left = box.x + "px";
    canvas.style.top = box.y + "px";
////////////////////////////////////////////////////////////////
    const style = getComputedStyle( copyNinja );
    const offsetY = box.height - parseInt( style.fontSize );
    return {
        fontSize:        style.fontSize,
        font:            style.font,
        color:           style.color,
        backgroundColor: style.backgroundColor,
        offsetY:         offsetY,
        ninja:           copyNinja,
    };
////////////////////////////////////////////////////////////////
}
////////////////////////////////////////////////////////////////
function Mont( props ) {
    const canvasRef = useRef( null );
    var ninja;
    var chakura;
    var automat;
    const onKeyDown = e => {
        automat.setStrings( chakura, ninja.innerText );
        chakura = ninja.innerText;
    };
    useLayoutEffect(() => {
        const ctx = canvasRef.current.getContext( "2d" );
        const copy = CopyNinjaKakashiSensei( ctx, props.copySelector );
        ninja = copy.ninja;
        chakura = ninja.innerText;
        automat = new Automat({ 
            font: copy.font,
            ctx: ctx, 
            offset: [ 0, copy.offsetY ],
            nfFrames: 5,
            delay: [ 100, 100 ], 
            fgr: copy.color,
            bgr: copy.backgroundColor,
            chakura: chakura,
        });
        window.addEventListener( 'keydown', onKeyDown );
        return () => {
            window.removeEventListener( 'keydown', onKeyDown );
        };
    },[ props.copySelector ]);
    ////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
    return (
        <canvas className="Mont"
                ref={ canvasRef }
                width="800px"
                height="200px">
        </canvas>
    );
}
////////////////////////////////////////////////////////////////
export { Mont }
////////////////////////////////////////////////////////////////
// log:
