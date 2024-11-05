import { Card, CardBody } from 'reactstrap';
import { PropTypes } from 'prop-types';
import { FrySpinner } from '../../Common';

const propTypes = {
    message: PropTypes.string.isRequired,
};

const MessageCard = ({ message }) => {
    return (
        message && message.length > 0 ?
            <Card
                color="warning"
                className="text-box inline my-2"
                style={{width: "100%"}}
            >
                <CardBody>
                    {message}
                </CardBody>
            </Card> : <FrySpinner className="spinner" />
    )
}

MessageCard.propTypes = propTypes;

export default MessageCard;