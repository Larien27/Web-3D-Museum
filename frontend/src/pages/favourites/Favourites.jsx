import FavouritesBox from './FavouritesBox';

function Favourites() {
    return(
        <div id='favourites'>
            <h1>Favourites</h1>
            <ul>
                <li><FavouritesBox /></li>
                <li><FavouritesBox /></li>
                <li><FavouritesBox /></li>
            </ul>
        </div>
    );
}

export default Favourites;