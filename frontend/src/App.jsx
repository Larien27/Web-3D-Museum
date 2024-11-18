import Header from './components/Header';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Exhibition from './pages/exhibition/Exhibition';
import ExhibitionList from './pages/exhibition-list/ExhibitionList';
import Favourites from './pages/favourites/Favourites';
import Settings from './pages/settings/Settings';
import UsersTable from './pages/users-table/UsersTable';

function App() {
    return(
        <>
            <Header />
            <Exhibition />
            <Registration />
            <Login />
            <ExhibitionList />
            <Favourites />
            <Settings />
            <UsersTable />
        </>
    );
}

export default App;