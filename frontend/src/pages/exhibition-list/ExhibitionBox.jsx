import { Link } from 'react-router-dom';

function ExhibitionBox({ id, title, description, imageUrl}) {
    return(
        <div id='exhibition-box'>
            <img src={imageUrl} alt={title} />
            <Link to={`/exhibitions/${id}`}>
                <h3>{title}</h3>
            </Link>
            <p>{description}</p>
        </div>
    );
}

export default ExhibitionBox;