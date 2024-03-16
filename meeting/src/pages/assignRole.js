import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';

export default function AssignRole() {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [roleData, setroleData] = useState([]);
    const [msg, setmsg] = useState('');
    // State to store the selected option
    const [selectedOption, setSelectedOption] = useState(0);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const url = `http://localhost:8000/getRoles`;
        const response = await fetch(url);
        const data = await response.json();
        setroleData(data.roles);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);
            const url = `http://localhost:8000/getUser`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email_id: formData.email // Use formData.email instead of formData.email_id
                }),
            });
            console.log(selectedOption);
            if (res.ok) { // Check if the request was successful
                const data1 = await res.json();
                console.log(data1);
                if (data1.ok) { // Assuming the response indicates whether the user exists
                    const url = `http://localhost:8000/assignRole`;
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            role_id: selectedOption,
                            user_id: data1.user.id // Use data1.user_id instead of formData.user_id
                        }),
                    });
                    console.log(res);
                    const data = await res.json();
                    setLoading(false);
                    if (data.success === false) {
                        setError(data.message);
                    } else {
                        setError('User given the role');
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    } 
                } else {
                    setError('User not found');
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
            } else {
                setError('Failed to fetch user'); // Handle non-OK response
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    
    //console.log(roleData);
    //console.log(formData);
    return (
        <div>
            <AdminAction />
            <div class="container col-lg-6 col-sm-8 card text-center mt-3 p-5" style={{width: '30rem'}}>
                <h1 className="text-3xl font-semibold text-center">Assign Role</h1>
                <div class="card-body ">
                    <form onSubmit={handleSubmit}>
                        <div class="input-group justify-content-center align-items-center">
                            <div class="col-auto p-2">
                                <input type="text" class="form-control" id="email" name="email" onChange={handleChange} aria-label="..." value={formData.email} required />
                                { <select id="dropdown" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption} required>
                                    <option value="">Select Role</option>
                                    {roleData.map((item) => (
                                        <option key={item.id} value={item.id}>{item.role_name}</option>
                                    ))}
                                </select> }
                            </div>
                            <div class="col-auto p-2">
                                <button type="submit" class="btn btn-success input-role-btn">
                                    {loading ? 'Assigning...' : 'Assign Role'}
                                </button>
                            </div>
                        </div>
                        <div>

                            {error && <p className="text-danger">{error}</p>}
                        </div>
                    </form>

                </div>
                {<p>{msg}</p>}
            </div>
        </div>
    )
}