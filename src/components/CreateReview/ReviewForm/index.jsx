import { PropTypes } from 'prop-types';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import { Button, LinkButton } from '../../Common';

const propTypes = {
    currentRestaurant: PropTypes.object.isRequired,
    currentReview: PropTypes.object.isRequired,
    updateCurrentReview: PropTypes.func.isRequired,
    createReview: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    givenName: PropTypes.string.isRequired,
};

const ReviewForm = ({ createReview, currentRestaurant, currentReview, updateCurrentReview, loggedIn, givenName }) => {

    return (
        <Form
            onChange={(event) => {
                if (givenName && !currentReview.authorId) {
                    updateCurrentReview('authorId', givenName);
                }
                updateCurrentReview(event.target.name, event.target.value);
            }}
        >
            <FormGroup>
                <Label for="nameInput">
                    Name
                </Label>
                <Input
                    id="nameInput"
                    name="authorId"
                    value={givenName}
                    type="textarea"
                    disabled="true"
                />
            </FormGroup>
            <FormGroup>
                <Label for="scoreInput">
                    Score
                </Label>
                <Input type="select" name="score" id="scoreInput" className="form-select">
                    <option></option>
                    <option>10</option>
                    <option>9</option>
                    <option>8</option>
                    <option>7</option>
                    <option>6</option>
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </Input>
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
            { loggedIn ? <Button
                children='Submit'
                color='danger'
                onClick={(event) => {
                    updateCurrentReview('isoDateTime', new Date().toISOString())
                    createReview(currentReview)
                }}
            /> : <Button
                    children='Log in to Google to submit a review'
                    color='danger'
                    disabled='true'
                />
            }
            <LinkButton
                link={'/restaurants/' + currentRestaurant.id}
                children='Back to all reviews'
                color='secondary'
            />
        </Form>
    )
}

ReviewForm.propTypes = propTypes;

export default ReviewForm;