import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';

export default function PastMeeting() {
    console.log("Hi");
    const [meetings, setMeetings] = useState([]);

    const fetchMeeting = async () => {

        const url = `http://localhost:8000/getUserMeetings`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: 2
            }),
        });
        const data = await response.json();
        const sortedmeetings = data.meetings.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMeetings(sortedmeetings);
        console.log("Meetings", sortedmeetings);
    };
    useEffect(() => {
        fetchMeeting();
    }, []);


    return (
        <div class="accordion" id="accordionExample">
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
                        <div id={item.id} class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>{item.agenda}</strong>
                                <p>{item.meetingData}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}