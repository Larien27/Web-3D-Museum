import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

function ArtefactDetail() {
    const { artefactId } = useParams();
    const { user } = useContext(AuthContext);
    const [artefact, setArtefact] = useState(null);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchArtefact() {
            try {
                const response = await axios.get(`/api/artefacts/${artefactId}`);
                setArtefact(response.data);
            } catch (err) {
                setError('Failed to load artefact.');
            }
        }

        async function checkFavorite() {
            if (!user) return;
            try {
                const response = await axios.get(`/api/artefacts/${artefactId}/favorite`, {
                    headers: { Authorization: `Bearer ${user.token}`}
                });
                setIsFavorite(response.data.isFavorite);
            } catch (err) {
                setError('Error checking favorite.')
            }
        }

        fetchArtefact();
        checkFavorite();
    }, [artefactId, user]);

    async function toggleFavorite() {
        if (!user) {
            alert('You must be logged in to add favorites.');
            return;
        }

        try {
            if (isFavorite) {
                await axios.delete(`/api/artefacts/${artefactId}/favorite`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            } else {
                await axios.post(`/api/artefacts/${artefactId}/favorite`, {}, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            }
            setIsFavorite(!isFavorite);
        } catch (err) {
            setError('Error toggling favorite.');
        }
    }

    const handleReportButtonClick = () => {
        navigate(`/artefacts/${artefactId}/report-form`);
    };

    if (error) return <p className='error'>{error}</p>;
    if (!artefact) return <p>Loading</p>;

    return(
        <div id='artefact-detail'>
            <h1>{artefact.title}</h1>
            <p>{artefact.description}</p>
            <p>{/*artefact.file_path*/}</p>

            <button onClick={toggleFavorite}>
                {isFavorite ? '❤️' : '🤍'}
            </button>

            <button onClick={handleReportButtonClick}>🚩</button>
        </div>
    );
}

export default ArtefactDetail;