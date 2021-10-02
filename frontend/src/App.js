import logo from './logo.svg';
import './App.css';
import EventList from './eventList';
import MarkerPopUp from './markerPopUp';
import Map from './map';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ReactDOM from "react-dom";



mapboxgl.accessToken = "pk.eyJ1IjoicXVvdGVkb3RsYWQiLCJhIjoiY2t1OTVqMmJ1MDE2NDJycDR4MWhkODliOCJ9.lRkX5bD32vEYwa2Bs-6lew";

function App() {
  const mapContainer = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))
  const map = useRef(null);
  const [lng, setLng] = useState(-96.8191214);
  const [lat, setLat] = useState(33.1005264);
  const [zoom, setZoom] = useState(9);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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

      map.current.on('load', () => {
        map.current.loadImage(
          'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
          (error, image) => {
            if (error) throw error;
            map.current.addImage('custom-marker', image);

            // Add geolocate control to the map.
            map.current.addControl(
              new mapboxgl.GeolocateControl({
                positionOptions: {
                enableHighAccuracy: true
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true
              })
            );
            
            map.current.addSource('points', {
              'type': 'geojson',
              'data': {
                'type': 'FeatureCollection',
                'features': [
                  {
                    'type': 'Feature',
                    'geometry': {
                      'type': 'Point',
                      'coordinates': [
                        -96.8707, 33.1874
                      ]
                    },
                    'properties': {
                      'title': 'Hooked On Fishing',
                      'description': 'Looking for small fishing group. Beginnings are welcome! Rods provided.'
                    }
                  }
                ]
              }
            });

            map.current.addLayer({
              'id': 'points',
              'type': 'symbol',
              'source': 'points',
              'layout': {
                'icon-image': 'custom-marker',
                // get the title name from the source's "title" property
                'text-field': ['get', 'title'],
                'text-font': [
                  'Open Sans Semibold',
                  'Arial Unicode MS Bold'
                ],
                'text-offset': [0, 1.25],
                'text-anchor': 'top'
              }
            })
          }
        )
      });

      map.current.on('click', ({ point }) => {
        const features = map.current.queryRenderedFeatures(point, {
          layers: ['points']
        });

        if (!features.length) {
          return;
        }

        const feature = features[0]
        const popUpNode = document.createElement("div");
        
        ReactDOM.render(
          <MarkerPopUp
            title={feature.properties.title}
            description={feature.properties.description}
          />,
          popUpNode
        )
        popUpRef.current
          .setLngLat(feature.geometry.coordinates)
          .setDOMContent(popUpNode)
          .addTo(map.current)
      });
    });

    return (
      // <div style={{display: "flex"}}>
        <div>
          <Grid container component={Paper}>
            <Grid item xs={4}>
              <Item>
                <EventList text="single-line item from prop"/>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <div ref={mapContainer} className="map-container" />
            </Grid>
          </Grid>
      </div>
      );
}

export default App;