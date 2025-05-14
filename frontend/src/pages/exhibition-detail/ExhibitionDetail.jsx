import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useLoading } from '../../context/LoadingContext';
import axios from 'axios';
import './ExhibitionDetail.scss';

function ExhibitionDetail() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const { showLoading, hideLoading } = useLoading();
    const { exhibitionId } = useParams();
    const [exhibition, setExhibition] = useState(null);
    const [artefacts, setArtefacts] = useState([]);

    useEffect(() => {
        async function fetchExhibition() {
            showLoading();
            try {
                const response = await axios.get(`/api/exhibitions/${exhibitionId}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setExhibition(response.data);
            } catch (err) {
                showToast('error', 'Failed to load exhibition.');
            } finally {
                hideLoading();
            }
        }

        async function fetchArtefacts() {
            showLoading();
            try {
                const response = await axios.get(`/api/artefacts/exhibition/${exhibitionId}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setArtefacts(response.data);
            } catch (err) {
                showToast('error', 'Failed to load exhibition artefacts.');
            } finally {
                hideLoading();
            }
        }

        fetchExhibition();
        fetchArtefacts();

    }, [exhibitionId]);

    if (!exhibition) return null;
    const canEdit = user.role === 'Admin' || user.id === exhibition.creator_id;

    return(
        <div id='exhibition-detail'>
            <h1>{exhibition.title}</h1>
            
            {exhibition.imageUrl && (
            <div className='exhibition-image-wrapper'>
                <img src={exhibition.imageUrl} alt={exhibition.title} />
            </div>
            )}

            <p className='description'>{exhibition.description}</p>

            {artefacts.length > 0 ? (
                <div className='artefacts-section'>
                    <h2>Artefacts</h2>
                    <div className='artefacts-grid'>
                        {artefacts.map((artefact) => (
                            <Link key={artefact.id} to={`/artefacts/${artefact.id}`} className='artefact-tile'>{artefact.title}</Link>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No artefacts found for this exhibition.</p>
            )}
            <div className='actions'>
                <Link to={`/exhibitions/${exhibitionId}/3d`} className='colorful-button'>View 3D Exhibition</Link>
                {canEdit && (
                    <>
                        <Link to={`/artefacts/${exhibitionId}/create-artefact`} className='secondary-button'>Add Artefact</Link>
                        <Link to={`/exhibitions/${exhibitionId}/edit`} className='secondary-button'>Edit</Link>
                        <Link to={`/exhibitions/${exhibitionId}/scene-editor`} className='secondary-button'>Exhibition Editor</Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default ExhibitionDetail;