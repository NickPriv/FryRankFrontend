import { Card, CardBody } from 'reactstrap';
import { PropTypes } from 'prop-types';
import { FrySpinner } from '../../Common';
import Typewriter from "../Typewriter";

const propTypes = {
    message: PropTypes.string.isRequired,
};

const MessageCard = ({ message }) => {
    return (
        message && message.length > 0 ?
            <Card color="warning" className="text-box">
                <CardBody>
                    <Typewriter text={message} delay={35} />
                </CardBody>
            </Card> : <FrySpinner className="spinner" />
    )
}

MessageCard.propTypes = propTypes;

export default MessageCard;