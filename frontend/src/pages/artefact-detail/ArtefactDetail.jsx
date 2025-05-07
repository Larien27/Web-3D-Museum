import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useLoading } from '../../context/LoadingContext';
import Artefact from '../3d-artefact/Artefact';
import './ArtefactDetail.scss';

function ArtefactDetail() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const { showLoading, hideLoading } = useLoading();
    const { artefactId } = useParams();
    const [artefact, setArtefact] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchArtefact() {
            showLoading();
            try {
                const response = await axios.get(`/api/artefacts/${artefactId}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setArtefact(response.data);
            } catch (err) {
                showToast('error', 'Failed to load artefact.');
            } finally {
                setTimeout(() => {
                    hideLoading();
                }, 500);
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
            if (isFavorite) {
                showToast('success', 'Artefact removed from favorites.');
            }
            else {
                showToast('success', 'Artefact added to favorites.');
            }
        } catch (err) {
            showToast('error', 'Error toggling favorite.');
        }
    }

    const handleReportButtonClick = () => {
        navigate(`/artefacts/${artefactId}/report-form`);
    };

    if (!artefact) return null;

    const canEdit = user.role === 'Admin' || user.id === artefact.exhibition_creator_id;

    return(
        <div id='artefact-detail'>
            <h1>{artefact.title}</h1>
            <button onClick={toggleFavorite}>
                {isFavorite ? '❤️' : '🤍'}
            </button>
            <button onClick={handleReportButtonClick}>🚩</button>
            {canEdit &&
                <Link to={`/artefacts/${artefactId}/edit`}>Edit</Link>
            }

            <Artefact artefactUrl={artefact.file_path} />
            <p>{artefact.description}</p>
        </div>
    );
}

export default ArtefactDetail;