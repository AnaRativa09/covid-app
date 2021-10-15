import React from 'react';

function LocateButton({ panTo }) {
  return (
    <button
      type="button"
      className="btn-custom btn-small"
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

export default LocateButton;
