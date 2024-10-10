import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Map as GoogleMap,
  AdvancedMarker,
  InfoWindow,
  Pin,
  useMap
} from '@vis.gl/react-google-maps';
import { FrySpinner } from '../../Common';

const propTypes = {
    restaurantIds: PropTypes.array.isRequired,
    currentRestaurants: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
}

const Map = ({ location, restaurantIds, currentRestaurants }) => {

    const map = useMap();

    type Poi ={ key: string, location: google.maps.LatLngLiteral }
    const getLocations: Poi[] = (restaurantIds, currentRestaurants) => {
        if (restaurantIds) {
            return restaurantIds.map(restaurantId => {
                return {
                    key: restaurantId,
                    location: {
                        lat: currentRestaurants.get(restaurantId).location.latitude,
                        lng: currentRestaurants.get(restaurantId).location.longitude
                    },
                    name: currentRestaurants.get(restaurantId).name
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
            position={poi.location}
            onClick={() => console.log("clicked")}>
          <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>
        ))}
      </>
    );
}


  const placesOfInterest = getLocations(restaurantIds, currentRestaurants);

  const fieldOfView = () => {
      const bounds = new google.maps.LatLngBounds();
      placesOfInterest.forEach(place => {
          bounds.extend({
              lat: place.location.lat,
              lng: place.location.lng
          });
      });
      map && map.fitBounds(bounds);

      return bounds.getCenter();
  }

  return (
    <div>
        { !location || !restaurantIds || !currentRestaurants
            ? <FrySpinner />
            : <GoogleMap
                className='google-map'
                defaultCenter={{lat: location?.latitude, lng: location?.longitude}}
                center={fieldOfView().averageLocation}
                gestureHandling={'none'}
                disableDefaultUI={true}
                mapId={'ced49c98e3ab91a3'}>
                    <PoiMarkers pois={placesOfInterest} />
            </GoogleMap>
        }
    </div>
  );
};

Map.propTypes = propTypes;

export default Map;