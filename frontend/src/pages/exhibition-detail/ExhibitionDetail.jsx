import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ExhibitionDetail() {
    const { exhibitionId } = useParams();
    const [exhibition, setExhibition] = useState(null);
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

        fetchExhibition();
    }, [exhibitionId]);

    if (error) return <p className='error'>{error}</p>;
    if (!exhibition) return <p>Loading</p>;

    return(
        <div id='exhibition-detail'>
            <h1>{exhibition.title}</h1>
            <img>{exhibition.imageUrl}</img>
            <p>{exhibition.description}</p>

            {/* {exhibition.artefacts.map((artefact) =>(
                <li>{artefact.title}</li>
            ))} */}
        </div>
    );
}

export default ExhibitionDetail;