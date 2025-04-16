import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Artefact from '../3d-artefact/Artefact';
import './ArtefactDetail.scss';

function ArtefactDetail() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const { artefactId } = useParams();
    const [artefact, setArtefact] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchArtefact() {
            try {
                const response = await axios.get(`/api/artefacts/${artefactId}`);
                setArtefact(response.data);
            } catch (err) {
                showToast('error', 'Failed to load artefact.');
            }
        }

        async function checkFavorite() {
            if (!user) return;
            try {
                const response = await axios.get(`/api/favorites/artefact/${artefactId}`, {
                    headers: { Authorization: `Bearer ${user.token}`}
                });
                setIsFavorite(response.data.isFavorite);
            } catch (err) {
                showToast('error', 'Error checking favorite.');
            }
        }

        fetchArtefact();
        checkFavorite();
    }, [artefactId, user]);

    async function toggleFavorite() {
        if (!user) {
            showToast('error', 'You must be logged in to add favorites.');
            return;
        }

        try {
            if (isFavorite) {
                await axios.delete(`/api/favorites/artefact/${artefactId}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            } else {
                await axios.post(`/api/favorites/artefact/${artefactId}`, {}, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            }
            setIsFavorite(!isFavorite);
        } catch (err) {
            showToast('error', 'Error toggling favorite.');
        }
    }

    const handleReportButtonClick = () => {
        navigate(`/artefacts/${artefactId}/report-form`);
    };

    if (!artefact) return <p>Loading</p>;

    return(
        <div id='artefact-detail'>
            <h1>{artefact.title}</h1>
            <p>{artefact.description}</p>
            <Artefact artefactUrl={artefact.file_path} />

            <button onClick={toggleFavorite}>
                {isFavorite ? '❤️' : '🤍'}
            </button>

            <button onClick={handleReportButtonClick}>🚩</button>

            <Link to={`/artefacts/${artefactId}/edit`}>Edit</Link>
        </div>
    );
}

export default ArtefactDetail;