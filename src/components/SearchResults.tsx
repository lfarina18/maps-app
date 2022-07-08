import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from '../context';
import { LoadingPLaces } from '.';
import { Feature } from '../interfaces/Places';


export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);

  const { map, getRouteBetweenPoints } = useContext(MapContext);

  const [activeId, setActiveId] = useState('');

  const onPlaceClicked = (place: Feature ) => {
    setActiveId(place.id);
    const [lng, lat] = place.center
    map?.flyTo({
      center: [lng, lat],
      zoom: 14,
    });
  
  }

  const getRoute = (place: Feature) => {
    if(!userLocation) return;
    const [lng, lat] = place.center;
   
    getRouteBetweenPoints(userLocation, [lng, lat]);
  }

  if (isLoadingPlaces) {
    return <LoadingPLaces />;
  }

  if(!places.length) {
    return <></>;
  }
  
  return (
    <ul className="list-group mt-3">
      {places.map((place) => (
        <li key={place.id} 
          className={`pointer list-group-item-action border border-light mb-2 bg-secondary p-2 text-dark  ${activeId === place.id ? 'bg-opacity-25' : 'bg-opacity-10'}`}
          onClick={() => onPlaceClicked(place)}
        >
          <h6>{place.text_es}</h6>
          <p style={{ fontSize: '12px' }}>
            {place.place_name}
          </p>
          <button 
          className={`btn btn-sm ${activeId === place.id ?  'btn-outline-primary' : 'btn-outline=dark' }`}
          onClick={() => getRoute(place)}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};
