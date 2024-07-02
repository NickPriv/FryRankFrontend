import React from 'react'
import { Link } from 'react-router-dom';

import  GoogleLogin from '../../../containers/Common/GoogleLogin';
import style from "./style.module.css"

export default function Header() {
    return (
        <div className={style.Header}>
            <Link to=''>
                <h1 className="FryRank"> FryRank </h1>
            </Link>
            <GoogleLogin />
        </div>
    )
}