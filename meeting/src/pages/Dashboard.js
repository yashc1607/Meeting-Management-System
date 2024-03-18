import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';
import HostMeeting from './HostMeeting';
import { UserAuth } from '../context/AuthContext';
import Protected from '../components/Protected';
import UpcomingMeeting from './UpcomingMeetings';

export default function Dashboard() {
    
    const {logOut,user}=UserAuth();
    // console.log("User : ",user);
    // console.log("Email : ",user.email);
    const [formData, setFormData] = useState({
        emailId: '',
    });
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            setLoading(true);
            setError(false);
            const url = `http://localhost:8000/getUser`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    let cardStyle = {

        minWidth: "15rem",
        maxWidth: "20rem",
    }


    //console.log(formData);
    const validateElseAddUser = async () => {
        const url = `http://localhost:8000/addUser`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user":user
            }),
        });
        if (response.ok) {
            const data = await response.json();
            // setKeywordData(data.keywords);
            // keywordData.forEach(element => {
                // selectedKeys.set(element.id, false);
            // })
        }
        // console.log(keywordData);
    };
    useEffect(() => {
        if (user) {
            validateElseAddUser();
        }
    }, []);
    
    return (

        <div className='p-5 mt-3 r-50'>
            <div className="card rounded-4" >
                <div className="card-body">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Host Meeting</button>
                            <button className="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" >Upcoming Meetings</button>
                            <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Past Meetings</button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">A</div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0"><Protected><HostMeeting /></Protected></div>
                        <div className="tab-pane fade" id="nav-disabled" role="tabpanel" aria-labelledby="nav-disabled-tab" tabIndex="0"><Protected><UpcomingMeeting/></Protected></div>
                        <div className="tab-pane fade" id="nav-co   ntact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">C</div>
                    </div>

                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>



        </div>
    )
}