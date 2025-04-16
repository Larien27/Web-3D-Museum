import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

function ExhibitionEditForm() {
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
                const response = await axios.get(`/api/exhibitions/${exhibitionId}`);
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
            const response = await axios.put(`/api/exhibitions/${exhibitionId}/edit`, formData);

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
            await axios.delete(`/api/exhibitions/${exhibitionId}`);
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