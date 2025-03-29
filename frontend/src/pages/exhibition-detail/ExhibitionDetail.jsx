import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ExhibitionDetail() {
    const { exhibitionId } = useParams();
    const [exhibition, setExhibition] = useState(null);
    const [artefacts, setArtefacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchExhibition() {
            try {
                const response = await axios.get(`/api/exhibitions/${exhibitionId}`);
                setExhibition(response.data);
            } catch (err) {
                setError('Failed to load exhibition.');
            }
        }

        async function fetchArtefacts() {
            try {
                const response = await axios.get(`/api/artefacts/exhibition/${exhibitionId}`);
                setArtefacts(response.data);
            } catch (err) {
                setError('Failed to load exhibition.');
            }
        }

        fetchExhibition();
        fetchArtefacts();

    }, [exhibitionId]);

    if (error) return <p className='error'>{error}</p>;
    if (!exhibition) return <p>Loading</p>;

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

            <Link to={`/artefacts/${exhibitionId}/create-artefact`}>Add Artefact</Link>
            <Link to={`/exhibitions/${exhibitionId}/edit`}>Edit</Link>

            <Link to={`/exhibitions/3d/${exhibitionId}`}>
                <button>View 3D Exhibition</button>
            </Link>
        </div>
    );
}

export default ExhibitionDetail;