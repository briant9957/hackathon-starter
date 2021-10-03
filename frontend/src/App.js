import logo from './logo.svg';
import './App.css';
import EventList from './eventList';
import MarkerPopUp from './markerPopUp';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import ReactDOM from "react-dom";


import backend from './api/backend';

mapboxgl.accessToken = "pk.eyJ1IjoicXVvdGVkb3RsYWQiLCJhIjoiY2t1OTVqMmJ1MDE2NDJycDR4MWhkODliOCJ9.lRkX5bD32vEYwa2Bs-6lew";

function App() {
  const useStyles = makeStyles(theme => ({
    button: {
      display: 'flex',
      justify: 'center',
      margin: '5px'
    },
  }));  

  const classes = useStyles();

  const mapContainer = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))
  const map = useRef(null);
  const [lng, setLng] = useState(-96.8191214);
  const [lat, setLat] = useState(33.1005264);
  const [zoom, setZoom] = useState(8);
  const [radius, setRadius] = useState(10.0);
  const [events, setEvents] = useState([]);
  const [numberRegistered, setNumberRegistered] = useState(0);
  const [mapBoxData, setMapBoxData] = useState({});
  var popUpNode = useRef(null);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    //padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));


  
  const getEvents = (getRadius, getLongitude, getLatitude, getLimit) => {
    backend.get('/events-nearby', {
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
        setEvents(...events, response.data);
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

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  useEffect(() => {
    console.log('events changed');
  }, [events]);

  useEffect(() => {
    if (!map.current || !popUpNode.current) return;
    console.log('changed data')
    map.current.getSource("points").setData(mapBoxData.data);
    popUpNode.current.querySelector('#capacity').innerText = mapBoxData.data.features[0].properties.capacity
  }, [mapBoxData]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
        attributionControl: false
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
        // Add the control to the map.
        map.current.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
          }), 'top-left'
        );

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

        // Add zoom and rotation controls to the map.
        map.current.addControl(new mapboxgl.NavigationControl());
        
        map.current.loadImage(
          'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
          (error, image) => {
            if (error) throw error;
            map.current.addImage('custom-marker', image);
            
            setMapBoxData({
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
                      'description': 'Looking for small fishing group. Beginnings are welcome! Rods provided.',
                      'capacity': '3',
                      'numberRegistered': '1'
                    }
                  }
                ]
              }
            })

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
                      'description': 'Looking for small fishing group. Beginnings are welcome! Rods provided.',
                      'capacity': '3',
                      'numberRegistered': '1'
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
        popUpNode.current = document.createElement("div");

        ReactDOM.render(
          <MarkerPopUp
            title={feature.properties.title}
            description={feature.properties.description}
            capacity={feature.properties.capacity}
            mapBoxData={mapBoxData}
            setMapBoxData={setMapBoxData}
            mapBoxGLMap={map.current}
          />,
          popUpNode.current
        )
        popUpRef.current
          .setLngLat(feature.geometry.coordinates)
          .setDOMContent(popUpNode.current)
          .addTo(map.current)
      });
    });

    return (
      <Grid container component={Paper} >
        <Box item justify="center" xs={4} 
              component={Grid}
              sx={{ 
                boxShadow: 3,
                zIndex: "drawer"
              }}
              >
            <Box item 
              className="SearchFormGrid"
              align="center"
              component={Grid}
              styles={{
                zIndex: 1000
              }}
              p="2vh">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Radius</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={radius}
                  label="Radius"
                  onChange={handleRadiusChange}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
                <br/>
                <Button className={classes.button} variant="contained" onClick={searchArea}>
                  search this area
                </Button>
              </FormControl>
            </Box>
            <Item>
              <EventList text="single-line item from prop"/>
            </Item>
        </Box>
        <Grid item xs={8}>
          <div ref={mapContainer} className="map-container" />
        </Grid>
      </Grid>
    );
}

export default App;