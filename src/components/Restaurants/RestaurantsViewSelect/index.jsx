import { PropTypes } from 'prop-types';
import { Button, ButtonGroup } from 'reactstrap';
import { SELECTED_VIEW } from '../../../constants';

const propTypes = {
    selectedView: PropTypes.string.isRequired,
    setSelectedView: PropTypes.func.isRequired,
}

const RestaurantsViewSelect = ({ selectedView, setSelectedView }) => {
    return (
        <div>
            <ButtonGroup>
                <Button
                    color="secondary"
                    outline
                    onClick={() => setSelectedView(SELECTED_VIEW.MAP)}
                    active={selectedView === SELECTED_VIEW.MAP}
                >
                    Map
                </Button>
                <Button
                    color="secondary"
                    outline
                    onClick={() => setSelectedView(SELECTED_VIEW.LIST)}
                    active={selectedView === SELECTED_VIEW.LIST}
                >
                    List
                </Button>
            </ButtonGroup>
        </div>
    );
}

RestaurantsViewSelect.propTypes = propTypes;

export default RestaurantsViewSelect;