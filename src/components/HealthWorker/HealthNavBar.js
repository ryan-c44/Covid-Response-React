import React, { Component, useState } from 'react';
import '../layout.css';
import AddCase from './AddCase';
import Certify from './Certify';


const HealthNavBar = () => {
    const [active, setActive] = useState("Certify");

    return(
        <div>
            <div>
                <nav id="nav-wrap">
                    <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	                <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

                        <ul id="nav" className="nav">
                            <li><a href="#" onClick={() => setActive("Certify")}>Certify User</a></li>
                            <li><a href="#" onClick={() => setActive("AddCase")}>Add Case</a></li>
                        </ul>

                </nav>
            </div>

            <div>
                {active === "Certify" && <Certify />}
                {active === "AddCase" && <AddCase />}
            </div>
        </div>
    );
}

export default HealthNavBar;