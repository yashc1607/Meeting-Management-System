import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';

export default function HostMeeting() {
    const [formData, setFormData] = useState({
        emailId: '',
    });
    // const {user} = UserContext();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const [keywordData, setKeywordData] = useState([]);
    const [selectedRole, setSelectedRole] = useState(1); //change to 0 later
    const [selectedKeyword, setSelectedKeyword] = useState(0);
    const [userID,setUserID] = useState(1); //userID

    const selectedKeys = new Map();
    const fetchKeywordData = async () => {
        
        try {
            const url = `http://localhost:8000/getAssignedKeywords`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role_id: selectedRole
            }),
        });
        if (response.ok) {
            const data = await response.json();
            setKeywordData(data.keywords);
            keywordData.forEach(element => {
                selectedKeys.set(element.id, false);
            })
        }
        console.log(keywordData);
        } catch (error) {
            console.log("FETCH KEYWORD DATA",error);
        }
        
    };
    useEffect(() => {
        // if (selectedRole) {
           fetchKeywordData();
           fetchUserGroups();
        // }
    }, []);

    // ===============================================
    const [searchedUser, setSearchUser] = useState("");
    const fetchUser = async () => {
        try {
            console.log(formData);
            // setLoading(true);
            // setError(false);
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
            if(res.ok) {
                const data = await res.json();
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
            // console.log(formData);
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
            const data = await res.json();
            console.log(data);

            addUser(data.user);

            // setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    // ==============================================================
    const [groupData, setGroupData] = useState([]);
    const [allGroupData, setAllGroupData] = useState([]);

    const fetchUserGroups = async (userId) => {
        try {
            const url = `http://localhost:8000/getUserGroups`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user_id": 1
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setGroupData(data.groups);
                console.log("Groups",data.groups);
                fetchData();
            } else {
                // setGroupData({});
                setError('Failed to fetch user groups');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchData = async () => {
        const url = `http://localhost:8000/getGroups`;
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            setAllGroupData(data.groups);
        }
    };

    // ==============================================================

    return (

        <div className='p-5 card m-3 '>

            <form className="row g-3">
                {/* TITLE */}
                <div className="col-md-6">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" />
                </div>
                {/* AGENDA */}
                <div className="col-md-6">
                    <label htmlFor="agenda" className="form-label">Agenda</label>
                    <input type="text" className="form-control" id="agenda" />
                </div>
                {/* <div className="col-md-6">

                </div> */}

                {/* VENUE */}
                <div className="col-md-6">
                    <label htmlFor="venue" className="form-label">Venue</label>
                    <input type="text" className="form-control" id="venue" placeholder="Place" />
                </div>
                {/* KEYWORD SEARCH */}
                <div className="col-md-2">

                    <label htmlFor="dd" className="form-label">Keywords</label>
                    <div id="dd" className="dropdown">
                        <button id="dropdown" className=" btn btn-outline-secondary dropdown-toggle" onChange={(e) => setSelectedKeyword(e.target.value)} value={selectedKeyword} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Choose
                        </button>
                        <ul class="dropdown-menu">
                            {
                                keywordData.map((item) => (

                                    <li>
                                        <div>
                                            <a class="dropdown-item" href="#">
                                                <input className='form-check-input ' onChange={() => { selectedKeys.set(item.id, !selectedKeys.get(item.id)); console.log(selectedKeys) }} style={{ transform: "scale(1.5)" }} type="checkbox" name={item.id} id={item.id} />
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
                        <button id="dropdown" className=" btn btn-outline-secondary dropdown-toggle" onChange={(e) => setSelectedKeyword(e.target.value)} value={selectedKeyword} type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                                            <a class="dropdown-item" href="#">
                                                <input className='form-check-input' onChange={() => { selectedKeys.set(item.id, !selectedKeys.get(item.groupID)); console.log(selectedKeys) }} style={{ transform: "scale(1.5)" }} type="checkbox" name={item.id} id={item.id} />
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
                    <input className="form-control" type="datetime-local" id="meetingtime" name="meetingtime" />
                </div>
                {/* {JSON.stringify(Array.from(users))} */}

                {/* USER SEARCH */}
                <div className='col-md-6'>
                    <label htmlFor="search" className="form-label">Search</label>
                    <div className="input-group mb-3">
                        <input id="search" type="text" className="form-control" onChange={(e) => { console.log(e.target.value); setSearchUser(e.target.value) }} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
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

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>

        </div>
    )
}