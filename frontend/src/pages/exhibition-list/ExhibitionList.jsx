import { useEffect, useState } from 'react';
import axios from 'axios';
import './ExhibitionList.scss';
import ExhibitionBox from './ExhibitionBox';

function ExhibitionList() {
    const [exhibitions, setExhibitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchExhibitions() {
            try {
                const response = await axios.get('/api/exhibitions');
                setExhibitions(response.data);
            } catch (err) {
                setError('Failed to load exhibitions.');
            } finally {
                setLoading(false);
            }
        }

        fetchExhibitions();
    });

    if (loading) return <p>Loading exhibitions...</p>;
    if (error) return <p className='error'>{error}</p>;

    return(
        <div id='exhibition-list'>
            <h1>Current Exhibitions</h1>
            
                {exhibitions.length > 0 ? (
                    <ul>
                    {exhibitions.map((exhibition) => (
                        <li key={exhibition.id}>
                            <ExhibitionBox
                                id={exhibition.id}
                                title={exhibition.title}
                                description={exhibition.description}
                                imageUrl={exhibition.imageUrl || 'https://place-hold.it/300x250'}
                            />
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p>No exhibitions available.</p>
                )}
        </div>
    );
}

export default ExhibitionList;