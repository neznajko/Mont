////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
import './style.css'
import { Cruiser } from './Cruiser'
import React from 'react'
import ReactDOM from 'react-dom/client'
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
const LOGBOOK = [
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
ReactDOM.createRoot( document.getElementById( 'root' ))
        .render( <React.StrictMode> 
                   <Cruiser siz={ 7 }
                            logbook={ LOGBOOK } />
                 </React.StrictMode> );
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// log: put deck and copyNinja to a div container, and apply
// padding to it.
// change the directions of up and down keys
