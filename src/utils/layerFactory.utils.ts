import { loadModules } from 'esri-loader';
import { LayerType } from '../types/layer';

const layerFactory = async (layer: LayerType) => {
  const [FeatureLayer, ImageryLayer, MapImageLayer, VectorTileLayer] = await loadModules([
    'esri/layers/FeatureLayer',
    'esri/layers/ImageryLayer',
    'esri/layers/MapImageLayer',
    'esri/layers/VectorTileLayer',
  ]);

  let esriLayer = null;

  switch (layer.type) {
    case 'FeatureLayer':
      esriLayer = new FeatureLayer(layer.options);
      break;
    case 'ImageryLayer':
      esriLayer = new ImageryLayer(layer.options);
      break;
    case 'MapImageLayer':
      esriLayer = new MapImageLayer(layer.options);
      break;
    case 'VectorTileLayer':
      esriLayer = new VectorTileLayer(layer.options);
      break;
    default:
      console.warn('No matching layer type for layer', layer);
  }

  return esriLayer;
};

export default layerFactory;
