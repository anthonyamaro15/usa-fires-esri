import { LayerType } from '../types/layer';

export const layers: Array<LayerType> = [
  {
    type: 'FeatureLayer',
    options: {
      url: 'https://services.arcgis.com/EDxZDh4HqQ1a9KvA/arcgis/rest/services/Fires_Mock_Layer/FeatureServer/0',
      id: 'us-fires',
      title: 'US Fires',
      visible: true,
      outFields: ['*'],
      popupTemplate: {
        title: (e: any) => {
          return new Date(e.graphic.attributes.date).toLocaleDateString();
        },
        content: `
          <div>Confidence: {percent_confidence}%</div>
          <div>Brightness: {brightness}</div>
        `,
      },
    },
  },
];
