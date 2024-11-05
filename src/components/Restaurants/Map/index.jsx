import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';
import {
  ControlPosition,
  InfoWindow,
  Map as GoogleMap,
  MapControl,
  useMap
} from '@vis.gl/react-google-maps';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { FrySpinner, Score } from '../../Common';
import { FRENCH_FRIES_TEXT_QUERY, PATH_RESTAURANT_REVIEWS, PATH_VARIABLE_RESTAURANT_ID } from '../../../constants';
import MapPins from '../MapPins';
import { getDistance } from './helpers';

const propTypes = {
    showInfoWindow: PropTypes.bool.isRequired,
    setShowInfoWindow: PropTypes.func.isRequired,
    setInfoWindowProps: PropTypes.func.isRequired,
    infoWindowProps: PropTypes.func.isRequired,
    aggregateReviewsData: PropTypes.object.isRequired,
    pinData: PropTypes.object,
    getRestaurants: PropTypes.func.isRequired,
    requestingRestaurantsForQuery: PropTypes.bool.isRequired,
}

const Map = ({ showInfoWindow, setShowInfoWindow, setInfoWindowProps, infoWindowProps, aggregateReviewsData, pinData, showMapSearchButton, setShowMapSearchButton,
               getRestaurants, requestingRestaurantsForQuery, setAdjustBounds, shouldAdjustBounds }) => {

    const map = useMap();

    type coords = google.maps.LatLngLiteral

    const adjustBounds = () => {
        const bounds: coords = new google.maps.LatLngBounds();
        pinData.forEach(place => {
            bounds.extend({
                lat: place.location.lat,
                lng: place.location.lng
            });
        });
        map && map.fitBounds(bounds);
  }

  const handleClose = useCallback(() => setShowInfoWindow(false), []);

  const getRestaurantsForMapView = () => {
      const mapCenter = map.getCenter();
      const mapBounds = map.getBounds();

      const mapRadius = getDistance(
          mapCenter.lat(),
          mapBounds.getNorthEast().lng(),
          mapCenter.lat(),
          mapBounds.getSouthWest().lng()
      ) / 2;

      getRestaurants(FRENCH_FRIES_TEXT_QUERY, { latitude: mapCenter.lat(), longitude: mapCenter.lng() }, mapRadius);
  }

  console.log("Should adjust bounds: " + shouldAdjustBounds);

  return (
    <div>
        { !pinData
            ? <FrySpinner />
            : <>
                <GoogleMap
                    className='google-map'
                    gestureHandling={'cooperative'}
                    disableDefaultUI={true}
                    maxZoom={18}
                    mapId={'ced49c98e3ab91a3'}
                    onCenterChanged={() => setShowMapSearchButton(true)}
                >
                    <MapPins
                        pinData = {pinData}
                        setShowInfoWindow = {setShowInfoWindow}
                        setInfoWindowProps = {setInfoWindowProps}
                    />
                    <MapControl position={ControlPosition.TOP_CENTER}>
                        { showMapSearchButton &&
                            <Button className="my-2" onClick={() => {
                                getRestaurantsForMapView();
                                setShowMapSearchButton(false);
                            }}>
                                Search map area
                            </Button>
                        }
                      </MapControl>
                </GoogleMap>
                {showInfoWindow &&
                    <InfoWindow
                        position={{ lat: infoWindowProps?.location.lat, lng: infoWindowProps?.location.lng }}
                        onCloseClick={handleClose}
                    >
                        <h6 style={{ display: "inline-block" }}>
                            <Link to={`${PATH_RESTAURANT_REVIEWS}`.replace(PATH_VARIABLE_RESTAURANT_ID, infoWindowProps?.id)}>{infoWindowProps?.name}</Link>
                        </h6>
                        {infoWindowProps.score && <Score score={infoWindowProps.score} size="sm" />}
                        <p>{infoWindowProps?.address}</p>
                    </InfoWindow>
                }
                {pinData.length > 0 && !showInfoWindow && !requestingRestaurantsForQuery && shouldAdjustBounds && adjustBounds() && setAdjustBounds(false)}
            </>
        }
    </div>
  );
};

Map.propTypes = propTypes;

export default Map;