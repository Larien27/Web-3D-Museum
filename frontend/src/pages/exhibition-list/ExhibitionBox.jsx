import { Link } from 'react-router-dom';
import './ExhibitionBox.scss';

function ExhibitionBox({ id, title, description, imageUrl, user, exhibitorId}) {
    const canEdit = user.role === 'Admin' || user.id === exhibitorId;

    return(
        <div class='exhibition-box'>
            <img src={imageUrl} alt={title} />
            <Link to={`/exhibitions/${id}`}>
                <h3>{title}</h3>
            </Link>
            <p>{description}</p>
            <span className='colorful-button'><Link to={`/exhibitions/${id}/3d`}>View 3D Exhibition</Link></span>
            {canEdit && (
                <>
                    <Link to={`/artefacts/${id}/create-artefact`}>Add Artefact</Link>
                    <Link to={`/exhibitions/${id}/edit`}>Edit</Link>
                    <Link to={`/exhibitions/${id}/scene-editor`}>Exhibition Editor</Link>
                </>
            )}
        </div>
    );
}

export default ExhibitionBox;