import React, { Component } from 'react';
import './layout.css';
import fire from '../fire';

const TopBanner = (props) => {

    const handleLogout = () => {
        fire.auth().signOut();
    }

    return (
        <div className="topBar">
            <h2>COVID-RESPONSE<span className="right"><a href="https://www.health.nsw.gov.au/Infectious/covid-19/Pages/latest-updates.aspx" target="_blank">NSW Government</a></span></h2>
            <button type="button" onClick={handleLogout}>Sign Out</button>
        </div>
    );
}

export default TopBanner;