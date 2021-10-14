import React, { useState, useCallback, useRef } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';

import MapStyles from '../styles/MapStyle';

const libraries = ['places'];

// Map settings to props
const mapContainerStyle = {
  width: '80vw',
  height: '60vh',
};

const center = {
  lat: 4.6533326,
  lng: -74.083652,
};

const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

// Component
const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [newCases, setNewCases] = useState([]); // new covid cases
  const [selectedCase, setSelectedCase] = useState(null);

  const onMapClick = useCallback((e) => {
    setNewCases((current) => [...current, {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    },
    ]);
  }, []);

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading...';

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={11}
      center={center}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
    >
      {
        newCases.map((newCase) => (
          <Marker
            key={newCase.time.toISOString()}
            position={{ lat: newCase.lat, lng: newCase.lng }}
            onClick={() => (setSelectedCase(newCase))}
          />
        ))
      }
      {
        selectedCase
          ? (
            <InfoWindow
              position={{ lat: selectedCase.lat, lng: selectedCase.lng }}
              onCloseClick={() => (setSelectedCase(null))}
            >
              <div>
                <h3>New Covid Case</h3>
                <p>
                  {' '}
                  Reported:
                  {' '}
                  {formatRelative(selectedCase.time, new Date())}
                </p>
              </div>
            </InfoWindow>
          )
          : null
      }
    </GoogleMap>
  );
};

export default Map;
