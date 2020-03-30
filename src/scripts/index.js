import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import TileImage from 'ol/source/TileImage';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import * as Interaction from 'ol/interaction';
import * as Control from 'ol/control';
import * as Coordinate from 'ol/coordinate';

import markerImage from '/img/marker.png';

window.onload = () => {
  const coords = fromLonLat([-0.1248085, 51.4998394]);

  // Popup element
  const popup = document.getElementById('map-popup');

  const popupOverlay = new Overlay({
    element: popup,
    position: coords,
  });

  const iconFeature = new Feature({
    geometry: new Point(coords),
    name: 'Office',
  });

  iconFeature.setStyle(
    new Style({
      image: new Icon({
        src: markerImage,
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: 0.15,
      }),
    }),
  );

  const map = new Map({
    target: 'map',
    // disables interactions
    interactions: Interaction.defaults({
      doubleClickZoom: false,
      dragAndDrop: false,
      dragPan: false,
      keyboardPan: false,
      keyboardZoom: false,
      mouseWheelZoom: false,
      pointer: false,
      select: false,
    }),
    controls: Control.defaults({
      attribution: false,
      zoom: false,
    }),
    layers: [
      // Custom 'toner' tiles
      new TileLayer({
        source: new TileImage({
          url: '//stamen-tiles-{a-d}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png ',
        }),
      }),
      // marker later
      new VectorLayer({
        source: new VectorSource({
          features: [iconFeature],
        }),
      }),
    ],
    // popup overlay
    overlays: [popupOverlay],
    view: new View({
      center: Coordinate.add({ ...coords }, [300, 100]),
      zoom: 16,
    }),
  });

  map.on('precompose', () =>
    document.getElementById('map').firstChild.setAttribute('hidden', ''),
  );

  map.on('rendercomplete', () => popup.setAttribute('data-shown', ''));
};
