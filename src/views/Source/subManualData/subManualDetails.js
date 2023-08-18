import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchUserApi } from '../../../redux/action/UserApi/UserApi';
import LeadHistory from './LeadHistory';

function subManualDetails() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserApi(token));
    }, [])
    var token = localStorage.getItem("token");
    const location = useLocation();
    const receivedData = location && location.state;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <div>
            <h1 className='pb-3 fw-bolder' style={{ fontSize: "24px", margin: "2px 20px" }}>Address Information</h1>
            <div className='row ' style={{ background: "white", margin: "2px 20px" }}>
                <div className='col-4 text-start py-5 px-3' >
                    <p className='fw-bold'>City : </p>
                    <p className='fw-bold'>State : </p>
                    <p className='fw-bold'>Country : </p>
                </div>
                <div className='col-8 p-5'>
                    <p>{receivedData && receivedData.city}</p>
                    <p>{receivedData && receivedData.state}</p>
                    <p>{receivedData && receivedData.country}</p>
                </div>
            </div>
            <h1 className='pb-3 fw-bolder' style={{ fontSize: "24px", margin: "2px 20px" }}>Basic Information</h1>
            <div className='row ' style={{ background: "white", margin: "2px 20px" }}>
                <div className='col-4 text-start py-5 px-3' >
                    <p className='fw-bold'>First Name : </p>
                    <p className='fw-bold'>Last Name : </p>
                    <p className='fw-bold'>Email : </p>
                    <p className='fw-bold'>Phone : </p>
                    <p className='fw-bold'>Lead Owner  :     </p>
                </div>
                <div className='col-8 p-5'>
                    <p>{receivedData && receivedData.firstName}</p>
                    <p>{receivedData && receivedData.lastName}</p>
                    <p><a href='a href="mailto:Info@Digitalpolaris.com'>{receivedData && receivedData.email}</a></p>
                    <p>{receivedData && receivedData.phone}</p> 
                    <p>{receivedData && receivedData.leadOwner}</p>
                </div>
            </div>
            <h1 className='pb-3 fw-bolder' style={{ fontSize: "24px", margin: "2px 20px" }}>Lead Information</h1>
            <div className='row ' style={{ background: "white", margin: "2px 20px" }}>
                <div className='col-4 text-start py-5 px-3'  >
                    <p className='fw-bold '>Lead Status : </p>
                    <p className='fw-bold'>Lead Source : </p>
                    <p className='fw-bold'>what is your budget : </p>
                    <p className='fw-bold'>Layout  :     </p>
                    <p className='fw-bold'>Date  :     </p>
                    <p className='fw-bold'>Time  :     </p>
                    <p className='fw-bold'>ReminderCall  :     </p>
                </div>
                <div className='col-8 p-5'>
                    <p>{receivedData && receivedData.leadStatus}</p>
                    <p>{receivedData && receivedData.leadSource}</p>
                    <p>{receivedData && receivedData.whatisyourbudget}</p> 
                    <p>{receivedData && receivedData.layout}</p>

                    <p>{receivedData && receivedData.date == null || ""? "-" : new Date(receivedData && receivedData.date).toLocaleDateString('en-US', options)}</p>
                    <p>{receivedData && receivedData.time == null || ""? "-" : receivedData.time}</p>

                    <p>{(receivedData && receivedData.reminderCall == null || ""? "-" : new Date(receivedData && receivedData.reminderCall).toLocaleDateString('en-US', options))}</p>
                </div>
            </div>
            <h1 className='pb-3 fw-bolder' style={{ fontSize: "24px", margin: "2px 20px" }}>Description Information</h1>
            <div className='row ' style={{ background: "white", margin: "2px 20px" }}>
                <div className='col-4 text-start py-5 px-3' >
                    <p className='fw-bold'>Description : </p>
                   
                </div>
                <div className='col-8 p-5'>
                    <p>{receivedData && receivedData.description}</p>
                 
                </div>
            </div>
            <h1 className='pb-3 fw-bolder' style={{ fontSize: "24px", margin: "2px 20px" }}>History</h1>
            <div className='row ' style={{ background: "white", margin: "2px 20px" }}>
              
                <div className='col-12 text-start py-5 px-5'>
                
                 
            <LeadHistory receivedData={receivedData}/>
                </div>
            </div>
        </div>
    )
}

export default subManualDetails