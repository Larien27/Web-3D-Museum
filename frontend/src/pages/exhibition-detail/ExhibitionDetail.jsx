import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import axios from 'axios';

function ExhibitionDetail() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const { exhibitionId } = useParams();
    const [exhibition, setExhibition] = useState(null);
    const [artefacts, setArtefacts] = useState([]);

    useEffect(() => {
        async function fetchExhibition() {
            try {
                const response = await axios.get(`/api/exhibitions/${exhibitionId}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setExhibition(response.data);
            } catch (err) {
                showToast('error', 'Failed to load exhibition.');
            }
        }

        async function fetchArtefacts() {
            try {
                const response = await axios.get(`/api/artefacts/exhibition/${exhibitionId}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setArtefacts(response.data);
            } catch (err) {
                showToast('error', 'Failed to load exhibition artefacts.');
            }
        }

        fetchExhibition();
        fetchArtefacts();

    }, [exhibitionId]);

    if (!exhibition) return <p>Loading</p>;
    const canEdit = user.role === 'Admin' || user.id === exhibition.creator_id;

    return(
        <div id='exhibition-detail'>
            <h1>{exhibition.title}</h1>
            <img>{exhibition.imageUrl}</img>
            <p>{exhibition.description}</p>

            {artefacts.length > 0 ? (
                <ul>
                    {artefacts.map((artefact) => (
                        <li key={artefact.id}>
                            <Link to={`/artefacts/${artefact.id}`}>{artefact.title}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No artefacts found for this exhibition.</p>
            )}

            <span className='colorful-button'><Link to={`/exhibitions/${exhibitionId}/3d`}>View 3D Exhibition</Link></span>
            {canEdit && (
                <>
                    <Link to={`/artefacts/${exhibitionId}/create-artefact`}>Add Artefact</Link>
                    <Link to={`/exhibitions/${exhibitionId}/edit`}>Edit</Link>
                    <Link to={`/exhibitions/${exhibitionId}/scene-editor`}>Exhibition Editor</Link>
                </>
            )}
        </div>
    );
}

export default ExhibitionDetail;