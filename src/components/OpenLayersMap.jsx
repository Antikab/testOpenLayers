import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';

const OpenLayersMap = () => {
  const mapElement = useRef(null);

  const [olMap, setOlMap] = useState();

  const [clickedCoordinate, setClickedCoordinate] = useState(null);

  useEffect(() => {
    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [4185949.514884661, 7509230.716199554],
        zoom: 10,
      }),
    });

    map.on('click', e => {
      setClickedCoordinate(e.coordinate);
      console.log(e.coordinate);
    });

    setOlMap(map);

    return () => map.setTarget(undefined);
  }, []);

  return (
    <>
      <div ref={mapElement} className="map" />;
      {clickedCoordinate && (
        <span className="coordinates-container">
          You clicked at: {clickedCoordinate[0]} / {''}
          {clickedCoordinate[1]}
        </span>
      )}
    </>
  );
};

export default OpenLayersMap;
