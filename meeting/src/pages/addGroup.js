import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';

export default function AddGroup() {
    const [formData, setFormData] = useState({
        group_name: '',
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
        
        setError(false);
        console.log(error);
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
            const url = `http://localhost:8000/addGroup`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    group_name:formData.group_name
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            else {
                setmsg(`Group ${formData.group_name} Added!`);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
            //window.location.reload(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    //console.log(tableData);
    console.log(formData);
    return (
        <div>
            <AdminAction />
            <div class="container col-lg-6 col-sm-8 card text-center mt-3 p-5">
                <h1 className="text-3xl font-semibold text-center">Add New Group</h1>
                <div class="card-body ">

                    <form onSubmit={handleSubmit}>
                        <div class="input-group justify-content-center align-items-center">
                            <div class="col-auto p-2">
                                <input type="text" class="form-control" id="group_name" name="group_name" onChange={handleChange} aria-label="..." value={formData.group_name} required />
                            </div>
                            <div class="col-auto p-2">
                                <button type="submit" class="btn btn-success input-group-btn">
                                    {loading ? 'Adding...' : 'Add Group'}
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