import { PropTypes } from 'prop-types';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Score } from '../';
import { useSelector } from 'react-redux';
import {
    PATH_ACCOUNT_REVIEWS,
    PATH_RESTAURANT_REVIEWS,
    PATH_VARIABLE_ACCOUNT_ID,
    PATH_VARIABLE_RESTAURANT_ID,
    EDIT_REVIEWS_FEATURE 
} from '../../../constants.js'
import '../style.css'
import { FaEdit } from "react-icons/fa";
import EditReviewModal from '../../EditReview/EditReviewModal.jsx';
import { useState, useCallback } from 'react';


const propTypes = {
    review: PropTypes.object.isRequired,
    restaurant: PropTypes.object,
};

const ReviewCard = ({ review, restaurant }) => {
    const user=useSelector((state)=>state.userReducer.userData?.sub);
    const isReviewAuthor = user === review.accountId;
    const [isModalOpen, setIsModalOpen] = useState(false);
   
    const handleOpenModal = useCallback(()=>{
        setIsModalOpen(true);
    },[]);

    const handleCloseModal = useCallback(()=> {
        setIsModalOpen(false);
    },[])

    const handleSave = useCallback((updatedReview)=>{
        //
    },[])

    return (
        <>
            <Card
                color="warning"
                className="mb-2"
                style={{
                    maxWidth: "36rem",
                    width: "90vw"
                }}
            >
                <CardBody>
                    <div>
                        <CardTitle tag="h3" style={{ display: "inline-block" }}>
                            {review.title}
                        </CardTitle>
                        <Score size="md" score={review.score} />
                        {EDIT_REVIEWS_FEATURE && isReviewAuthor && ( <FaEdit style={{ fontSize: '24px', position: 'absolute', top: '19px', right: '15px', cursor: 'pointer' }} onClick={handleOpenModal} /> )}
                    </div>
                    { restaurant &&
                        <div>
                            <CardSubtitle
                                className="inline mb-2 me-2 text-danger"
                                tag="h5"
                            >
                                <Link to={`${PATH_RESTAURANT_REVIEWS}`.replace(PATH_VARIABLE_RESTAURANT_ID, restaurant.id)}>{restaurant.displayName.text}</Link>
                            </CardSubtitle>
                            <CardText className="inline mb-2">
                                {restaurant.formattedAddress}
                            </CardText>
                        </div>
                    }
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        By: { review.accountId
                            ? <Link to={`${PATH_ACCOUNT_REVIEWS}`.replace(PATH_VARIABLE_ACCOUNT_ID, review.accountId)}>
                                {review.authorId ? review.authorId : review.accountId}
                            </Link>
                            : <div className="inline">{review.authorId}</div> }
                    </CardSubtitle>
                    <CardText>
                        {review.body}
                    </CardText>
                    {review.isoDateTime &&
                        <CardSubtitle className="mb-2 text-muted" style={{fontStyle: "italic"}} tag="h6">
                            {new Date(review.isoDateTime).toLocaleString()}
                        </CardSubtitle>
                    }
                </CardBody>
            </Card>
            {isModalOpen && ( <EditReviewModal 
                review={review} 
                restaurant={restaurant} 
                onClose={handleCloseModal} 
                onSave={handleSave} /> 
            )}
        </>
    )
}

ReviewCard.propTypes = propTypes;

export default ReviewCard;