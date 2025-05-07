import Header from './components/Header';

import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Exhibition from './pages/3d-exhibition/Exhibition';
import ExhibitionList from './pages/exhibition-list/ExhibitionList';
import Settings from './pages/settings/Settings';
import UsersTable from './pages/users-table/UsersTable';
import ReportsList from './pages/reports-list/ReportsList';
import ExhibitionCreateForm from './pages/create-exhibition/ExhibitionCreateForm';
import ExhibitionEditForm from './pages/edit-exhibition/ExhibitionEditForm';
import ExhibitionSceneEditor from './pages/exhibition-scene-editor/ExhibitionSceneEditor';
import ArtefactUploadForm from './pages/create-artefact/ArtefactUploadForm';
import ArtefactEditForm from './pages/edit-artefact/ArtefactEditForm';
import ExhibitionDetail from './pages/exhibition-detail/ExhibitionDetail';
import ArtefactDetail from './pages/artefact-detail/ArtefactDetail';
import ReportForm from './pages/report-form/ReportForm';

import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { LoadingProvider } from './context/LoadingContext';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return(
        <AuthProvider>
            <ToastProvider>
                <LoadingProvider>
                    <Router>
                        <Header />
                        <Routes>
                            <Route path='/login' element={<Login />}/>
                            <Route path='/registration' element={<Registration />}/>

                            <Route element={<ProtectedRoute allowedRoles={['Visitor', 'Exhibitor', 'Admin']}/>}>
                                <Route path='/exhibition-list' element={<ExhibitionList />}/>
                                <Route path='/settings' element={<Settings />}/>
                                <Route path='/exhibitions/:exhibitionId/3d' element={<Exhibition />} />
                                <Route path='/exhibitions/:exhibitionId' element={<ExhibitionDetail />} />
                                <Route path='/artefacts/:artefactId' element={<ArtefactDetail />} />
                                <Route path='/artefacts/:artefactId/report-form' element={<ReportForm />} />
                            </Route>

                            <Route element={<ProtectedRoute allowedRoles={['Exhibitor', 'Admin']}/>}>
                                <Route path='/create-exhibition' element={<ExhibitionCreateForm />}/>
                                <Route path='/exhibitions/:exhibitionId/edit' element={<ExhibitionEditForm />}/>
                                <Route path='/exhibitions/:exhibitionId/scene-editor' element={<ExhibitionSceneEditor />}/>
                                <Route path='/artefacts/:exhibitionId/create-artefact' element={<ArtefactUploadForm />} />
                                <Route path='/artefacts/:artefactId/edit' element={<ArtefactEditForm />} />
                            </Route>

                            <Route element={<ProtectedRoute allowedRoles={['Admin']}/>}>
                                <Route path='/users-table' element={<UsersTable />}/>
                                <Route path='/reports-list' element={<ReportsList />}/>
                            </Route>
                        </Routes>
                    </Router>
                </LoadingProvider>
            </ToastProvider>
        </AuthProvider>
        
    );
}

export default App;