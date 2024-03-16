import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';
export default function RemoveAssignedGroup() {
    const [formData, setFormData] = useState({
        user_id: 0,
        group_id: 0
    });
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [groupData, setGroupData] = useState([]);
    const [allGroupData, setAllGroupData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            const url = `http://localhost:8000/getUser`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email_id: formData.email_id
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (!data.ok) {
                setError("User not found!");
            } else {
                setFormData({
                    ...formData,
                    'user_id': data.user.id,
                });
                await fetchUserGroups(data.user.id);
                await fetchGroups();
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const fetchUserGroups = async (userId) => {
        try {
            const url = `http://localhost:8000/getUserGroups`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setGroupData(data.groups);
            } else {
                setError('Failed to fetch user groups');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchGroups = async (userId) => {
        try {
            const url = `http://localhost:8000/getGroups`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setAllGroupData(data.groups);
            } else {
                setError('Failed to fetch user groups');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:8000/removeAssignedGroup`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: selectedOption
                }),
            });
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
            } else {
                setError('User removed from group');
                // Optionally update state to reflect changes without reloading
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    console.log(groupData);
    console.log(allGroupData);
    return (
        <div>
            <AdminAction />
            <div className="container col-lg-6 col-sm-8 card text-center mt-3 p-5">
                <div className="card-header">
                    <h1 className="text-3xl font-semibold text-center">Remove Assigned Group</h1>
                </div>
                <div className="card-body">
                    <form onSubmit={handleUserSubmit}>
                        <div className="input-group">
                            <input type="text" className="form-control" id="email_id" name="email_id" onChange={handleChange} aria-label="..." value={formData.email_id} required />
                            <button type="submit" className="btn btn-success input-group-btn">
                                {loading ? 'Searching...' : 'Search User'}
                            </button>
                        </div>
                    </form>
                    {formData.user_id>0 &&
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <select onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption} required>
                                    <option value="">Select Group</option>
                                    {groupData.map((item) => {
                                        const correspondingGroup = allGroupData.find(group => group.id === item.groupID);
                                        const groupName = correspondingGroup ? correspondingGroup.group_name : "";
                                        return (
                                            <option key={item.id} value={item.id}>{groupName}</option>
                                        );
                                    })}
                                </select>
                                <button type="submit" className="btn btn-danger input-group-btn">
                                    {loading ? 'Removing...' : 'Remove Group'}
                                </button>
                            </div>
                        </form>
                    }
                    <div>
                        {error && <p className="text-danger">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
