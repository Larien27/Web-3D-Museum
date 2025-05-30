import axios from 'axios';
import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

function ReportForm() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const { artefactId } = useParams();
    const [formData, setFormData] = useState({
        reason: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (!user) {
            showToast('error', 'You must be logged in to report artefacts.');
            return;
        }

        try {
            await axios.post(`/api/reports/artefact/${artefactId}`,
                { reason: formData.reason },
                { headers: { Authorization: `Bearer ${user.token}` }},
            );
            showToast('success', 'Artefact report submitted successfully.');
            navigate(`/artefacts/${artefactId}/`);
        } catch (err) {
            showToast('error', 'Error submitting artefact report.');
        }
    }

    return(
        <div id='reportForm'>
            <h1>Report the artefact</h1>
            <form onSubmit={handleSubmit}>
                <label for='reason'>Reason</label>
                <textarea id='reason' name='reason' value={formData.reason} onChange={handleChange} rows='8'></textarea>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReportForm;