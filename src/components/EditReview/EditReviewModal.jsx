import ReviewForm from "../CreateReview/ReviewForm"; //to add later
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function EditReviewModal({modal, toggle, review, restaurant, onSave}){

    return (
        <>
            <Modal isOpen={modal} toggle={toggle} >        
                <ModalHeader toggle={toggle}>Let's edit your review </ModalHeader>
                <ModalBody>
                    <h3>{review.title }</h3> 
                    <h3>{review.score }</h3> 
                    <h3>{review.author }</h3>
                    <h3>{restaurant.displayName.text}</h3> 
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Save Edit
                    </Button> { '  '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel Edit
                    </Button>
                </ModalFooter>
            </Modal>    
        </>
    )
}