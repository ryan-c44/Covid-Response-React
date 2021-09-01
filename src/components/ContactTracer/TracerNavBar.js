import React, { Component, useState } from 'react';
import '../layout.css';

import Search from './Search';
import AlertUser from './AlertUser';


const TracerNavBar = () => {
    const [active, setActive] = useState("AlertUser");

    return(
        <div>
            <div>
                <nav id="nav-wrap">
                    <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	                <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

                        <ul id="nav" className="nav">
                            <li><a href="#" onClick={() => setActive("AlertUser")}>Dashboard</a></li>
                        </ul>

                </nav>
            </div>

            <div>
                {active === "AlertUser" && <AlertUser />}
            </div>
        </div>
    );
}

export default TracerNavBar;