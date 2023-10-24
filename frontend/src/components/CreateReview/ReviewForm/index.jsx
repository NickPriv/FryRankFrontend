import { PropTypes } from 'prop-types';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const propTypes = {
    currentRestaurant: PropTypes.object.isRequired,
    currentReview: PropTypes.object.isRequired,
    updateCurrentReview: PropTypes.func.isRequired,
    createReview: PropTypes.func.isRequired
};

const ReviewForm = ({ createReview, currentRestaurant, currentReview, updateCurrentReview }) => {
    return (
        <Form onChange={(event) => {
            updateCurrentReview(event.target.name, event.target.value);
        }}>
            <FormGroup>
                <Label for="nameInput">
                    Name
                </Label>
                <Input
                    id="nameInput"
                    name="authorId"
                    placeholder="Your name here"
                    type="textarea"
                />
            </FormGroup>
            <FormGroup>
                <Label for="scoreInput">
                    Score
                </Label>
                <Input
                    id="scoreInput"
                    name="score"
                    placeholder="Any number from 0 to 10"
                    type="number"
                    min="0"
                    max="10"
                />
            </FormGroup>
            <FormGroup>
                <Label for="titleInput">
                    Title
                </Label>
                <Input
                    id="titleInput"
                    name="title"
                    placeholder="A title for your review"
                    type="textarea"
                />
            </FormGroup>
            <FormGroup>
                <Label for="bodyInput">
                    Body
                </Label>
                <Input
                    id="bodyInput"
                    name="body"
                    placeholder="Your review text here"
                    type="textarea"
                />
            </FormGroup>
            <Button onClick={(event) => {
                console.log("currentReview from component");
                console.log(currentReview);
                console.log(currentRestaurant);
                updateCurrentReview("restaurantId", currentRestaurant.id)
                createReview(currentReview);
                return;
            }}>
                Submit
            </Button>
        </Form>
    )
}

ReviewForm.propTypes = propTypes;

export default ReviewForm;