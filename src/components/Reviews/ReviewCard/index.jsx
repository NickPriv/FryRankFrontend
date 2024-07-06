import { PropTypes } from 'prop-types';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

const propTypes = {
    title: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
};

const ReviewCard = ({ title, authorId, score, body, timestamp}) => {
    return (
        <Card
            color="warning"
            className="mb-2"
            style={{
                maxWidth: "36rem",
                width: "90vw"
            }}
        >
            <CardBody>
                <CardTitle tag="h4">
                    {title}
                </CardTitle>
                {timestamp ? <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                    >
                    {new Date(timestamp).toLocaleString()}
                    </CardSubtitle> : undefined
                }
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    Author: {authorId}
                </CardSubtitle>
                <CardSubtitle
                    className="mb-2 text-danger"
                    tag="h5"
                >
                    Score: {score}
                </CardSubtitle>
                <CardText>
                    {body}
                </CardText>
            </CardBody>
        </Card>
    )
}

ReviewCard.propTypes = propTypes;

export default ReviewCard;