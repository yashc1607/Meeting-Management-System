import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';

export default function AssignGroup() {
    const [formData, setFormData] = useState({
        email: ''
    });
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [tableData, setTableData] = useState([]);
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
        try {
            const url = `http://localhost:8000/getGroups`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setTableData(data.groups);
            } else {
                throw new Error('Failed to fetch groups');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
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
                    email_id: formData.email
                }),
            });

            if (res.ok) {
                const data1 = await res.json();
                if (data1.ok) {
                    await assignGroup(data1);
                } else {
                    setError('User not found');
                }
            } else {
                setError('Failed to fetch user');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const assignGroup = async (data1) => {
        try {
            const url = `http://localhost:8000/getUserGroups`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: data1.user.id
                }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data.groups);
                console.log(selectedOption);
                const groupIDs = data.groups.map(group => group.groupID);
                console.log(groupIDs);
                const alreadyInGroup = groupIDs.includes(Number(selectedOption));
                for (let i = 0; i < data.groups.length; i++) {
                    if(data.groups[i].groupID === selectedOption){
                        console.log("mil gaya");
                    }
                }
                console.log(typeof selectedOption);
                console.log(typeof data.groups[0].groupID);
                if (alreadyInGroup) {
                    setError('User already part of group!');
                } else {
                    const assignRes = await fetch(`http://localhost:8000/assignGroup`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            group_id: selectedOption,
                            user_id: data1.user.id 
                        }),
                    });
                    const assignData = await assignRes.json();

                    if (assignRes.ok && assignData.success) {
                        setError('User added to group!');
                    } else {
                        setError(assignData.message || 'Failed to assign group');
                    }
                }
            } else {
                setError('Failed to get user groups');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <AdminAction />
            <div className="container col-lg-6 col-sm-8 card text-center mt-3 p-5">
                <h1 className="text-3xl font-semibold text-center">Assign Group</h1>
                <div className="card-body ">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group justify-content-center align-items-center">
                            <div className="col-auto p-2">
                                <input type="text" className="form-control" id="email" name="email" onChange={handleChange} aria-label="..." value={formData.email} required />
                                <select id="dropdown" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption} required>
                                    <option value="">Select Group</option>
                                    {tableData.map((item) => (
                                        <option key={item.id} value={item.id}>{item.group_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-auto p-2">
                                <button type="submit" className="btn btn-success input-group-btn" disabled={loading}>
                                    {loading ? 'Assigning...' : 'Assign Group'}
                                </button>
                            </div>
                        </div>
                        <div>
                            {error && <p className="text-danger">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
