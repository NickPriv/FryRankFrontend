import React from 'react'
import { Spinner } from 'reactstrap'
import "./spinner.css";

const FrySpinner = () => {
    return (
        <Spinner className="spinner" color="warning">
            <p className="visually-hidden">Loading...</p>
        </Spinner>
    )
}

export default FrySpinner;