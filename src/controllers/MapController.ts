import { setDefaultOptions, loadModules } from 'esri-loader';
import { RefObject } from 'react';

import store from './../store/store';
import { setMapLoaded, setLayerId } from '../store/slices/mapSlice';

import layerFactory from '../utils/layerFactory.utils';
import config from '../configs/config';

setDefaultOptions({ css: true, version: '4.18' });

/**
 * Controller used to manage anything map related.
 */
class MapController {
  #map?: __esri.Map;
  #mapview?: __esri.MapView;
  #mapLayers?: __esri.Layer[];
  #basemapGallery?: __esri.BasemapGallery | any;
  #scaleBar?: __esri.ScaleBar | any;
  clickedHighlight: __esri.Handle | null = null;
  clickedObjectID: undefined | number = undefined;
  firesLayerView: __esri.FeatureLayerView | null = null;

  /**
   * Initialize the MapView and Map
   * @param domRef - the dom element to render the map onto
   */
  initializeMap = async (domRef: RefObject<HTMLDivElement>) => {
    if (!domRef.current) {
      return;
    }

    const [Map, MapView, BasemapGallery, ScaleBar] = await loadModules(['esri/WebMap', 'esri/views/MapView', 'esri/widgets/BasemapGallery', 'esri/widgets/ScaleBar']);

    this.#map = new Map({
      basemap: 'gray',
    });

    this.#mapview = new MapView({
      map: this.#map,
      container: domRef.current,
      center: [-98.5795, 39.8283],
      constraints: {
        minScale: 25000000,
        maxScale: 10000,
      },
    });

    this.#basemapGallery = new BasemapGallery({ view: this.#mapview });
    this.#scaleBar = new ScaleBar({ view: this.#mapview });

    this.#mapview?.ui.move('zoom', 'top-right');
    this.#mapview?.ui.add(['control-panel'], 'top-right');
    this.#mapview?.ui.add(this.#basemapGallery, { position: 'top-right' });
    this.#mapview?.ui.add(this.#scaleBar, { position: 'bottom-right' });

    this.#mapview?.when(async () => {
      this.#mapLayers = [];

      for (let i: number = 0; i < config.layers.length; i++) {
        const layer = await layerFactory(config.layers[i]);
        if (layer) {
          this.#mapLayers.push(layer);
          this.#map?.add(layer);
        }
      }

      const firesLayer = this.#map?.findLayerById('us-fires') as __esri.FeatureLayer;
      this.#mapview?.whenLayerView(firesLayer)?.then((featureLayerView) => {
        this.firesLayerView = featureLayerView;
        store.dispatch(setLayerId(this.firesLayerView.layer.id));
      });
      store.dispatch(setMapLoaded(true));
    });
  };

  updateLayerVisibility = (id: string) => {
   if(id) {
      const firesLayer = this.#map?.findLayerById(id) as __esri.FeatureLayer;
      firesLayer.visible = !firesLayer.visible;
   }
    // DOCS that may help: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#visible
  };

  updateFeatureFilter = async (brightness: number, confidence: number) => {
    const [FeatureFilter] = await loadModules(['esri/views/layers/support/FeatureFilter']);

    if (this.firesLayerView) {
      this.firesLayerView.filter = new FeatureFilter({
        where: `brightness > ${brightness} AND percent_confidence > ${confidence}`,
      });
    }
  };

  get map() {
    return this.#map;
  }

  get mapView() {
    return this.#mapview;
  }

  get mapLayers() {
    return this.#mapLayers;
  }
}

const mapController = new MapController();

declare global {
  interface Window {
    mapController: typeof mapController;
  }
}

if (process.env.NODE_ENV === 'development') {
  window.mapController = mapController;
}

export default mapController;
