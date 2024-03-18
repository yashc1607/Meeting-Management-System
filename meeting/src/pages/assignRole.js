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
    const [allUsers, setAllUsers] = useState([]);
    const [allUserRoles, setAllUserRoles] = useState([]);
    const [msg, setmsg] = useState('');
    const [selectedOption, setSelectedOption] = useState(0);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    useEffect(() => {
        fetchRoles();
        fetchAllUsers();
        fetchAllUserRoles();
    }, []);
    const fetchRoles = async () => {
        const url = `http://localhost:8000/getRoles`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("userData" + data);
        setroleData(data.roles);
    };
    const fetchAllUsers = async () => {
        try {
            const url = `http://localhost:8000/getAllUser`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setAllUsers(data.user); // Set allUsers with the user array from the response
            } else {
                setError('Failed to fetch users');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchAllUserRoles = async () => {
        try {
            const url = `http://localhost:8000/getAllUserRole`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setAllUserRoles(data.roles); // Set allUserRoles with the roles array from the response
            } else {
                setError('Failed to fetch user roles');
            }
        } catch (error) {
            setError(error.message);
        }
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
    console.log("users" + allUsers);
    console.log("roles" + allUserRoles);
    return (
        <div>
            <AdminAction />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card text-center p-5">
                            <h1 className="text-3xl font-semibold">Assign Role</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group justify-content-center align-items-center">
                                    <div className="col-auto p-2">
                                        <input type="text" className="form-control" id="email" name="email" onChange={handleChange} aria-label="..." value={formData.email} required />
                                        <select id="dropdown" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption} required>
                                            <option value="">Select Role</option>
                                            {roleData.map((item) => (
                                                <option key={item.id} value={item.id}>{item.role_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-auto p-2">
                                        <button type="submit" className="btn btn-success">
                                            {loading ? 'Assigning...' : 'Assign Role'}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    {error && <p className="text-danger">{error}</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">User List</h5>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Email ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUsers.map((user) => {
                                            const isUserRolePresent = allUserRoles.some(role => role.userID === user.id);
                                            if (!isUserRolePresent && user.active) {
                                                return (
                                                    <tr key={user.id}>
                                                        <td>{user.emailID}</td>
                                                    </tr>
                                                );
                                            }
                                            return null;
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}