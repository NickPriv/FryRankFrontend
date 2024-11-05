import React from 'react';
import { Link } from 'react-router-dom';
import  GoogleLogin from '../../../containers/Common/GoogleLogin';
import style from "./style.module.css";

export default function Header() {
    return (
        <div className={style.Header}>
            <Link to=''>
                <h1 className="FryRank"> FryRank </h1>               
            </Link>

            <Link to=''>
                <h4 className="Restaurants"> Restaurants</h4>               
            </Link>

            <Link to='' >
                <h4 className="Recent"> Recent Reviews</h4>               
            </Link>

            <a href="https://www.etsy.com/shop/fryrank/" target="_blank" rel="noopener noreferrer"> 
                <h4 className="Merch">Merch Shop</h4> 
            </a>

            <GoogleLogin />
        </div>
    )
}