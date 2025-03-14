import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ExhibitionCreateForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/exhibitions/create', formData);

            if (response.status === 201) {
                setMessage({ type: 'success', text: 'Exhibition created successfully!' });
                navigate(`/exhibitions/${response.data.exhibitionId}`);
            }

        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Exhibition creation failed' });
        }
    }

    return(
        <div id='exhibition-create-form'>
            <h1>Create New Exhibition</h1>
            {message && <p className={message.type}>{message.text}</p>}
            <form onSubmit={handleSubmit}>
                <label for='title'>Title</label>
                <input type='text' id='exhibitionTitle' name='title' value={formData.title} onChange={handleChange} />

                <label for='description'>Description</label>
                <textarea id='exhibitionDescription' name='description' value={formData.description} onChange={handleChange}></textarea>

                <button type='submit'>Create</button>
            </form>
        </div>
    );
}

export default ExhibitionCreateForm;