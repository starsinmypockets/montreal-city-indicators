import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import Plot from 'react-plotly.js';

function PlotBox({data, layout, title}) {
  return (
    <div className="md:w-1/3 lg:w-1/4 bg-gray-300 h-14">
      <div className="bg-gray-500 h-8 mb-4">
        <p className="text-lg">{title}</p>
      </div>
      <div className="m-4">
        <Plot data={data} layout={layout} responseive={true} />
      </div>
    </div>
  );
}

function App() {
  let [trips, setTrips] = useState([]);
  let [parks, setParks] = useState([]);

  axios
    .get('https://datahub.io/starsinmypockets/montreal-kpis/r/parks.json')
    .then(res => {
      console.log(res);
      setParks(res.data);
    })
    .catch(e => {
      console.log(e);
    });

  axios
    .get('https://datahub.io/starsinmypockets/montreal-kpis/r/trips.json')
    .then(res => {
      console.log(res);
      setTrips(res.data);
    })
    .catch(e => {
      console.log(e);
    });
  return (
    <div className="App">
      <header className="bg-gray-500 center p-2 h-10 mb-12">
        <h2>City of Montreal</h2>
      </header>
      <div className="flex flex-wrap m-6">
        <PlotBox
          data={[
            {
              x: trips.map(row => row.DateDonnee),
              y: trips.map(row => row.Valeur),
              type: 'bar',
            },
          ]}
          layout={{width: '50%', height: '50%'}}
          title="Yearly Public Transit Trips per Capita"
        />
        <PlotBox
          data={[
            {
              x: parks.map(row => row.DateDonnee),
              y: parks.map(row => row.Valeur),
              type: 'line',
            },
          ]}
          layout={{width: '50%', height: '50%'}}
          title='Coûts d’exploitation relatifs aux parcs par hectare'
        />
        <PlotBox
          data={[
            {
              x: trips.map(row => row.DateDonnee),
              y: trips.map(row => row.Valeur),
              type: 'bar',
            },
          ]}
          layout={{width: '50%', height: '50%'}}
          title='Yearly Public Transit Trips per Capita'
        />
        <PlotBox
          data={[
            {
              x: trips.map(row => row.DateDonnee),
              y: trips.map(row => row.Valeur),
              type: 'bar',
            },
          ]}
          layout={{width: '50%', height: '50%'}}
          title='Yearly Public Transit Trips per Capita'
        />
        <PlotBox
          data={[
            {
              x: trips.map(row => row.DateDonnee),
              y: trips.map(row => row.Valeur),
              type: 'bar',
            },
          ]}
          layout={{width: '50%', height: '50%'}}
          title='Yearly Public Transit Trips per Capita'
        />
      </div>
    </div>
  );
}

export default App;
