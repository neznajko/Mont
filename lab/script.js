////////////////////////////////////////////////////////////////
console.log( "scrip4ing" );
////////////////////////////////////////////////////////////////
const THEHOBBIT = [
  "Vast expanses of salty blue waters stretch endlessly",
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
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
class Cruiser extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            level: 0,
            log: props.log, // antipattern, but log won't change
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
        return (
            <div className="cruiser">
                { 
                    this.state.log.map(( line, index ) => (
                        <Deck key={ index } payload={ line } />
                    ))
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
        <Cruiser log={ THEHOBBIT } />
    </React.StrictMode>,
    document.getElementById( 'root' )
);
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// log: in cruiser don't display the whole log define a number
// of lines to disply, define Deck's content depending on the
// current state level
