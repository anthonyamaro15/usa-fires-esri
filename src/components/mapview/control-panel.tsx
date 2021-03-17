import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import MapController from '../../controllers/MapController';
import { 
   mapLoaded as mapLoadedSelector, 
   layerId as layerIdSelector 
} from './../../store/slices/mapSlice';


const ControlPanel = () => {
  // LOCAL STATE
  const [brightnessValue, setBrightnessValue] = useState<number>(0);
  const [confidenceValue, setConfidenceValue] = useState<number>(0);
  const [usaFires, setUsaFires] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const mapLoaded = useSelector(mapLoadedSelector);
  const layerId = useSelector(layerIdSelector);

  useEffect(() => {
    if (mapLoaded) {
      MapController.updateFeatureFilter(brightnessValue, confidenceValue);
      
    }
  }, [brightnessValue, confidenceValue, mapLoaded]);

  useEffect(() => {
     MapController.updateLayerVisibility(usaFires);
  },[isChecked])

  const toggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
     setIsChecked(e.target.checked);
     setUsaFires(e.target.value);
  }

  return (
    <div className='control-panel' id='control-panel'>
      <div className='control-container'>
        <p>Brightness Greater Than {brightnessValue}</p>
        <input
          type='range'
          min='0'
          max='11'
          step='0.1'
          value={brightnessValue}
          id='brightnessRange'
          onChange={(e) => setBrightnessValue(e.target.valueAsNumber)}
        />
      </div>
      <div className='control-container'>
        <p>Confidence Greater Than {confidenceValue}</p>
        <input
          type='range'
          min='0'
          max='100'
          value={confidenceValue}
          id='confidenceRange'
          onChange={(e) => setConfidenceValue(e.target.valueAsNumber)}
        />
      </div>
      <div className="control-container">
         <p>US Fires</p>
         <input 
            type="checkbox"
            id="usaFires"
            value={layerId}
            defaultChecked={isChecked}
            onChange={toggleCheckbox}
         />
      </div>
    </div>
  );
};

export default ControlPanel;
