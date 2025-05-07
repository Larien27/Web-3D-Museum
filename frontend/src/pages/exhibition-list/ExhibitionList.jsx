import { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useLoading } from '../../context/LoadingContext';
import axios from 'axios';
import './ExhibitionList.scss';
import ExhibitionBox from './ExhibitionBox';

function ExhibitionList() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const { showLoading, hideLoading } = useLoading();
    const [exhibitions, setExhibitions] = useState([]);

    useEffect(() => {
        async function fetchExhibitions() {
            showLoading();
            try {
                const response = await axios.get('/api/exhibitions', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setExhibitions(response.data);
            } catch (err) {
                showToast('error', 'Failed to load exhibitions.');
            } finally {
                hideLoading();
            }
        }

        fetchExhibitions();
    }, [user, showToast]);

    return(
        <div id='exhibition-list'>
            <h1>Exhibitions</h1>
            {(user.role === 'Exhibitor' || user.role === 'Admin') && (
                <span className='colorful-button'>
                    <NavLink to='/create-exhibition'>Create Exhibition</NavLink>
                </span>
            )}
            
                {exhibitions.length > 0 ? (
                    <ul>
                    {exhibitions.map((exhibition) => (
                        <li key={exhibition.id}>
                            <ExhibitionBox
                                id={exhibition.id}
                                title={exhibition.title}
                                description={exhibition.description}
                                imageUrl={exhibition.imageUrl || 'https://place-hold.it/300x250'}
                                user={user}
                                exhibitorId={exhibition.creator_id}
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