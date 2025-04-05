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
                setMessage({ type: 'error', text: 'Failed to load artefact.' });
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

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) formData.append('modelFile', file);
        formData.append('title', artefactData.title);
        formData.append('description', artefactData.description);

        try {
            const response = await axios.put(`/api/artefacts/${artefactId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                setMessage({ type: 'success', text: 'Artefact updated successfully.' });
                navigate(`/artefacts/${artefactId}`);
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Artefact update failed.' });
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
            
            <form onSubmit={handleUpdate}>
                <label for='artefactTitle'>Title</label>
                <input type='text' id='artefactTitle' name='title' value={artefactData.title} onChange={handleChange} />

                <label for='artefactDescription'>Description</label>
                <textarea id='artefactDescription' name='description' value={artefactData.description} onChange={handleChange}></textarea>

                <label for='fileUpload'>Replace 3D model (optional)</label>
                <input type='file' accept='.glb,.gltf,.obj,.fbx' id='fileUpload' name='modelFile' onChange={handleFileChange} />

                <button type='submit'>Update</button>
                <button type='button' onClick={handleDelete}>Delete</button>
            </form>
        </div>
    )
}

export default ArtefactEditForm;