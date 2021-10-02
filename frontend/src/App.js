import logo from './logo.svg';
import './App.css';
import EventList from './eventList';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import * as turf from "@turf/turf";

import backend from './api/backend';

mapboxgl.accessToken = "pk.eyJ1IjoicXVvdGVkb3RsYWQiLCJhIjoiY2t1OTVqMmJ1MDE2NDJycDR4MWhkODliOCJ9.lRkX5bD32vEYwa2Bs-6lew";

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-96.8191214);
  const [lat, setLat] = useState(33.1005264);
  const [zoom, setZoom] = useState(8);
  const [radius, setRadius] = useState(5.0);
  const [events, setEvents] = useState();

  var options = { steps: 100, units: "miles", properties: { foo: "bar" } };
  var center = [lng, lat];
  var circle = turf.circle(center, radius, options);
  

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  
  const getEvents = async (getRadius, getLongitude, getLatitude, getLimit) => {
    await backend.get('/events-nearby', {
      params: {
        radius: getRadius,
        longitude: getLongitude,
        latitude: getLatitude,
        limit: getLimit
      },
      headers: {'Access-Control-Allow-Origin': '*'}
    })
    .then(response => {
        console.log(response);
        setEvents(response.data);
    })
  }

  const searchArea = () => {
    console.log(lng);
    console.log(lat);
    if (lng && lat) {
      if (map.current.getLayer('radiusCircle')){
        map.current.removeLayer('radiusCircle');
        map.current.removeSource('focusRadius');
      }
      map.current.addSource('focusRadius', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: {
          "type": "FeatureCollection",
          "crs": {
            "type": "name",
            "properties": {
              "name": "focusRadius"
            }
          },
          "features": [{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [lng, lat]
            }
          }]
        }
      });

 
      map.current.addLayer({
          'id': 'radiusCircle',
          'source': 'focusRadius',
          'type': 'circle',
          'paint': {
            'circle-radius': radius,
            'circle-color': '#007cbf'
          }
        });
    }
    getEvents(radius, lng, lat, 20);
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
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
                        -70.9, 42.35
                      ]
                    },
                    'properties': {
                      'title': 'Mapbox DC'
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
    });

    return (
      // <div style={{display: "flex"}}>
        <div>
          <Button variant="contained" onClick={() => searchArea()}>search this area</Button>
          <Grid container component={Paper}>
            <Grid item xs={4}>
              <Item>
                <EventList />
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
