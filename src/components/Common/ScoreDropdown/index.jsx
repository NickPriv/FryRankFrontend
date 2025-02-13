import React, { memo }from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const ScoreDropdown = memo(({name, id, labelName, value='', onChange = () => {} }) => {
    return (
        <FormGroup> 
            <Label for="scoreInput">{labelName}</Label> 
            <Input 
                type="select" 
                name={name}
                id={id}
                value = {value}
                onChange={onChange} 
                className="form-select" 
            > 
                <option value="">Select a {name}</option> 
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
    );
});

export default ScoreDropdown;