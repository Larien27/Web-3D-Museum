import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import axios from 'axios';

function ArtefactUploadForm() {
    const { showToast } = useToast();
    const { exhibitionId } = useParams();
    const [file, setFile] = useState(null);
    const [artefactData, setArtefactData] = useState({
        title: '',
        description: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setArtefactData({ ...artefactData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            showToast('error', 'Please select a file.');
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
                const { artefactId } = response.data;
                showToast('success', 'Artefact uploaded successfully.');
                setFile(null);
                setArtefactData({ title: '', description: '' });
                navigate(`/artefacts/${artefactId}`);
            }
        } catch (error) {
            showToast('error', 'Artefact upload failed');
        }
    };

    return (
        <div>
            <h1>New artefact</h1>
            
            <form onSubmit={handleUpload}>
                <label for='artefactTitle'>Title</label>
                <input type='text' id='artefactTitle' name='title' value={artefactData.title} onChange={handleChange} />

                <label for='artefactDescription'>Description</label>
                <textarea id='artefactDescription' name='description' value={artefactData.description} onChange={handleChange}></textarea>

                <label for='fileUpload'>Upload 3D model</label>
                <input type='file' accept='.glb,.gltf,.obj,.fbx' id='fileUpload' name='modelFile' onChange={handleFileChange} />

                <button type='submit'>Upload</button>
            </form>
        </div>
    )
}

export default ArtefactUploadForm;