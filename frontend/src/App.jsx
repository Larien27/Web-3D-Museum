import Header from './components/Header';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Exhibition from './pages/exhibition/Exhibition';
import ExhibitionList from './pages/exhibition-list/ExhibitionList';
import Favorites from './pages/favorites/Favorites';
import Settings from './pages/settings/Settings';
import UsersTable from './pages/users-table/UsersTable';
import ReportsList from './pages/reports-list/ReportsList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return(
        <Router>
            <Header />
            <Routes>
                <Route path='/exhibition' element={<Exhibition />}/>
                <Route path='/registration' element={<Registration />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/exhibition-list' element={<ExhibitionList />}/>
                <Route path='/favorites' element={<Favorites />}/>
                <Route path='/settings' element={<Settings />}/>
                <Route path='/users-table' element={<UsersTable />}/>
                <Route path='/reports-list' element={<ReportsList />}/>
            </Routes>
        </Router>
    );
}

export default App;