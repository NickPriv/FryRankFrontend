import React from 'react';
import {createRoot} from 'react-dom/client';
import { PropTypes } from 'prop-types';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  MapCameraChangedEvent,
  Pin
} from '@vis.gl/react-google-maps';
import { FrySpinner } from '../../Common';

const propTypes = {
    restaurantIds: PropTypes.array.isRequired,
    currentRestaurants: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
}

const Map = ({ location, restaurantIds, currentRestaurants }) => {

    type Poi ={ key: string, location: google.maps.LatLngLiteral }
    const getLocations: Poi[] = (restaurantIds, currentRestaurants) => {
        console.log("Getting locaitons");
        console.log("restaurantIds: " + restaurantIds);
        console.log("Current restaurants: " + currentRestaurants);
        if (restaurantIds) {
            return restaurantIds.map(restaurantId => {
                return {
                    key: restaurantId,
                        location: {
                            lat: currentRestaurants.get(restaurantId).location.latitude,
                            lng: currentRestaurants.get(restaurantId).location.longitude
                        }
                };
            });
        } else {
            return [];
        }
    };

  const PoiMarkers = (props: {pois: Poi[]}) => {
    return (
      <>
        {props.pois.map( (poi: Poi) => (
          <AdvancedMarker
            key={poi.key}
            position={poi.location}>
          <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>
        ))}
      </>
    );
}

  const placesOfInterest = getLocations(restaurantIds, currentRestaurants);
  placesOfInterest.forEach(place => {
    console.log("place: " + place);
    console.log("place location " + place.location);
    console.log("place location longitude " + place.location.longitude);
  })

  return (
    <div>
        { !location || !restaurantIds || !currentRestaurants
            ? <FrySpinner />
            : <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
                <GoogleMap
                  style={{width: '100vw', height: '100vh'}}
                  defaultCenter={{lat: location?.latitude, lng: location?.longitude}}
                  defaultZoom={14}
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                  mapId={'ced49c98e3ab91a3'}
                  onCameraChanged={ (ev: MapCameraChangedEvent) =>
                      console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                  }>
                    <PoiMarkers pois={placesOfInterest} />
                </GoogleMap>
              </APIProvider>
        }
    </div>
  );
};

Map.propTypes = propTypes;

export default Map;