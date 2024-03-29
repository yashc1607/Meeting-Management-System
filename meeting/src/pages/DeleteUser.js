import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';

export default function DeleteUser() {
    const [formData, setFormData] = useState({
        email_id: '',
    });
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
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
                    email_id: formData.email_id
                }),
            });
            console.log(res);
            const data1 = await res.json();
            if(data1.ok) {
                try {
                    const url = `http://localhost:8000/removeUser`;
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email_id: formData.email_id
                        }),
                    });
                    console.log(res);
                    const data = await res.json();
                    setLoading(false);
                    console.log(data);
                    if (data.success === false) {
                        setError(data.message);
                    }
                    else{
                        setError('User Removed');
                    } 
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            }else {
                setError('user not found');
                setLoading(false);
            }  
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    console.log(formData);
    return (
        <div>
            <AdminAction />
            <div class="container col-lg-6 col-sm-8 card text-center mt-3 p-5" style={{width: '40rem'}}>
                <h1 className="text-3xl font-semibold text-center">Delete User</h1>
                <div class="card-body ">
                    <form onSubmit={handleSubmit}>
                        <div class="input-group justify-content-center align-items-center">
                            <div class="col-auto p-2">
                                <input type="text" class="form-control" id="email_id" name="email_id" onChange={handleChange} aria-label="..." value={formData.email_id} required/>
                            </div>
                            <div class="col-auto p-2">
                                <button type="submit" class="btn btn-danger input-group-btn">
                                    {loading ? 'Deleting...' : 'Delete User'}
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