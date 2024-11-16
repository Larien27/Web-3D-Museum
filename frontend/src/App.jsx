import Header from './components/Header';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Exhibition from './pages/exhibition/Exhibition';

function App() {
    return(
        <>
            <Header />
            {/* <Exhibition /> */}
            <Registration />
            <Login />
        </>
    );
}

export default App;