import axios from 'axios';
import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function ReportForm() {
    const { user } = useContext(AuthContext);
    const { artefactId } = useParams();
    const [formData, setFormData] = useState({
        reason: '',
    });
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (!user) {
            alert('You must be logged in to report artefacts.');
            return;
        }

        try {
            await axios.post(`/api/reports/artefact/${artefactId}`,
                { reason: formData.reason },
                { headers: { Authorization: `Bearer ${user.token}` }},
            );
            setMessage({ type: 'success', text: 'Artefact report submitted successfully.' });
            navigate(`/artefacts/${artefactId}/`);
        } catch (err) {
            setMessage({ type: 'error', text: 'Error submitting artefact report.' });
        }
    }

    return(
        <div id='reportForm'>
            <h1>Report the artefact</h1>
            {message && <p className={message.type}>{message.text}</p>}
            <form onSubmit={handleSubmit}>
                <label for='reason'>Reason</label>
                <textarea id='reason' name='reason' value={formData.reason} onChange={handleChange} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReportForm;