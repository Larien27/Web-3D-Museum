import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ArtefactDetail() {
    const { artefactId } = useParams();
    const [artefact, setArtefact] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchArtefact() {
            try {
                const response = await axios.get(`/api/artefacts/${artefactId}`);
                setArtefact(response.data);
            } catch (err) {
                setError('Failed to load artefact.');
            }
        }

        fetchArtefact();
    }, [artefactId]);

    if (error) return <p className='error'>{error}</p>;
    if (!artefact) return <p>Loading</p>;

    return(
        <div id='artefact-detail'>
            <h1>{artefact.title}</h1>
            <p>{artefact.description}</p>
            <p>{/*artefact.file_path*/}</p>
        </div>
    );
}

export default ArtefactDetail;