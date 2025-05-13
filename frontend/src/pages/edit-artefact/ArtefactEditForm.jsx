import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import axios from 'axios';

function ArtefactEditForm() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const { artefactId } = useParams();
    const [file, setFile] = useState(null);
    const [artefactData, setArtefactData] = useState({
        title: '',
        description: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchArtefact() {
            try {
                const response = await axios.get(`/api/artefacts/${artefactId}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setArtefactData({ title: response.data.title, description: response.data.description });
            } catch (err) {
                showToast('error', 'Failed to load artefact.');
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
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.status === 200) {
                showToast('success', 'Artefact updated successfully.');
                navigate(`/artefacts/${artefactId}`);
            }
        } catch (error) {
            showToast('error', 'Artefact update failed.');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this artefact?');
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`/api/artefacts/${artefactId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const { exhibitionId } = response.data;
            showToast('success', 'Artefact deleted successfully.');
            navigate(`/exhibitions/${exhibitionId}`);
        } catch (error) {
            showToast('error', error.response?.data?.message || 'Failed to delete artefact');
        }
    }

    return (
        <div id='artefact-edit-form'>
            <h1>Edit artefact</h1>
            
            <form onSubmit={handleUpdate}>
                <label for='artefactTitle'>Title</label>
                <input type='text' id='artefactTitle' name='title' value={artefactData.title} onChange={handleChange} />

                <label for='artefactDescription'>Description</label>
                <textarea id='artefactDescription' name='description' value={artefactData.description} onChange={handleChange} rows='8'></textarea>

                <label for='fileUpload'>Replace 3D model<br></br>(optional)</label>
                <input type='file' accept='.glb,.gltf' id='fileUpload' name='modelFile' onChange={handleFileChange} />

                <button type='submit'>Update</button>
                <button type='button' className='secondary-button' onClick={handleDelete}>Delete</button>
            </form>
        </div>
    )
}

export default ArtefactEditForm;