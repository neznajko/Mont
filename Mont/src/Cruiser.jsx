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
            <div className={ this.props.className }>
                { this.props.payload }
            </div>
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
            level: 0,
        }
        this.copypos = Math.floor( this.props.siz / 2 );
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
    onKeyDown = e => {
        const inc = this.getInc( e.key );
        if( inc ){
            this.setState( state => {
                return {
                    level: state.level + inc,
                };
            });
        } 
    }
    componentDidMount() {
        document.addEventListener
                 ( 'keydown', this.onKeyDown );
    }
    componentWillUnmount() {
        document.removeEventListener
                 ( 'keydown', this.onKeyDown );
    }
    className( j ){
        return j == this.copypos ? "CopyNinjaKakashi" : "deck";
    }
    payload( j ){
        j = mod( j + this.state.level, this.props.logbook.length );
        return this.props.logbook[ j ];
    }
    render() {
        return ( 
            <>
	    <div class="cruiser">
            {[ ...Array( this.props.siz ).keys() ].map( j => {
                return <Deck key={ j }
                             className={ this.className( j )} 
                             payload={ this.payload( j )} />
            })}
            <Mont copySelector=".CopyNinjaKakashi" />
	    </div>
            </>
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
