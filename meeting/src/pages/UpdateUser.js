import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';

export default function UpdateUser() {
    const [formData, setFormData] = useState({
        emailId: '',
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
            console.log(formData);
            setLoading(true);
            setError(false);
            const res = await fetch('/api/proposal/uploadProposal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    email: currentUser.email,
                    name: currentUser.name,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            window.location.reload(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    //console.log(formData);
    return (
        <div>
            <AdminAction />
            <div class="container col-lg-6 col-sm-8 card text-center mt-3 p-5">
                <div class="card-header">
                    <h1 className="text-3xl font-semibold text-center">Delete User</h1>
                </div>
                <div class="card-body ">
                    <form onSubmit={handleSubmit}>
                    <div class="input-group">
                        <input type="text" class="form-control" id="emailId" name="emailId" onChange={handleChange} aria-label="..." value={formData.emailId}/>
                            <button type="submit" class="btn btn-danger input-group-btn">
                            {loading ? 'Deleting...' : 'Delete User'}
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