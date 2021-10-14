import React, { useState, useCallback, useRef } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import '@reach/combobox/styles.css';
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

// Map Component
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

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading...';

  return (
    <section className="map-container">
      <div className="flex-container">
        <Search panTo={panTo} />
        <LocateButton panTo={panTo} />
      </div>

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
              key={`${newCase.lat}-${newCase.lng}`}
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
    </section>
  );
};

// LocateButton Component
function LocateButton({ panTo }) {
  return (
    <button
      type="button"
      className="btn-small"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (positions) => {
            panTo({ lat: positions.coords.latitude, lng: positions.coords.longitude });
          },
          () => null,
        );
      }}
    >
      <i className="far fa-compass" />
    </button>
  );
}

// Search Component
function Search({ panTo }) {
  const {
    ready, value, suggestions: { status, data }, setValue, clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 4.6533326, lng: () => -74.083652 },
      radius: 200 * 1000,
    },
  });

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => { setValue(e.target.value); }}
        disable={!ready ? 1 : 0}
        placeholder="Search location"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' && data.map((place) => (
            <ComboboxOption
              key={place.place_id}
              value={place.description}
            />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

export default Map;
