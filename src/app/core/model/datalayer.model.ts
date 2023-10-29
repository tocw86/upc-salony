export interface DataLayerParams {
  event: string;
  value: {
    event: string;
    eventCategory: string;
    eventAction: string;
    eventLabel: string;
    nonInteraction: boolean;
  };
}
