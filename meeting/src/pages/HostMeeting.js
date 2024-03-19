import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';
import { UserAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';


export default function HostMeeting() {
    const [formDataHM, setFormDataHM] = useState({
        title: '',
        agenda: '',
        venue: '', 
        date: ''
    });
    const [userIDHM, setUserIDHM] = useState(18); //userIDHM
    const [idHM,setIDHM] = useState(null);
    const [selectedKeysHM,setSelectedKeysHM] = useState(new Set()); 

    const { user } = UserAuth();
    console.log("UserAuth : ", user);
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

    // const [currentUserHM,setCurrentUser] = useState(null);//
    const [currentUserHM, setCurrUserHM] = useState(null);
    const onLoadCall = async () => {
        await fetchUser();
        console.log("ON");
        if (userIDHM !== -1) {

            await fetchKeywordData();
            await fetchUserGroups(userIDHM); 
        }
        else {
            console.log("BEFOREEEEEEEEEEEEE");
        }
    }

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const handleChange = (e) => {
        setFormDataHM({
            ...formDataHM,
            [e.target.id]: e.target.value,
        });
    };
    const [keywordData, setKeywordData] = useState([]);
    const [selectedRole, setSelectedRole] = useState(1); //change to 0 later
    const [selectedKeyword, setSelectedKeyword] = useState(0);

    const fetchKeywordData = async () => {   
        try { 
            const url = `http://localhost:8000/getuserassignedkeywords`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id:userIDHM
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setKeywordData(data.keywords);
                // const mp = {};
                // keywordData.forEach(element => {
                //     mp[element] = false;
                // })
                // setSelectedKeysHM({...mp});
            }  
            console.log(keywordData);
        } catch (error) {  
            console.log("FETCH KEYWORD DATA", error);
        }

    };

    // ===============================================
    const [searchedUser, setSearchUser] = useState("");
    const fetchUser = async () => {
        try {
            console.log(formDataHM);
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

                // setCurrUserHM(prevState => data.user);
                setUserIDHM(data.user.id);
                // setIDHM(data.user.id);

                console.log(userIDHM + " : CURRENT : ", data);
                console.log("CURRENT : ", data.user);
                console.log("CURRENT : ", currentUserHM);
                setLoading(false);
                if (data.success === false) {
                    setError(data.message);
                }
            }

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    // ===============================================

    const [users, setUsers] = useState([]);

    const addUser = (item) => {
        // setUsers((users)=>{return [...users,item]});
        let list = [...users, item];
        const userSet = new Set();
        list = list.filter((item, index) => {
            if (!userSet.has(item.id)) {
                userSet.add(item.id);
                return true;
            }
            return false;
        });
        setUsers([...list]);
    }
    const removeUser = (itemID) => {
        let list = users;
        list = list.filter(item => item.id !== itemID);
        setUsers([...list]);
    }

    const searchUser = async (e) => {
        e.preventDefault();
        try {
            // console.log(formDataHM);
            // setLoading(true);
            // setError(false);
            const url = `http://localhost:8000/getUser`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email_id": searchedUser
                }),
            });
            if(res.ok){
                const data = await res.json();
            console.log(data);

            addUser(data.user);
            setSearchUser("");    
            // setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            }
             
        } catch (error) {    
            setError(error.message);
            setLoading(false);
        }
    };

    // ==============================================================
    const [groupData, setGroupData] = useState([]);
    const [allGroupData, setAllGroupData] = useState([]);
    const [selectedGroups,setSelectedGroups] = useState(new Set()); 
    const fetchUserGroups = async (userIDHM) => {
        try {
            const url = `http://localhost:8000/getUserGroups`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user_id": userIDHM
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setGroupData(data.groups);
                console.log("Groups", data.groups);
                fetchData();
            } else {
                // setGroupData({});
                setError('Failed to fetch user groups');
            }
        } catch (error) {
            console.log("FETCH USER GP : ", error);
            setError("FETCH USER GP : ", error.message);
        }
    };

    const fetchData = async () => {
        try {
            const url = `http://localhost:8000/getGroups`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setAllGroupData(data.groups);
            }
        } catch (error) {
            alert("Get Groups : " + error);
        }

    };
    const [roleData, setroleData] = useState([]);

    const fetchRoles = async () => {
        try {
            const url = `http://localhost:8000/getassignedroles`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user_id": userIDHM
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setGroupData(data.groups);
                console.log("Groups", data.groups);
                fetchData();
            } else {
                // setGroupData({});
                setError('Failed to fetch user groups');
            }
        } catch (error) {
            console.log("FETCH USER GP : ", error);
            setError("FETCH USER GP : ", error.message);
        }    };


    const handleHostMeetingSubmit = async (e) => {

        e.preventDefault();
        let agendaID = -1;
        if (formDataHM.agenda !== "") {
            agendaID = userIDHM
        }
        if (formDataHM.date === "") {
            alert("Enter Date");
        }
        let savedMeeting = null;

        try {
            const url = `http://localhost:8000/addMeeting`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "host_id": userIDHM,
                    "agenda": formDataHM.agenda,
                    "title": formDataHM.title,
                    "agenda_user_id": agendaID,
                    "meeting_data": "",
                    "venue": formDataHM.venue,
                    "date": formDataHM.date
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setFormDataHM({ venue: "", date: "", agenda: "", title: "" })
                savedMeeting = data.meeting;

                console.log("ADD MEETING", data);
            } else {
                // setGroupData({});
                setError('Failed to add meeting');
            }
        } catch (error) {
            console.log("FETCH USER GP : ", error);
            setError("FETCH USER GP : ", error.message);
        }
        //////
        let groupids = [];
          selectedGroups.forEach((value)=>{
             groupids.push(value);
         });        
        console.log("SELECTED GPS : ",selectedGroups);
        let userids = users.map((item)=>item.id);
        userids = [...userids,userIDHM];
        try {
            const url = `http://localhost:8000/addparticipants`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    "meeting_id": savedMeeting.id,
                    "users": userids,
                    "groups": groupids
                }),
            });
            if (response.ok) { 
                const data = await response.json();
                setFormDataHM({ venue: "", date: "", agenda: "", title: "" })
                
                
                console.log("ADD MEETING", data);
            } else {
                // setGroupData({});
                setError('Failed to add meeting');
            }
        } catch (error) {

        }
        //keywords part
        let reskeys = Array.from(selectedKeysHM);
        reskeys = keywordData 
                    .filter((item)=>reskeys.includes(item.id))
                    .map((item)=>item.keyword)
        try {
            const url = `http://localhost:8000/addmeetingkeyword`;
            const response = await fetch(url, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "meeting_id": savedMeeting.id,
                    "keywords":reskeys
                }),
            });
            if (response.ok) {
                const data = await response.json();
                // setFormDataHM({ venue: "", date: "", agenda: "", title: "" })
                // const mp = {};
                // keywordData.forEach(element => {
                //     mp[element] = false;
                // });
                // setSelectedKeysHMHM({...mp});
                console.log("ADD MEETING", data);
            } else {
                // setGroupData({});  
                setError('Failed to add meeting');
            }
        } catch (error) {

        }

    }
    console.log("Before Toggle : ",selectedGroups); 
    const toggleItem = (itemId) => {
        // console.log("TOGGLE : ",selectedKeysHM);
        const newSelectedItems = new Set(selectedKeysHM);
        if (selectedKeysHM.has(itemId)) {
          newSelectedItems.delete(itemId); 
        } else {  
          newSelectedItems.add(itemId);
        }
        setSelectedKeysHM(newSelectedItems);
        console.log(selectedKeysHM);
      }; 
      const toggleItem2 = (itemId) => {
        const newSelected = new Set(selectedGroups);
        if (selectedGroups.has(itemId)) {
          newSelected.delete(itemId);
        } else { 
          newSelected.add(itemId);
        }
        setSelectedGroups(newSelected);
      }; 
    return (     
        <>
        <Dashboard/>
        <div className='p-5 card m-3 '>

            <form className="row g-3" onSubmit={handleHostMeetingSubmit}>
                {/* TITLE */}
                <div className="col-md-6">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" onChange={(e) => setFormDataHM({ ...formDataHM, 'title': e.target.value })} value={formDataHM.title} className="form-control" id="title" />
                </div>
                {/* AGENDA */}
                <div className="col-md-6">
                    <label htmlFor="agenda" className="form-label">Agenda</label>
                    <input type="text" onChange={(e) => setFormDataHM({ ...formDataHM, 'agenda': e.target.value })} value={formDataHM.agenda} className="form-control" id="agenda" />
                </div>
                {/* <div className="col-md-6">

                </div> */}

                {/* VENUE */}
                <div className="col-md-6">
                    <label htmlFor="venue" className="form-label">Venue</label>
                    <input type="text" onChange={(e) => setFormDataHM({ ...formDataHM, 'venue': e.target.value })} value={formDataHM.venue} className="form-control" id="venue" placeholder="Place" />
                </div>
                {/* KEYWORD SEARCH */}
                <div className="col-md-2">

                    <label htmlFor="dd" className="form-label">Keywords</label>
                    <div id="dd" className="dropdown">
                        <button id="dropdown" className=" btn btn-outline-secondary dropdown-toggle" onChange={(e) => setSelectedKeyword(e.target.value)} value={selectedKeyword} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Choose
                        </button> 
                        <ul className="dropdown-menu">
                            { 
                                keywordData.map((item) => (
 
                                    <li>
                                        <div>  
                                            <a className="dropdown-item" href="#">
                                                <input className='form-check-input ' onChange={(e) => { toggleItem(item.id); console.log("ssssele KEYSS",selectedKeysHM) }} style={{ transform: "scale(1.5)" }} checked={selectedKeysHM.has(item.id) } type="checkbox" name={item.id} id={item.id} />
                                                <label className='form-check-label ml-2' htmlFor={item.id}><span className='pl-3'>&nbsp;&nbsp;{item.keyword}</span></label>  
                                                <hr className="dropdown-divider" /> 
                                            </a>
                                        </div>

                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                {/* {JSON.stringify(users)} */}
                {/* GROUP SELECTION */}
                <div className="col-md-2">
                    {/* {groupData} */}
                    <label htmlFor="dd" className="form-label">Groups</label>
                    <div id="dd" className="dropdown">
                        <button id="dropdown" className=" btn btn-outline-secondary dropdown-toggle"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Choose
                        </button> 
                        <ul className="dropdown-menu"> 

                            { 
                                groupData.map((item) => {   
                                    const correspondingGroup = allGroupData.find(group => group.id === item.groupID);
                                    const groupName = correspondingGroup ? correspondingGroup.group_name : "";

                                    return (<>
                                        <li> 
                                            <div>
                                                <a className="dropdown-item" href="#">
                                                    <input className='form-check-input' onChange={(e) => { toggleItem2(item.groupID); console.log("ssssele GPSSSS",selectedGroups) }}   style={{ transform: "scale(1.5)" }} checked={selectedGroups.has(item.groupID) || false } type="checkbox" name={item.groupID} id={item.groupID} />
                                                    <label className='form-check-label ml-2' htmlFor={item.groupID}><span className='pl-3'>&nbsp;&nbsp;{groupName}</span></label>
                                                    <hr className="dropdown-divider" />
                                                </a>
                                            </div> 

                                        </li></>)
                                })
                            }
                        </ul>
                    </div>
                </div>
                {/*===================================================  */}


                {/* DATE/TIME */}
                <div className='col-md-6'>
                    <label htmlFor="meetingtime" className='form-label'>Date/Time</label>
                    <input className="form-control" onChange={(e) => setFormDataHM({ ...formDataHM, 'date': e.target.value })} value={formDataHM.date} type="datetime-local" id="meetingtime" name="meetingtime" />
                </div>
                {/* {JSON.stringify(Array.from(users))} */}

                {/* USER SEARCH */}
                <div className='col-md-6'>
                    <label htmlFor="search" className="form-label">Search</label>
                    <div className="input-group mb-3">
                        <input id="search" type="text" className="form-control" onChange={(e) => { console.log(e.target.value); setSearchUser(e.target.value) }} value={searchedUser} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button className="btn btn-outline-secondary" onClick={searchUser} type="button" id="button-addon2">Search</button>
                    </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>

                    {
                        users.map((user) => (<>
                            <div className='col-sm-4'>
                                <div key={user.id} className="card mb-1 p-2" style={{ backgroundColor: '#f0f8ff', border: '1px solid #87CEEB', borderRadius: '20px' }}>
                                    <button className="close " onClick={() => removeUser(user.id)} style={{ borderRadius: '20px', backgroundColor: 'red', position: 'absolute', top: '5px', right: '5px', color: 'white', opacity: '1', zIndex: '1' }}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    {/* <div className="card-body"> */}
                                    {/* <h5 className="card-title"> */}
                                    {user.emailID}
                                    {/* </h5> */}

                                    {/* </div> */}
                                </div>
                            </div>
                        </>))
                    }

                </div>
                {error}
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>

        </div></>
    )
}