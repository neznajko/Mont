////////////////////////////////////////////////////////////////
console.log( "scrip4ing" );
////////////////////////////////////////////////////////////////
// const ocean_liner = document.querySelector( ".ocean-liner" );
////////////////////////////////////////////////////////////////
const payload = [
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
// for( const baggage of payload ){ 
//     const passenger = document.createElement( "div" );
//     passenger.textContent = baggage;
//     passenger.className = "passenger";
//     ocean_liner.appendChild( passenger );
// }
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
class NumberDiv extends React.Component {
    constructor( props ){
        super( props );
        // Initialize state with a number value of 0
        this.state = {
            number: 0
        };
        // Bind the handleClick method to the component's context
        this.handleClick = this.handleClick.bind( this );
    }
    // Method to handle the click event
    handleClick() {
        // Update the state by incrementing the number value
        this.setState( prevState => ({
            number: prevState.number + 1
        }));
    }
    render() {
        // Create a div element and assign an onClick event listener to it
        const divElement = React.createElement(
            'div',
            { onClick: this.handleClick },
            // Display the current number value within the div element
            this.state.number
        );
        // Return the created div element
        return divElement;
    }
}
// Render the NumberDiv component to the root element in the DOM
ReactDOM.render(
    React.createElement( NumberDiv ),
    document.getElementById( 'root' )
);
