import '../../styles/components/mapbox.css';
import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN;

function Mapbox(props) {
  const dispatch = useDispatch();
  const [locationData, setLocationData] = useState(props.locationData);
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
      style: import.meta.env.VITE_REACT_APP_MAPBOX_STYLE_LINK,
      center: [lng, lat],
      zoom: zoom,
    });

    setLocationData(props.locationData);

    // Add Markers to The Map
    if (props.dataType === 'jobs') {
      console.log('dataType = jobs');
      locationData.forEach((node) => {
        // 1: Set the HTML to place inside the popup
        const innerHtmlContent = `
          <div>
            <h2>Job Details</h2>
            <container>
            <p><span>Job Type:</span> ${node.jobType}</p>
            <p><span>Size:</span> ${node.jobSize}</p>
            <p><span>Address</span></p>
            <p>${node.Property.street}</p>
            <p>${node.Property.city}, ${node.Property.state} ${node.Property.zipcode}</p>
            <p>Rating: *****</p>
            </container>
          </div>
        `;

        // 2: create the HTMl container and the button
        const divElement = document.createElement('div');
        const assignBtn = document.createElement('div');
        assignBtn.innerHTML = `<button>Request Job</button>`;
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
      });
    } else if (props.dataType === 'workers') {
      console.log('dataType = workers');
      locationData.forEach((node) => {
        console.log('== Worker Node Data ==');
        console.log(node);

        // 1: Set the HTML to place inside the popup
        const innerHtmlContent = `
          <div>
            <h2>Worker Details</h2>
            <container>
              <p><span>Name:</span> ${node.firstName} ${node.lastName}</p>
              <p><span>Phone:</span> ${node.phone}</p>
              <p><span>Address:</span></p>
              <p>${node.street}</p>
              <p>${node.city}, ${node.state} ${node.zipcode}</p>
              <p><span>Rating:</span> *****</p>
            </container>
          </div>
        `;

        // 2: create the HTMl container and the button
        const divElement = document.createElement('div');
        const assignBtn = document.createElement('div');
        assignBtn.innerHTML = `<button>Request Service</button>`;
        // assignBtn.classList.add('btn');
        divElement.innerHTML = innerHtmlContent;
        divElement.appendChild(assignBtn);

        // 3: create the button event listener
        assignBtn.addEventListener('click', (e) => {
          dispatch({ type: 'REQUEST_WORKER' });
          dispatch({ type: 'SET_WORKER', payload: node });
        });

        // 4: Create the marker and add it to the map
        const marker1 = new mapboxgl.Marker()
          .setLngLat([node.coordinates[0], node.coordinates[1]])
          .setPopup(new mapboxgl.Popup().setDOMContent(divElement))
          .addTo(map.current);
      });
    }
  }, [locationData]);

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
      <div className='map__sidebar glass-1'>
        longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className='map' />
    </>
  );
}

export default Mapbox;
