import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reviewsActions } from '../../redux/reducers/reviews';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Input, Label, FormGroup } from 'reactstrap';
import FryposalLoginImage from "../../Fryposal.png";

export default function EditReviewModal({modal, signIn, toggle, review, onRefresh}){
    const dispatch = useDispatch();
    const [updatedReview, setUpdatedReview] = useState(review);

    const handleSaveClick = ()=>{
        dispatch(reviewsActions.startCreateReviewForRestaurantRequest(updatedReview));
        setTimeout(()=>{
            onRefresh();   
        },200)  
        toggle();
    };

    const handleInputChange = (e) => { 
        const { name, value } = e.target; 
        setUpdatedReview(prevReview => ({ ...prevReview, [name]: value, }));
    };

    return (
        <>
            <Modal isOpen={modal} toggle={toggle} > 
                <ModalHeader toggle={toggle}>Let's edit your review</ModalHeader>
                <ModalBody>
                    {signIn? (
                    <>
                        <FormGroup>
                            <Label for="nameInput">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={updatedReview.title} 
                                onChange={handleInputChange} 
                                placeholder="Enter new title"
                            />
                        </FormGroup>

                        <FormGroup> 
                            <Label for="scoreInput">Score</Label> 
                            <Input 
                                type="select" 
                                name="score" 
                                id="scoreInput" 
                                value={updatedReview.score} 
                                onChange={handleInputChange} 
                                className="form-select" 
                            > 
                                <option value="">Select a score</option> 
                                <option value="10">10</option> 
                                <option value="9">9</option> 
                                <option value="8">8</option> 
                                <option value="7">7</option> 
                                <option value="6">6</option> 
                                <option value="5">5</option> 
                                <option value="4">4</option> 
                                <option value="3">3</option> 
                                <option value="2">2</option> 
                                <option value="1">1</option> 
                            </Input> 
                        </FormGroup>

                        <FormGroup>
                            <Label for="bodyInput">Body</Label>
                            <Input
                                name="body"
                                placeholder="Your review text here"
                                type="textarea"
                                value={updatedReview.body} 
                                onChange={handleInputChange} 
                            />
                        </FormGroup>
                    </>
                    ):(
                        <div>
                            <img src={FryposalLoginImage} className="fryposal-login-image" alt="fyposal-login-image"/>
                            <br></br>
                            <h4 className="login-requirement-message">"Will you log in for me?"</h4>
                        </div>
                    )}
                </ModalBody>
                    {signIn && (<ModalFooter>
                        <Button color="primary" onClick={handleSaveClick}>
                            Save Edit
                        </Button> {'  '}
                        <Button color="secondary" onClick={toggle}>
                            Cancel Edit
                        </Button>
                    </ModalFooter>
                )}
            </Modal> 
        </>
    )
}