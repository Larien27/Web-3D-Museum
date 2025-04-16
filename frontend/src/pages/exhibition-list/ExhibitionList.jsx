import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import axios from 'axios';
import './ExhibitionList.scss';
import ExhibitionBox from './ExhibitionBox';

function ExhibitionList() {
    const { showToast } = useToast();
    const [exhibitions, setExhibitions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExhibitions() {
            try {
                const response = await axios.get('/api/exhibitions');
                setExhibitions(response.data);
            } catch (err) {
                showToast('error', 'Failed to load exhibitions.');
            } finally {
                setLoading(false);
            }
        }

        fetchExhibitions();
    }, []);

    if (loading) return <p>Loading exhibitions...</p>;

    return(
        <div id='exhibition-list'>
            <h1>Exhibitions</h1>
            <NavLink to='/create-exhibition'>Create Exhibition</NavLink>
            
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