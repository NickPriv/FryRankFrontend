import {PropTypes} from "prop-types";
import {Form, FormGroup, Input, Label} from 'reactstrap'
import {Button, Banner} from "../Common";

const propTypes = {
}

const UserSettings = ({ userSettings, currentUserSettings, loggedIn, setUserSettings, updateCurrentUserSettings, error }) => {
    return (
        <div>
        {
            !loggedIn &&
            <p> Please log in </p>
        }
        {
            loggedIn &&
            userSettings &&
                <div>
                    <ErrorBanner error = {error} />
                    <h2>Settings</h2>
                    <Form
                        onChange={(event) => {
                            updateCurrentUserSettings(event.target.name, event.target.value)
                        }}
                    >
                        <FormGroup>
                            <Label>Username</Label>
                            <Input name="username" defaultValue={userSettings.username}></Input>
                        </FormGroup>
                    </Form>
                    <Button children='Update'
                            color='danger'
                            onClick={(event) => {
                                setUserSettings(currentUserSettings)
                            }}
                    />
                </div>
        }
        </div>
    )
}

export default UserSettings;