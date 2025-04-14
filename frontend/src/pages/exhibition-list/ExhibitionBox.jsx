import { Link } from 'react-router-dom';
import './ExhibitionBox.scss';

function ExhibitionBox({ id, title, description, imageUrl}) {
    return(
        <div class='exhibition-box'>
            <img src={imageUrl} alt={title} />
            <Link to={`/exhibitions/${id}`}>
                <h3>{title}</h3>
            </Link>
            <p>{description}</p>
            <Link to={`/artefacts/${id}/create-artefact`}>Add Artefact</Link>
            <Link to={`/exhibitions/${id}/edit`}>Edit</Link>
            <Link to={`/exhibitions/${id}/scene-editor`}>Exhibition Editor</Link>
            <Link to={`/exhibitions/${id}/3d`}>
                <button>View 3D Exhibition</button>
            </Link>
        </div>
    );
}

export default ExhibitionBox;