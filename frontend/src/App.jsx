import Header from './components/Header';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Exhibition from './pages/exhibition/Exhibition';
import ExhibitionList from './pages/exhibition-list/ExhibitionList';
import Settings from './pages/settings/Settings';

function App() {
    return(
        <>
            <Header />
            <Exhibition />
            <Registration />
            <Login />
            <ExhibitionList />
            <Settings />
        </>
    );
}

export default App;