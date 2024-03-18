import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';
import { UserAuth } from '../context/AuthContext';


export default function UpcomingMeeting() {
    
        const [userID, setUserID] = useState(null); //userID
        const { user } = UserAuth();
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(false);
        const [currentUser, setCurrUser] = useState(null);
        const [agenda, setAgenda] = useState("");
        const [formData,setFormData] = useState({
            venue:"",
            date:"",
        });


        useEffect(() => {
            // if (selectedRole) {
            console.log("UserEffect : ", user); 
            if (user) {
                onLoadCall();
            }
            else {
                console.log(alert("else"));
            }
            // }
        }, [user]);
        
        const onLoadCall = async () => {
            await fetchUser();
            console.log("ON");
            if (userID) {
    
                
            }
            else {
                console.log("BEFOREEEEEEEEEEEEE");
            }
        }
        
        //FETCH USER
        const fetchUser = async () => {
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
    
                    setCurrUser(prevState => data.user);
                    setUserID(data.user.id);
    
                    console.log(userID + " : CURRENT : ", data);
                    console.log("CURRENT : ", data.user);
                    console.log("CURRENT : ", currentUser);
                    setLoading(false);

                    await fetchUpcomingMeetings();

                    if (data.success === false) {
                        setError(data.message);
                    }
                }
    
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        //FETCH MEETIGNS
        const [upcomingMeetings,setUpcomingMeetings] = useState([]);
        const fetchUpcomingMeetings = async()=>{

        try {
             
            const url = `http://localhost:8000/getUpcomingMeetings`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id:userID
                }),
            });
            if (response.ok) {
                const data = await response.json();
                let meetingList = data.meetings;
                console.log("))) : ",meetingList);
                meetingList = meetingList.sort((a, b) => new Date(a.date) - new Date(b.date))
                
                console.log("((( : ",meetingList);
                setUpcomingMeetings([...meetingList]);

                console.log("UPCOMING MEETINGS : ",upcomingMeetings);
            } 
          

        } catch (error) {
            alert("Error : "+error);
        }

    }

    const submitAgenda = async(meetingID)=>{
        
        
        try {
             
            const url = `http://localhost:8000/addAgenda`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    meeting_id:meetingID,
                    agenda_user_id:userID,
                    agenda:agenda
                }),
            });
            if (response.ok) {
                const data = await response.json();
                
                let m = upcomingMeetings;
                for (let index = 0; index < m.length; index++) {
                    let element = m[index];
                    if(element.id === meetingID) m[index].agenda = data.agenda;
                    
                }
                console.log(m);
                setUpcomingMeetings([...m]);
                console.log("UPCOMING MEETINGS : ",upcomingMeetings);
            } 
          

        } catch (error) {
            alert("Error : "+error);
        }

    }
    
    const rescheduleMeeting = async(e,meeting)=>{
        e.preventDefault();
        if(formData.venue === "") {
            alert("Fill all fileds");
            return
        }
        if(formData.date === "") {
            alert("Fill all fileds");
            return
        }
        try {
             
            const url = `http://localhost:8000/rescheduleMeeting`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    meeting_id:meeting.id,
                    venue:formData.venue,
                    date:formData.date
                }),
            });
            if (response.ok) {
                const data = await response.json();
                
                

                console.log("UPCOMING MEETINGS : ",upcomingMeetings);
            } 
          

        } catch (error) {
            alert("Error : "+error);
        }

    }

    return (     
        <>
        <div className='p-5 card m-3 border-0 scrollable '> 
        <div className="accordion overflow-auto" id="accordionExample">
        {upcomingMeetings.map((argMeeting)=>(
            <div class="accordion-item" style={{"margin":"10px",boxShadow:"5px 5px 5px lightgrey"}} >
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#"+argMeeting.id} aria-expanded="true"  aria-controls={argMeeting.id}>
                {argMeeting.title}&nbsp;&nbsp;{argMeeting.venue}&nbsp;&nbsp;{argMeeting.date}
              </button>
            </h2> 
            <div id={argMeeting.id} class="accordion-collapse collapse "  data-bs-parent="#accordionExample">
              <div class="accordion-body">
                    <div className='container-fluid  border-0' >
                    <div className='col-lg-4'>
                    <label htmlFor="search" className="form-label">Agenda</label>
                    <div className="input-group mb-3">
                        <input id="search" type="text" className="form-control" onChange={(e) => { setAgenda(e.target.value) }} value={agenda} placeholder="Agenda" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button className="btn btn-outline-secondary" onClick={()=>submitAgenda(argMeeting.id)} type="button" id="button-addon2">Submit</button>
                    </div>

                     </div>
                     {argMeeting.hostID === userID
                      ?<>
                      <div className='col-lg-12 '>
                        
                      <button class="btn btn-success mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Reschedule Meeting
  </button>
                         <div class="collapse" id="collapseExample">
                            <div class="card card-body">
                                <form className='row g-3' onSubmit={()=>rescheduleMeeting(argMeeting)}>
                                <div className="col-md-6">
                    <label htmlFor="venue" className="form-label">Venue</label>
                    <input type="text" onChange={(e) => {setFormData({...formData,"venue":e.target.value()})}} value={formData.venue} className="form-control" id="venue" placeholder="Place" />
                </div>
                <div className='col-md-6'>
                    <label htmlFor="meetingtime" className='form-label'>Date/Time</label>
                    <input className="form-control" onChange={(e) => {setFormData({...formData,"date":e.target.value()})}} value={formData.date} type="datetime-local" id="meetingtime" name="meetingtime" />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                                </form>
                            </div>
                        </div>
                         </div>
                      </>:<></>}
                    </div>
              </div>
            </div>
          </div>
        ))}



        </div>
        </div>
        </>
    )
}