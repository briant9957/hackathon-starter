import logo from './logo.svg';
import './App.css';
import EventList from './eventList';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = "pk.eyJ1IjoicXVvdGVkb3RsYWQiLCJhIjoiY2t1OTVqMmJ1MDE2NDJycDR4MWhkODliOCJ9.lRkX5bD32vEYwa2Bs-6lew";

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
      });
    });

    useEffect(() => {
      if (!map.current) return; // wait for map to initialize
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });
      });

    return (
      <div style={{display: "flex"}}>
        <EventList />
        <div style={{flexGrow: 2}}>
          <div ref={mapContainer} className="map-container" />
        </div>
      </div>
      );
}

export default App;
