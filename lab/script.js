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
class Cruiser extends React.Component {
    constructor( props ){
        super( props );
        this.range = [ ...Array( props.size ).keys() ];
        this.log = props.log;
        this.state = {
            level: 0,
        }
    }
    onKeyDown = e => {
        if( e.key == "ArrowUp" ){
            this.setState({
                level: this.state.level + 1,
            });
        } else
        if( e.key == "ArrowDown" ){
            this.setState({
                level: this.state.level - 1,
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
    render() {
        const offset = this.state.level;
        return (
            <div className="cruiser">
            { 
                this.range.map( j => {
                    j = mod( j + offset, this.log.length );
                    return <Deck key={ j } 
                                 payload={ this.log[ j ]} />;
                })
            }
            </div>
        );
    }
}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
class Deck extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            current_payload: props.payload
        };
    }
    render() {
        return (
            <div className="deck">
                { this.state.current_payload }
            </div>
        );
    }
}
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
ReactDOM.render(
    <React.StrictMode>
        <Cruiser size={ 5 } log={ THEHOBBIT } />
    </React.StrictMode>,
    document.getElementById( 'root' )
);
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// log: - add copyNinjaKakashi class to the center deck
