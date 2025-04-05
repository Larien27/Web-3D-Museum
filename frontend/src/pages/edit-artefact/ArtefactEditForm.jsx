import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ArtefactEditForm() {
    const { artefactId } = useParams();
    const [file, setFile] = useState(null);
    const [artefactData, setArtefactData] = useState({
        title: '',
        description: '',
    });
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchArtefact() {
            try {
                const response = await axios.get(`/api/artefacts/${artefactId}`);
                setArtefactData({ title: response.data.title, description: response.data.description });
            } catch (err) {
                setError('Failed to load artefact.');
            }
        }

        fetchArtefact();
    }, [artefactId]);

    const handleChange = (e) => {
        setArtefactData({ ...artefactData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage({ type: 'error', text: 'Please select a file.' });
            return;
        }

        const formData = new FormData();
        formData.append('modelFile', file);
        formData.append('title', artefactData.title);
        formData.append('description', artefactData.description);

        try {
            const response = await axios.post(`/api/artefacts/${exhibitionId}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201) {
                setMessage({ type: 'success', text: 'Artefact uploaded successfully.' });
                setFile(null);
                setArtefactData({ title: '', description: '' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Artefact upload failed' });
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this artefact?');
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`/api/artefacts/${artefactId}`);
            const { exhibitionId } = response.data;
            navigate(`/exhibitions/${exhibitionId}`);
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to delete artefact' });
        }
    }

    return (
        <div>
            <h1>Edit artefact</h1>
            {message && <p className={message.type}>{message.text}</p>}
            
            <form onSubmit={handleUpload}>
                <label for='artefactTitle'>Title</label>
                <input type='text' id='artefactTitle' name='title' value={artefactData.title} onChange={handleChange} />

                <label for='artefactDescription'>Description</label>
                <textarea id='artefactDescription' name='description' value={artefactData.description} onChange={handleChange}></textarea>

                <button type='submit'>Update</button>
                <button type='button' onClick={handleDelete}>Delete</button>
            </form>
        </div>
    )
}

export default ArtefactEditForm;