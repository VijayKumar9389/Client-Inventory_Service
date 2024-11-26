import React from 'react';
import {Routes, Route} from 'react-router-dom';

import UserPage from './pages/UserPage/UserPage.tsx';
import UserProfile from "./pages/UserProfile/UserProfile.tsx";

import ToolPage from './pages/ToolPage/ToolPage.tsx';
import ToolProfile from './pages/ToolProfile/ToolProfile.tsx';

import MaterialPage from "./pages/MaterialPage/MaterialPage.tsx";
import MaterialProfile from "./pages/MaterialProfile/MaterialProfile.tsx";

import LocationPage from './pages/LocationPage/LocationPage.tsx';
import LocationProfile from "./pages/LocationProfile/LocationProfile.tsx";

import './styles/app.css';
import Navbar from "./components/Navbar/Navbar.tsx";

const App: React.FC = () => (
    <div className="bg-background-color min-h-screen">
        <Navbar/>
        <div className="flex-1">
            <Routes>
                <Route path="/users" element={<UserPage/>}/>
                <Route path="/users/:id" element={<UserProfile/>}/>
                <Route path="/tools" element={<ToolPage/>}/>
                <Route path="/tools/:id" element={<ToolProfile/>}/>
                <Route path="/locations" element={<LocationPage/>}/>
                <Route path="/locations/:id" element={<LocationProfile/>}/>
                <Route path="/materials" element={<MaterialPage/>}/>
                <Route path="/materials/:id" element={<MaterialProfile/>}/>
            </Routes>
        </div>
    </div>
);

export default App;