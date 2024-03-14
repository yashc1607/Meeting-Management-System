import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';

export default function AssignGroup() {
    const [formData, setFormData] = useState({
        email: ''
    });
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [msg, setmsg] = useState('');
    // State to store the selected option
    const [selectedOption, setSelectedOption] = useState('');
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
        const url = `http://localhost:8000/getGroups`;
        const response = await fetch(url);
        const data = await response.json();
        setTableData(data.groups);
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
                    const url = `http://localhost:8000/assignGroup`;
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            group_id: selectedOption,
                            user_id: data1.user.id // Use data1.user_id instead of formData.user_id
                        }),
                    });
                    console.log(res);
                    const data = await res.json();
                    setLoading(false);
                    if (data.success === false) {
                        setError(data.message);
                    } else {
                        setError('User added to group');
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
    
    //console.log(tableData);
    //console.log(formData);
    return (
        <div>
            <AdminAction />
            <div class="container col-lg-6 col-sm-8 card text-center mt-3 p-5">
                <div class="card-header">
                    <h1 className="text-3xl font-semibold text-center">Assign Group</h1>
                </div>
                <div class="card-body ">
                    <form onSubmit={handleSubmit}>
                        <div class="input-group">

                            <input type="text" class="form-control" id="email" name="email" onChange={handleChange} aria-label="..." value={formData.email} required />
                            { <select id="dropdown" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption} required>
                                <option value="">Select Group</option>
                                {tableData.map((item) => (
                                    <option key={item.id} value={item.id}>{item.group_name}</option>
                                ))}
                            </select> }
                            
                            <button type="submit" class="btn btn-success input-group-btn">
                                {loading ? 'Assigning...' : 'Assign Group'}
                            </button>
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