import { useReducer, useContext, useEffect } from 'react';
import { Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { MapReducer } from './MapReducer';
import { PlacesContext } from '../';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];
    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(
        `<h6>${place.text_es}</h6>
          <p>${place.place_name_es}</p>`
      );

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker);

      dispatch({ type: 'setMarkers', payload: newMarkers });
    }
  }, [places]);

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup()
      // .setHTML(`<h4'>My Location</h4>
      // <p>Lat: ${map.getCenter().lat}</p>
      // <p>Lng: ${map.getCenter().lng}</p>`)
      .setHTML(
        `<div className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Mi ubicación</h5>
            </div>
            <div className="modal-body">
            <p>Lat: ${map.getCenter().lat}</p>
            <p>Lng: ${map.getCenter().lng}</p>
            </div>
          </div>
        </div>
      </div>`
      );

    new Marker({
      color: '#61DBFB',
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({
      type: 'setMap',
      payload: map,
    });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,

        // Methods
        setMap,
      }}>
      {children}
    </MapContext.Provider>
  );
};
