import React from 'react'
import { Link } from 'react-router-dom';

import  GoogleLogin from '../../../containers/Common/GoogleLogin';
import logo from '../../../FryRankLogo.png';
import style from "./style.module.css"

export default function Header() {
    return (
        <div className={style.Header}>
            <Link to=''>
                <img src={logo} className={style.FryRank} alt="FryRank" />
            </Link>
            <GoogleLogin />
        </div>
    )
}