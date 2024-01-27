////////////////////////////////////////////////////////////////
import { Mont } from './Mont'
import React from 'react'
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function mod( n, m ){
    return(( n % m ) + m ) % m;
}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
class Deck extends React.Component {
    constructor( props ){
        super( props );
    }
    render() {
        return (
            <>
            <div id={ this.props.id }
                 className="deck">
                { this.props.payload }
            </div>
            <Mont copySelector={ this.props.id } />
            </>
        );
    }
}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
class Cruiser extends React.Component {
   constructor( props ){
       super( props );
       this.state = {
           page_number: 0,
       }
       const logbook = this.props.logbook
       this.nof_pages = logbook.length;
       this.siz = logbook[ 0 ].length;
    }
    getInc( key ){
        if( key == "ArrowUp" ){
            return -1;
        }
        if( key == "ArrowDown" ){
            return +1;
        }
        return 0;
    }
    setCanvasesDisplay( display_value ){
        const canvases = document.getElementsByTagName( "canvas" );
        for( let j = 0; j < canvases.length; ++j ){
            canvases[j].style.display = display_value;
        }
    }
    onKeyDown = e => {
        this.setCanvasesDisplay( "block" ); 
        setTimeout( () => {
            this.setCanvasesDisplay( "none" ); 
        }, 2000 );
        const inc = this.getInc( e.key );
        if( inc ){
            this.setState( state => {
                const n = state.page_number + inc;
                const m = this.nof_pages;
                return {
                    page_number: mod( n, m ),
                };
            });
        } 
    }
////////////////////////////////////////////////////////////////
    componentDidMount() {
        document.addEventListener( 'keydown', this.onKeyDown );
    }
    componentWillUnmount() {
        document.removeEventListener( 'keydown',
                                      this.onKeyDown );
    }
    getCurrentPage() {
        return this.props.logbook[ this.state.page_number ];
    }
    payload( j ){
        const page = this.getCurrentPage();
        return ( j < page.length ) ? page[ j ] : "";
    }
    render() {
        return ( 
            [ ...Array( this.siz ).keys() ].map( j => {
                return <Deck key={ j }
                             id={ j }
                             payload={ this.payload( j )} />
            })
        );
    }
}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
export { Cruiser }
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
