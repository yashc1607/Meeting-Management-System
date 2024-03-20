import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';
import Dashboard from './Dashboard';
import { UserAuth } from '../context/AuthContext';

export default function PastMeeting() {
    // console.log("Hi");
    const [meetings, setMeetings] = useState([]);
    const [userIDPM,setUserIDPM] = useState(null);
    const [loading, setLoading] = useState(false);
    const {user} = UserAuth();
    const [error, setError] = useState(false);
    console.log("{PNM USER : ",user);
    const fetchUserPM = async () => {
        try {

            // setLoading(true);
            // setError(false);
            const url = `http://localhost:8000/getUser`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email_id": user.email
                }),
            });
            if (res.ok) {
                const data = await res.json();

                // setCurrUserUM(prevState => data.user);
                setUserIDPM(data.user.id);

                console.log(userIDPM + " : CURRENT : ", data);
                console.log("CURRENT : ", data.user);
                // console.log("CURRENT : ", currentUser);
                setLoading(false);

                // await fetchUpcomingMeetings();

                if (data.success === false) {
                    setError(data.message);
                }
            }

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }


    const fetchMeetingPM = async () => {

        const url = `http://localhost:8000/getUserMeetings`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userIDPM
            }),
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log("FETCHED PAST");
            let meets = [];
            if(data.meetings)
            meets = data.meetings;
            // const sortedmeetings = meets.sort((a, b) => (new Date(b.date)) - (new Date(a.date)));
            setMeetings(meets);
            // console.log("Meetings", sortedmeetings);
        }


    };
    useEffect(() => {
        if(user)
        fetchUserPM();
        else alert("No User");
        
    }, [user]);
    useEffect(()=>{
        fetchMeetingPM();
    },[userIDPM])



    return (<>
    {/* <Dashboard/> */}
    <div className='p-5 card m-3 border-2 rounded-2 scrollable '>

        <div class="accordion " id="accordionExample">
            {
                meetings.map((item) => (
                    <div class="accordion-item" key={item.id}>
                        <h2 class="accordion-header">
                            <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target={"#" + item.id} aria-expanded="True" aria-controls={item.id}>
                                <div class="col text-start">Title: {item.agenda}</div>
                                <div class="col text-center">Venue: {item.venue}</div>
                                <div class="col text-end">Date: {new Date(item.date).toLocaleDateString()}</div>
                            </button>  
                        </h2>
                        <div id={item.id} class="accordion-collapse collapse " data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>{item.agenda}</strong>
                                <p>{item.meetingData}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        </div>
        </>
    )
}