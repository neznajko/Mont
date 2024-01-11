////////////////////////////////////////////////////////////////
console.log( "scrip4ing" );
////////////////////////////////////////////////////////////////
const THEHOBBIT = [
  "Vast expanses of blue waters stretch endlessly",
  "Waves crash, painting a rhythmic dance",
  "Mysteries lie deep, waiting to unveil",
  "Sunsets reflect, shimmering golden hues",
  "Creatures dwell, adapting to the depths",
  "Tides ebb and flow, shaping coastlines",
  "Storms brew, showcasing nature's raw power",
  "Oceans connect, bridging distant lands"
];
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
        this.className = props.className;
    }
    render() {
        return ( 
            <div className={ this.className }>
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
    }
    getInc( key ){
        if( key == "ArrowUp" ){
            return 1;
        }
        if( key == "ArrowDown" ){
            return -1;
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
        if( j == Math.floor( this.props.siz / 2 )){
            return "alt-deck";
        }
        return "deck";
    }
    payload( j ){
        j = mod( j + this.state.level, this.props.logbook.length );
        return this.props.logbook[ j ];
    }
    render() {
        return ( 
            [ ...Array( this.props.siz ).keys() ].map( j => {
                return <Deck key={ j }
                             className={ this.className( j )} 
                             payload={ this.payload( j )} />
            })
        );
    }
}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
ReactDOM.render(
    <React.StrictMode>
        <Cruiser siz={ 5 } logbook={ THEHOBBIT } />
    </React.StrictMode>,
    document.getElementById( 'root' )
);
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////