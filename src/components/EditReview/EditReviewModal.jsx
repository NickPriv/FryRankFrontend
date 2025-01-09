import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReviewForm from "../CreateReview/ReviewForm"; //to add later
import {reviewsActions } from '../../redux/reducers/reviews';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function EditReviewModal({modal, loggedIn, toggle, review, restaurant, onRefresh}){
    const dispatch = useDispatch();
    const [updatedReview, setUpdatedReview]=useState(review);

    
    const handleSaveClick= ()=>{
       dispatch(reviewsActions.startCreateReviewForRestaurantRequest(updatedReview));
       
       setTimeout(()=>{
            onRefresh();
       },500)
       
       toggle();
    };

    const handleInputChange = (e) => { 
        const { name, value } = e.target; 
        setUpdatedReview(prevReview => ({ ...prevReview, [name]: value, }));
    };

    return (
        <>
            <Modal isOpen={modal} toggle={toggle} >        
                <ModalHeader toggle={toggle}> Let's edit your review </ModalHeader>
                <ModalBody>
                <input type="text" name="title" value={updatedReview.title} onChange={handleInputChange} placeholder="Enter new title" />
                    <h3>{review.title}</h3> 
                    <h3>{review.score}</h3> 
                    <h3>{review.author}</h3>
                    <h3>{review.body}</h3>
                    <h3>{restaurant.displayName.text}</h3> 
                   
                    <ReviewForm 
                        createReview={null} 
                        currentRestaurant={restaurant} 
                        currentReview={review} 
                        updateCurrentReview={null} 
                        loggedIn={loggedIn} 
                        givenName={review.authorId} 
                        accountId={review.accountId} />              
                
                </ModalBody>
                
                <ModalFooter>
                    <Button color="primary" onClick={handleSaveClick}>
                        Save Edit
                    </Button> {'  '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel Edit
                    </Button>
                </ModalFooter>
            </Modal>    
        </>
    )
}