import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

function ExhibitionEditForm() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const { exhibitionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchExhibition() {
            try {
                const response = await axios.get(`/api/exhibitions/${exhibitionId}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });

                const exhibition = response.data;
                if (
                    user.role !== 'Admin' &&
                    !(user.role === 'Exhibitor' && exhibition.creator_id === user.id)
                ) {
                    showToast('error', 'You do not have permission to access this page.');
                    navigate('/exhibition-list');
                    return;
                };
                
                setFormData({ title: response.data.title, description: response.data.description });
            } catch (err) {
                showToast('error', 'Failed to load exhibition.');
            }
        }

        fetchExhibition();
    }, [exhibitionId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`/api/exhibitions/${exhibitionId}/edit`, formData, {
                headers: { Authorization: `Bearer ${user.token}` },
            });

            if (response.status === 200) {
                showToast('success', 'Exhibition updated successfully!');
                navigate(`/exhibitions/${exhibitionId}`);
            }

        } catch (error) {
            showToast('error', error.response?.data?.message || 'Exhibition update failed');
        }
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this exhibition?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/exhibitions/${exhibitionId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            showToast('success', 'Exhibition deleted successfully!');
            navigate('/exhibition-list');
        } catch (error) {
            showToast('error', error.response?.data?.message || 'Failed to delete exhibition');
        }
    }

    return(
        <div id='exhibition-edit-form'>
            <h1>Edit Exhibition</h1>
            <form onSubmit={handleSubmit}>
                <label for='title'>Title</label>
                <input type='text' id='exhibitionTitle' name='title' value={formData.title} onChange={handleChange} />

                <label for='description'>Description</label>
                <textarea id='exhibitionDescription' name='description' value={formData.description} onChange={handleChange}></textarea>

                <button type='submit'>Update</button>
                <button type='button' onClick={handleDelete}>Delete</button>
            </form>
        </div>
    );
}

export default ExhibitionEditForm;