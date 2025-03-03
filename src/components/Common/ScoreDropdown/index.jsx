import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const ScoreDropdown = () => {
    return (
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
    );
};

export default ScoreDropdown;