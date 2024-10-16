import React, { useCallback } from 'react';
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
    showInfoWindow: PropTypes.bool.isRequired,
    setShowInfoWindow: PropTypes.func.isRequired,
    setInfoWindowProps: PropTypes.func.isRequired,
    infoWindowProps: PropTypes.func.isRequired,
    aggregateReviewsData: PropTypes.object.isRequired,
}

const Map = ({ location, restaurantIds, currentRestaurants, showInfoWindow, setShowInfoWindow, setInfoWindowProps, infoWindowProps, aggregateReviewsData }) => {

    const map = useMap();

    console.log("aggregateReviewsData: " + JSON.stringify(aggregateReviewsData));

    type Poi ={ key: string, location: google.maps.LatLngLiteral }
    const getLocations: Poi[] = (restaurantIds, currentRestaurants) => {
        if (restaurantIds) {
            return restaurantIds.map(restaurantId => {
                console.log(aggregateReviewsData[restaurantId]);
                return {
                    key: restaurantId,
                    location: {
                        lat: currentRestaurants.get(restaurantId).location.latitude,
                        lng: currentRestaurants.get(restaurantId).location.longitude
                    },
                    name: currentRestaurants.get(restaurantId).displayName.text,
                    address: currentRestaurants.get(restaurantId).formattedAddress,
                    score: aggregateReviewsData[restaurantId]?.avgScore
                };
            });
        } else {
            return [];
        }
    };

const handleMarkerClick = useCallback(
      () => setShowInfoWindow(isShown => !isShown),
      []
    );


    const PoiMarkers = ({ pois, setShowInfoWindow }) => {
        return (
          <>
            {pois.map( (poi: Poi) => (
              <AdvancedMarker
                key={poi.key}
                position={poi.location}
                onClick={() => {
                    setShowInfoWindow(true);
                    setInfoWindowProps({
                       name: poi.name,
                       location: poi.location,
                       address: poi.address,
                       score: poi.score
                    });
                }}>>
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

  const handleClose = useCallback(() => setShowInfoWindow(false), []);


  console.log("showInfoWindow is " + showInfoWindow);

  return (
    <div>
        { !location || !restaurantIds || !currentRestaurants
            ? <FrySpinner />
            : <>
                <GoogleMap
                    className='google-map'
                    defaultCenter={{lat: location?.latitude, lng: location?.longitude}}
                    center={fieldOfView().averageLocation}
                    gestureHandling={'cooperative'}
                    disableDefaultUI={true}
                    mapId={'ced49c98e3ab91a3'}>
                        <PoiMarkers
                            pois = {placesOfInterest}
                            setShowInfoWindow = {setShowInfoWindow}
                        />
                </GoogleMap>
                {showInfoWindow &&
                    <InfoWindow
                        position={{ lat: infoWindowProps?.location.lat + .005, lng: infoWindowProps?.location.lng }}
                        onClose={handleClose}
                    >
                        <h6>{infoWindowProps?.name}</h6>
                        {infoWindowProps.score && <p>Score: {infoWindowProps.score}</p>}
                        <p>{infoWindowProps?.address}</p>
                    </InfoWindow>
                }
            </>
        }
    </div>
  );
};

Map.propTypes = propTypes;

export default Map;