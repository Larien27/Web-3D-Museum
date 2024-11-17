import './ExhibitionList.scss';
import ExhibitionBox from './ExhibitionBox';

function ExhibitionList() {
    return(
        <div id='exhibition-list'>
            <h1>Current Exhibitions</h1>
            <ul>
                <li><ExhibitionBox /></li>
                <li><ExhibitionBox /></li>
                <li><ExhibitionBox /></li>
            </ul>
        </div>
    );
}

export default ExhibitionList;