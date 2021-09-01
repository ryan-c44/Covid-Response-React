import React, { useState } from 'react';
import '../layout.css';
import { userRecords } from './userRecords';

const CloseContacts = (props) => {

    return (
        <div className="account-container">
            <div className="account-edit">
                {userRecords.map((data, key) => {
                    if(data.locations.suburb === props.location) {
                        return (
                            <div key={key} className="searchResults">
                            <div>{data.username}</div>
                                <div>
                                    {
                                        data.locations.map((locations) => {
                                            return (
                                                <div>
                                                    <div>{locations.businessName}</div>
                                                    <div>{locations.checkIn}</div>
                                                    <div>{locations.checkOut}</div>
                                                    <br></br>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <h2>No results</h2>
                            </div>
                        )
                    }
                })}
                <button>Alert All</button>
            </div>
        </div>
    );
}

export default CloseContacts;