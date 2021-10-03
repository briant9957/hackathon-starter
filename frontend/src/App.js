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
import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import { styled } from '@mui/material/styles';

import ReactDOM from "react-dom";


import backend from './api/backend';

mapboxgl.accessToken = "pk.eyJ1IjoicXVvdGVkb3RsYWQiLCJhIjoiY2t1OTVqMmJ1MDE2NDJycDR4MWhkODliOCJ9.lRkX5bD32vEYwa2Bs-6lew";

function App() {
  const useStyles = makeStyles(theme => ({
    button: {
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
  // const [numberRegistered, setNumberRegistered] = useState(0);
  const [mapBoxData, setMapBoxData] = useState({});

  const emptyEvent = {
    "title": "",
    "start": new Date(),
    "end": new Date(),
    "capacity": 5,
    "description": "This is going to be a fun DND event with your Dallas locals! Bring your own snacks",
    "location":  {
        "type": "Point",
        "coordinates":[-96.87071, 33.1873811]
    },
    "members":[]
  }

  const [eventName, setEventName] = useState(undefined);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [capacity, setCapacity] = useState(5);
  const [description, setDescription] = useState(undefined);
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();

  const submitNewEvent = () => {
    backend.post('/events', {
      data: {
        title: eventName,
        start: start.toUTCString,
        end: end.toUTCString,
        capacity: capacity,
        description: description,
        location: location,
        address: address,
        members:[]
      },
      headers: {'Access-Control-Allow-Origin': '*'}
    })
    .then(response => {
        console.log(response)
        setEvents(response.data);
        emptyCreateEventForm();
    })
  }

  const emptyCreateEventForm = () => {
    console.log(eventName)
    setEventName("")
    setStart(new Date())
    setEnd(new Date())
    setCapacity(5)
    setDescription("")
  }

  const changeStart = (datetime) => {
    setStart(datetime)
  }
  
  const changeEnd = (datetime) => {
    setEnd(datetime)
  }

  const changeEventName = (event) => {
    setEventName(event.target.value)
  }

  const changeCapacity = (event) => {
    setCapacity(event.target.value)
  }

  const changeDescription = (event) => {
    setDescription(event.target.value)
  }


  // Modal 
  const [open, setOpen] = React.useState(false);
  const openCreateModal = () => setOpen(true);
  const closeCreateModal = () => setOpen(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  var popUpNode = useRef(null);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    //padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));


  
  const getEvents = async (getRadius, getLongitude, getLatitude, getLimit) => {
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
        setEvents(response.data);

        const newFeatures = []

        for (let idx in response.data) {
          const mapBoxEvent = response.data[idx];
          const registeredCount = mapBoxEvent.memberNames ? mapBoxEvent.memberNames.length : 0
          newFeatures.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [
                mapBoxEvent.location.coordinates[0], mapBoxEvent.location.coordinates[1]
              ]
            },
            properties: {
              title: mapBoxEvent.title,
              description: mapBoxEvent.description,
              capacity: mapBoxEvent.capacity,
              numberRegistered: registeredCount
            }
          });
        }
    
        const updatedMapBoxData = {...mapBoxData};
        updatedMapBoxData.data.features = newFeatures;
        map.current.getSource("points").setData(updatedMapBoxData.data);
    
        for (const { geometry, properties } of updatedMapBoxData.data.features) {
          // create a HTML element for each feature
          const el = document.createElement('div');
          const popUp = document.createElement("div");

          ReactDOM.render(
            <MarkerPopUp
              title={properties.title}
              description={properties.description}
              numberRegistered={properties.numberRegistered}
              capacity={properties.capacity}
              mapBoxData={mapBoxData}
              setMapBoxData={setMapBoxData}
              mapBoxGLMap={map.current}
            />,
            popUp
          )
          el.className = 'marker';
        
          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
          .setLngLat(geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 15 })
              .setDOMContent(popUp)
          )
          .addTo(map.current);
        }
    })
  }

  const searchArea = () => {
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

  // useEffect(() => {
  //   if (!map.current || !popUpNode.current) return;
  //   console.log('changed data')
  //   map.current.getSource("points").setData(mapBoxData.data);
  //   popUpNode.current.querySelector('#capacity').innerText = mapBoxData.data.features[0].properties.capacity
  // }, [mapBoxData]);

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

        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl
        })
        map.current.addControl(geocoder, 'top-left');
        geocoder.on('result', function(ev) {
          setAddress(ev.result.place_name);
          setLocation(ev.result.geometry);
          setTimeout(function(){
            console.log("release search after 2 seconds");
            searchArea();
          }, 2000); 
        });

        map.current.on("result", (e) => {
          function getAddressByType(value, index, array) {
            if (value.id.match(/country.*/)) {
             console.log(value.text)
            } else if (value.id.match(/region.*/)) {
             console.log(value.text)
            } else if (value.id.match(/postcode.*/)) {
             console.log(value.text)
            } else if (value.id.match(/district.*/)) {
             console.log(value.text)
            } else if (value.id.match(/place.*/)) {
                console.log(value.text)
            } else if (value.id.match(/neighborhood.*/)) {
                  console.log(value.text)
            } else if (value.id.match(/address.*/)) {
                  console.log(value.text)
            } else if (value.id.match(/poi.*/)) {
             console.log(value.text)
            }
          }
          e.result.context.forEach(getAddressByType);
          console.log(JSON.stringify(e))
        });

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
                    // 'type': 'Feature',
                    // 'geometry': {
                    //   'type': 'Point',
                    //   'coordinates': [
                    //     -96.8707, 33.1874
                    //   ]
                    // },
                    // 'properties': {
                    //   'title': 'Hooked On Fishing',
                    //   'description': 'Looking for small fishing group. Beginnings are welcome! Rods provided.',
                    //   'capacity': '3',
                    //   'numberRegistered': '1'
                    // }
                  }
                ]
              }
            });

            map.current.addLayer({
              'id': 'points',
              'type': 'symbol',
              'source': 'points',
              'layout': {
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

      // map.current.on('click', ({ point }) => {
      //   const features = map.current.queryRenderedFeatures(point, {
      //     layers: ['points']
      //   });

      //   if (!features.length) {
      //     return;
      //   }

      //   const feature = features[0]
      //   popUpNode.current = document.createElement("div");

      //   ReactDOM.render(
      //     <MarkerPopUp
      //       title={feature.properties.title}
      //       description={feature.properties.description}
      //       capacity={feature.properties.capacity}
      //       mapBoxData={mapBoxData}
      //       setMapBoxData={setMapBoxData}
      //       mapBoxGLMap={map.current}
      //     />,
      //     popUpNode.current
      //   )
      //   popUpRef.current
      //     .setLngLat(feature.geometry.coordinates)
      //     .setDOMContent(popUpNode.current)
      //     .addTo(map.current)
      // });
    });

    return (
      <Grid container component={Paper} >
        <Modal
          open={open}
          onClose={closeCreateModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Create a new Event
                </Typography>
              </Grid>

              <Grid item>
                <Grid container
                  spacing={2} 
                  direction="column"
                  align='center'>
                  <Grid item>
                    <TextField
                      fullWidth
                      disabled
                      label="Address"
                      id="address"
                      value={address}
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                        fullWidth
                      label="Event Name"
                      id="eventName"
                      value={eventName}
                      onChange={changeEventName}
                      size="small"
                    />
                  </Grid>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item>
                      <DateTimePicker
                        fullWidth
                        label="Start Time"
                        value={start}
                        onChange={changeStart}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                    <Grid item>
                      <DateTimePicker
                        fullWidth
                        label="End Time"
                        value={end}
                        onChange={changeEnd}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                  </LocalizationProvider>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Capacity"
                      id="capacity"
                      value={capacity}
                      onChange={changeCapacity}
                      type='number'
                      size="small"
                    />
                  </Grid>
                  <Grid item align='left'>
                    <Typography id="modal-modal-title" variant="h6" component="h6">
                      Description
                    </Typography>
                    <TextareaAutosize
                      style={{ 
                        width: '100%',
                        minHeight: 200 
                      }}
                      label="Description"
                      id="description"
                      onChange={changeDescription}
                      value={description}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid container mt={2} spacing={1}>
                <Grid item>
                <Button className={classes.button} variant="outlined" onClick={emptyCreateEventForm} color="error">
                  Reset
                </Button>
                </Grid>
                <Grid item>
                <Button className={classes.button} variant="contained" onClick={submitNewEvent}>
                  Create
                </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>

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
              sx={{ borderBottom: 3 }}
              styles={{
                zIndex: 1000
              }}
              p="2vh">
                <Grid direction="column" container spacing={2} justify="center" align="center">
                  <Grid item>
                    <Button fullWidth className={classes.button} variant="outlined" onClick={openCreateModal} >
                      Create Event
                    </Button>
                  </Grid>
                  <Grid item>
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
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Button fullWidth className={classes.button} variant="contained" onClick={searchArea}>
                      search this area
                    </Button>
                  </Grid>
                </Grid>
            </Box>
            <Item>
              <EventList arrayList={events} text="single-line item from prop"/>
            </Item>
        </Box>
        <Grid item xs={8}>
          <div ref={mapContainer} className="map-container" />
        </Grid>
      </Grid>
    );
}

export default App;