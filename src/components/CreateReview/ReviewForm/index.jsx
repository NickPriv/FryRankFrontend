import { PropTypes } from 'prop-types';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import { Button, LinkButton, ScoreDropdown } from '../../Common';
import FryposalLoginImage from "../../../Fryposal.png";
import './style.css';

const propTypes = {
    currentRestaurant: PropTypes.object.isRequired,
    currentReview: PropTypes.object.isRequired,
    updateCurrentReview: PropTypes.func.isRequired,
    createReview: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired,
};

const ReviewForm = ({ createReview, currentRestaurant, currentReview, updateCurrentReview, loggedIn, username, accountId }) => {

    return (
        <div>
        <Form
            onChange={(event) => {
                if (!currentReview.accountId && accountId) {
                    updateCurrentReview('accountId', accountId);
                }
                updateCurrentReview(event.target.name, event.target.value);
            }}
        >
            {loggedIn &&
                <div><FormGroup>
                    <Label for="nameInput">
                        Name
                    </Label>
                    <Input
                        id="nameInput"
                        name="authorId"
                        value={username}
                        type="textarea"
                        disabled="true"
                    />
                </FormGroup>
                    <ScoreDropdown labelName="Score" name="score" id="scoreInput"/>
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
                    </FormGroup></div>
            }
            {loggedIn ? <Button
                children='Submit'
                color='danger'
                onClick={(event) => {
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
        {!loggedIn &&
            <div>
                <img src={FryposalLoginImage} className="fryposal-login-image" alt="fyposal-login-image"/>
                <br></br>
                <h4 className="login-requirement-message">"Will you log in for me?"</h4>
            </div>
        }
        </div>
)
}

ReviewForm.propTypes = propTypes;

export default ReviewForm;