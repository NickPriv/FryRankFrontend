import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';
import {
  Map as GoogleMap,
  AdvancedMarker,
  InfoWindow,
  Pin,
  useMap
} from '@vis.gl/react-google-maps';
import { Link } from 'react-router-dom';
import { FrySpinner } from '../../Common';
import { PATH_RESTAURANT_REVIEWS, PATH_VARIABLE_RESTAURANT_ID } from '../../../constants';
import MapPins from '../MapPins';

const propTypes = {
    restaurantIds: PropTypes.array.isRequired,
    currentRestaurants: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    showInfoWindow: PropTypes.bool.isRequired,
    setShowInfoWindow: PropTypes.func.isRequired,
    setInfoWindowProps: PropTypes.func.isRequired,
    infoWindowProps: PropTypes.func.isRequired,
    aggregateReviewsData: PropTypes.object.isRequired,
    pinData: PropTypes.object,
}

const Map = ({ location, restaurantIds, currentRestaurants, showInfoWindow, setShowInfoWindow, setInfoWindowProps, infoWindowProps, aggregateReviewsData,
               pinData }) => {

    const map = useMap();

    type Poi ={ key: string, location: google.maps.LatLngLiteral }

  const fieldOfView = () => {
      const bounds = new google.maps.LatLngBounds();
      pinData.forEach(place => {
          bounds.extend({
              lat: place.location.lat,
              lng: place.location.lng
          });
      });
      map && map.fitBounds(bounds);

      return bounds.getCenter();
  }

  const handleClose = useCallback(() => setShowInfoWindow(false), []);

  // notes: we need to get anchor tag working instead of position
  // problem: map zooms out after you click on a marker
  // next feature will have to be for the search results to change depending on map position (but only if map is toggled)

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
                    maxZoom={18}
                    mapId={'ced49c98e3ab91a3'}>
                        <MapPins
                            pinData = {pinData}
                            setShowInfoWindow = {setShowInfoWindow}
                            setInfoWindowProps = {setInfoWindowProps}
                        />
                </GoogleMap>
                {showInfoWindow &&
                    <InfoWindow
                        position={{ lat: infoWindowProps?.location.lat, lng: infoWindowProps?.location.lng }}
                        onCloseClick={handleClose}
                    >
                        <h6><Link to={`${PATH_RESTAURANT_REVIEWS}`.replace(PATH_VARIABLE_RESTAURANT_ID, infoWindowProps?.id)}>{infoWindowProps?.name}</Link></h6>
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