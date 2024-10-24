import {
  AdvancedMarker,
  Pin
} from '@vis.gl/react-google-maps';

import { PropTypes } from 'prop-types';

const propTypes = {
    setShowInfoWindow: PropTypes.func.isRequired,
    pinData: PropTypes.object,
}

const MapPins = ({ pinData, setShowInfoWindow, setInfoWindowProps }) => {
    return (
      <>
        {pinData.map(place => (
          <AdvancedMarker
            key={place.key}
            position={place.location}
            onClick={() => {
                setShowInfoWindow(true);
                setInfoWindowProps({
                   name: place.name,
                   location: place.location,
                   address: place.address,
                   score: place.score,
                   id: place.key
                });
            }}>>
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>
        ))}
      </>
    );
}

MapPins.propTypes = propTypes;

export default MapPins;