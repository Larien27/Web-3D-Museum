import Header from './components/Header';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Exhibition from './pages/exhibition/Exhibition';
import ExhibitionList from './pages/exhibition-list/ExhibitionList';
import Favourites from './pages/favourites/Favourites';
import Settings from './pages/settings/Settings';
import UsersTable from './pages/users-table/UsersTable';
import ReportsList from './pages/reports-list/ReportsList';
import ExhibitionCreateForm from './pages/create-exhibition/ExhibitionCreateForm';
import ArtefactUploadForm from './pages/create-exhibition/ArtefactUploadForm';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return(
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/registration' element={<Registration />}/>

                    <Route element={<ProtectedRoute />}>
                        <Route path='/exhibition' element={<Exhibition />}/>
                        <Route path='/exhibition-list' element={<ExhibitionList />}/>
                        <Route path='/favourites' element={<Favourites />}/>
                        <Route path='/settings' element={<Settings />}/>
                        <Route path='/users-table' element={<UsersTable />}/>
                        <Route path='/reports-list' element={<ReportsList />}/>
                        <Route path='/create-exhibition' element={<ExhibitionCreateForm />}/>
                        <Route path="/artefacts/:exhibitionId/create-artefact" element={<ArtefactUploadForm />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
        
    );
}

export default App;