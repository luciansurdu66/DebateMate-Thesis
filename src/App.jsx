import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage.jsx';
import AdminPage from './components/AdminPage.jsx';
import UserPage from './components/UserPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import DebaterImportPage from './components/Debater/DebaterImportPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import HomePage from './components/HomePage';
import RegisterPage from './components/auth/registerPage.jsx';
import DebaterListPage from './components/Debater/DebaterListPage';
import AdjudicatorImportPage from './components/Adjudicator/AdjudicatorImportPage';
import TeamListPage from './components/Team/TeamListPage'
import CreateChampionship from './components/Championship/createChampionship.jsx';
import RoundPage from './components/Championship/roundPage.jsx'
import ChampionshipList from './components/Championship/championshipList.jsx'
export const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/register" element={<RegisterPage/>} />
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/admin" element={<AdminPage/>} roles={['admin']} />
                    <Route path="/user" element={<UserPage/>} roles={['user', 'admin']} />
                    <Route path="/debaterimport" element={<DebaterImportPage/>} roles={['admin']} />
                    <Route path="/debaterlist" element={<DebaterListPage/>} roles={['admin']} />
                    <Route path="/adjudicatorimport" element = {<AdjudicatorImportPage/>} roles={['admin']} />
                    <Route path="/teamlist" element={<TeamListPage/>} roles={['admin']} />
                    <Route path="/createchampionship" element={<CreateChampionship/>} roles={['admin']} />
                    <Route path="/championships/:id/rounds/:roundNumber" element={<RoundPage />} roles={['admin']} />
                    <Route path="/championships" element={<ChampionshipList />} roles={['admin']} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));
