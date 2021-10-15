import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import '@reach/combobox/styles.css';

// Search Component
function SearchMap({ panTo }) {
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

export default SearchMap;
