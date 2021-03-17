export interface LayerType {
  type: string;
  options: {
    visible: boolean;
    id: string;
    title: string;
    url: string;
    outFields: Array<string>;
    popupTemplate: {
      title: Function;
      content: string;
    };
  };
}
