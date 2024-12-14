import React from 'react';
import {Routes, Route} from 'react-router-dom';

import UserPage from './features/Users/UserPage/UserPage.tsx';
import UserProfile from "./features/Users/UserProfile/UserProfile.tsx";

import ToolPage from './features/Tools/ToolPage/ToolPage.tsx';
import ToolProfile from './features/Tools/ToolProfile/ToolProfile.tsx';

import MaterialPage from "./features/Materials/MaterialPage/MaterialPage.tsx";
import MaterialProfile from "./features/Materials/MaterialProfile/MaterialProfile.tsx";

import SitePage from './features/Sites/SitePage/SitePage.tsx';
import SiteProfile from "./features/Sites/SiteProfile/SiteProfile.tsx";

import CategoryManager from "./components/CategoryManager.tsx";

import './styles/app.css';
import Navbar from "./components/layout/Navbar/Navbar.tsx";

const App: React.FC = () => (
    <div className="bg-background-color min-h-screen">
        <Navbar/>
        <div className="flex-1">
            <Routes>
                <Route path="/users" element={<UserPage/>}/>
                <Route path="/users/:id" element={<UserProfile/>}/>
                <Route path="/tools" element={<ToolPage/>}/>
                <Route path="/tools/:id" element={<ToolProfile/>}/>
                <Route path="/site" element={<SitePage/>}/>
                <Route path="/site/:id" element={<SiteProfile/>}/>
                <Route path="/materials" element={<MaterialPage/>}/>
                <Route path="/materials/:id" element={<MaterialProfile/>}/>
                <Route path={"/categories"} element={<CategoryManager/>}/>
            </Routes>
        </div>
    </div>
);

export default App;