import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import "./Breadcrumb.css"

export default function Breadcrumb() {
    const location = useLocation();

    return (
        <nav className="Breadcrumb">
            <Link to="/RestaurantsPage" className={location.pathname === "/RestaurantsPage" ? "breadcrumb-active" : "breadcrumb-not-active"}>
                Restaurants
            </Link>
        </nav>
    )
}