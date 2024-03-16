import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';

export default function AddKeyword() {
    const [formData, setFormData] = useState({
        keyword: '',
    });
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [msg, setmsg] = useState('');
    // State to store the selected option
    const [selectedOption, setSelectedOption] = useState('');
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const url = `http://localhost:8000/getroles`;
        const response = await fetch(url);
        const data = await response.json();
        setTableData(data.roles);
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
            const url = `http://localhost:8000/assignKeyword`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    role_id: selectedOption,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            else {
                setmsg(`keyword ${formData.keyword} Added!`);
            }
            window.location.reload(false);
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
                <h1 className="text-3xl font-semibold text-center">Add New Keyword</h1>
                <div class="card-body ">

                    <form onSubmit={handleSubmit}>
                        <div>
                            <select id="dropdown" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption} required>
                                <option value="">Select Role</option>
                                {tableData.map((item) => (
                                    <option key={item.id} value={item.id}>{item.role_name}</option>
                                ))}
                            </select>

                        </div>
                        <div class="input-group justify-content-center align-items-center">
                            <div class="col-auto p-2">
                                <input type="text" class="form-control" id="keyword" name="keyword" onChange={handleChange} aria-label="..." value={formData.keyword} required />
                            </div>
                            <div class="col-auto p-2">
                                <button type="submit" class="btn btn-success input-group-btn">
                                    {loading ? 'Adding...' : 'Add Keyword'}
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