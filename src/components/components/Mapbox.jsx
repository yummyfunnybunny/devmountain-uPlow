import '../../styles/components/mapbox.css';
import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN;
//'pk.eyJ1IjoieXVtbXlmdW5ueWJ1bm55IiwiYSI6ImNrODZwNzQydDA1bjEzZW15NTRqa2NpdnEifQ.6y8NFU2qjw6mTgINZYaRyg';

function Mapbox(props) {
  const dispatch = useDispatch();
  const reduxShowPopup = useSelector((state) => state.mapboxPopupReducer.show);
  // const { dataType, locationData } = props;
  // console.log(props.locationData);
  const [locationData, setLocationData] = useState(props.locationData);
  console.log(locationData);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-111.8746681);
  const [lat, setLat] = useState(40.4194344);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    // 1. Initializes the Mapbox
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // style: 'mapbox://styles/mapbox/streets-v12',
      // style: 'mapbox://styles/yummyfunnybunny/ckm6hzvef23mr17pog9zp7hhk',
      // style: process.env.REACT_APP_MAPBOX_STYLE_LINK,
      style: import.meta.env.VITE_REACT_APP_MAPBOX_STYLE_LINK,
      center: [lng, lat],
      zoom: zoom,
    });

    setLocationData(props.locationData);
    console.log('== mapbox data type ==');
    console.log(props.dataType);

    // Add Markers to The Map
    if (props.dataType === 'jobs') {
      console.log('dataType = jobs');
      locationData.forEach((node) => {
        console.log('== Job Node Data ==');
        console.log(node);

        // 1: Set the HTML to place inside the popup
        const innerHtmlContent = `
          <div class='map_popup'>
            <h2>Details</h2>
            <p>Job Type: ${node.jobType}</p>
            <p>Size: ${node.jobSize}</p>
            <h4>Address</h4>
            <p>${node.Property.street}</p>
            <p>${node.Property.city}, ${node.Property.state} ${node.Property.zipcode}</p>
            <p>Rating: *****</p>
          </div>
        `;

        // 2: create the HTMl container and the button
        const divElement = document.createElement('div');
        const assignBtn = document.createElement('div');
        assignBtn.innerHTML = `<button class='test_map_btn'>Request Job</button>`;
        divElement.innerHTML = innerHtmlContent;
        divElement.appendChild(assignBtn);

        // 3: create the button event listener
        assignBtn.addEventListener('click', (e) => {
          console.log('Send Request Job Alert');
          console.log(node);
          dispatch({ type: 'REQUEST_JOB' });
          dispatch({ type: 'SET_JOB', payload: node });
        });

        // 4: Create the marker and add it to the map
        const marker1 = new mapboxgl.Marker()
          .setLngLat([node.coordinates[0], node.coordinates[1]])
          .setPopup(new mapboxgl.Popup().setDOMContent(divElement))
          .addTo(map.current);

        // const marker1 = new mapboxgl.Marker()
        //   .setLngLat([node.coordinates[0], node.coordinates[1]])
        //   .setPopup(
        //     new mapboxgl.Popup().setHTML(`
        //   <div className="popup__img">
        //   <img src='https://picsum.photos/200' />
        //   </div>
        //   <h4>Job Type:</h4>
        //   <p>${node.jobType}</p>
        //   <h4>Job Size:</h4>
        //   <p>${node.jobSize}</p>
        //   <h4>Instructions:</h4>
        //   <p>- ${node.instructions[0]}</p>
        //   <p>- ${node.instructions[1]}</p>
        //   <p>- ${node.instructions[2]}</p>
        //   <button>Request Service</button>
        //   `)
        //   )
        //   .addTo(map.current);
      });
    } else if (props.dataType === 'workers') {
      console.log('dataType = workers');
      locationData.forEach((node) => {
        console.log('== Worker Node Data ==');
        console.log(node);

        // 1: Set the HTML to place inside the popup
        const innerHtmlContent = `
          <div class='map_popup'>
            <h2>Details</h2>
            <p>Name: ${node.firstName} ${node.lastName}</p>
            <p>Phone: ${node.phone}</p>
            <p>Address: ${node.address}</p>
            <p>Rating: *****</p>
          </div>
        `;

        // 2: create the HTMl container and the button
        const divElement = document.createElement('div');
        const assignBtn = document.createElement('div');
        assignBtn.innerHTML = `<button class='test_map_btn'>Request Service</button>`;
        divElement.innerHTML = innerHtmlContent;
        divElement.appendChild(assignBtn);

        // 3: create the button event listener
        assignBtn.addEventListener('click', (e) => {
          console.log('Send Request Service Alert');
          console.log(node);
          dispatch({ type: 'REQUEST_WORKER' });
          dispatch({ type: 'SET_WORKER', payload: node });
        });

        // const popup = new mapboxgl.Popup().setDOMContent(divElement);

        // 4: Create the marker and add it to the map
        const marker1 = new mapboxgl.Marker()
          .setLngLat([node.coordinates[0], node.coordinates[1]])
          .setPopup(new mapboxgl.Popup().setDOMContent(divElement))
          .addTo(map.current);

        // marker1.getElement().addEventListener('click', () => {
        //   console.log('blahblahblah');
        //   if (!reduxShowPopup) {
        //     dispatch({ type: 'SHOW_POPUP' });
        //   } else {
        //     dispatch({ type: 'HIDE_POPUP' });
        //   }
        // });
      });
    }
  }, [locationData]);

  // const submitRequest = () => {
  //   console.log('blahblahblah');
  // };

  // Update the lng, lat, zoom states
  if (map.current) {
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }

  return (
    <>
      {/* Display Coordinates In Sidebar */}
      <div className='sidebar'>
        longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className='map-container' />
    </>
  );
}

export default Mapbox;
