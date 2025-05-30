import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './DetailPanel.scss';

function DetailPanel({ artefactId }) {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const [artefact, setArtefact] = useState(null);

    useEffect(() => {
        if (!artefactId) return;

        async function fetchArtefact() {
            try {
                const response = await axios.get(`/api/artefacts/${artefactId}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setArtefact(response.data);
            } catch (err) {
                showToast('error', 'Failed to load artefact.');
            }
        }

        fetchArtefact();
    }, [artefactId, user]);

    if (!artefact) return null;

    return(
        <div id='detail-panel'>
            <button className='close-btn' onClick={() => setArtefact(null)}>×</button>
            <h2>{artefact.title}</h2>
            <p>{artefact.description}</p>
        </div>
    );
}

export default DetailPanel;
