import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';

export default function DeleteKeyword() {
    const [formData, setFormData] = useState({
        rolekeyword_id: 0,
        role_id:0
    });
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [roleData, setRoleData] = useState([]);
    const [keywordData, setKeywordData] = useState([]);
    const [msg, setmsg] = useState('');
    // State to store the selected option
    const [selectedRole, setSelectedRole] = useState(0);
    const [selectedKeyword, setSelectedKeyword] = useState(0);
    
    useEffect(() => {
        if (selectedRole) {
            fetchKeywordData();
        }
    }, [selectedRole]);
    const fetchKeywordData = async () => {
        const url = `http://localhost:8000/getAssignedKeywords`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role_id:selectedRole
            }),
        });
        const data = await response.json();
        setKeywordData(data.keywords);
        console.log(keywordData);
    };
    useEffect(() => {
        fetchRoleData();
    }, []);
    const fetchRoleData = async () => {
        const url = `http://localhost:8000/getroles`;
        const response = await fetch(url);
        const data = await response.json();
        setRoleData(data.roles);
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            setLoading(true);
            setError(false);
            const url = `http://localhost:8000/removeAssignedKeyword`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rolekeyword_id:selectedKeyword
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }else{
                window.location.reload(false);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    console.log(keywordData);
    return (
        <div>
            <AdminAction />
            <div class="container col-lg-6 col-sm-8 card text-center mt-3 p-5">
                <div class="card-header">
                    <h1 className="text-3xl font-semibold text-center">Delete Keyword</h1>
                </div>
                <div class="card-body ">
                    <form onSubmit={handleSubmit}>
                        <div class="input-group">
                            <select id="dropdown" onChange={(e) => setSelectedRole(e.target.value)} value={selectedRole} required>
                                <option value="">Select Role</option>
                                {roleData.map((item) => (
                                    <option key={item.id} value={item.id}>{item.role_name}</option>
                                ))}
                            </select>
                            <select id="dropdown" onChange={(e) => setSelectedKeyword(e.target.value)} value={selectedKeyword} required>
                                <option value="">Select Keyword</option>
                                {keywordData.map((item) => (
                                    <option key={item.id} value={item.id}>{item.keyword}</option>
                                ))} 
                            </select>
                            <button type="submit" class="btn btn-danger input-group-btn">
                                {loading ? 'Deleting...' : 'Delete Keyword'}
                            </button>
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