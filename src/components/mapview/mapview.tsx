import React, { useEffect, useRef } from 'react';

import ControlPanel from './control-panel';

import MapController from '../../controllers/MapController';

import './mapview.scss';

const MapView = () => {
  // REFS
  const mapviewEl = useRef(null);

  useEffect(() => {
    MapController.initializeMap(mapviewEl);
  }, []);

  return (
    <div className='mapview-container'>
      <div className='mapview' ref={mapviewEl} />
      <ControlPanel />
    </div>
  );
};

export default MapView;
