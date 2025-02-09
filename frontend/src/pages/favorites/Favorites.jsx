import FavoritesBox from './FavoritesBox';

function Favorites() {
    return(
        <div id='favorites'>
            <h1>Favorites</h1>
            <ul>
                <li><FavoritesBox /></li>
                <li><FavoritesBox /></li>
                <li><FavoritesBox /></li>
            </ul>
        </div>
    );
}

export default Favorites;